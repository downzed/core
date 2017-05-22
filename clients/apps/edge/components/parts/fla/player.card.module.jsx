var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
require('./flip.scss');


core.Component('afa.PlayerCard', ['ui.Card', 'afa.MiniPie'], (Card, MiniPie)=> {
  return {

    bindings: {
      max : ['stats', 'max']
    },

    propTypes: {
      player: PropTypes.object
    },

    getInitialState(){

      return {
        showDrawer: false,
        player: this.props.player
      }
    },
    componentWillReceiveProps(nextProps){
      if (nextProps.player !== this.props.player) {
        this.setState({ player : nextProps.player })
      }
    },

    toggleStats(player){

      core.run('getSinglePlayer', { id: Number(player.playerID) })
          .then((res)=>{
            console.dir(res.stats);
            this.setState({ stats: res.stats });
          });
    },

    renderStats(stat, i){
      // console.log('stat', stat);
      return (
        <div key={ i }>
          <span>{i}</span>
          <span>{stat}</span>
        </div>
      )
    },
    render(){
      let { player, stats } = this.state;
      let avatar = `http://stats.nba.com/media/players/230x185/${player.id}.png`

      return (
        <div className="card" style={ {...card.main, background: theme('colors.card')} }>
          <div style={ card.row }>
            <div className="card-image" style={ {...card.avatar, background: theme('colors.card')} } >
              <img style={ { width:'100%'} } src={ avatar } />
            </div>
            <div className="pies" style={ card.pies }>
              <MiniPie type='pts' stats={ player } />
              <MiniPie type='ast' stats={ player } />
              <MiniPie type='reb' stats={ player } />
            </div>

          </div>
          <div>

            <div className="details" style={ {...card.details, background: theme('colors.background'), color: theme('colors.dark')} } >
              <div style={ card.row }>
                <span style={ {marginRight: '.2em'} }>{ player.firstName+' '+player.lastName }</span>
              </div>
            </div>
            <div className="card-buttons" style={ {...card.buttons, background: theme('colors.dark')} } >
              <span style={ {cursor: 'pointer'} } onClick={ this.toggleStats.bind(this, player) }>
                stats
              </span>
              <span style={ {cursor: 'pointer'} } onClick={ this.toggleNews }>
                news
              </span>
            </div>
          </div>

        </div>

      );
    }
  }
});
let card = {
  main: {
    color: '#fff',
    minWidth: '260px',
    height: '120px',
    display: 'flex',
    overflow:'hidden',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative',
    margin: '0 0.5em 0.5em 0.5em',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },

  pies: {
    paddingRight: '0.2em',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    // height: 'auto',
    flex: '.5',
    overflow: 'hidden',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    zIndex: '5',
  },
  details: {
    boxShadow: '0 -5px 25px -15px rgba(21,21,21,1)',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    zIndes:4,
    padding: '0 0.5em',

  },
  buttons: {
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    height: 40,
    // background: '#29333d',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px'
  },
  row: {
    display: 'flex',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems:'center'
  }
}
