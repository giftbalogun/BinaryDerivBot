var parameters;
var date_expiry;
var current_spot_time;
var amount;

function authorise() {
  trading = 0;

  let token = tokenToBeUsed;
  api
    .authorize(token)
    .then(function (response) {
      // console.log(response);

      let authorize = response.authorize;
      balance = response.authorize.balance * 1;
      currency = response.authorize.currency;
      loginId = response.authorize.loginid;
      billyAccount = loginId;
      api.subscribeToBalance();

      console.log(
        "Balance: ",
        balance,
        "currency: ",
        currency,
        "login Id: ",
        loginId
      );

      // if (response.authorize.loginid.substring(0, 3) != "VRT") {
      //     api.setTnCApproval({ tnc_approval: 1 }).then(function (response) {
      //         console.log("TnC Response: ")
      //         console.log(response);
      //         // document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
      //         //'<p style="color:#755505">Latest Deriv / Binary.com terms auto approved. For detail please go to the Deriv / Binary.com website to review latest terms.</p>');

      //     }).catch(function (error) {

      //         let string = error.message;
      //         let position = string.indexOf(`{`);
      //         let message = string.slice(0, position - 1);
      //         //var pos = string.indexOf('{')-1
      //         // var message = string.substring(0,pos);
      //         console.log(error.message);
      //         // // console.log(position);
      //         document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
      //             '<p style="color:#755505"> Failed Miserably!!!' + message + '</p>');

      //     })

      // } else {
      //     console.log("TnC approval not required on VRT accounts")
      // }
    })
    .catch(function (error) {
      let string = error.message;
      let position = string.indexOf(`{`);
      let errmessage = string.slice(0, position - 1);
      //var pos = string.indexOf('{')-1
      // var message = string.substring(0,pos);
      console.log(error);
      // console.log(position);
      document
        .getElementById("notifyme")
        .insertAdjacentHTML(
          "afterbegin",
          '<p style="color:#755505">' + errmessage + "</p>"
        );
    });
}

// keep balance updated

api.events.on("balance", function (response) {
  balance = response.balance.balance;
  // console.log('subscirbed balance update, ', response.balance.balance)
});

api.events.on("proposal_open_contract", function (response) {
  if (trading == 1) {
    // use subscription instead of loop
    console.log(response);
    isSold = response.proposal_open_contract.is_sold;
    result = response.proposal_open_contract.status;
    contractProfit = response.proposal_open_contract.profit * 1;
    sellPrice = response.proposal_open_contract.sell_price * 1;
    payout = response.proposal_open_contract.payout * 1;
    buy_price = response.proposal_open_contract.buy_price * 1;
    date_expiry = (response.proposal_open_contract.date_expiry + 2) * 1000;
    current_spot_time =
      response.proposal_open_contract.current_spot_time * 1000;
    if (isSold != 1) {
      winLossBarrier = response.proposal_open_contract.entry_spot * 1;
    }
    if (isSold == 1) {
      winLossBarrier = "no open trade";
    }

    sellprofit = contractProfit;
    canSell = response.proposal_open_contract.is_valid_to_sell * 1;

    if (isSold == 1 && contractId != null) {
      console.log(response);

      //  console.log(payout, buy_price, contractProfit, sellPrice);

      console.log("sold");
      console.log("Result = ", response);
      let time = moment().format("kk:mm:ss");
      resultOnClose = contractProfit;

      winLossBarrier = "no open trade";
      contractId = null;
      sellprofit = 0;
      canSell = 0;

      // trading profit set

      if (contractProfit > 0) {
        document
          .getElementById("notifyme")
          .insertAdjacentHTML(
            "afterbegin",
            '<p style="color:#21ba45">' +
              time +
              ": Contract " +
              result +
              "!  " +
              contractProfit +
              "</p>"
          );
        raw_s = `<tr style="background: #21ba45">
                <td>${response.proposal_open_contract.underlying}</td>
                <td>${response.proposal_open_contract.contract_id}</td>
                <td>${response.proposal_open_contract.contract_type}</td>
                
                <td>${buy_price}</td>
                <td>${contractProfit}</td>
                <td>${response.proposal_open_contract.status}</td>
               </tr>`;
      } else {
        document
          .getElementById("notifyme")
          .insertAdjacentHTML(
            "afterbegin",
            '<p style="color:#db2828">' +
              time +
              ": Contract " +
              result +
              "!  " +
              contractProfit +
              "</p>"
          );
        raw_s = `<tr style="background: #db2828">
                <td>${response.proposal_open_contract.underlying}</td>
                <td>${response.proposal_open_contract.contract_id}</td>
                <td>${response.proposal_open_contract.contract_type}</td>
           
                <td>${buy_price}</td>
                <td>${contractProfit}</td>
                <td>${response.proposal_open_contract.status}</td>
               </tr>`;
      }

      $("#myTableBody > tbody:last-child").prepend(raw_s);
      postTrade();
    }

    //  console.log(response.proposal_open_contract);
    // console.log(tradeDurationPLUS);

    // isSold = response.proposal_open_contract.is_sold;
  } else {
    api.unsubscribeFromAllOpenContracts();
    console.log("unsubscribed from open_contracts");
  }
});

function trade() {
  var noOfTrades = winswins * 1 + losseslosses * 1;
  var switchID = noOfTrades % 4;

  lockAuto = 1;
  var result;
  var contractProfit = 0;
  var buy_price;
  var payout;

  var isSold = 0;

  if (trading == 0) {
    console.log("passed trading == 0");

    // Places a trade, used for all types of trades auto or manual.
    //  intialize();
    trading = 1;
    isSold = 0;
    const strat = strategy;
    const signal = symbolsymbol;
    let token = tokenToBeUsed;

    duration = tradeDurationInt * 1;
    duration_unit = tradeDurationUnit;
    var convertedDuration = tradeDurationInt * 1;

    var convertedSymDuration;
    amount = stakestake * 1;

    if (tradeDurationUnit == "m") {
      convertedSymDuration = duration * 60;
    }

    if (tradeDurationUnit == "t") {
      convertedSymDuration = duration * 2;
    }

    if (tradeDurationUnit == "s") {
      convertedSymDuration = duration * 1;
    }

    console.log("trade duration set: " + duration + " " + duration_unit);

    parameters = {
      amount: JSON.stringify(amount), //stakestake,
      basis: "stake", // or 'stake'
      contract_type: callOrPut, // or 'CALL'
      currency: currency,
      duration: JSON.stringify(duration),
      duration_unit: duration_unit,
      symbol: signal,
    };

    if (autoStrattype == "hilower") {
      parameters.barrier =
        (callOrPut == "PUT" ? "+" : "-") + getBarrier(signal);
      parameters.duration = "5";
      parameters.duration_unit = "t";
    }

    console.log("-----parameters-----", parameters, "----", autoStrattype);

    if (convertedSymDuration >= 2) {
      console.log("passed minimum trade duration test");
      api
        .buyContractParams(parameters, 5000)
        .then((response, reject) => {
          console.log(response);
          let time = moment().format("kk:mm:ss");
          let contract_id = response.buy.contract_id;
          let longCode = response.buy.longcode;
          let newBalance = response.buy.balance_after;
          //  console.log(response.buy.buy_price);
          contractId = contract_id;

          document
            .getElementById("notifyme")
            .insertAdjacentHTML(
              "afterbegin",
              "<p>" + time + " : " + longCode + "</p>"
            );

          balance = newBalance;

          var convertedDurationPLUS = convertedDuration + 20;
          var tradeDurationPLUS = 0;
          //var timer = setInterval(contractSub, 2000);

          api.subscribeToOpenContract(contractId);
        })
        .catch(function (error) {
          var errortimer = setTimeout(clearErr, 5000);

          function clearErr() {
            openTrading();
            if (errorCount === undefined) {
              errorCount = 0;
            }

            errorCount++;

            let string = error.message;
            let position = string.indexOf(`{`);
            let message = string.slice(0, position - 1);
            clearTimeout(errortimer);

            console.log(error);

            document
              .getElementById("notifyme")
              .insertAdjacentHTML(
                "afterbegin",
                '<p style="color:#8c01a0">' +
                  message +
                  " | count : " +
                  errorCount +
                  "</p>"
              );

            if (errorCount >= 20) {
              if (runrun) {
                pauseBot();
                document
                  .getElementById("notifyme")
                  .insertAdjacentHTML(
                    "afterbegin",
                    '<p style="color:#8c01a0">Auto Trading paused binary.com errors.</p>'
                  );
                errorCount = 0;
              } else {
                errorCount = 0;

                openTrading();
              }
              clearTimeout(errortimer);
              return;
            }
            return;
          }
        })
        .catch(function (error) {
          var errortimer = setTimeout(clearErr, 5000);

          function clearErr() {
            openTrading();
            if (errorCount === undefined) {
              errorCount = 0;
            }

            errorCount++;

            let string = error.message;
            let position = string.indexOf(`{`);
            let message = string.slice(0, position - 1);
            clearTimeout(errortimer);

            console.log(error);

            document
              .getElementById("notifyme")
              .insertAdjacentHTML(
                "afterbegin",
                '<p style="color:#8c01a0">' +
                  message +
                  " | count : " +
                  errorCount +
                  "</p>"
              );

            if (errorCount >= 20) {
              if (runrun) {
                pauseBot();
                document
                  .getElementById("notifyme")
                  .insertAdjacentHTML(
                    "afterbegin",
                    '<p style="color:#8c01a0">Auto Trading paused binary.com errors.</p>'
                  );
                errorCount = 0;
              } else {
                errorCount = 0;

                openTrading();
              }
              clearTimeout(errortimer);
              return;
            }
            return;
          }
        });
    } else {
      message =
        "Cannot place trade, minimum trade duration not met. Please change duration to meet minimum of " +
        convertedSymDuration +
        "s";
      openTrading();
    }
  } else {
    console.log("duplicate trade attempted and blocked!");
  }
}

function sellContractEarly() {
  let token = tokenToBeUsed;
  let contract_id = contractId * 1;
  api.authorize(token).then(function resolve(resp) {
    api.sellContract(contract_id, 0).then(function (response) {
      console.log(response);
    });
  });
}

function postTrade() {
  winLossBarrier = "no open trade";
  api.unsubscribeFromAllOpenContracts();

  sellprofit = 0;
  canSell = 0;
  authorise();
  // Run post trade calculations for martingale and and stats
  let time = moment().format("kk:mm:ss");

  // win and loss count calculations

  if (resultOnClose > 0) {
    if (compoundWins === undefined) {
      compoundWins = 1;
    } else {
      compoundWins++;
    }

    let winsInRow = consecutiveWins;

    winswins++;
    winsInRow++;
    consecutiveLosses = 0;
    consecutiveWins = winsInRow;
    autoTrade = true;

    let lastWin = Math.abs(resultOnClose * 1);
    let cumLoss = Math.abs(cumLosscumLoss * 1);

    cumLosscumLoss = Math.ceil((cumLoss - lastWin) * 1000) / 1000;

    console.log(
      "post trade, last trade = " + lastWin,
      " New cumLoss = ",
      cumLoss - lastWin
    );

    //   console.log('win count : ', winswins);
    //  console.log('loss count : ', losseslosses);
    //  console.log('wins in a row : ', settings.get('consecutiveWins.consecutiveWins'));

    // refactored life time stats
  } else {
    let losses = losseslosses;
    let lossesInRow = consecutiveLosses;

    losses++;
    lossesInRow++;
    consecutiveLosses = lossesInRow;

    let lastLoss = Math.abs(resultOnClose);
    let cumlosstemp = cumLosscumLoss + lastLoss;

    losseslosses = losses;
    consecutiveWins = 0;
    cumLosscumLoss = Math.ceil(cumlosstemp * 1000) / 1000;
  }

  // calculate max consecutive wins and losses

  if (consecutiveLosses > maxConLosses) {
    maxConLosses = consecutiveLosses;
  }

  if (consecutiveWins > maxConWins) {
    maxConWins = consecutiveWins;
  }

  winrate =
    Math.floor((winswins / (winswins + losseslosses)) * 100 * 100) / 100;

  // change profit for session

  let profitChange = profit + resultOnClose;

  profit = Math.floor(profitChange * 100) / 100;

  if (profit > peakProfit) {
    peakProfit = profit;
  } else if (profit < peakLoss) {
    peakLoss = profit;
  }

  // Martingale options

  if (MGStyle === "Martingale") {
    basicMartingale();
  }

  if (MGStyle === "Compound") {
    compoundMartingale();
  }

  if (MGStyle === "Cum. Loss") {
    cumLossMartingale();
  }

  if (MGStyle === "Oscar") {
    oscarMartingale();
  }

  if (MGStyle === "Ladder") {
    ladderMartingale();
  }

  if (MGStyle === "DAlembert") {
    dalembertMartingale();
  }

  if (MGStyle === "Labouchere") {
    labouchereMartingale();
  }

  if (MGStyle === "None") {
    noMG();
  }

  //Manualtradeoveride

  if (autoThresh > 0) {
    if (autoLimit && consecutiveLosses >= autoThresh) {
      if (strategy != "manual") {
        autoStrat = strategy;
      }

      strategy = "manual";

      autoTrade = false;

      duration = ManualtradeDurationInt * 1;
      duration_unit = ManualtradeDurationUnit;

      convertedDuration = duration;

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
          '<p style="color:#8c01a0">Manual Over ride. Auto Strat  "' +
            autoStrat +
            '" will resume after your next winning trade..</p>'
        );

      message =
        "Ready to place manual trade. Trade duration set to " +
        convertedDuration +
        " seconds";
    } else if (runrun) {
      autoTrade = true;

      if (strategy == "manual") {
        strategy = autoStrat;
      }
      document
        .getElementById("notifyme")
        .insertAdjacentHTML(
          "afterbegin",
          '<p style="color:#8c01a0">Auto Trading Resumed</p>'
        );
    }
  }
} // End of Post Trade

function noMG() {
  if (resultOnClose > 0) {
    cumLosscumLoss = 0;
  }
  openTrading();
}

// basic martingale for money management

function basicMartingale() {
  console.log("martingale running");
  if (resultOnClose > 0) {
    console.log("win");

    cumLosscumLoss = 0;

    stakestake = initialStakeinitialStake;
    openTrading();
  } else {
    console.log("loss");

    var martin = 2.5;
    if (autoStrattype == "hilower") martin = 5;
    stakestake = Math.floor(stakestake * martin * 100) / 100;
    openTrading();
  }
}

// compound trading for money management

function compoundMartingale() {
  if (resultOnClose > 0) {
    cumLosscumLoss = 0;

    stakestake = Math.floor(stakestake * 1.9 * 100) / 100;
    openTrading();
  } else {
    stakestake = initialStakeinitialStake;
    openTrading();
  }
}

// cumLoss martingale for money management || fixed return of initial stake per loss

function cumLossMartingale() {
  if (resultOnClose >= Math.abs(cumLosscumLoss)) {
    cumLosscumLoss = 0;

    stakestake = initialStakeinitialStake;
    openTrading();
  } else {
    let cumStake =
      Math.abs(Math.abs(cumLosscumLoss) * 1.07) +
      Math.abs(initialStakeinitialStake) +
      consecutiveLosses * initialStakeinitialStake;

    stakestake = Math.floor(cumStake * 100) / 100;
    openTrading();
  }
}

// Oscar's Grind for money management

function oscarMartingale() {
  if (resultOnClose > 0) {
    //win

    let currStake = stakestake * 1;
    let stake = initialStakeinitialStake * 1;

    console.log("cumLoss @ oscarMartingale() ", cumLosscumLoss);
    if (Math.abs(cumLosscumLoss < 0)) {
      stakestake = initialStakeinitialStake;
      cumLosscumLoss = 0;
      openTrading();
    } else {
      let oscarsNext = currStake + stake;

      stakestake = Math.floor(oscarsNext * 100) / 100;
      openTrading();
    }
  } else {
    //loss

    openTrading();
  }
}

// Oscar's Grind for money management

function dalembertMartingale() {
  if (resultOnClose > 0) {
    //win

    if (stakestake * 1 == initialStakeinitialStake * 1) {
      openTrading();
    }
    if (stakestake * 1 > initialStakeinitialStake * 1) {
      let currStake = stakestake * 1;
      let stake = initialStakeinitialStake * 1;

      let dalembertNext = currStake - stake;

      stakestake = dalembertNext;

      openTrading();
    }
  } else {
    //loss

    let currStake = stakestake * 1;
    let stake = initialStakeinitialStake * 1;

    let dalembertNext = currStake + stake;

    stakestake = Math.floor(dalembertNext * 100) / 100;

    openTrading();
  }
}

/*
function labouchereMartingale() {

    const lastStake = initialStakeinitialStake * 1;
    var labouchereList;

    if (settings.get('labouchere.labouchere') === false) {

        labouchereList = settings.get('initialLabouchere.initialLabouchere')
        cumLosscumLoss = 0);

} else {

    labouchereList = settings.get('labouchere.labouchere')
}




if (resultOnClose > 0) {

    //win



    labouchereList.shift();
    labouchereList.pop();

    if (labouchereList.length < 2) {

        labouchereList = settings.get('initialLabouchere.initialLabouchere')
        cumLosscumLoss = 0);
    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0"> Labouchere Completed</p>');

}

settings.set('labouchere.labouchere', labouchereList);
console.log('labouchere list', labouchereList);

stakestake = (((labouchereList.slice(-1)[0] * 1) * lastStake) + (((labouchereList[0] * 1) * lastStake)));

console.log(stakestake);

document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0"> Labouchere Status : ' + JSON.stringify(labouchereList) + '</p>');

openTrading();






}
else {

    //loss

    labouchereList.push((stakestake * 1) / lastStake);

    settings.set('labouchere.labouchere', labouchereList);
    console.log('labouchere list', labouchereList);

    stakestake = ((labouchereList.slice(-1)[0] * lastStake) + ((labouchereList[0] * lastStake)));

    console.log(stakestake);
    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0"> Labouchere Status : ' + JSON.stringify(labouchereList) + '</p>');


    openTrading();

}

}

*/

//ladder Martingale calculations

function ladderMartingale() {
  let ladderProfitupdate = ladderProfit + resultOnClose;

  ladderProfit = Math.floor(ladderProfitupdate * 100) / 100;

  if (ladderProfit > initialStakeinitialStake * 2.6) {
    let stake = initialStakeinitialStake;

    stakestake = stake;

    laddersCompleted++;

    ladderProfit = 0;
    openTrading();
  } else {
    ladderLevel++;

    if (stakestake > initialStakeinitialStake * 100) {
      let stake = initialStakeinitialStake;

      stakestake = stake;
      laddersCompleted++;
      ladderProfit = 0;
      openTrading();

      // settings.set('message.message', 'Ladder failed, completed at loss.')
      document
        .getElementById("notifyme")
        .insertAdjacentHTML(
          "afterbegin",
          '<p style="color:#755505">Ladder failed, completed at loss.</p>'
        );
    } else {
      let stake = stakestake * 1.15;

      stakestake = Math.ceil(stake * 100) / 100;
      openTrading();
    }
  }
}

function openTrading() {
  stakestake = Math.floor(stakestake * 100) / 100;
  let time = moment().format("kk:mm:ss");
  //open up trading after last trade is completed
  winLossBarrier = "no open trade";
  lockAuto = 0;
  // MG reset settings
  if (MGReset > 0) {
    console.log("cumLoss @ openTrading()", cumLosscumLoss);
    if (MGStyle !== "Compound") {
      if (MGReset <= consecutiveLosses) {
        stakestake = initialStakeinitialStake;
        cumLosscumLoss = 0;
        // settings.set('consecutiveLosses.consecutiveLosses', 0); causing errors probably not required for anything!
        //settings.set('message.message', 'Martingale Reset');
        document
          .getElementById("notifyme")
          .insertAdjacentHTML(
            "afterbegin",
            '<p style="color:#755505">Martingale Reset</p>'
          );
      }
    } else if (MGStyle == "Compound") {
      if (MGReset <= compoundWins) {
        stakestake = initialStakeinitialStake;
        compoundWins = 0;

        document
          .getElementById("notifyme")
          .insertAdjacentHTML(
            "afterbegin",
            '<p style="color:#755505">Compound Reset</p>'
          );
      }
    }
  }

  trading = 0;

  placeCall = false;

  placePut = false;

  tradeInProgress = false;

  // Take Profit Stop

  if (profit > takeProfit) {
    runrun = false;

    autoTrade = false;
    document
      .getElementById("notifyme")
      .insertAdjacentHTML(
        "afterbegin",
        '<p style="color:#27b700">Target Profit Hit!!</p>'
      );
  }

  // StopLoss!!!

  if (profit + stakestake * -1 < stopLoss * -1 && resultOnClose < 0.001) {
    runrun = false;

    autoTrade = false;

    document
      .getElementById("notifyme")
      .insertAdjacentHTML(
        "afterbegin",
        '<p style="color:#755505">Stop Loss Hit! Take a break.</p>'
      );
  }

  if (stakestake > peakStake) {
    peakStake = stakestake;
  }

  // Trailing Stop settings!!!

  if (trailingStop > 0) {
    if (
      peakProfit > 0 &&
      Math.abs(peakProfit - profit) + stakestake > trailingStop
    ) {
      runrun = false;

      autoTrade = false;
      document
        .getElementById("notifyme")
        .insertAdjacentHTML(
          "afterbegin",
          '<p style="color:#755505">Trailing Stop Hit! Take a break.</p>'
        );
    }
  }
  if (stakestake > peakStake) {
    peakStake = stakestake;
  }

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

function getBarrier(markt) {
  console.log("------------", markt);

  if (markt == "R_10") return 0.25;
  if (markt == "R_25") return 0.3;
  if (markt == "R_50") return 0.05;
  if (markt == "R_75") return 250;
  if (markt == "R_100") return 2.5;
  if (markt == "RDBEAR") return 0.55;
  if (markt == "RDBULL") return 0.599;
}
