// Binary Bot Trading Main Strategy

var closeList;
var openList;
var highList;
var lowList;

function priceActionrun() {
  /*
------------------    priceAction settings    --------------------
//priceAction defaults
        settings.set('priceActionDuration.priceActionDuration', 7); //integer time period
        settings.set('priceActionDuration_unit.priceActionDuration_unit', 't') // 's', 'm'
        settings.set('priceActionCandleOrTick.priceActionCandleOrTick', 'candle');  // or 'candle'
        settings.set('multiCandleL.multiCandleL', 60);  // 120, 180,300 candle duration
        settings.set('priceActionCandleBody.priceActionCandleBody', 0.7); // candle ratio


----------------     END OF SETTINGS      -----------------
    */

  if (runrun && autoTrade && tradeInProgress === false) {
    // ------------------  ANALYZE DATA  ----------------------

    closeList = Rxlong_close_list;
    openList = Rxlong_open_list;
    highList = Rxlong_high_list;
    lowList = Rxlong_low_list;

    let CandlePercent = Math.abs(Close - Open) / Math.abs(High - Low);
    let seconds = epochs;
    let candleEnding = 60 / 1.2;
    let candleStarting = 60 / 10;

    //if function for CALL event

    if (Close > Open && CandlePercent > 0.7) {
      let time = moment().format("kk:mm:ss");

      if (seconds > candleEnding || seconds < candleStarting) {
        //  console.log('New Candle')
      } else {
        tradeDurationInt = AutotradeDurationInt;
        tradeDurationUnit = AutotradeDurationUnit;
        tradeInProgress = true;
        lockauto = 1;
        console.log("priceAction CALL trade");
        document
          .getElementById("notifyme")
          .insertAdjacentHTML(
            "afterbegin",
            "<p>" + time + ": : priceAction CALL triggered </p>"
          );
        callOrPut = "CALL";
        //  tradeInProgress: true
        trade();
      }
    }

    //if function for PUT event
    if (Close < Open && CandlePercent > 0.7) {
      let time = moment().format("kk:mm:ss");

      if (seconds > candleEnding || seconds < candleStarting) {
        //   console.log('New Candle')
      } else {
        tradeDurationInt = AutotradeDurationInt;
        tradeDurationUnit = AutotradeDurationUnit;
        tradeInProgress = true;
        lockauto = 1;
        console.log("priceAction PUT trade");
        document
          .getElementById("notifyme")
          .insertAdjacentHTML(
            "afterbegin",
            "<p>" + time + ": : priceAction PUT triggered </p>"
          );
        callOrPut = "PUT";
        //  tradeInProgress: true
        trade();
      }
    }
  }
}
