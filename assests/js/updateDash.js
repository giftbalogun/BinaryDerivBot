function updateDash() {
  if (autoSymbol === false) {
    marketGood = true;
  }

  //  changeDurations();

  document.getElementById("stake").textContent = stakestake;
  document.getElementById("profit").textContent = profit;
  // document.getElementById('contractProfit').textContent = settings.get('sellprofit.sellprofit');

  // set up styling for different values
  if (profit >= 0) {
    document.getElementById("profit").style.color = "#21ba45";
  } else {
    document.getElementById("profit").style.color = "red";
  }

  // set up tri-color state for win rate
  if (winrate >= 45 && winrate < 52) {
    document.getElementById("winRate").style.color = "#fbbd08";
  } else if (winrate >= 52) {
    document.getElementById("winRate").style.color = "#21ba45";
  } else {
    document.getElementById("winRate").style.color = "red";
  }

  // set upauto limits if set
  if (autoThresh > 0) {
    autoLimit = true;
  }

  //Stats etc

  // document.getElementById('strategy').textContent = strat

  // document.getElementById('stopLoss').textContent = settings.get('stopLoss.stopLoss');
  // document.getElementById('peakStake').textContent = settings.get('peakStake.peakStake');
  // document.getElementById('MGstyle').textContent = MGStyle;
  document.getElementById("winRate").textContent = winrate;
  // document.getElementById('takeProfit').textContent = settings.get('takeProfit.takeProfit');
  document.getElementById("noTrades").textContent = winswins + losseslosses;

  //  document.getElementById('maxwin').textContent = settings.get('maxConWins.maxConWins');
  //  document.getElementById('maxloss').textContent = settings.get('maxConLosses.maxConLosses');
  document.getElementById("mgStep").textContent = consecutiveLosses;
  document.getElementById("cumlosses").textContent = cumLosscumLoss;
  //  document.getElementById('ladderprofit').textContent = settings.get('ladderProfit.ladderProfit');
  //  document.getElementById('ladderscomplete').textContent = settings.get(
  //      'laddersCompleted.laddersCompleted');
  document.getElementById("symbolOverlay").innerHTML =
    `<h1 style="font-weight: 100;font-family: 'Comfortaa', cursive; color:#4040401A"> ` +
    symbolsymbol +
    ` </h1>`;
  if (balance != undefined) {
    document.getElementById("balance").textContent = balance;
    //  document.getElementById('account').textContent = loginId;
    document.getElementById("currency").textContent = currency;
  } else {
    document.getElementById("balance").textContent = "Please Log In";
  }
  // control button functions while trading!

  if (runrun === true) {
    document.getElementById("startBot").disabled = true;
  } else {
    document.getElementById("startBot").disabled = false;
  }

  //keep bottom statistics in line with MM strategy

  if (MGStyle === "Ladder") {
    //   document.getElementById("hideladderscomplete").style.display = '';
    //  document.getElementById("hideladderprofit").style.display = '';
    document.getElementById("hidecumloss").style.display = "none";

    document.getElementById("hidemgstep").style.display = "none";
  } else if (MGStyle === "Cum. Loss") {
    //  document.getElementById("hideladderscomplete").style.display = 'none';
    //  document.getElementById("hideladderprofit").style.display = 'none';
    document.getElementById("hidecumloss").style.display = "";

    document.getElementById("hidemgstep").style.display = "";
  } else if (MGStyle === "Martingale") {
    //   document.getElementById("hideladderscomplete").style.display = 'none';
    //    document.getElementById("hideladderprofit").style.display = 'none';

    document.getElementById("hidemgstep").style.display = "";
    document.getElementById("hidecumloss").style.display = "";
  }

  if (balance === undefined && tokenToBeUsed != undefined) {
    if (tokenToBeUsed != "") {
      authorise();
    }
  }
}
