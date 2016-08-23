var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

core.Component('playerManager', ['ui.Header','afa.UserCard','ui.Button','ui.Icon'], (Header, UserCard, Button, Icon)=> {
  return {

    bindings: {
      players: ['players'],
    },
    propTypes: {
      filter: PropTypes.string,
      onPlayerSelected: PropTypes.func,
    },
    getInitialState(){
      return {
        selected: [],
        // players : core.tree.get('players')
      }
    },
    componentDidMount() {
      this._selected = [];
      // this.state.players = [...)];

    },
    // shouldComponentUpdate(nextProps, nextState) {
      // return nextProps.filter === this.props.filter;// || nextState.selected !== this.state.selected;
    // },
    componentWillReceiveProps(nextProps) {
      // if (nextProps.filter !== this.prop.filter)
      this.onPlayerRemoved()
    },
    // componentWillUpdate(nextProps, nextState) {
    renderCards(item, key){
      var icons = [
        <Icon key={ 'add' } className="fa fa-check-circle-o " style={ {fontSize: 24} } />,
      ];

      if (!item) return null;
      var style = {cursor: 'pointer', margin: '0.5em 0', width: '100%', position: 'relative'};
      var cursor = {right: '10px', top: '10px', fontSize: '24px', position:'absolute', zIndex: 1};
//
      return (
          <UserCard user={ item }
            style={ style }
            icons={ _.includes(this.state.selected, item.id) && !item.teamId ? icons : [] }
            key={ item.id }
            type={ 'player' }
            selected={ _.includes(this.state.selected, item.id) }
            onClick={ this.onSelectedPlayer.bind(this, item) } />
      )
    },

    onSelectedPlayer(player){
      var sel;
      if (this._selected.length && _.includes(this._selected, player.id)) {
        sel = false;
        this._selected = _.pull(this._selected  , player.id);
      } else {
        sel = true;
        this._selected.push(player.id);
      }

      this.setState({ selected: this._selected });
      this.props.onPlayerSelected(player, sel);
    },

    onPlayerRemoved(){
      this._selected = [];
      this.setState({ selected: [] });
    },

    getFiltered(filter) {
      var filtered;
      if (!this.state.players) return [];
      if (!filter) return this.state.players;
      else {
        filtered = _.filter(this.state.players, (player)=>{
          return _.includes(player.firstName.toLowerCase(), filter) || _.includes(player.lastName.toLowerCase(), filter)
        })
      }
      return _.sortBy(filtered, ['lastName']);
    },
    render(){

      let { filter } = this.props;
      return (
        <div style={ {overflowY:'auto', overflowX: 'hidden', minHeight: '200px', maxHeight: '350px', background:'#dfdfdf', padding: 8} }>
          { _.map(this.getFiltered(filter), this.renderCards) }
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
