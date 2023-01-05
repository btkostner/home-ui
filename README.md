# Home UI

A custom Vue dashboard for home assistant.

Huge shout out to the [william57m/ha-dashboard](https://github.com/william57m/ha-dashboard) repository work and getting React setup with Home Assistant.

## Why?

First off, I'd like to give the Home Assistant team huge props for making a system this extendable. I could probably make this interface in pure lovelace ui. But it would have taken me _forever_. I'm used to how Vue works. I know the tools. I enjoy hot code reloading. So I instead decided to use the stack I know to create the dashboard. It has some pros as well as some cons, but overall seems like the correct route for me to go down.

Pros:
- It uses Vue, Vite, and Tailwind (a stack I know)
- Hot code reloading is very nice
- I am able to use Vue router to split up logic
- I learn about the inner workings of HA

Cons:
- Vue router is in memory only (no saving of location when refreshing)
- It's not technically a dashboard in HA, so no casting
- Any chances require code changes (no editing UI)

## Setup

### Development

This setup is made for locally developing your dashboard in the Home Assistant UI with the development server running locally. It includes hot code reloading and works pretty well. Just don't try changing ports or you could be in for a ride.

Ensure you have the custom panel setup for development. In your `configuration.yaml` file you should have:

```yaml
panel_custom:
  - name: home-ui-panel
    sidebar_title: Home UI
    sidebar_icon: mdi:home
    url_path: home-ui-dev
    module_url: /local/home-ui/development.js
    embed_iframe: true
    trust_external_script: true
```

Ensure your `/config/www/home-ui/development.js` file matches what we have in `src/development.js`.

Then start the development server:

```bash
npm ci
npm start
```

### Production

> **NOTE**: This is untested so far and probably does not work yet.

For production, we build the whole project to static assets and drop them in your home assistant local web server folder.

Run `npm run build` to build the files, then copy the `dist` folder to your `/config/www/home-ui` folder in home assistant. Ensure that the `/config/www/home-ui/main.js` is available.

Then update your custom panel configuration to include Home UI.

```yaml
panel_custom:
  - name: home-ui-panel
    sidebar_title: Home UI
    sidebar_icon: mdi:home
    url_path: home-ui
    module_url: /local/home-ui/main.js
    embed_iframe: true
```
