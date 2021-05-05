const logger = require('./lib/logger');


logger.info("hola");

try{
  let a = { "name":"Cepi", "age":27 } 
  logger.info(a);
  //console.log(a);
}catch(e){
  logger.error(e);
}