function saveParametersOnClick() {
  if (initialStakeinitialStake == stakestake) {
    stakestake = document.getElementById("setStake").value;
  }

  initialStakeinitialStake = document.getElementById("setStake").value;
  takeProfit = document.getElementById("setTakeProfit").value;
  stopLoss = document.getElementById("setStopLoss").value;
  trailingStop = document.getElementById("setTrailingStop").value;
  autoThresh = document.getElementById("setautolimit").value;
  MGReset = document.getElementById("mgreset").value;
  ManualtradeDurationInt = document.getElementById("durationInt").value;
  AutotradeDurationInt = document.getElementById("durationIntAuto").value;
  // tokenToBeUsed = document.getElementById('setToken').value;

  // autoStrat = document.getElementById('Stratdropdown').value;
  if ($("#Stratdropdown").dropdown("get value") == "") {
  } else {
    autoStrat = $("#Stratdropdown").dropdown("get value");
  }

  if ($("#Stratdropdowntype").dropdown("get value") == "") {
  } else {
    autoStrattype = $("#Stratdropdowntype").dropdown("get value");
  }

  if ($("#MMdropdown").dropdown("get value") == "") {
  } else {
    MGStyle = $("#MMdropdown").dropdown("get value");
  }
  if ($("#Marketdropdown").dropdown("get value") == "") {
  } else {
    if ($("#Marketdropdown").dropdown("get value") != "Auto") {
      symbolsymbol = $("#Marketdropdown").dropdown("get value");
      autoSymbol = false;
      marketGood = true;
      clearInterval(autoMarketInterval);
    } else {
      autoSymbol = true;
      autoMarketInterval = setInterval(autoMarket, 30000);
    }

    switched = true;
    forgetSubs();
    tickStream();
  }

  localStorage.setItem("storedToken", tokenToBeUsed);
  localStorage.setItem("storedSymbol", symbolsymbol);
  localStorage.setItem("storedStrat", autoStrat);
  localStorage.setItem("storedinitialStake", initialStakeinitialStake);
  localStorage.setItem("storedTakeProfit", takeProfit);
  localStorage.setItem("storedStopLoss", stopLoss);
  localStorage.setItem("storedTrailingStop", trailingStop);
  localStorage.setItem("storedMGReset", MGReset);
  localStorage.setItem("storedMGStyle", MGStyle);
  localStorage.setItem("storedAutoThresh", autoThresh);
  localStorage.setItem("storedMTdur", ManualtradeDurationInt);
  localStorage.setItem("storedMTunit", ManualtradeDurationUnit);
  localStorage.setItem("storedATdur", AutotradeDurationInt);
  localStorage.setItem("storedATunit", AutotradeDurationUnit);
  localStorage.setItem("storedautoSym", autoSymbol);

  console.log(symbolsymbol, MGStyle, autoStrat);

  if (runrun === false || autoTrade === false) {
    let duration = ManualtradeDurationInt * 1;
    let duration_unit = ManualtradeDurationUnit;

    var convertedDuration = duration;
    if (duration_unit == "m") {
      convertedDuration = duration * 60;
    }

    if (duration_unit == "t") {
      convertedDuration = duration * 2;
    }

    message =
      "Ready to place manual trade. Trade duration set to " +
      convertedDuration +
      " seconds";

    console.log(
      "saved",
      takeProfit,
      stopLoss,
      trailingStop,
      autoThresh,
      MGReset,
      ManualtradeDurationInt,
      ManualtradeDurationUnit,
      autoStrat
    );
  }
}
