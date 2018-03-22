const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let dom = {};
const { window } = new JSDOM(
  `<!DOCTYPE html>
    <html>
      <body>
        <div id="app">
        </div>
      </body>
    </html>
  `
);
const { document } = window.window;

dom.window = document.defaultView;
dom.console = window.console;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};