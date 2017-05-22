chrome.app.runtime.onLaunched.addListener(function() {
  // var s = document.createElement('script');
  // // TODO: add "script.js" to web_accessible_resources in manifest.json
  // s.src = chrome.extension.getURL('https://js.pusher.com/3.2/pusher.min.js');
  // s.onload = function() {
  //     this.remove();
  // };
  // (document.head || document.documentElement).appendChild(s);
  // const createWindow = () => {
    chrome.app.window.create("index.html",
      {
         type: "shell",
         outerBounds: {
           width: 700,
           height: 835,
           left: 50,
           minWidth: 700,
           maxWidth: 700,
           minHeight: 835,
           maxHeight: 835
        }
      }
    );

  // }

  // chrome.permissions.getAll( e => {
  //   console.log(e)
  //   createWindow()
  // });
});
