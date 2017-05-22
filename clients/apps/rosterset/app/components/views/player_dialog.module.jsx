
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
var moment = require('moment');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';

import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';
import { cyan700, deepPurple100 } from 'material-ui/styles/colors';

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

core.Component('PlayerDialog', [], ()=>{
  return {

      bindings: {
        open: ['player','popup', 'open'],
        player: ['player','popup', 'player'],
        data: ['player','popup', 'data']
      },

      getInitialState(){
        return {
          loading: false,
          modes: ['news', 'stats'],
          attr: [
            { attr: 'MATCHUP', label: 'OPP' },
            { attr: 'GAME_DATE', label: '' },
            { attr: 'PTS', label: 'PTS' },
            { attr: 'AST', label: 'AST' },
            { attr: 'REB', label: 'REB' },
            { attr: 'STL', label: 'STL' },
            { attr: 'BLK', label: 'BLK' },
            { attr: 'FG3M', label: '3PM' },
            { attr: 'FG3A', label: '3PA' },
            { attr: 'FGM', label: 'FGM' },
            { attr: 'FGA', label: 'FGA' },
            { attr: 'FTM', label: 'FTM' },
            { attr: 'FTA', label: 'FTA' },
            { attr: 'TOV', label: 'TOV' },
            { attr: 'MIN', label: 'MIN' },
            { attr: 'WL', label: 'WL' },
          ],
          value: 'stats'
        }
      },

      componentDidMount() {
        core.on('get.Player.data', this.getData)
      },

      getData({ player, type }){
        // console.log('player', player)
        core.tree.set(['player','popup', 'data'], []);

        this.setState({ loading: true });
        let { url, img } = _.find(urls, ['title' , type ]);
        var limit = type === 'stats';
        this.getInfo(url, player.id, limit);
      },

      getInfo(url, id, limit){
        var playersJson;
        if (!limit) {
          url += id +'&limit=6';
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
        console.debug('news', news)

        news = _.map(news, (nooz)=>{
          return {
            ...nooz,
            Headline: nooz.lastUpdate,//nooz.Headline ? nooz.Headline.split(nooz.LastName+': ')[1] :
          }
        })
        core.tree.set(['player','popup', 'data'], news);
        setTimeout(()=>{
          if(this.isMounted())  this.setState({ loading: false });
        }, 2500)

      },

      setDetails(data, limit){
        var gameObjects = [], header, temp, games, list, gh = [];
        var { attr } = this.state;

        var headers = [];
        for (var x = 0; x < attr.length; x++) {
          headers.push(attr[x].attr);
        }
        for (let i = 0; i < data.rowSet.length; i++) {
            var gameRow = data.rowSet[i];
            gameObjects.push(gameRow)
        }

        games = _.map(gameObjects, (game)=>{
          return _.zipObject(data.headers, game)
        });

        var array = [];

        for (let g = 0; g < games.length; g++) {
          var obj = {};
          for (let i in headers) {
            if(_.has(games[g], headers[i])) {
              obj[headers[i]] = games[g][headers[i]]
            }
          }
          array.push(obj)
        }
        const findStr = (str) => {
          if (str.indexOf('vs.') > -1) {
            return str.substring(str.indexOf('vs.'))
          } else return str.substring(str.indexOf('@'))
        }
        array = array.map(item => {
          return {
            ...item,
            MATCHUP: findStr(item.MATCHUP),
            GAME_DATE: moment(new Date(item.GAME_DATE)).format('DD/MM/YY')
          }
        })
        core.tree.set(['player','popup', 'data'], array);
        setTimeout(()=>{
          if(this.isMounted())  this.setState({ loading: false });
        }, 2500)
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

      handleClose(){
        core.tree.set(['player','popup', 'open'], false)
        core.tree.set(['player','popup', 'data'], {})
        this.setState({ value: 'stats' })

      },

      handleChange(value){
        this.setState({ value: value })
        this.getData({ player: this.state.player, type: value });
      },

      renderHeaders(header, key){
        return (
          <TableHeaderColumn style={{ width: '45px !important', padding: '0.2em', fontSize: 10, height: 45 }} key={ key }>
            { header.label }
          </TableHeaderColumn>
        );
      },

      renderGameRow(game, key){
        return (
          <TableRow key={ key }>
            {
               _.map(game, this.renderCube)
            }
          </TableRow>
        );
      },
      renderCube(at, i) {
        // console.log(at)
        return (
          <TableRowColumn key={ i } style={{ width: '45px !important', padding: '0.2em', fontSize: 10, height: 43 }}>
            { at }
          </TableRowColumn>
        );
      },

      renderNews(item, key){
        let { loading } = this.state;
        let style = {
          transition: 'all 0.2s ease-in-out 0.1s',
          WebkitTransition: 'all 0.2s ease-in-out 0.1s',
          opacity: loading ? 0 : 1,
          transform: loading  ? 'scale(0.4)' : 'scale(1)',
          WebkitTransform: loading  ? 'scale(0.4)' : 'scale(1)'
        }
        let card = {
          height: '100%',
          fontSize: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        }
        return (

          <GridTile
            key={ key }
            style={ card }
            title={ <span style={{    left: '10px',
              position: 'absolute',
              fontSize: '13px',
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center', }}>{ item.Headline }</span> }
            titlePosition="top">
            <div
              style={{ height: '100%' ,
                overflowY: 'auto',
                padding: '55px 15px 15px 15px', backgroundColor: '#eee', marginLeft: 0, borderTop: '1px solid #ddd' }}>
              { item.ListItemDescription }
            </div>
          </GridTile>
              );
      },

      render () {
        let { player, open, value, attr, loading, data } = this.state;
        const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />
        ];
        const customContentStyle = {
          width: '95%',
          maxWidth: 'none',
        };

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

        return(
          <Dialog
            title={ open && player ? player.lastName : '' }
            actions={ actions }
            modal={ false }
            contentStyle={ customContentStyle }
            bodyStyle={{ padding: 0, maxHeight: '600px' }}
            autoScrollBodyContent={ false /* value !== 'stats' */}
            open={ open || false }
            onRequestClose={ this.handleClose }
          >
          { loader(loading) }

          <Tabs
             tabItemContainerStyle={{ backgroundColor: cyan700 }}
             inkBarStyle={{ backgroundColor: deepPurple100 }}
             style={{ padding: 0 }}
             value={ value }
             onChange={ this.handleChange }
           >
             <Tab label={ 'Stats' } value={ 'stats' } style={{ height: '100%' }} >

               { !loading && data && value === 'stats' ?
                 <Table fixedHeader={ true } height={ '405px' } bodyStyle={{ padding: '0 5px' }} headerStyle={{ padding: '0 5px' }}>
                    <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                      <TableRow>
                        { attr && _.map(attr, this.renderHeaders) }
                      </TableRow>
                    </TableHeader>

                    <TableBody showRowHover={ true } displayRowCheckbox={ false }>
                      { data && _.map(data, this.renderGameRow) }
                    </TableBody>

                  </Table>
                  : null  }

             </Tab>
             <Tab label={ 'News' } value={ 'news' }>

               { !loading && data && value === 'news' ?
                 <GridList
                    cols={ 3 }
                    padding={ 15 }
                    cellHeight={200}
                    style={{ margin: 0,width: '100%', height: 'auto', overflowY: 'auto' }}
                  >
                  { _.map(data, this.renderNews) }

                  </GridList>
               : null }
             </Tab>
           </Tabs>

        </Dialog>
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
