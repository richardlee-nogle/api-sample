const axios = require('axios');
const { FUTURES_API_VERSION } = require('../utils/constants');
const { getFuturesUrl, getAuthHeaders } = require('../utils/common');

const placeMarketOrder = async ({
  size,
  price,
  side,
  timeInForce,
  type,
  symbol,
  txType,
  postOnly,
  reduceOnly,
  triggerPrice,
  stopPrice,
  trailValue,
  clOrderID,
  trigger,
}) => {
  const endpoint = `/api/${FUTURES_API_VERSION}/order`;
  const body = {
    size,
    price,
    side,
    time_in_force: timeInForce,
    type,
    symbol,
    txType,
    postOnly,
    reduceOnly,
    triggerPrice,
    stopPrice,
    trailValue,
    clOrderID,
    trigger,
  };
  try {
    const res = await axios.post(getFuturesUrl(endpoint), body, {
      headers: getAuthHeaders(endpoint, body),
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

placeMarketOrder({
  clOrderID: 'test-order-placement',
  size: 1,
  side: 'BUY',
  timeInForce: 'GTC',
  symbol: 'BTC-PERP',
  txType: 'LIMIT',
  triggerPrice: 0,
  type: 'MARKET',
})
  .then(console.log)
  .catch(console.error);
