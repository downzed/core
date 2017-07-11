var React = require('react');
var core = require('core');
var sa = require('superagent');
var _ = require('lodash');
var teams = require('./teams.js');
let base = 'http://Fantasyedge.ddns.net:8080/FantasyEdge'; // publish
// let base = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge' //dev

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
