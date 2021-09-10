function manualCall() {
  tradeDurationInt = ManualtradeDurationInt;
  tradeDurationUnit = ManualtradeDurationUnit;

  if (autoTrade === false || tradeInProgress === false) {
    callOrPut = "CALL";

    (tradeInProgress = true),
      console.log("Attempting to place Call Trade: ", callOrPut);
    message = "Placing CALL trade";
    trade();
  }
}

function manualPut() {
  tradeDurationInt = ManualtradeDurationInt;
  tradeDurationUnit = ManualtradeDurationUnit;

  if (autoTrade === false || tradeInProgress === false) {
    callOrPut = "PUT";

    tradeInProgress = true;

    console.log("Attempting to place Put Trade: ", callOrPut);
    message = "Placing PUT trade";
    trade();
  }
}
