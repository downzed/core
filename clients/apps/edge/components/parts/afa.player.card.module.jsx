var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var ProgressBar = require('react-progress-bar-plus');

require('./flip.scss');
require('react-progress-bar-plus/lib/progress-bar.css');

core.Component('afa.PlayerCard', ['ui.Card'], (Card)=> {
  return {
    propTypes: {
      player: PropTypes.object,
      stats : PropTypes.array,
    },
    getInitialState(){

      // console.debug('player:',this.props.player)
      return {
        percent: -1,
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
      // console.log('player:', player);
      this.setState({ percent: 0 });

      core.run('getSinglePlayer', { id: Number(player.playerID) })
          .then((res)=>{
            setTimeout(()=>{
              this.setState({ showDrawer: !this.state.showDrawer, stats: res.stats, percent: 100 });

            },1050);
          });
    },

    toggleNews(){
      this.setState({ showNews: !this.state.showNews })
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
      let { player, stats} = this.state;
      // if (stats) console.log('stats', stats);
      let avatarTrans = {
        borderTopRightRadius: this.state.showDrawer ? 0 : '4px',
        borderTopLeftRadius: this.state.showDrawer ? 0 : '4px',
        transform: this.state.showDrawer ? 'translateY(90px)' : 'translateY(0px)',
      };
      let details = {
        opacity: this.state.showDrawer ? '0' : '1',
      }
      let statstrans = {
        opacity: this.state.showDrawer ? '1' : '0',
      }
      let newstrans = {
        transform: this.state.showNews ? 'translateY(-220px)' : 'translateY(100%)',
      }

      return (
        <div className="card" style={ {...card.main, background: theme('colors.card')} }>
          <ProgressBar percent={ this.state.percent } onTop={ true } autoIncrement={ true } intervalTime={ 200 } spinner={ false } />
          <div className="card-stats" style={ {...card.stats, ...statstrans, color: theme('colors.dark'), background: theme('colors.background')} } >
            { stats ? _.map(stats[0], this.renderStats) : null }
          </div>
          <div className="card-image" style={ {...card.avatar, background: theme('colors.card'), ...avatarTrans} } >
            <img style={ { width:'65%'} } src={ player.avatar } />
          </div>
          <div className="details" style={ {...card.details, ...details, background: theme('colors.background'), color: theme('colors.dark')} } >
            <div style={ card.row }>
              <span style={ {marginRight: '.2em'} }>{ player.firstName }</span>
              <span  > { player.lastName }</span>
            </div>
            <div>
              <div >
                <span  style={ card.row }>Team: { player.TeamID }</span>
                <span  style={ card.row }>Position: { player.TeamID }</span>
              </div>
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
          <div className="card-news" style={ {...card.news, ...newstrans} }>
            news
            news
            news
            news
          </div>
        </div>

      );
    }
  }
});
let card = {
  main: {
    color: '#fff',
    width: '180px',
    height: '220px',
    display: 'flex',
    overflow:'hidden',
    flexDirection: 'column',
    position: 'relative',
    margin: '0 0.5em 0.5em 0.5em',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  news: {
    zIndex: 6,
    background: '#303742',
    position:'absolute',
    width: '100%',
    zIndex: '6',
    height: 'calc(100% - 40px)',
    color: 'blue',
  },
  avatar: {
    height: '90px',
    overflow: 'hidden',
    maxWidth: '100%',
    top: '0px',
    justifyContent: 'center',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    zIndex: '5',
  },
  stats: {
    boxShadow: 'rgba(21, 21, 21, .7) 0px -5px 25px -15px inset',
    flex:1,
    maxHeight: '90px',
    height: '90px',
    position:'absolute',
    width: '100%',
    overflowY: 'auto',
    flexDirection:'column',
    fontSize:12,
    display: 'flex',
    padding: '0.5em',
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '4px',
  },
  details: {
    boxShadow: '0 -5px 25px -15px rgba(21,21,21,1)',
    marginTop: '90px',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
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
    justifyContent: 'space-between',
    alignItems:'center'
  }
}
