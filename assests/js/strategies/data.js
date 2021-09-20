//A dynamic datafeed for use by all strategies

function data() {
  if (switched === true) {
    api
      .getTickHistory(symbolsymbol, {
        end: "latest",
        style: "ticks",
        count: 150,
      })
      .then(function (response) {
        tick = response.history.prices;
        ticks = tick.map((tick) => tick * 1);

        times = response.history.times.slice(-60, -1);

        lastTick = response.history.prices.slice(-1)[0] * 1;
        lastEpoch = response.history.times.slice(-1)[0] * 1;
        lastSecond = lastEpoch % 60;
      })
      .catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);

        console.log(errmessage);

        return;
      });
    switched = false;
  } else {
    api
      .getTickHistory(symbolsymbol, {
        end: "latest",
        style: "ticks",
        count: 1,
      })
      .then(function (response) {
        tick = response.history.prices * 1;

        times.push(response.history.times);

        // lastTick = tick * 1;// Moved to home.html and index.html
        lastEpoch = response.history.times * 1;

        lastSecond = lastEpoch % 60;
        if (ticks != undefined) {
          stream = ticks.slice(-150);
        }

        updatedChart === false;
        streamData();
      })
      .catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);

        console.log(errmessage);

        return;
      });
  }

  api
    .getTickHistory(symbolsymbol, {
      end: "latest",
      style: "candles",
      granularity: 60,
      count: 25,
    })
    .then(function (response) {
      // // console.log(response)
      Rxlong_close_list = response.candles.map((candles) => candles.close * 1);
      Rxlong_open_list = response.candles.map((candles) => candles.open * 1);
      Rxlong_high_list = response.candles.map((candles) => candles.high * 1);
      Rxlong_low_list = response.candles.map((candles) => candles.low * 1);
      epochs = response.candles.map((candles) => candles.epoch * 1 * 1000);
      timeStamp = epochs.map((epoch) => moment(epoch).format("kk:mm"));

      Close = Rxlong_close_list[Rxlong_close_list.length - 1] * 1;
      Pen = Rxlong_close_list[Rxlong_close_list.length - 2] * 1;
      Open = Rxlong_open_list[Rxlong_open_list.length - 1] * 1;
      High = Rxlong_high_list[Rxlong_high_list.length - 1] * 1;
      Low = Rxlong_low_list[Rxlong_low_list.length - 1] * 1;

      ChartClose = Rxlong_close_list.push("End");
      ChartOpen = Rxlong_open_list.push("End");
      ChartHigh = Rxlong_high_list.push("End");
      ChartLow = Rxlong_low_list.push("End");

      connected = true;
    })
    .catch(function (error) {
      let string = error.message;
      let position = string.indexOf(`{`);
      let errmessage = string.slice(0, position - 1);

      console.log(error.errmessage);

      return;
    });

  if (strategy == "manual") {
    // console.log('waitingfortrade')
  }

  if (autoTrade === true && runrun === true) {
    if (marketGood) {
      if (strategy != "manual") {
        window[autoStrat + "run"](); // use the strategy prefix to run the function for the relevent strategy
      }
    }
  }
}
