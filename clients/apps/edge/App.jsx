var React = require('react');
var pt = React.PropTypes;
var ReactDom = require('react-dom');
var core = require('core');
var Baobab = require('baobab');

core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
core.loadContext(require.context('./', true, /.*\.module\.js/));
// core.loadContext('dev-client', require.context('./dev-client', true, /.*\.module\.js/));

core.on('error', (err)=>{
  console.error(err && (err.error || err));
});

// core.on('click', ()=>{ console.log('click'); })
// core.on('mouseUp', ()=>{ console.log('mouseUp'); })
// core.on('esc', ()=>{ console.log('esc'); })


// core.Component('a', ({ children }) => <div> page a { children }</div>);
// core.Component('b', ({ children }) => <div> page b { children }</div>);
// core.Component('c', ({ children }) => <div> page c { children }</div>);

// core.router.map({
//   defaultChild: 'View',
//   children: [{
//     name: 'main',
//     component: 'View',
//     defaultChild: 'View',
//     children: [
//       {
//         name:'zone',
//         component:'MyZone',
//         defaultChild: 'zone'
//       }
//     ]
//   }]
// });

var element = document.getElementById('app');
core.require([
  'core.App', 'DevTools','Dashboard'], (App, DevTools, Dashboard)=>{

    core.connection.action('language.get', {}, (lang)=>{
      core.set('config.language', JSON.parse(lang));
      core.tree.commit();
      ReactDom.render(
        <App>
          <Dashboard ></Dashboard>
        </App>, element);

    }, core.error);

})
