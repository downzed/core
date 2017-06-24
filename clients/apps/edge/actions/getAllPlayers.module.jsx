var React = require('react');
var core = require('core');
var sa = require('superagent');
var _ = require('lodash');
var teams = require('./teams.js');
let base = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge/';

core.Action('getAllPlayers', { period: 'string' }, (data, promise)=>{
  core.tree.select('allPlayers');


  sa.get(`${base}GetAllPlayersAvg?Period=${data.period}`)
    .end((err, res)=>{
      if (res && res.body) {
        promise.resolve(res.body.body);
        console.dir(res.body)
      }
    });
})
