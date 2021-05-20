const logger = require('./lib/logger');
const api = require('./api/apilib');

logger.info("------------Starting Ikebot------------");
// api.getAccountStatus().then(res => {
//   logger.info(res);
// }).catch(err => {
//   logger.error(err);
// })

// api.getTickerValue("bCBA","ko").then(res => {
//   logger.info(res);
// }).catch(err => {
//   logger.error(err);
// })

api.getTickerValuesBetweenDates("bCBA", "ko", "2021-05-19","2021-05-20", "sinAjustar").then(res => {
  logger.info(res);
}).catch(err => {
  logger.error(err);
})


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