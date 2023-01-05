// This file is what should be loaded in home ui for development. It's simply stupidly simple.

(async () => {
  const res = await fetch("https://localhost:8080");

  if (res.status !== 200) {
    throw new Error("Development server not running");
  }

  const html = await res.text();
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(html);

  const scripts = Array.from(doc.querySelectorAll("script")).map(
    (oldScript) => {
      const newScript = document.createElement("script");

      newScript.defer = oldScript.defer;
      newScript.type = oldScript.type;

      // I can't get vite configured to export an absolute URL, so we are
      // doing it manually here.
      const newUrl = new URL(oldScript.src);
      newUrl.protocol = "https";
      newUrl.host = "localhost";
      newUrl.port = 8080;
      newScript.src = newUrl.toString();

      return newScript;
    }
  );

  document
    .querySelector('script[src="/local/home-ui/development.js"]')
    .after(...scripts);
})();
