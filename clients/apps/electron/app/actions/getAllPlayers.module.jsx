var React = require('react');
var core = require('core');
var sa = require('superagent');
var _ = require('lodash');
var teams = require('./teams.js');
let base = 'http://Fantasyedge.ddns.net:8080/FantasyEdge'; // publish
// let base = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge' //dev
// Fantasyedge.ddns.net
core.Action('getAllPlayers', { period: 'string' }, (data, promise)=>{
  var allPlayers = core.tree.select('allPlayers');
  var total = 0;
  sa.get(`${base}/GetAllPlayersAvg?Period=${ data.period }`)
    // .send(data)
    // .set('Access-Control-Allow-Origin','http://Fantasyedge.ddns.net:8080/FantasyEdge/GetAllPlayersAvg')
    .withCredentials()
    .end((err, res)=>{
      if (res && res.ok) {
        var { body, headers } = res;
        console.debug('headers => ',  headers)
        if(body['Players'] && !_.isEmpty(body['Players'])) {
          if (headers['players-count']) total = headers['players-count'];
          else total = body['Players'].length;
          allPlayers.set({ players: body['Players'], total: total });
          promise.resolve({ isError: false });
        }
        else {
          allPlayers.set(undefined);
          promise.resolve(err);
        }

      } else {
        promise.resolve({ isError: true, ...err });
      }
    });
});

core.Action('getPlayersByPage', { period: 'string', page: 'number' }, (data, promise)=>{
  var pagePlayers = core.tree.select('pagePlayers');
  // pagePlayers.set(undefined);
  var total = 0;
  sa.post(`${base}/GetAllPlayersAvg?Period=${ data.period }&Page=${ data.page }`)
    // .send(data)
    .end((err, res)=>{
      if (res && res.ok) {
        var { body, headers } = res;
        // console.debug('res => ', res);
        if (headers['players-count']) total = headers['players-count'];
        if(body['Players'] && !_.isEmpty(body['Players'])) {
          // pagePlayers.set(body['Players'])
          promise.resolve({ data: {...body, total: total }, isError: false });
        }
        else {
          pagePlayers.set(undefined);
          promise.resolve(err);
          promise.resolve({ data: err, isError: false });

        }

      } else {
        promise.resolve({ isError: true, data: err });
      }
    });
});
