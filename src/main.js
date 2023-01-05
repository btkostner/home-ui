import "./style.css";

import { computed, createApp, h, reactive } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";

import App from "./App.vue";
import IndexPage from "./pages/index.vue";
import EntityPage from "./pages/entity.vue";

const ROUTES = [
  { path: "/", component: IndexPage },
  { path: "/entity", component: EntityPage },
];

// If vite has to trigger a full reload, it causes duplicate sidebars and what
// not. So we force reload the whole Home UI interface. For the most part, this
// is not actually needed, but it's still nice to have and fix the issue.
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    if (window.parent != null) {
      window.parent.location.reload();
    }
  });
}

class HomeUiPanel extends HTMLElement {
  constructor() {
    super();

    this._props = reactive({
      hass: this.hass,
      showMenu: this.showMenu,
      narrow: this.narrow,
      panel: this.panel,
    });

    this._app = createApp({
      render: () => h(App, this._props),
    });

    this._router = createRouter({
      history: createMemoryHistory(),
      routes: ROUTES,
    });

    this._app.config.devtools = true;
    this._app.config.unwrapInjectedRef = true;

    this._app.use(this._router);

    const mappedProps = Object.keys(this._props).map((key) => {
      return [
        key,
        {
          set(value) {
            this._props[key] = value;
          },
        },
      ];
    });

    Object.defineProperties(this, Object.fromEntries(mappedProps));
  }

  connectedCallback() {
    if (this.isConnected) {
      this._app.mount(this);
    }
  }

  disconnectedCallback() {
    this._app.unmount();
  }
}

customElements.define("home-ui-panel", HomeUiPanel);
