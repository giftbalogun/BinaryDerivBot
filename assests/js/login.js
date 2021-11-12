// OAuth log in functions for binary.com and deriv

$("#oauthaccountsign").click(function () {
  window.open(
    `https://track.deriv.com/_J7M51m8rKaiws6I0Pc5-VWNd7ZgqdRLk/1/`,
    "_self"
  );
});

// OAuth link
app_id_ = 29921;
$("#oauthaccount").click(function () {
  window.open(
    `https://oauth.deriv.app/oauth2/authorize?app_id=${app_id_}&l=en&brand=deriv&affiliate_token=FSpdOmZEx_riE1AfLJLFGGNd7ZgqdRLk`,
    "_self"
  );
});

//Check and parse Oauth Parameters through to Object "OauthData"

function login() {
  // Check for OAuth parameter and collect into vars

  window.params = (function () {
    var url_hre = window.location.href;

    if (getCookie("api_token") || url_hre.split("?")[1]) {
      if (url_hre.split("?")[1]) {
        setTokenList(url_hre);

        localStorage.setItem("tokens_list", url_hre);
      } else {
        if (localStorage.getItem("tokens_list")) {
          setTokenList(localStorage.getItem("tokens_list"));
        } else {
          tokenToBeUsed = getCookie("api_token");
          $("#secltcontainer").hide();
        }
      }

      authorise();
    } else {
      $(".ui.basic.modal").modal("show");
    }
  })();
}

function setTokenList(href_) {
  var params = {};
  var param_array = href_.split("?")[1].split("&");

  for (var i in param_array) {
    x = param_array[i].split("=");
    params[x[0]] = x[1];
  }

  OauthData = params;

  account_array = [];

  for (var i = 0; i < 8; i++) {
    if (makeArrayBySuffix(OauthData, i)[0]) {
      account_array.push({
        account: makeArrayBySuffix(OauthData, i)[0],
        token: makeArrayBySuffix(OauthData, i)[1],
      });
    }
  }

  account_list = makeArrayByPrefix(OauthData, "acc");

  for (var i = 0; i < account_array.length; i++) {
    var opt = account_array[i];
    var el = document.createElement("option");
    el.textContent = opt.account;
    el.value = opt.token;
    document.getElementById("accountSelect").appendChild(el);
  }

  tokenToBeUsed = account_array[0].token;

  setCookie("api_token", tokenToBeUsed);
}

function postLogin() {
  // tokenToBeUsed = account_1.token;

  let selectedaccount =
    document.getElementById("accountSelect").options[
      document.getElementById("accountSelect").selectedIndex
    ].text;
  tokenToBeUsed = document.getElementById("accountSelect").value;

  setCookie("api_token", tokenToBeUsed);

  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Account switched to ' +
        selectedaccount +
        ", reauthorizing!</p>"
    );

  authorise();
  console.log("post login on account change");
}

const tabs = document.querySelector(".wrapper");
const tabButton = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".content");

tabs.onclick = (e) => {
  const id = e.target.dataset.id;
  if (id) {
    tabButton.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
};

function getCookie(name) {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function logout() {
  setCookie("api_token", null, null);
  localStorage.setItem("tokens_list", "");
  window.location = window.location.href.split("?")[0];
}
