var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');
var Spinner = require('react-spinkit');

core.Component('myzone', ['ui.Header','afa.PlayerCard', 'afa.UserCard', 'afa.Card','ui.Icon'],
 (Header, PlayerCard, UserCard, Card, Icon)=> {
  return {

    bindings: {
      myPlayers : ['myPlayers'],
      user : ['user']
    },

    renderPlayerCard(player, i){
      return (
        <PlayerCard key={ i } player={ player } />
      )
    },
    render(){
      return (
        <div style={ zone.main }>
          <div style={ {...zone.myarea, background: theme('colors.error')} }>
            <UserCard user={ this.state.user } type={ 'user' } />
            <Card content={ 'some' } key={1} style={ {marginTop: '0.5em'} }/>
            <Card content={ <Icon className="fa fa-users" /> } key={'icon'} style={ {marginTop: '0.5em'} }/>
          </div>
          <div style={ zone.players } className="zone-players" >
            { _.map(this.state.myPlayers, this.renderPlayerCard) }
          </div>

        </div>
      );
    }
  }
});
let zone = {
  main :{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  myarea: {
    flex: '1',
    width: '100%',
    minWidth: '280px',
    borderRadius: '4px',
    height: '100%',
    padding: '0.5em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

  },
  players: {
    display: 'flex',
    flex: '3',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    marginLeft: '15px',
  }
}
