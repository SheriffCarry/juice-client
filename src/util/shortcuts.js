const { app, clipboard } = require("electron");
const shortcut = require("electron-localshortcut");

const registerShortcuts = (window) => {
  const register = (key, action) => shortcut.register(window, key, action);
  register("Escape", () =>
    window.webContents.executeJavaScript("document.exitPointerLock()")
  );
  register("F2", () => {
    const { screen } = require("electron");
    const { x, y, width, height } = screen.getPrimaryDisplay().bounds;
    window.capturePage({ x, y, width, height }).then((image) => {
      clipboard.writeImage(image);
      const message = "Screenshot copied to clipboard";
      const icon = image.toDataURL();
      const data = { message, icon };
      window.webContents.send("notification", data);
    });
  });
  register("F4", () => window.loadURL("https://kirka.io"));
  register("F5", () => window.reload());
  register("F6", () => window.loadURL(clipboard.readText()));
  register("F7", () => clipboard.writeText(window.webContents.getURL()));
  register("F11", () => window.setFullScreen(!window.isFullScreen()));
  register("F12", () => window.webContents.openDevTools());
  register("Ctrl+Shift+I", () => window.webContents.openDevTools());
  register("Alt+F4", () => app.quit());
};

module.exports = { registerShortcuts };