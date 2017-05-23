
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
    title : 'players',
    url : 'http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=2016-17',
    img: `http://stats.nba.com/media/players/230x185/`
  },
  {
    title : 'Roto Wire',
    url : 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?v=717525&limit=10',
    img: `http://stats.nba.com/media/players/230x185/`
  },
];

const returnAvatar = (id, uri, type) => {
  run(`${uri}${id}.png`)
  function run(uri){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      try {
        document.getElementById(id).src = window.URL.createObjectURL(xhr.response);
      } catch (e) {
        // console.error(e)
      }
      // return window.URL.createObjectURL(xhr.response);
    }
    xhr.open('GET', uri, true);
    xhr.send();
  }

};

core.Component('view.RotoPlayers', ['RotoPlayer'], (RotoPlayer)=>{
  return {

      getInitialState(){
        return {
          selected: 'players', // Rotoworld
          players: [],
          list: [],
          urls: urls,
          listItemOpen: false,
          isLoading: true,
        }
      },

      getRss(url){
        this.setState({ isLoading: true })
        var playersJson;
        return new Promise((resolve, reject) => {
          sa.get(url)
            .end((err, res) => {
              if (res && res.status === 200){
                if (!_.isEmpty(res.body)) {
                  this.setListItems(res.body.resultSets[0]);
                }
              }

          });
        });
      },

      setListItems(json){

        let { selected, img, players } = this.state;

        var playerObjects = [], header, temp, res, list;
        for (let i = 65; i < 615; i++) {
            var playerRow = json.rowSet[i];
            playerObjects.push(playerRow)
        }

        res = _.map(playerObjects, (player)=>{
          return _.zipObject(json.headers, player)
        }).filter( p => { return p.ROSTERSTATUS !== 0 });
        res = _.map(res, pl => {
          return {
            ...pl,
            id: pl.PERSON_ID,
          }
        })
        list = this.createList(res)
        this.setState({ list: list, players: res, entries: json });

      },

      componentDidMount() {
        this.loadUrl('players');
      },

      createList(res){
        let { img } = this.state;
        var list = { letters: [] };
        _.forEach(res, (player) => {
            var itLetter = player.DISPLAY_LAST_COMMA_FIRST.substring(0,1).toUpperCase();
            player.avatar = returnAvatar(player.id, img)
            if(!(itLetter in list)){
                list[itLetter] = [];
                list.letters.push(itLetter);
            }
            list[itLetter].push(player);
        });
        list.letters.sort();
        this.setState({ isLoading: false })
        return list;
      },

      loadUrl(selected) {
        let { urls } = this.state;
        let { url, img } = _.find(urls, ['title' , selected ]);
        this.setState({ selected, img });

        this.getRss(url);
      },

      handleSelectFeed(event, index, value) {
        this.loadUrl(value);
      },

      renderList(item, key){
        let { selected, isLoading, list } = this.state;

        let style = {
          transition: 'all 0.2s ease-in-out 0.1s',
          WebkitTransition: 'all 0.2s ease-in-out 0.1s',
          opacity: isLoading ? 0 : 1,
          transform: isLoading  ? 'scale(0.4)' : 'scale(1)',
          WebkitTransform: isLoading  ? 'scale(0.4)' : 'scale(1)'
        }

        return (
          <ListItem key={ key }
                style={{ height: '55px' }}
                leftAvatar={
                    <Avatar
                      style={{ ...style }}>
                      { item }
                    </Avatar>
                }
                primaryTogglesNestedList={ true }
                secondaryTextLines={ 1 }
                nestedItems={ [..._.map(list[item], this.renderNested)] }
              />

        );
      },

      renderNested(player, key) {
        let { selected, isLoading, list } = this.state;

        return (
          <RotoPlayer key={ key } player={ player } selected={ selected } isLoading={ isLoading } />
        )

      },

      renderSelectList(item, key){
        return (
          <MenuItem key={ key } value={ item.title } primaryText={ item.title } />
        );
      },

      filterPlayers(string){
        let { players } = this.state;
        var temp  =  _.filter(players, o => {
          return o.DISPLAY_FIRST_LAST.toLowerCase().indexOf(string.toLowerCase()) > -1 || o.DISPLAY_LAST_COMMA_FIRST.toLowerCase().indexOf(string.toLowerCase()) > -1
        });

        var xlist = this.createList(temp)
        this.setState({ list: xlist })
      },

      onKeyDown(e, string){
        const _makeSearchRequest = () => {
          this.filterPlayers(string)
        }

        const search = _.debounce( _makeSearchRequest, 250 );

        search();
      },

      render () {
        let { type, list, players, isLoading, urls, selected } = this.state;
          return (
            <div style={ styles.wrap }>
              <TextField id="filterPlayers"
                onChange={ this.onKeyDown }
                hintText="Filter Players"
                floatingLabelText="Filter Players"
              />
              {/*
              <SelectField
                 value={ selected }
                 onChange={ this.handleSelectFeed }
                 floatingLabelText="Read feed from">
                 { _.map(urls, this.renderSelectList) }
               </SelectField>
               */}



              <Paper style={{ width: '100%', overflow: 'auto' }}>
                { list.letters && list.letters.length ?
                  <List>
                    { _.map(list.letters, this.renderList) }
                  </List>
                : null }
              </Paper>

              <RaisedButton
                icon={<FontIcon className={isLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-refresh'} />}
                onTouchTap={ this.loadUrl.bind(this, selected) }
                style={{ position:'absolute', right: 15, top: 15,
                  transition: 'all 0.5s ease-in',
                  WebkitTransition: 'all 0.5s ease-in',
                  }} />

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
