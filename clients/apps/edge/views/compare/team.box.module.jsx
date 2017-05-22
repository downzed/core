var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

core.Component('Team.Box', ['ui.Header','afa.UserCard','ui.Button','ui.Icon'], (Header, UserCard, Button, Icon)=> {
  return {

    bindings: {
      // players: ['players'],
      team_a: ['compare', 'team_a'],
      team_b: ['compare', 'team_b'],
    },

    onRemovedPlayerFromTeam(player) {
      var x = { ...player };
      var cteam = core.tree.get(['compare', x.team]);
      var players = [...core.tree.get('players')];
      cteam = _.reject(cteam, ['id', x.id]);
      players = _.union(players, [x])

      core.tree.set(['compare', x.team], cteam)
      core.tree.set('players', players);
      // core.tree.set('playerRemoved', true);
      this.props.onRemovedPlayer(true);
    },

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.team_a !== this.state.team_a || nextState.team_b !== this.state.team_b;
    },

    renderCards(item, key){
      console.log('item', item);
      var icons = [
        <Icon key={'remove'} className="fa fa-times"
          style={ {zIndex: 1} }
          onClick={ this.onRemovedPlayerFromTeam.bind(this, item) }/>
      ];
      return (
        <UserCard user={ item } key={ item.id } style={ {margin: '0.5em 0', width: '100%'} } type={ 'player' }
          icons={icons} />
      )
    },

    onClear(team, id){
    },

    render(){
      let { team_a, team_b } = this.state;
      return (
        <div>
        <div style={ {overflowY:'auto', overflowX: 'hidden', minHeight: '200px', maxHeight: '350px', width: 300, background:'#dfdfdf', padding: 8} }>
          <span>team a</span>
          {team_a && team_a.length ? _.map(team_a, this.renderCards) : null }
        </div>
        <div style={ {overflowY:'auto', overflowX: 'hidden', minHeight: '200px', maxHeight: '350px', width: 300, background:'#dfdfdf', padding: 8} }>
          <span>team b</span>

          {team_b && team_b.length ? _.map(team_b, this.renderCards) : null }
        </div>
      </div>

      );
    }
  }
});

let fields = {
  main: {
    display:'flex',
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection:'row',
    display: 'flex',
    maxHeight: '90%'
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
    flex: '1',
    padding: '0.5em',
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
/*
var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap';

core.Component('compare', ['ui.Header','afa.UserCard','ui.Button', 'fla.Checkbox'], (Header, UserCard, Button, Checkbox)=> {
  return {
    bindings: {
      players    : ['players'],
      timeframes : ['timeframes'],
      categories : ['categories'],
    },
    getInitialState() {
      return {
        timeframe   : 7,
        reset       : false,
        body  : {
          timeframe : 7,
          team_1    : [],
          team_2    : []
        }
      };
    },

    renderCards(item, key){
      // console.log(item, key, what);
      return (
        <UserCard user={ item } key={ key } style={ {margin: '0.5em '} } type={ 'player' } />
      )
    },

    onChecked(e){
      console.log('name:', e.name+' - '+e.checked);
    },

    onSelectedPeriod(period){
      // console.log('[period]', period);
      this.setState({ timeframe: period });
    },



    onSelectedPlayers(id){
      this._team = [];
      this._team.push(id);
    },

    addPlayersToTeam(selectedTeam){
      this[selectedTeam] = [];
      this[selectedTeam] = this._team;
      this.setState({ reset : true });
    },

    renderCats(cat, key){
      return (
        <Checkbox onClick={ this.onChecked } label={ cat } key={ key }/>
      );

    },
    renderSelectFields(){
      let { players, timeframes, categories, reset } = this.state;
      let options = [];

      if (timeframes){

        (timeframes).forEach((tf) => {
          options.push({
            label: tf,
            key: _.uniqueId(),
            value: tf
          })
        });
      }


      let team_a = players[0];
      let select = [];


      if (players){

        (players).forEach((player) => {
          select.push({
            label: player.lastName +', '+player.firstName,
            key: _.uniqueId(),
            value: player.playerID
          })
          select = _.sortBy(select, ['label']);
        });
      }
      return (
        <div style={ fields.main }>
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
          <div style={ fields.row }>
            <div style={ {...fields.column, maxWidth: 250} }>
              <span>select players</span>
              <Select
                  onBlurResetsInput={ reset }
                  isLoading={ !players || !players.length }
                  autofocus={ true }
                  multi={ true }
                  name="form-field-name"
                  options={ select }
                  onChange={ this.onSelectedPlayers }
              />
              <div>
                <Button hoverColor={ theme('colors.primary') } color={ theme('colors.secondary') }
                        onClick={ this.addPlayersToTeam.bind(this, 'team_a') }> add to team a </Button>
                      <Button hoverColor={ theme('colors.primary') } color={ theme('colors.secondary') }
                        onClick={ this.addPlayersToTeam.bind(this, 'team_b') }> add to team b </Button>
              </div>
            </div>
          </div>
          <Button style={ {position: 'absolute', bottom: 0, width:'100%'} } onClick={ this.onCompare }>compare</Button>

      </div>
      );
    },
    onCompare(){
      let { body, timeframe } = this.state;
      body.timeframe  = timeframe;
      body.team_1 = this.team_a;
      body.team_2 = this.team_b;
      console.dir(body);

      // core.run('comparePlayers', { body: body })
      //     .then((res)=>{
      //     });
    },
    render(){

      return (
        <div style={ news.main }>
          <div style={ {...news.wrap, background: theme('colors.error')} }>
            <span style={ news.title }>Select Here</span>
              { this.renderSelectFields() }
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
    flex: '1',
    padding: '0.5em',
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

*/
