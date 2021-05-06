const logger = require('./lib/logger');
const api = require('./api/apilib');

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

api.getAccountStatus().then(res =>{
  logger.info(res);
}).catch(err => {
  logger.error(err);
})