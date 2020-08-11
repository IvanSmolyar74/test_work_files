const axios = require('axios');

export const SDK = {
  get: async (symbol) => {
    let glass = await axios.get(`https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=500 `);   // олучить биржевой стакан по определенному символу по REST
    console.log('sdk: ', symbol)
    return glass.data;
  },
  subscribe: function (symbol) {
    console.log(symbol)
    let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
    return ws     // возвращаем websocket
  }
};