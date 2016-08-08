var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

import Select from 'react-select';
import 'react-select/dist/react-select.css';

core.Component('Compare', ['ui.Header','afa.UserCard'], (Header, UserCard)=> {
  return {
    bindings: {
      players: ['players']
    },
    getInitialState() {
      return { selected: [] };
    },

    renderCards(item, key){
      return (
        <UserCard user={ item } key={ key } style={ {margin: '0.5em '} }/>
      )
    },

    componentDidMount() {
      // core.run('getPlayerStats').then((res)=>{console.debug('res:',res)});
    },
    logChange(e){
      // this.setState({ selected: this.state.selected.concat(e)})
      console.log('selected', e);
    },
    renderSelectFields(){
      let { players } = this.state;
      players = _.chunk(players, 10);

      let team_a = players[0];
      let team_b = players[1];

      let select_a = [], select_b = [];

      if (team_a){
        (team_a).forEach((player) => {
          select_a.push({label: player.lastName +', '+player.firstName, value: player.playerID, image: player.avatar});
        });
      }
      if (team_b){
        (team_b).forEach((player) => {
          select_b.push({label: player.lastName +', '+player.firstName, value: player.playerID, image: player.avatar});
        });
      }
      let fields = {
        main: {
          display:'flex',
          flexDirection:'row'
        },
        column:{
          flex:1,
          display:'flex',
          flexDirection:'column'
        }
      }

      return (
        <div style={ fields.main }>
          <div style={ fields.column }>
            <Select
                multi={ true }
                name="form-field-name"
                options={ select_a }
                onChange={ this.logChange }
            />
            <div style={ {height: 'auto', overflowY:'auto', overflowX: 'hidden'} }>
              {_.map(team_a, this.renderCards) }
            </div>
          </div>

          <div style={ fields.column }>
            <Select
                multi={ true }
                name="form-field-name-also"
                options={ select_b }
                onChange={ this.logChange }
            />
            <div style={ {height: 'auto', overflowY:'auto', overflowX: 'hidden'} }>
              {_.map(team_b, this.renderCards) }
            </div>
          </div>
        </div>
      );
    },

    render(){

      return (
        <div style={ news.main }>
          <div style={ {...news.wrap, background: theme('colors.error')} }>
            <span style={ news.title }>Select Here</span>
              { this.renderSelectFields() }
          </div>
          <div style={ {...news.wrap, marginLeft: 15} }>
            <span style={ news.title }>Results Here</span>
          </div>

        </div>
      );
    }
  }
});
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
