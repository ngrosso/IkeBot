const logger = require("../lib/logger");

async function insertCedears(dbclient, cedears) {

  try {
    await dbclient.connect();
    await dbclient.db("ikedb").collection("cedears").insertMany(cedears);
    logger.info(`insertCedears: done`);
  } catch (e) {
    logger.error(e);
  } finally {
    await dbclient.close();
  }
}

async function cedearHistoryDump(dbclient,ticker, cedearHistory) {

  try {
    await dbclient.connect();
    await dbclient.db("ikedb").collection(`${ticker}history`).insertMany(cedearHistory);
    logger.info("cedearHistoryDump: done");
  } catch (e) {
    logger.error(e);
  } finally {
    await dbclient.close();
  }
}

module.exports = {
  insertCedears,
  cedearHistoryDump
}