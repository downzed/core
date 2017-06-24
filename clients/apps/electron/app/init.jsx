
var React = require('react');
var core = require('core');
var ReactDom = require('react-dom');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


injectTapEventPlugin();

core.loadContext('index', require.context('./', true, /.*\.module\.js/));
// core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
core.loadContext('source', require.context('./', true, /.*\.module\.js/));
// core.run('loadGoogleChart').then( ()=>{
//     console.log('google.load')
//     google.load("visualization", "1", {
//       packages:["corechart"],
//     //   callback: function() {
//     //     that.startRenderingComponents();
//     //   }
//     });
// });


core.require(['Index'], (Index)=>{

  ReactDom.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Index />
    </MuiThemeProvider>, document.getElementById('app'));
})
