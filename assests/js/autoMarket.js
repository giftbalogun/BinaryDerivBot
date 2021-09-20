var bestMarket;
var autoData = new Array();
autoData.R_10 = [];
autoData.R_25 = [];
autoData.R_50 = [];
autoData.R_75 = [];
autoData.R_100 = [];
autoData.RDBULL = [];
autoData.RDBEAR = [];

var R_10_ratio;
var R_10red = 0;
var R_10green = 0;

var R_10Max;

var S = "R_10"; //['R_10', 'R_25', 'R_50', 'R_75', 'R_100', 'RDBEAR', 'RDBULL']

function autoMarket() {
  if (autoSymbol && trading == 0) {
    document
      .getElementById("notifyme")
      .insertAdjacentHTML("afterbegin", "<p> Analysing Markets.</p>");
    // for (x of possSymbols) {

    api
      .getTickHistory("R_10", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.R_10.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.R_10.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.R_10.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.R_10.low = response.candles.map((candles) => candles.low * 1);
        autoData.R_10.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.R_10.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );

        autoData.R_10.ratio = ss.max(P) + ss.min(P) + P[4] / 3;
        autoData.R_10.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.R_10.vector = 0;
        for (var i = 0; i < autoData.R_10.midOC.length - 1; i++) {
          if (autoData.R_10.midOC[i] > autoData.R_10.midOC[i + 1]) {
            autoData.R_10.vector = autoData.R_10.vector - 0.3;
          } else {
            autoData.R_10.vector = autoData.R_10.vector + 0.3;
          }
        }

        // autoData.R_10.vector = Math.abs(autoData.R_10.vector) / 5;
      });
    // console.log('normalisedR10 Close = ', autoData.R_10.norm);
    api
      .getTickHistory("R_25", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.R_25.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.R_25.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.R_25.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.R_25.low = response.candles.map((candles) => candles.low * 1);
        autoData.R_25.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.R_25.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );

        autoData.R_25.ratio = ss.max(P) + ss.min(P) + P[4] / 3;
        autoData.R_25.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.R_25.vector = 0;
        for (var i = 0; i < autoData.R_25.midOC.length - 1; i++) {
          if (autoData.R_25.midOC[i] > autoData.R_25.midOC[i + 1]) {
            autoData.R_25.vector = autoData.R_25.vector - 0.3;
          } else {
            autoData.R_25.vector = autoData.R_25.vector + 0.3;
          }
        }
      });
    // console.log('normalisedR25 Close = ', autoData.R_25.norm);
    api
      .getTickHistory("R_50", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.R_50.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.R_50.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.R_50.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.R_50.low = response.candles.map((candles) => candles.low * 1);
        autoData.R_50.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.R_50.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );

        autoData.R_50.ratio = ss.max(P) + ss.min(P) + P[4] / 3;
        autoData.R_50.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.R_50.vector = 0;
        for (var i = 0; i < autoData.R_50.midOC.length - 1; i++) {
          if (autoData.R_50.midOC[i] > autoData.R_50.midOC[i + 1]) {
            autoData.R_50.vector = autoData.R_50.vector - 0.3;
          } else {
            autoData.R_50.vector = autoData.R_50.vector + 0.3;
          }
        }
      });
    // console.log('normalisedR50 Close = ', autoData.R_50.norm);

    api
      .getTickHistory("R_75", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.R_75.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.R_75.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.R_75.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.R_75.low = response.candles.map((candles) => candles.low * 1);
        autoData.R_75.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.R_75.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );

        autoData.R_75.ratio = ss.max(P) + ss.min(P) + P[4] / 3;
        autoData.R_75.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.R_75.vector = 0;
        for (var i = 0; i < autoData.R_75.midOC.length - 1; i++) {
          if (autoData.R_75.midOC[i] > autoData.R_75.midOC[i + 1]) {
            autoData.R_75.vector = autoData.R_75.vector - 0.3;
          } else {
            autoData.R_75.vector = autoData.R_75.vector + 0.3;
          }
        }
      });
    // console.log('normalisedR75 Close = ', autoData.R_75.norm)

    api
      .getTickHistory("R_100", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.R_100.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.R_100.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.R_100.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.R_100.low = response.candles.map((candles) => candles.low * 1);
        autoData.R_100.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.R_100.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );

        autoData.R_100.ratio = ss.max(P) + ss.min(P) + P[4] / 3;

        autoData.R_100.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.R_100.vector = 0;
        for (var i = 0; i < autoData.R_100.midOC.length - 1; i++) {
          if (autoData.R_100.midOC[i] > autoData.R_100.midOC[i + 1]) {
            autoData.R_100.vector = autoData.R_100.vector - 0.3;
          } else {
            autoData.R_100.vector = autoData.R_100.vector + 0.3;
          }
        }
      });
    // console.log('normalisedR100 Close = ', autoData.R_100.norm);
    api
      .getTickHistory("RDBEAR", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.RDBEAR.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.RDBEAR.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.RDBEAR.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.RDBEAR.low = response.candles.map(
          (candles) => candles.low * 1
        );
        autoData.RDBEAR.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.RDBEAR.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );

        autoData.RDBEAR.ratio = ss.max(P) + ss.min(P) + P[4] / 3;

        autoData.RDBEAR.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.RDBEAR.vector = 0;
        for (var i = 0; i < autoData.RDBEAR.midOC.length - 1; i++) {
          if (autoData.RDBEAR.midOC[i] > autoData.RDBEAR.midOC[i + 1]) {
            autoData.RDBEAR.vector = autoData.RDBEAR.vector - 0.3;
          } else {
            autoData.RDBEAR.vector = autoData.RDBEAR.vector + 0.3;
          }
        }
      });
    api
      .getTickHistory("RDBULL", {
        end: "latest",
        style: "candles",
        granularity: 60,
        count: 5,
      })
      .then(function (response) {
        autoData.RDBULL.close = response.candles.map(
          (candles) => candles.close * 1
        );
        autoData.RDBULL.open = response.candles.map(
          (candles) => candles.open * 1
        );
        autoData.RDBULL.high = response.candles.map(
          (candles) => candles.high * 1
        );
        autoData.RDBULL.low = response.candles.map(
          (candles) => candles.low * 1
        );
        autoData.RDBULL.norm = response.candles.map(
          (candles) => (candles.close * 1) / autoData.RDBULL.high.slice(-1)
        );
        let P = response.candles.map(
          (candles) =>
            Math.abs(candles.close - candles.open) /
            Math.abs(candles.high - candles.low)
        );
        // console.log('cnadlebody :', P[4])

        autoData.RDBULL.ratio = (ss.max(P) + ss.min(P) + P[4]) / 3;

        autoData.RDBULL.midOC = response.candles.map(
          (candles) => (candles.open + candles.close) / 2
        );
        autoData.RDBULL.vector = 0;
        for (var i = 0; i < autoData.RDBULL.midOC.length - 1; i++) {
          if (autoData.RDBULL.midOC[i] > autoData.RDBULL.midOC[i + 1]) {
            autoData.RDBULL.vector = autoData.RDBULL.vector - 0.3;
          } else {
            autoData.RDBULL.vector = autoData.RDBULL.vector + 0.3;
          }
        }

        setTimeout(function () {
          sdevCalc();
        }, 5000);
      });
  }
}

function sdevCalc() {
  // Corr of high and lows

  var CorrRDBULL = -Math.abs(
    ss.sampleCorrelation(autoData.RDBULL.high, autoData.RDBULL.low)
  );
  var CorrRDBEAR = -Math.abs(
    ss.sampleCorrelation(autoData.RDBEAR.high, autoData.RDBEAR.low)
  );
  var CorrR_10 = -Math.abs(
    ss.sampleCorrelation(autoData.R_10.high, autoData.R_10.low)
  );
  var CorrR_25 = -Math.abs(
    ss.sampleCorrelation(autoData.R_25.high, autoData.R_25.low)
  );
  var CorrR_50 = -Math.abs(
    ss.sampleCorrelation(autoData.R_50.high, autoData.R_50.low)
  );
  var CorrR_75 = -Math.abs(
    ss.sampleCorrelation(autoData.R_75.high, autoData.R_75.low)
  );
  var CorrR_100 = -Math.abs(
    ss.sampleCorrelation(autoData.R_100.high, autoData.R_100.low)
  );
  var normalizationCOR = Math.max(
    CorrRDBEAR,
    CorrRDBULL,
    CorrR_10,
    CorrR_25,
    CorrR_50,
    CorrR_75,
    CorrR_100
  );

  var sDevRDBULL = ss.medianAbsoluteDeviation(autoData.RDBULL.norm);
  var sDevRDBEAR = ss.medianAbsoluteDeviation(autoData.RDBEAR.norm);
  var sDevR_10 = ss.medianAbsoluteDeviation(autoData.R_10.norm);
  var sDevR_25 = ss.medianAbsoluteDeviation(autoData.R_25.norm);
  var sDevR_50 = ss.medianAbsoluteDeviation(autoData.R_50.norm);
  var sDevR_75 = ss.medianAbsoluteDeviation(autoData.R_75.norm);
  var sDevR_100 = ss.medianAbsoluteDeviation(autoData.R_100.norm);
  var normalizationSD = Math.max(
    sDevRDBEAR,
    sDevRDBULL,
    sDevR_10,
    sDevR_25,
    sDevR_50,
    sDevR_75,
    sDevR_100
  );
  var normRDBULL = autoData.RDBULL.ratio + Math.abs(autoData.RDBULL.vector);
  var normRDBEAR = autoData.RDBEAR.ratio + Math.abs(autoData.RDBEAR.vector);
  var normR_10 = autoData.R_10.ratio + Math.abs(autoData.R_10.vector);
  var normR_25 = autoData.R_25.ratio + Math.abs(autoData.R_25.vector);
  var normR_50 = autoData.R_50.ratio + Math.abs(autoData.R_50.vector);
  var normR_75 = autoData.R_75.ratio + Math.abs(autoData.R_75.vector);
  var normR_100 = autoData.R_100.ratio + Math.abs(autoData.R_100.vector);

  if (
    Math.max(
      Math.abs(autoData.R_10.vector),
      Math.abs(autoData.R_25.vector),
      Math.abs(autoData.R_50.vector),
      Math.abs(autoData.R_75.vector),
      Math.abs(autoData.R_100.vector),
      Math.abs(autoData.RDBULL.vector),
      Math.abs(autoData.RDBEAR.vector)
    ) < 1.2 ||
    Math.max(
      normRDBEAR,
      normRDBULL,
      normR_10,
      normR_25,
      normR_50,
      normR_75,
      normR_100
    ) < 2.5
  ) {
    marketGood = true;
    errorNotify({
      title: "Market Poor",

      message: "No definitive vector, trading paused",
    });
  } else {
    marketGood = true;
  }

  let obj = {
    normRDBEAR,
    normRDBULL,
    normR_10,
    normR_25,
    normR_50,
    normR_75,
    normR_100,
  };
  // console.log(obj);

  bestMarket = Object.values(obj).sort().pop();

  key = Object.keys(obj).find((k) => obj[k] === bestMarket);

  console.log("best market =", bestMarket, key);

  // console.log('best market =', key.slice(4))

  if (lockAuto != 1) {
    // Choose best market

    symbolsymbol = key.slice(4);
    switched = true;
    forgetSubs();
    tickStream();
    R_10red = 0;
    R_10green = 0;
  }
}

function bouncer(arr) {
  return arr.filter(Boolean);
}
