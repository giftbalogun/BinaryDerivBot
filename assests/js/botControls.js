function startBot() {
  console.log("started bot");
  //settings.set('message.message', 'Auto Trading Started');
  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Auto Trading Started</p>'
    );

  if (autoThresh > 0 && autoTrade) {
    if (autoLimit && consecutiveLosses >= autoThresh) {
      if (strategy != "manual") {
        strategy = "manual";
      }

      duration = ManualtradeDurationInt * 1;
      duration_unit = ManualtradeDurationUnit;

      var convertedDuration = ManualtradeDurationInt * 1;

      if (duration_unit == "m") {
        convertedDuration = duration * 60;
      }

      if (duration_unit == "t") {
        convertedDuration = duration * 2;
      }
      if (duration_unit == "s") {
        convertedDuration = duration * 1;
      }

      document
        .getElementById("notifyme")
        .insertAdjacentHTML(
          "afterbegin",
          '<p style="color:#8c01a0">Auto Strat : ' +
            autoStrat +
            " will resume after your next winning trade..</p>"
        );

      document
        .getElementById("notifyme")
        .insertAdjacentHTML(
          "afterbegin",
          '<p style="color:#8c01a0">Ready to place manual trade. Trade duration set to ' +
            convertedDuration +
            " seconds.</p>"
        );
    }
  } else {
    autoTrade = true;
  }

  runrun = true;

  tradeInProgress = false;

  lockAuto = 0;

  winLossBarrier = "no open trade";
  if (
    (strategy == "manual" && autoLimit > 0 && consecutiveLosses < autoThresh) ||
    (strategy == "manual" && autoLimit == 0)
  ) {
    strategy = autoStrat;

    duration = AutotradeDurationInt * 1;
    duration_unit = AutotradeDurationUnit;

    var convertedDuration = AutotradeDurationInt * 1;

    if (duration_unit == "m") {
      convertedDuration = duration * 60;
    }

    if (duration_unit == "t") {
      convertedDuration = duration * 2;
    }
    if (duration_unit == "s") {
      convertedDuration = duration * 1;
    }
  }

  console.log("bot run status: ", runrun);
  console.log("auto-trade status: ", autoTrade);
}

function pauseBot() {
  console.log("stopped bot");

  strategy = autoStrat;

  runrun = false;
  //settings.set('message.message', 'Auto Trading Paused');
  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Auto Strat : ' +
        autoStrat +
        " is paused. Press play to resume auto-trading.</p>"
    );

  tradeInProgress = false;
  lockAuto = 0;

  duration = ManualtradeDurationInt * 1;
  duration_unit = ManualtradeDurationUnit;

  var convertedDuration = ManualtradeDurationInt * 1;

  if (duration_unit == "m") {
    convertedDuration = duration * 60;
  }

  if (duration_unit == "t") {
    convertedDuration = duration * 2;
  }
  if (duration_unit == "s") {
    convertedDuration = duration * 1;
  }
  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Ready to place manual trade. Trade duration set to ' +
        convertedDuration +
        " seconds.</p>"
    );

  console.log("bot run status: ", runrun);
}
