var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');


core.Component('MyZone', ['ui.Header','afa.PlayerCard', 'afa.UserCard', 'afa.Card','ui.Icon'], (Header, PlayerCard, UserCard, Card, Icon)=> {
  return {
    propTypes:{
      myPlayers: PropTypes.array
    },
    renderPlayerCard(player, i){
      return (
        <PlayerCard key={ i } player={ player } />
      )
    },
    render(){
      var x = <span>card content</span>;
      return (
        <div style={ zone.main }>
          <div style={ {...zone.myarea, background: theme('colors.error')} }>
            <UserCard user={ this.props.user } />
            <Card content={ 'some' } key={1} style={ {marginTop: '0.5em'} }/>
            <Card content={ x } key={2} style={ {marginTop: '0.5em'} }/>
            <Card content={ <Icon className="fa fa-users" /> } key={'icon'} style={ {marginTop: '0.5em'} }/>
          </div>
          <div style={ zone.players } className="zone-players" >
            { _.map(this.props.myPlayers, this.renderPlayerCard) }
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
