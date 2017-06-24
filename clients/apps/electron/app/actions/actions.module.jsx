var React = require('react');
var core = require('core');
var sa = require('superagent');
var _ = require('lodash');
var teams = require('./teams.js');
let base = 'http://46.121.135.238:3310/api/v1.0/';
let nbaAvatar = 'http://stats.nba.com/media/players/230x185/';
let nbaTL = 'http://stats.nba.com/media/img/teams/logos/';
let yoBase = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge/';
// http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge/GetAllPlayersAvg?Period=364
core.Action('getPlayerAvatar', {id: 'number'}, (data, promise)=>{
  // avatar: `http://stats.nba.com/media/players/230x185/${players[x].Player_ID}.png` ,
  sa.get(`${nbaAvatar}${data.id}.png`)
    .end((err, res)=>{
      if (res && res.ok) {
        console.dir(res.body);
      } else {
        console.log('err', err);
      }
    });
});

core.Action('getTeams', {players: 'array'}, (data, promise)=>{
  var players = [...data.players];
  console.dir(players);
  var wteams = [];

  for (let x = 0; x < players.length; x++) {
    for (let t = 0; t < teams.length; t++) {
      if (Number(players[x].teamId) === teams[t].teamId){
        wteams.push({
          ...players[x],
          ...teams[t],
          teamLogo: nbaTL+teams[t].abbreviation+'_logo.svg',
        })
      }
    }
  }
  console.dir(wteams);
  promise.resolve(wteams);

});

core.Action('getRSS', {
  type: 'string'  // <- type 'string' and the '!' means it's required [string!].
}, (data, promise)=>{
  sa.get(`http://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.rotoworld.com%2Frss%2Ffeed.aspx%3Fsport%3Dnba%26ftype%3D${data.type}%26count%3D12%26format%3Drss`)
    .on('progress', function(e) {
      // var percentage = Math.round((e.loaded/e.total)*100);
      // console.log("percent " + percentage + '%' );
   })
    .end((err, res)=>{
      if (res && res.body) {
        promise.resolve(res.body);
      }
  });
});

core.Action('loadGoogleChart', {
  type: 'string'  // <- type 'string' and the '!' means it's required [string!].
}, (data, promise)=>{
  sa.get(`https://www.google.com/jsapi`)
    .end((err, res)=>{
      if (res && res.ok) {
        console.debug('res => ', res);
        promise.resolve(res.ok);
      }
  });
});
