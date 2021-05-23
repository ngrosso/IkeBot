const logger = require('./lib/logger');
const { MongoClient } = require("mongodb");
const api = require('./api/apilib');
const movavg = require('moving-averages');
const db = require('./db/db');
const today = require('./lib/date');


logger.info("------------Starting Ikebot------------");

const mongoURI = "mongodb://127.0.0.1:27017";
logger.info(`Seteando db: ${mongoURI}`);

// Create a new MongoClient
const dbclient = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//logger.info(movavg.ma([1750,1745,1784,1760,1763],3));

// api.getAccountStatus().then(res => {
//   logger.info(res);
// }).catch(err => {
//   logger.error(err);
// })

async function getAllCedearsActualInfo() {
  let cedearsArr = [];
  try {
    await api.getPanels("acciones", "CEDEARs", "argentina").then(cedears => {
      cedears.titulos.forEach(cedear => {
        if (cedear.moneda == "AR$") {
          cedearsArr.push(cedear);
        }
      })
    }).catch(err => {
      logger.error(err);
    })
  }finally{
    await db.insertCedears(dbclient, cedearsArr).catch(console.dir);
  }
}


function getTickerHistory(ticker) {
  api.getTickerValuesBetweenDates("bCBA", `${ticker}`, '2000-01-01', `${today.dateParser()}`, "sinAjustar").then(res => {
    db.cedearHistoryDump(dbclient, ticker, res).catch(logger.dir);
  }).catch(err => {
    logger.error(err);
  })
}

//getTickerHistory("AAPL");
getAllCedearsActualInfo();



// function asd(){
//   api.auth()
//     .then(res => {
//         logger.info(res.access_token)
//         return api.getAccountStatus(res)
//     })
//     .then(res => logger.info(res) )
//     .catch(error => logger.error(error) )
// }

// logger.info(asd());