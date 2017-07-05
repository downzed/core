var React = require('react');
var core = require('core');
var sa = require('superagent');
var _ = require('lodash');
var teams = require('./teams.js');
let base = 'Fantasyedge.ddns.net:8080/FantasyEdge';

core.Action('comparePlayers', { form: 'object' }, (data, promise)=>{
  var compared = core.tree.select('compared');
  var { form } = data;
  console.debug('form => ', form);
  sa.post(`${base}/ComparePlayers`)
    .send({ ...form })
    .end((err, res)=>{
      if (res && res.ok) {
        promise.resolve({ stats: res.body, ...form })

      } else {
        promise.resolve({ isError: true, ...err });
      }
    });
});
