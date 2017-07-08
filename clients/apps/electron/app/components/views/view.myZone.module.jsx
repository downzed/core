var React = require('react');
var PropTypes = React.PropTypes;
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

const imgUrl =  `http://stats.nba.com/media/players/230x185/`;
const teamUrl = 'http://stats.nba.com/media/img/teams/logos/';
const urls = [
  {
    title : 'stats',
    url : 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
    img: imgUrl
  },
  {
    title : 'news',
    url : 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
    img: imgUrl
  },
];

core.Component('view.myZone', ['PlayerDialog'],
 (PlayerDialog)=> {
  return {

    bindings: {
      myplayers: ['myPlayers'],
      user: ['user']
    },

    getInitialState(){
      return {
        hovered: '',
        cards: [
          { label: 'Welcome, user', type: 'user', data: {} }, { label: 'News', type: 'news', data: [] },
        ]
      }
    },

    componentDidMount() {
      if (this.state.user && this.state.user.id) {
        this.setUser(this.state.user)
      }
      core.on('user.logged.in', this.setUser)
    },
    setUser(user){
      var { cards } = this.state;
      if (user && user.id) {
        for (var d = 0; d < cards.length; d++) {
          if (cards[d].type == 'user') {
            cards[d].label = `Welcome, ${ user.fullName }`;
            cards[d].data = user;
          }
        }
        this.setState({ cards: cards });
      }
    },

    onMouseEnter(id){
      this.setState({ hovered: id })
    },

    onMouseLeave(id){
      this.setState({ hovered: '' })
    },

    openPopup(player){
      // console.log(player)
      //
      // let { url, img } = _.find(urls, ['title' , 'stats' ]);
      // var limit = true; //type === 'stats';
      // this.getInfo(url, player.id, limit)
      core.tree.set(['player','popup', 'player'], player);
      core.emit('get.Player.data', { player: player , type: 'stats' });
    },

    renderUser(user){
      // console.debug('user => ',  user)
      // var { user } = this.state;
      // console.debug('user => ',  user)
      if (_.isEmpty(user)) return (<span>no data</span>);
      else return (<div><img src={ user.avatar }/></div>);

    },

    renderNews(data){
       return (<span>no news</span>);
    },
    renderPlayerCard(player, i){
      let { hovered } = this.state;

      let images = {
        team: { width: '100%', position: 'absolute', left: 0, top: '-30px', opacity: '.3', right: 0, zIndex: -1, },
        player : { maxHeight: '50%', bottom: 0, position: 'absolute', right: 0, zIndex: 1, }
      }

      let card = {
        transition: 'box-shadow 0.23s ease',
        cursor:'pointer',
        boxShadow: hovered === player.id ? '0px 8px 14px rgba(0, 0, 0, 0.12) , 0px 6px 8px rgba(0, 0, 0, 0.50) ':'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
      }
      const getSubtitle = () => {
        return (
          <div>
            <b>{player.teamName}</b>
          </div>
        );
      }

      return (
        <GridTile
          onMouseEnter={ this.onMouseEnter.bind(this, player.id) }
          onMouseLeave={ this.onMouseLeave.bind(this, player.id) }
          key={ i }
          onTouchTap={ this.openPopup.bind(this, player) }
          style={ card }

          title={ player.firstName+' '+player.lastName }
          subtitle={ getSubtitle() }
        >

          <img src={ `${ imgUrl }${ player.id }.png` } style={ images.player }/>
          <img src={ `${ teamUrl }${ player.teamLogo }` } style={ images.team }/>
        </GridTile>
      )
    },

    renderCardData(card){
      var { data, type } = card;

      switch (type) {
        case 'user':
            return this.renderUser(data)
        case 'news':
            return this.renderNews(data)

      }
    },

    renderHomeCards(card, i){
      var diff = {
         width: i == 1 ? 'auto' : '275px',
         marginLeft: i == 1 ? 0 : 15,
         flex: i == 1 ? 1 : 'none'
      }
      return (
        <Paper key={ i } style={{ ...styles.paper , position: 'relative', ...diff }}>
          <Subheader style={ styles.subheader }>
            { card.label }
          </Subheader>
          { this.renderCardData(card) }
        </Paper>
      )
    },

    render(){
      let { myplayers, cards } = this.state;
      console.log('this.state -> ',  this.state)
      return (
        <div style={ styles.wrap }>
           <div style={{ height: 450, display:'flex', padding:'15px 0px' , flexDirection:'row', width: '100%', height: '100%' }}>
                { _.map(cards, this.renderHomeCards) }
            </div>
        </div>
      );
    }
  }
});
const styles = {
   paper : {
    display:'flex', flex: 1, width: '100%', overflow: 'auto', flexDirection: 'column',
    margin: '0 15px',
    // boxShadow: 'rgba(0, 0, 0, 0.107647) 0px 1px 2px, rgba(0, 0, 0, 0.107647) 0px 1px 1px'
  },
  subheader: {
    backgroundColor: '#323e51',
    position: 'relative',
    fontSize: '12px',
    fontWeight: '700',
    color: '#E0F2F1',
    display: 'flex',
    height: 48,
    justifyContent: 'space-between',
  },
  listItem: {
    padding: '10px 15px !important', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
  },
  wrap: { height: '100%' },
};
