const axios = require('axios');
const querystring = require('querystring');

const fs = require('fs').promises;
const credentials = require ('./env/auth.json');

async function getAccountStatus (token) {
    let res = await axios.get(`${APIURL}/estadocuenta`, 
    {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getPortfolioArgentina (token) {
    let res = await axios.get(`${APIURL}/portafolio/argentina`,
    {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getPortfolioUSA (token) {
    let res = await axios.get(`${APIURL}/portafolio/estados_Unidos`,
    {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getOperations (token) {
    let res = await axios.get(`${APIURL}/operaciones`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getOperation (token, number) {
    let res = await axios.get(`${APIURL}/operaciones/${number}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function cancelOperation (token, number) {
    let res = await axios.delete(`${APIURL}/operaciones/${number}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function buy (token, market, asset, quantity, price, term, validTill) {
    let res = await axios.post(`${APIURL}/operar/Comprar`, 
    {
        mercado: market,
        simbolo: asset,
        cantidad: quantity,
        precio: price,
        plazo: term,
        validez: validTill
    }, 
    {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function sell (token, market, asset, quantity, price, term, validTill) {
    let res = await axios.post(`${APIURL}/operar/operar/Vender`, 
    {
        mercado: market,
        simbolo: asset,
        cantidad: quantity,
        precio: price,
        validez: validTill,
        plazo: term
    }, 
    {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getTicker (token, market, asset) {
    let res = await axios.get(`${APIURL}/${market}/Titulos/${asset}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getOptions (token, market, asset) {
    let res = await axios.get(`${APIURL}/${market}/Titulos/${asset}/Opciones`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getTickerValue (token, market, asset) {
    let res = await axios.get(`${APIURL}/${market}/Titulos/${asset}/Cotizacion`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getPanels (token, asset, panel, country) {
    let res = await axios.get(`${APIURL}/Cotizaciones/${asset}/${panel}/${country}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getTickerValuesBetweenDates (token, market, asset, dateFrom, dateTill, adjusted) {
    let res = await axios.get(`${APIURL}/${market}/Titulos/${asset}/Cotizacion/seriehistorica/${dateFrom}/${dateTill}/${adjusted}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getInstrumentsByCountry (token, country) {
    let res = await axios.get(`${APIURL}/${country}/Titulos/Cotizacion/Instrumentos`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function getPanelsByInstrumentAndCountry (token, country, asset) {
    let res = await axios.get(`${APIURL}/${country}/Titulos/Cotizacion/Paneles/${asset}`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
    })
    return res.data;
}

async function readToken() {
    let token = await fs.readFile('token.json')
    return JSON.parse(token)
}

async function fileExists (file) {
    try {
        let esta = await fs.stat(file).catch(e => e ? false : true) ? true : false
        return esta
    } catch (e) {
        if (e) return false
    }
    
}

async function auth () {
    let exists = await fileExists('token.json')
    if (exists) {
        let tokenData = await fs.readFile('token.json')
        token = JSON.parse(tokenData)
        if (new Date(token['.expires']) < new Date()) {
            await fs.unlink('token.json')
            await getToken(token.refresh_token)
            return await readToken()
        } else {
            return(token);
        }
    } else {
        await getToken()
        return await readToken()
    }
}

async function getToken (refreshToken) {
    let creds = '';
    if (refreshToken) {
        creds = querystring.stringify({ refresh_token: refreshToken, grant_type: 'refresh_token' });
    } else {
        creds = querystring.stringify(credentials);
    }
    let token = await axios.post(`${APIURL}`, creds)
    await fs.appendFile('token.json', JSON.stringify(token.data))
}

module.exports = {
    getAccountStatus,
    getPortfolioArgentina,
    getPortfolioUSA,
    getOperation,
    getOperations,
    cancelOperation,
    buy,
    sell,
    getTicker,
    getOptions,
    getTickerValue,
    getPanels,
    getTickerValuesBetweenDates,
    getInstrumentsByCountry,
    getPanelsByInstrumentAndCountry,
    auth
}