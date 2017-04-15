/**
 * Created by aw on 4/9/2017.
 */
/**
 * Created by lululillian on 2/27/17.
 */
module.exports = function (app,tradeModel) {
    app.post('/api/trade/',tradeModel.createTrade);
    app.get('/api/trade/',tradeModel.findAllTrade);
    app.get('/api/search/:query',tradeModel.search);
    app.get('/api/game/:gameId',tradeModel.findGame);
    app.get('/api/trade/:tid',tradeModel.findTrade);
    app.get('/api/trade/user/:uid',tradeModel.findTradesForUser);
    app.post('/api/tradeFilter/',tradeModel.findTradeWithFilter);
    app.delete('/api/trade/:tid',tradeModel.deleteTrade);
    app.put('/api/trade/',tradeModel.updateTrade);
};