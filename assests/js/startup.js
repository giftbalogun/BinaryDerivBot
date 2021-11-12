//Set up terms window incase there is no token on authorise:
var autoMarketInterval;
function startup() {
  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Welcome to RBV Bot, trade carefully and make sure you have a stable network connection!</p>'
    );
  tickStream();
  if (autoSymbol) {
    autoMarketInterval = setInterval(autoMarket, 30000);
  }
}
