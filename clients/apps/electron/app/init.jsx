
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
var hash = location.hash.split('#')[1];
core.require(['Index'], (Index)=>{

  ReactDom.render(

    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Index hash={ hash } />
    </MuiThemeProvider>, document.getElementById('app'));
})
