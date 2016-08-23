var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap';

core.Component('compare', ['ui.Header','afa.UserCard','ui.Button', 'fla.Checkbox', 'playerManager', 'Team.Box'],
(Header, UserCard, Button, Checkbox, Manager, Teambox)=> {
  return {
    bindings: {
      players    : ['players'],
      timeframes : ['timeframes'],
      categories : ['categories'],
      // filtered : ['filtered'],
    },
    getInitialState() {
      return {
        timeframe       : 7,
        reset           : false,
        filter          : '',
        filteredPlayers : [],
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
      this._fromManager = {
        team_a : [],
        team_b : []
      };
      this._filtered = this.state.players;

    },
    componentWillUpdate(nextProps, nextState) {
      if (nextState.players !== this.state.players) this._filtered = nextState.players;
    },

    onChecked(e){
      console.log('name:', e.name+' - '+e.checked);
    },

    onSelectedPeriod(period){
      this.setState({ timeframe: period });
    },
    onSelectedPlayers(id){
      this._team = [];
      let team = [];
      this._team.push(id);
      // id = id.splut
      id = id.split(',');
      if (id && id.length) {
        for (var x in id) {
          team.push({id: id[x]});
        }
      }
      this._filtered = _.differenceBy(this._filtered, team, 'id');
      this._filtered = _.sortBy(this._filtered, ['lastName']);
      console.dir(this._filtered);
      core.tree.set('filtered', this._filtered);
    },

    // onRemovedPlayer(id){
    //   this._filtered = _.differenceBy(this.state.players, this._filtered, 'id');
    //   this._filtered = _.sortBy(this._filtered, ['lastName']);
    //   console.dir(this._filtered);
    //   core.tree.set('filtered', this._filtered);
    // },
    addFromManager(selectedTeam, player) {
      this._fromManager[selectedTeam].push(player.id);
      this._team = this._fromManager[selectedTeam];
      // this.addPlayersToTeam(selectedTeam, player.id);
    },

    addPlayersToTeam(selectedTeam, id){
      this[selectedTeam] = [];
      this[selectedTeam] = this._team;
      // this.setState({ reset : true });

      console.log('selectedTeam', selectedTeam);
      console.log('this._team', this._team);
      let players = this._team[0].split(',');

      let team = [];
      let player;
      for (var x in players) {
        player = {..._.find(this.state.players, ['id', players[x]]), team: selectedTeam }
        team.push(player)
      }

      this.setState({ reset : true});
      core.tree.set(['compare', selectedTeam], team);
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
      if (this._filtered){
        this._filtered.forEach((player) => {
          options.push({
            label: player.lastName +', '+player.firstName,
            key: _.uniqueId(),
            value: player.id
          })
          options = _.sortBy(options, ['label']);
        });
      }
      return (
        <div style={ {...fields.column, maxWidth: 250, paddingBottom: '40px', justifyContent: 'space-between'} }>
          <div >
            <span>select players</span>
              <Select
                    isLoading={ !this._filtered || !this._filtered.length }
                    autofocus={ true }
                    onBlurResetsInput={ reset }
                    multi={ true }
                    value={ this._team }
                    name="form-field-name-too"
                    options={ options }
                    onChange={ this.onSelectedPlayers }
              />

          </div>
          <Manager onSelectedPlayer={ this.addFromManager } />
          <div style={ fields.row }>

              <Button hoverColor={ theme('colors.primary') } color={ theme('colors.secondary') }
                      onClick={ this.addPlayersToTeam.bind(this, 'team_a') }> add to team a </Button>
              <Button hoverColor={ theme('colors.primary') } color={ theme('colors.secondary') }
                      onClick={ this.addPlayersToTeam.bind(this, 'team_b') }> add to team b </Button>
          </div>

        </div>
      );
    },


    onCompare(){
      let { body, timeframe, players } = this.state;
      body.timeframe  = timeframe;
      body.team_1 = this.team_a;
      body.team_2 = this.team_b;
      console.dir(body);
      // core.tree.set('compare')
      core.run('comparePlayers', { body: body })
          .then((res)=>{
          });
      this._filtered = players;
    },
    render(){

      return (
        <div style={ news.main }>
          <div style={ {...news.wrap, background: theme('colors.error')} }>
            <span style={ news.title }>Select Here</span>
              <div style={ fields.main }>
                  { this.renderFields() }
                  <div style={ fields.row }>

                  { this.renderSelectPlayers() }
                  <Teambox />
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
