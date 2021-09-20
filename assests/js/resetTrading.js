function resetTradingOnClick() {
  console.log("stopped bot");

  strategy = autoStrat;

  runrun = false;
  //settings.set('message.message', 'Auto Trading Paused');
  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Auto Strat : ' +
        strategy +
        " is paused. Press play to resume auto-trading.</p>"
    );

  marketGood = true;
  tradeInProgress = false;
  lockAuto = 0;

  let duration = ManualtradeDurationInt * 1;
  let duration_unit = ManualtradeDurationUnit;

  var convertedDuration = ManualtradeDurationInt * 1;

  if (duration_unit == "m") {
    convertedDuration = duration * 60;
  }

  if (duration_unit == "t") {
    convertedDuration = duration * 2;
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

  stakestake = initialStakeinitialStake;
  winswins = 0; //settings.get('wins.wins')
  losseslosses = 0; // settings.get('losses.losses')
  consecutiveWins = 0;
  compoundWins = 0;
  consecutiveLosses = 0;
  consecutiveWins = 0;
  cumLosscumLoss = 0;
  peakStake = 0;
  maxConLosses = 0;
  maxConWins = 0;
  winrate = 0;
  profit = 0;
  peakProfit = 0;
  peakLoss = 0;
  ladderProfit = 0;
  laddersCompleted = 0;
  ladderLevel = 0;

  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">bot has been reset, all data cleared, it will now start from initial stake @ 0.00 profit</p>'
    );

  // save outcome to cache incase of stop

  localStorage.setItem("storedstakestake", stakestake);
  localStorage.setItem("storedStrat", strategy);
  localStorage.setItem("storedAutoStrat", autoStrat);
  localStorage.setItem("storedwinswins", winswins);
  localStorage.setItem("storedlosseslosses", losseslosses);
  localStorage.setItem("storedconsecutiveWins", consecutiveWins);
  localStorage.setItem("storedcompoundWins", compoundWins);
  localStorage.setItem("storedconsecutiveLosses", consecutiveLosses);
  localStorage.setItem("storedcumLosscumLoss", cumLosscumLoss);
  localStorage.setItem("storedpeakStake", peakStake);
  localStorage.setItem("storedmaxConLosses", maxConLosses);
  localStorage.setItem("storedmaxConWins", maxConWins);
  localStorage.setItem("storedwinrate", winrate);
  localStorage.setItem("storedprofit", profit);
  localStorage.setItem("storedpeakProfit", peakProfit);
  localStorage.setItem("storedpeakLoss", peakLoss);
  localStorage.setItem("storedladderProfit", ladderProfit);
  localStorage.setItem("storedladdersCompleted", laddersCompleted);
  localStorage.setItem("storedladderLevel", ladderLevel);
}
