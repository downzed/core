var React = require('react');
var PropTypes = React.PropTypes;
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

const imgUrl =  `http://stats.nba.com/media/players/230x185/`;
const teamUrl = 'http://stats.nba.com/media/img/teams/logos/';
const urls = [
  {
    title : 'stats',
    url : 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
    img: `http://stats.nba.com/media/players/230x185/`
  },
  {
    title : 'news',
    url : 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
    img: `http://stats.nba.com/media/players/230x185/`
  },
];
const returnAvatar = (id, type, index, callback) => {
  if (type === 'player') {
    let  el = document.getElementById(id);
    if (el != null  && el.src && el.src.length) return;
    else {  run(`${imgUrl}${id}.png`, id, callback)}

  }
  else {
    let el = document.getElementById(index);
    if (el != null && el.src && el.src.length) return;
    else { run(`${teamUrl}${id}`, index, callback) }
  }

  function run(uri, idx, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      try {
        document.getElementById(idx).src = window.URL.createObjectURL(xhr.response);
        callback({ ok: true })
      } catch (e) {
        // console.error(e)

      }
      // return window.URL.createObjectURL(xhr.response);
    }
    xhr.open('GET', uri, true);
    xhr.send();
  }

};


core.Component('view.myZone', ['PlayerDialog'],
 (PlayerDialog)=> {
  return {

    bindings: {
      myplayers: ['myPlayers']
    },

    getInitialState(){
      return {
        hovered: '',
      }
    },

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.myplayers !== this.state.myplayers;
    // },

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
      core.tree.set(['player','popup', 'open'], true);
      core.tree.set(['player','popup', 'player'], player);
      core.emit('get.Player.data', { player: player , type: 'stats' });
    },

    renderPlayerCard(player, i){
      let { hovered } = this.state;
      returnAvatar(player.id, 'player', this.getBack)
      returnAvatar(player.teamLogo, 'team', i, this.getBack)

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

          <img id={ player.id } style={ images.player }/>
          <img id={ i } style={ images.team }/>
        </GridTile>
      )
    },
    render(){
      let { myplayers } = this.state;
      const loader = (show) => {
        var cp = {
          position:'absolute', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1,
          background: 'rgba(225,225,225,0.6)',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
        if (show) return (
          <div style={ cp }>
            <CircularProgress mode="indeterminate" />
          </div>
        )
        return null;
      }
      return (
        <div style={ zone.wrap }>
          <Card style={ { height: '100%', width: '100%'} }>
           <CardHeader
             title="Without Avatar"
             subtitle="Subtitle"
             avatar="http://www.rotoworld.com/images/headshots/NBA/2671.jpg"
           />
         {/*
           <CardActions>
             <FlatButton label="Action1" />
             <FlatButton label="Action2" />
           </CardActions>
           */}
           <CardText >
             <div style={ zone.players } className="zone-players" >
               <GridList
                  cols={ 3 }
                  padding={ 15 }
                  cellHeight={ 110 }
                  style={{ width: '100%', height: 600, overflowY: 'auto' }}
                >
                  { myplayers && myplayers.length ? _.map(myplayers, this.renderPlayerCard) : loader(true) }

                </GridList>

             </div>
           </CardText>
         </Card>

         <PlayerDialog />

        </div>
      );
    }
  }
});
let zone = {

  wrap: {
    height: '100%',
    width: '100%',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  players: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}
