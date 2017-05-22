
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { transparent } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

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

core.Component('RotoPlayer', ['RotoPlayerDialog'], (RotoPlayerDialog)=>{
  return {

      getInitialState(){
        return {
          player: {},
          popupType: 'stats',
          showPopup: false,
          isLoading: true,
          urls: urls
        }
      },

      openPopup(type, player){
        console.log(type)
        console.log(player)
        let { url, img } = _.find(urls, ['title' , type ]);
        var limit = type === 'stats';
        this.getInfo(url, player.id, limit)

      },

      getInfo(url, id, limit){
        var playersJson;
        if (!limit) {
          url += id +'&limit=3';
        } else url += id;
        return new Promise((resolve, reject) => {
          sa.get(url)
            .end((err, res) => {
              console.dir(res);
              if (res && res.status === 200){
                if (!_.isEmpty(res.body)) {
                  if (!limit) this.setNews(res.body.PlayerRotowires);
                  else this.setDetails(res.body.resultSets[0])
                }
              }

          });
        });
      },

      setNews(news){
        this.setState({ data: news , showPopup: true, popupType: 'news'})
      },

      setDetails(data, limit){
        var gameObjects = [], header, temp, stats, list;

        for (let i = 0; i < data.rowSet.length; i++) {
            var gameRow = data.rowSet[i];
            gameObjects.push(gameRow)
        }

        stats = _.map(gameObjects, (game)=>{
          return _.zipObject(data.headers, game)
        });

        this.setState({ data: stats, showPopup: true, popupType: 'stats' });

      },

      handleClose(){
        this.setState({ showPopup: false });
      },

      render () {
        let { showPopup, data, popupType } = this.state;
        let { player, selected, isLoading } = this.props;
        const selectedStyle = selected.toLowerCase() === 'rotoworld' ? { maxWidth: '100%' } : { maxHeight: '100%' }
        let style = {
          transition: 'all 0.2s ease-in-out 0.1s',
          WebkitTransition: 'all 0.2s ease-in-out 0.1s',
          opacity: isLoading ? 0 : 1,
          transform: isLoading  ? 'scale(0.4)' : 'scale(1)',
          WebkitTransform: isLoading  ? 'scale(0.4)' : 'scale(1)'
        }
        const iconButtonElement = (
          <IconButton touch={true} >
            <MoreVertIcon />
          </IconButton>
        );

        const rightIconMenu = (
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={ this.openPopup.bind(this, 'stats', player) }>Stats</MenuItem>
              <MenuItem onTouchTap={ this.openPopup.bind(this, 'news', player) }>News</MenuItem>
          </IconMenu>
        );
        return(
          <div>
            <ListItem
              rightIconButton={ rightIconMenu }
              leftAvatar={
                <Paper style={{ ...styles.avatar.paper, ...style }} zDepth={ 2 } circle={ true }>
                  <img style={ selectedStyle } id={ player.id } />
                </Paper>
              }
              primaryText={ player.DISPLAY_LAST_COMMA_FIRST }
              secondaryText={ player.TEAM_CITY + ' ' + player.TEAM_NAME }
            />
          <RotoPlayerDialog showPopup={ showPopup } data={ data }
            player={ player }
            type={ popupType }
            handleClose={ this.handleClose }
            primaryLabel={ player.DISPLAY_LAST_COMMA_FIRST  }
            secondaryLabel={ player.TEAM_CITY + ' ' + player.TEAM_NAME }/>
          </div>

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
