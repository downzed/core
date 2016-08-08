var React = require('react');
var core = require('core');
var sa = require('superagent');

let base = 'http://46.121.135.238:3310/api/v1.0/';
//
core.Action('getRSS', {
  type: 'string'  // <- type 'string' and the '!' means it's required [string!].
}, (data, promise)=>{
  sa.get(`http://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.rotoworld.com%2Frss%2Ffeed.aspx%3Fsport%3Dnba%26ftype%3D${data.type}%26count%3D12%26format%3Drss`)
  .on('progress', function(e) {
      var percentage = Math.round((e.loaded/e.total)*100);
      console.log("percent " + percentage + '%' );
   })
  .end((err, res)=>{
    if (res && res.body) {
      promise.resolve(res.body);
    }
  });
});

core.Action('getPlayerStats', {}, (data, promise)=>{
  // timeframes [7, 15, 30, 365]
  sa.get(`http://46.121.135.238:3310/api/v1.0/stats/players?timeframe=7`)
    .end((err, res)=>{
    // Calling the end function will send the request
      // console.log(res);
      // console.error(err);

    });
  sa.get(`http://46.121.135.238:3310/api/v1.0/stats/player/201967`)
    .end((err, res)=>{
    // Calling the end function will send the request
      // console.log(res);
      // console.error(err);

    });

})

core.Action('getSinglePlayer', {
  id: 'number!'
}, (data, promise)=>{
  sa.get(`${base}stats/player/${data.id}`)
    .end((err, res)=>{
      // core.set('stats', res.)
      if (res && res.body) {
        // console.dir(res.body.body);
        promise.resolve(res.body.body);
      }
      //
      // console.info('getSingle:',res);
      // console.error(err);

    });

})
