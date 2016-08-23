var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap';

var ProgressBar = require('react-progress-bar-plus');
require('react-progress-bar-plus/lib/progress-bar.css');



var players = require('../players.js');
var stats = require('../stats.js');



function mapPlayersAndStats(players, stats) {
  var list = [];
  for (var j = 450; j < players.length; j++) {
    // console.log('players[j]', players[j]);
    list.push({
      firstName: players[j].firstName,
      lastName: players[j].lastName,
      id: players[j].playerID,
      teamId: players[j].TeamID || null,
    })
  }
  return list;
}
var newList = mapPlayersAndStats(players, stats);

function mapPlayers(players) {
  var list = [];
  for (var x = 0; x < players.length; x++) {
      list.push({
        // ...players[x],
        firstName: players[x].firstName,
        lastName: players[x].lastName,
        id: players[x].Player_ID,
        // stats: [
          'AST'   : players[x].AST ,
          'TOV'   : players[x].TOV ,
          'PTS'   : players[x].PTS ,
          'PF'    : players[x].PF ,
          'REB'   : players[x].REB ,
          'OREB'  : players[x].OREB ,
          'DREB'  : players[x].DREB ,
          '3P'    : players[x].P3 ,
          'MIN'   : players[x].MIN ,
          'GP'    : players[x].GP ,
          'BLK'   : players[x].BLK ,
          'STL'   : players[x].STL ,
          'FTA'   : players[x].FTA ,
          'FTM'   : players[x].FTM ,
          'FT'    : players[x].FT ,
          'FGA'   : players[x].FGA ,
          'FGM'   : players[x].FGM ,
          'FG'    : players[x].FG ,
          'FG3A'  : players[x].FG3A ,
          'FG3M'  : players[x].FG3M
        // ]
      })
  }
  return list;
}

core.Component('compare', ['ui.Header','afa.UserCard','ui.Button', 'fla.Checkbox', 'playerManager', 'Team.Box'],
(Header, UserCard, Button, Checkbox, Manager, Teambox)=> {
  return {
    bindings: {
      players    : ['players'],
      timeframes : ['timeframes'],
      categories : ['categories'],
    },
    getInitialState() {
      return {
        timeframe       : 7,
        reset           : false,
        filter          : '',
        filteredPlayers : [],
        percent: 0,
        autoIncrement: true,
        body  : {
          timeframe : 7,
          team_1    : [],
          team_2    : []
        }
      };
    },
    //
    componentDidMount() {
      this._team = [];
      let chunks, myplayers, newplayers;
      core.run('getPlayerStats', { timeframe: 365 })
          .then( (result) => {
            if (result !== 'error') {
            // if (result === 'error') return;
              this.setState({ percent: 100 });
              newplayers = mapPlayers(result.stats);
              chunks =  _.chunk(newplayers, 13);
              myplayers = chunks[34];
              // console.dir(myplayers);
              core.tree.set('players', chunks[35]);
              core.tree.set('myPlayers', myplayers);
              this.setMax(players);
            } else {
              core.run('getTeams', { players: newList })
                  .then((res)=>{
                    this.setState({ percent : 100 });
                    chunks =  _.chunk(res, 13);
                    myplayers = chunks[0];
                    core.tree.set('players', res);
                    core.tree.set('myPlayers', myPlayers);
                    this.setMax(newList);
                    // console.debug('res',res);
                  })
            }
          });
    },

    setMax(players) {
      var max = {
        reb: {},
        ast: {},
        pts: {},
      };

      max.reb = _.maxBy(players, 'REB').REB;
      max.ast = _.maxBy(players, 'AST').AST;
      max.pts = _.maxBy(players, 'PTS').PTS;

      // ((portion/total) * 100).toFixed(2) + '%'
      core.tree.set(['stats', 'max'], max);
    },

    onChecked(e){
      console.log('name:', e.name+' - '+e.checked);
    },

    onSelectedPeriod(period){
      this.setState({ timeframe: period });
    },

    addPlayersToTeam(selectedTeam){
      let selTeam = core.tree.get(['compare', selectedTeam]);
      let players = this._team;//[0].split(',');
      if (selTeam) players = _.union(selTeam, players);
      let team = [];
      players.forEach((player)=>{
        team.push({
          ...player,
          team: selectedTeam
        })
      })
      core.tree.set(['compare', selectedTeam], team);
      core.tree.set('players', _.differenceBy(this.state.players, players, 'id'));
      players = [];
      this._team = [];
    },


    renderCats(cat, key){
      return (
        <Checkbox onClick={ this.onChecked } label={ cat } key={ key }/>
      );

    },

    renderFields(){
      const getLabel = (tf) => {
        switch (tf) {
          case 7:
            return 'last week'
            break;
          case 15:
            return 'last 2 weeks'
            break;
          case 30:
            return 'last month'
            break;
          case 365:
            return 'last year'
            break;
        }
      };
      let { timeframes, categories } = this.state;
      let options = [];
      if (timeframes){

        (timeframes).forEach((tf) => {
          options.push({
            label: getLabel(tf),
            key: _.uniqueId(),
            value: tf
          })
        });
      }


      return (
        <div style={ fields.row }>
          <div style={ {...fields.column, maxWidth: 150} }>
            <span>select period</span>
            <Select
                multi={ false }
                searchable={ false }
                value={ this.state.timeframe }
                name="form-field-name"
                options={ options }
                onChange={ this.onSelectedPeriod }
            />
          </div>
          <div style={ {...fields.column} }>
            <span>select categories</span>
            <div style={ {display: 'flex' , flexDirection: 'row', flexWrap: 'wrap'} }>
              { _.map(categories, this.renderCats) }
            </div>
          </div>
        </div>
      );
    },

    renderSelectPlayers(){
      let { reset } = this.state;
      let options = [];

      return (
        <div style={ {...fields.column, maxWidth: 250, paddingBottom: '40px', justifyContent: 'space-between'} }>
          <div >
            <span>select players</span>
            <div>
              <input type="text" value={ this.state.filter } onChange={ (e)=>this.setState({ filter: e.target.value }) } />
            </div>
          </div>
          <Manager onPlayerSelected={ this.onPlayerSelected } isRemoved={ this.state.removed } filter={ this.state.filter } />
          <div style={ fields.row }>

              <Button disabled={ !this._team } hoverColor={ theme('colors.primary') } color={ theme('colors.secondary') }
                      onClick={ this.addPlayersToTeam.bind(this, 'team_a') }> add to team a </Button>
              <Button disabled={ !this._team } hoverColor={ theme('colors.primary') } color={ theme('colors.secondary') }
                      onClick={ this.addPlayersToTeam.bind(this, 'team_b') }> add to team b </Button>
          </div>

        </div>
      );
    },
    onPlayerSelected(player, isSelected){
      if (!isSelected) {
          this._team = _.filter(this._team  ,(p)=>{
            return player.id !== p.id;
          });
      }
      else  this._team.push(player);
    },
    onRemovedPlayer(){
      this.setState({ removed : true })
    },
    onCompare(){
      let team_a, team_b;
      team_a = _.map(core.tree.get(['compare', 'team_a']), (p)=>{
        return p['id']
      })
      team_b = _.map(core.tree.get(['compare', 'team_b']), (p)=>{
        return p['id']
      })
      let { body, timeframe, players } = this.state;
      body.timeframe  = timeframe;
      body.team_1 = team_a;
      body.team_2 = team_b;
      // console.dir(body);
      // console.dir(players);
      core.run('comparePlayers', { body: body })
          .then((res)=>{
            players = _.union(players, core.tree.get(['compare', 'team_a']));
            players = _.union(players, core.tree.get(['compare', 'team_b']));
            this.clear(players);
          });

    },
    clear(players){
      core.tree.set('players', players);
      core.tree.set(['compare', 'team_a'], []);
      core.tree.set(['compare', 'team_b'], []);
    },

    render(){
      let { autoIncrement, percent } = this.state;
      console.log('comapre', 222);
      return (
        <div style={ news.main }>
          <ProgressBar autoIncrement={ autoIncrement } percent={ percent } />

          <div style={ {...news.wrap, background: theme('colors.error')} }>
            <span style={ news.title }>Select Here</span>
              <div style={ fields.main }>
                  { this.renderFields() }
                  <div style={ fields.row }>

                  { this.renderSelectPlayers() }
                  <Teambox onRemovedPlayer={ this.onRemovedPlayer }/>
                </div>
                <Button style={ {position: 'absolute', bottom: 0, width:'100%'} } onClick={ this.onCompare }>compare</Button>
            </div>
          </div>
        </div>
      );
    }
  }
});

let fields = {
  main: {
    position:'relative',
    display:'flex',
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection:'row',
    display: 'flex',
  },
  column:{
    flex:1,
    display:'flex',
    flexDirection:'column'
  }
}

let news = {
  title: {
    padding: '0 0.5em'
  },
  main :{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  wrap : {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    flexDirection:'column',
    display: 'flex',
    borderRadius: 4,
    background: 'rgba(255,255,255,0.2)',

  },
  articles: {
    display: 'flex',
    flexFlow: 'row wrap',
    overflow: 'auto',
    justifyContent: 'space-around',
  }
}
