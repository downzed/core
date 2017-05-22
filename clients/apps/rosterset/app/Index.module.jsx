
var React = require('react');
var sa = require('superagent')
require('lodash');
var core = require('core');
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
// var Pusher = require('pusher');
const base = 'http://46.121.135.238:3310/api/v1.0/';
const nbaTL = 'http://stats.nba.com/media/img/teams/logos/';


var players  = require('../assets/players.js')
var stats = require('../assets/stats.js').filter((pl)=>{
  return pl.TimeFrame > 1 && pl.PTS > 5;
})
// console.debug('√ß',stats);
var teams = require('../assets/teams.js');

const mapPlayersAndStats = (players, stats) => {
  var list = [];

  for (var j = 0; j < players.length; j++) {
        list.push({
          firstName: players[j].firstName,
          lastName: players[j].lastName,
          id: players[j].playerID,
          teamId: players[j].TeamID || null,
        })
    }
  for (var x in stats) {
    for (var p in list){
      if(stats[x].Player_ID === Number(list[p].id)) {
        list[p] = {
          ...list[p],
        'AST'   : stats[x].AST ,
        'TOV'   : stats[x].TOV ,
        'PTS'   : stats[x].PTS ,
        'PF'    : stats[x].PF ,
        'REB'   : stats[x].REB ,
        'OREB'  : stats[x].OREB ,
        'DREB'  : stats[x].DREB ,
        '3P'    : stats[x].P3 ,
        'MIN'   : stats[x].MIN ,
        'GP'    : stats[x].GP ,
        'BLK'   : stats[x].BLK ,
        'STL'   : stats[x].STL ,
        'FTA'   : stats[x].FTA ,
        'FTM'   : stats[x].FTM ,
        'FT'    : stats[x].FT ,
        'FGA'   : stats[x].FGA ,
        'FGM'   : stats[x].FGM ,
        'FG'    : stats[x].FG ,
        'FG3A'  : stats[x].FG3A ,
        'FG3M'  : stats[x].FG3M
        }

      }

    }
  }
  return list.filter((x)=>{
    return x.MIN > 5;
  });
}

var newList = mapPlayersAndStats(players, stats);

core.Component('Index', ['core.App','Views'],
(App, Views)=>{
  return {

      getInitialState(){
        return {
          apps: {},
          open: false,
          view: 'myZone',
          roster: {},
          name: 'Team Name Roster',
          timeframe: 365
        };
      },

      componentDidMount() {
        this.getPlayers();
      },

      getPlayers(){
        // console.log('getPlayers')
        // sa.get(`${base}stats/players?timeframe=${this.state.timeframe}`)
        //   .end((err, res)=>{
        //     if (res && res.ok) {
        //       console.dir(res.body);
        //
        //       // promise.resolve(res.body.body);
        //
        //     } else {
        //       console.log(err)
        //
        //       // promise.resolve('error');
        //     }
        //   });chunks =  _.chunk(res, 13);
        var res = this.getTeams(newList);
        var chunks =  _.chunk(res, 13);
        var myplayers = chunks[6];
          // console.dir(myplayers);
          core.tree.set('players', res);
          core.tree.set('myPlayers', myplayers);
          this.setMax(res);

      },

      getTeams(players){
        console.dir(players);
        var wteams = [];

        for (let x = 0; x < players.length; x++) {
          for (let t = 0; t < teams.length; t++) {
            if (Number(players[x].teamId) === teams[t].teamId){
              wteams.push({
                ...players[x],
                ...teams[t],
                teamLogo: teams[t].abbreviation+'_logo.svg',
              })
            }
          }
        }
        return wteams
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

      handleClose(){
        this.setState({ open: false });
      },

      changeViews(view){
        this.setState({ view: view, open: false  })
      },

      getLocalStorageDetails(details) {
        console.log('obj');
        this.setState({ roster: {...roster, ...details} })
      },

      render () {
        let { open, view, name, type } = this.state;
          return (
              <App>
                <AppBar title={ name }
                  onLeftIconButtonTouchTap={ e => { this.setState({open: !open}); } } />
                  <Drawer
                    docked={ false }
                    width={ 200 }
                    open={ open }
                    onRequestChange={ e => { this.setState({open: !open}); }} >
                    <MenuItem onTouchTap={ this.changeViews.bind(this, 'myZone')}>Home</MenuItem>
                    <MenuItem onTouchTap={ this.changeViews.bind(this, 'RotoNews')}>News</MenuItem>
                    <MenuItem onTouchTap={ this.changeViews.bind(this, 'RotoPlayers')}>Players</MenuItem>
                    <MenuItem onTouchTap={ this.changeViews.bind(this, 'SignIn')}>Sign In</MenuItem>
                  </Drawer>

                  <div className={'wrapper'} style={{ padding: '25px', bottom: '0', top: '65px', width: '100%', position: 'absolute' }}>

                    <Views
                        getLocalStorageDetails={ this.getLocalStorageDetails }
                        view={ view }
                        handleNameChange={ name => { this.setState({ name: name }) } } />
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
