
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const returnAvatar = (id) => {

  run(`http://stats.nba.com/media/players/230x185/${id}.png`)

  function run(uri){
    console.log(uri)
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      try {
        return window.URL.createObjectURL(xhr.response);
      } catch (e) {
        console.error(e)
      }
      // return window.URL.createObjectURL(xhr.response);
    }
    xhr.open('GET', uri, true);
    xhr.send();
  }

};
// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
// const baseUrl = '
// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.fantasypros.com/nba/stats/rodney-stuckey.php&format=rss&num=30;

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

core.Component('RotoPlayerDialog', ['ui.Loader'], (Loader)=>{
  return {

      getInitialState(){
        return {
          open: this.props.showPopup,
          modes: ['news', 'stats']
        }
      },

      componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) console.debug('data', nextProps.data);
      },

      renderButtons(mode, key){
        const getClassName = () => {
          if (mode === 'news') return 'fa fa-newspaper-o';
          else return 'fa fa-pie-chart';
        }
        return ( <IconButton key={ key }
                  iconClassName={ getClassName() } tooltip={ mode.toUpperCase() }
                  tooltipPosition="bottom-center"
                />);
      },

      render () {
        let { primaryLabel, secondaryLabel, data, player, handleClose, showPopup } = this.props;
        if (!showPopup) return null; 
        return(
          <Drawer width={ 450 } openSecondary={ true } open={ showPopup } >
            <ListItem
              rightIconButton={ <IconButton onTouchTap={ handleClose } iconClassName={ 'fa fa-times' }/> }
              leftAvatar={
                <Paper zDepth={ 1 } circle={ true } style={ styles.avatar.paper } >
                  <img src={ showPopup ? returnAvatar(player.id) : null } style={{ maxWidth: '100%' }} id={ player.id } />
                </Paper>
              }
              primaryText={ player.DISPLAY_LAST_COMMA_FIRST }
              secondaryText={ player.TEAM_CITY + ' ' + player.TEAM_NAME }
            >
            { showPopup && data.length ? _.map(this.state.modes, this.renderButtons) : null }
            </ListItem>
          </Drawer>
        );
      }
  }
});
const styles = {
  avatar: {
    paper: {
      height: 45,
      width: 45,
      overflow:'hidden',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    },
    image: {
      maxWidth: '100%'
    }

  },

  wrap: {
    height: '100%',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};
