const PLUGIN_ID = "sdk_LucasRibeiro_c47dd480b7"
const REACT_APP_URL = 'https://lucastestchromeplugin.herokuapp.com';
//const REACT_APP_URL = "http://localhost:3000";
const TYPE_NEW_MESSAGE = 'CREATE_NEW_MESSAGE';

const modalTitle = 'Personal Snippets';

const buildIframe = () => {
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", REACT_APP_URL);
  iframe.id = 'amplemarket';
  iframe.style.height = "500px";
  return iframe;
}

InboxSDK.load(2, PLUGIN_ID).then(sdk => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
    window.addEventListener('message', (e) => {
      if (e.origin !== REACT_APP_URL) return
      if(typeof e.data === 'string'){
        composeView.setBodyHTML(e.data);
      }
      else if(typeof e.data === 'object'){
        if(e.data.type === TYPE_NEW_MESSAGE){
          const child = document.getElementById("amplemarket");
          child.contentWindow.postMessage({
            title: e.data.title,
            text: composeView.getHTMLContent()
          }, "*");
        }
      }
    });

    composeView.addButton({
      title: "Personal Snippets",
      iconUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fdesign%2F100%2Fglue-256.png&f=1&nofb=1',
      onClick: event => {
        sdk.Widgets.showMoleView({
          el: buildIframe(),
          showCloseButton: true,
          title: modalTitle,
        })
      },
    });
  });
});