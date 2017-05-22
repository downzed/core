var React = require('react');
var pt = React.PropTypes;
var ReactDom = require('react-dom');
var core = require('core');
var Baobab = require('baobab');
require('./stupidfix.css');
core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
core.loadContext(require.context('./', true, /.*\.module\.js/));
// core.loadContext('dev-client', require.context('./dev-client', true, /.*\.module\.js/));

core.on('error', (err)=>{
  console.error(err && (err.error || err));
});

core.router.on();
// location.hash = '/dashboard/compare';

var element = document.getElementById('app');
core.require([
  'core.App', 'dashboard'], (App, Dashboard)=>{

    // core.tree.set(['core', 'router', 'map'], core.tree.get(['routerMap']));

    // core.connection.action('language.get', {}, (lang)=>{
      // core.set('config.language', JSON.parse(lang));
      core.tree.commit();
      ReactDom.render(
        <App>
            { core.router.render() }
        </App>, element);

    // }, core.error);

})
