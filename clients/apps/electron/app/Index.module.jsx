
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
// var _ = window._;//
// console.dir(_);
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import * as Vibrant from 'node-vibrant'

var teams = require('../assets/teams.js');
var allPlayers = core.tree.select('allPlayers');

core.Component('Index', ['core.App','Views', 'PlayerDialog', 'Stats.Diaglog'],
(App, Views, PlayerDialog, StatsDiaglog)=>{
  return {

      getInitialState(){
        return {
          apps: {},
          open: true ,
          view: 'Compare',
          roster: {},
          name: 'Fantasy Edge',
          dialogOpen: false,
          comparedData: [],
          timeframe: '365',
          menuItems:  [
            { label: 'Home', icon: 'home', ref: 'myZone', active: false },
            { label: 'News', icon: 'description', ref: 'RotoNews', active: false },
            { label: 'Compare', icon: 'compare_arrows', ref: 'Compare', active: true },
            { label: 'SignIn', icon: 'settings', ref: 'SignIn', active: false }
          ]

        };
      },

      componentWillMount() {
          this.getPlayers();
          this.allPlayers = core.tree.select('allPlayers');
          core.on('compared.players', this.handleCompare);
      },


      getPlayers(period){
        var { allPlayers, timeframe } = this.state;
        if (!period) period = timeframe;
        core.run('getAllPlayers', { period })
            .then(({ isError })=>{
              if (isError) return;
              var { players, total } = this.allPlayers.get();
              // console.debug('players => ', players);
              // console.debug('total => ', total);
              var res = this.getTeams(players);
              // var res = this.getTeams(players, this.getColor);
              // var chunks =  _.chunk(res, 13);
              // var myplayers = chunks[6];
              core.emit('players.loaded', { players: res instanceof Array ? res : [], total: total });
              // core.tree.set('players', chunks[5]);
              // core.tree.set('myPlayers', myplayers)
            });
        //   this.setMax(res);
      },
      handleCompare(data){
        this.setState({ comparedData: data, dialogOpen: true })
      },
      getColor(players){
        const get = (src) => {
          if (!src) return '#fff';
          var r, g, b, pal;
          var x;
          Vibrant.from(src).getPalette((err, palette) => {
            if (err){ console.error(err); x = 'red'; }
            // if (palette && palette.hasOwnProperty('Vibrant')) {
            //     if (palette['Vibrant'].hasOwnProperty('_rgb')) {
                  // console.debug('palette[Vibrant][_rgb] => ',  palette['Vibrant']['_rgb'])
                  if (palette && palette['Vibrant'] !== null && palette['Vibrant']['_rgb']) {
                    pal = palette['Vibrant']['_rgb'];
                    r = pal[0];
                    g = pal[1];
                    b = pal[2];
                    x= `rgba(${r},${g},${b}, .6)`;
                  }
                // }
                else x = 'green'
            // }
          });
          return x;

        };
        return _.map(players, (player)=>{
          return {
            ...player,
            color:get(player.teamLogo)
          }
        })
      },
      getTeams(players, callback){
        var wteams = [];

        for (let x = 0; x < players.length; x++) {
          for (let t = 0; t < teams.length; t++) {
            if (Number(players[x].TeamID) === teams[t].teamId){
              wteams.push({
                ...players[x],
                ...teams[t],
<<<<<<< HEAD
                teamLogo: `http://stats.nba.com/media/img/teams/logos/${teams[t].abbreviation}_logo.svg`,
=======
                teamLogo: 'http://stats.nba.com/media/img/teams/logos/'+teams[t].abbreviation+'_logo.svg',
>>>>>>> ab8102ed3d4265a4e0c43d3c778e12bd7551dd38
              })
            }
          }
        }
        return wteams//callback(wteams)
      },

      setMax(players) {
        var rP, aP, pP;

        rP =_.maxBy(players, 'REB');
        aP = _.maxBy(players, 'AST');
        pP = _.maxBy(players, 'PTS');
        var max = {
          reb: { val: rP.REB, player: rP.firstName+' '+rP.lastName, id: rP.id },
          ast: { val: aP.AST, player: aP.firstName+' '+aP.lastName, id: aP.id },
          pts: { val: pP.PTS, player: pP.firstName+' '+pP.lastName, id: pP.id },
        };
        core.tree.set(['stats', 'max'], max);
        // console.dir(core.tree.get(['stats', 'max']));
      },

      handleModalCLose(){
        this.setState({ dialogOpen: false, comparedData: {} });
      },

      changeViews(view){
        var { menuItems } = this.state;

         menuItems = _.map(menuItems, (item)=>{
          return {
            ...item,
            active: item.ref === view
          }
        });
        this.setState({ view: view, menuItems: menuItems, open: true });
      },

      getLocalStorageDetails(details) {
        console.log('obj');
        this.setState({ roster: {...roster, ...details} })
      },
      renderMenu(){
        var { menuItems, view } = this.state;

        return _.map(menuItems, (item, i)=>{
          var { icon, label, ref, active } = item;
          var itemStyle = {
            icon: { color: active ? '#f2fafa':'#9196a6', fontSize: 18 },
            div: {  color: active ? '#f2fafa':'#9196a6', fontSize: 14, background: active ? '#46bbc2' : 'none' }
          }
          return (
            <MenuItem key={ i }
                      leftIcon={ <FontIcon style={ itemStyle.icon } className="material-icons">{ icon }</FontIcon> }
                      style={ itemStyle.div }
                      innerDivStyle={{ paddingLeft: 45, background: active ? '#46bbc2' : 'none'  }}
                      onTouchTap={ this.changeViews.bind(this, ref) }>{ label }</MenuItem>
          )
        });
      },
      render () {
        let { open, view, name, type, dialogOpen, comparedData } = this.state;
          return (
              <App>
                <AppBar title={ name } style={{ background: '#323e51', fontSize: 18, paddingLeft: '140px' }} showMenuIconButton={ false }
                  onLeftIconButtonTouchTap={ e => { this.setState({open: true }); } } />
                  <Drawer
                    containerStyle={{ backgroundColor: '#323e51', top: 64, boxShadow: 'rgba(0, 0, 0, 0.227) 1px 5px 10px' }}
                    docked={ true }
                    width={ 140 }
                    open={ true }
                    onRequestChange={ e => { this.setState({open: true }); }} >
                    { this.renderMenu() }
                  </Drawer>

                  <div className={'wrapper'} style={{ ...isOpen(open),  position: 'absolute' }}>

                    <Views
                        getLocalStorageDetails={ this.getLocalStorageDetails }
                        view={ view }
                        handleNameChange={ name => { this.setState({ name: name }) } } />
                    <StatsDiaglog open={ dialogOpen } data={ comparedData } onClose={ this.handleModalCLose } />

                  </div>
                  {/*
                  <FlatButton icon={ <FontIcon className={ 'fa fa-arrow-left' } /> }
                    style={{ position:'absolute', left: 25, bottom: 25 }}
                    onClick={ e => { this.changeSteps(stepIndex-1) } } />
                    */}
                </App>

          );
      }
  }
});
const isOpen = (open) => {
  return {
    left: open ? 140 : 0,
    padding: '0', bottom: '0', top: '65px', right: 0,
    transition: 'all 0.015s ease-in-out'
  }
}
