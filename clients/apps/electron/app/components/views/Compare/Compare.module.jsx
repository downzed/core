
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import CircularProgress from 'material-ui/CircularProgress';
import LazyLoad from 'react-lazyload';

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
const copy = (obj) => {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
};
var stats = {
  'BLK': 'Blocks',
  'FGA': 'FG Attemptes',
  'OREB': 'Off. Rebounds',
  'STL': 'Steals',
  'DREB': 'Def. Rebounds',
  'FGM': 'FG Made',
  'FG3A': '3 Points Attempts',
  'FTA': 'Free Throws Attempts',
  'MIN': 'Minutes',
  'PF': 'Personal Fouls',
  'TOV': 'Turnovers',
  'FG3M': '3 Points Made',
  'FTM': 'Free Throws Attempts',
  'PTS': 'Points',
  'REB': 'Rebounds',
  'AST': 'Assists'
};

core.Component('view.Compare', ['player.ListItem'], (PlayerItem)=>{
  return {
      bindings: {
        players: ['allPlayers']
      },

      getInitialState(){
        return {
          selected: 'players', // Rotoworld
          selectedOpt: { label: 'Last Name', type: 'LastName' },
          list: [],
          originalList: [],
          query: '',
          isLoading: true,
          toggleSearch: false,
          hoverID: null,
          form: {
            'Target Players': [],
            'My Players': []
          },
          pageNumber: 1,
          total: 0
        }
      },

      componentWillMount(){
        // this.initForm();
        core.on('players.loaded', ({ players, total })=>{
          setTimeout(() => {
            if (players && players instanceof Array) {
              var list = _.orderBy(players, 'LastName');
              this.setState({ total: total, players: list, originalList: list, isLoading: false });
            }
          }, 250);
        })
      },

      initForm(){
        this.setState({
          form: {
            'Target Players': [],
            'My Players': []
          }
        });
      },

      componentDidMount(){
        if (!this.state.players || !this.state.players.length) {
          var data = core.tree.get('allPlayers');
          if (data && typeof data !== 'undefined'){
            var { players, total } = data;
            if (players && players instanceof Array) {
              var list = _.orderBy(players, 'LastName');
              this.setState({ total: total, players: list, originalList: list, isLoading: false });
            } else return;
          }
        }
      },

      renderPlayersList(list){
        if (list && list.length) {
          return (
            <List style={{ fontSize: 12, overflow: 'auto', flex: 1, padding: '0px !important' }}>
              { _.map(list, this.renderList) }
            </List>
          );
        }
        return null;
      },

      renderComparePlayers(ids, title){
        var { players } = this.state;
        if (!ids || !ids.length) return null;
        var mlist = _.filter(players, (item)=>{
          return ids.indexOf(item.PlayerID) > -1;
        });
        if (!mlist || !mlist.length) return null;
        else mlist = _.map(mlist, (item)=>{
          return {
            ...item,
            isInComapre: true
          }
        })
        return (
           <List style={{ fontSize: 12, width: '100%', padding: '0px !important', overflow: 'auto', height: '100%' }}>
              { _.map(mlist, this.renderComparedList) }
            </List>
        )
      },

      renderComparedList(item, key){
        return (
          <PlayerItem key={ key } item={ item } onRemove={ this.removePlayer } selectedOpt={ this.state.selectedOpt }/>
        );
      },

      renderList(item, key){
        const placeholder = () => {
          return (
            <div style={{ ...styles.listItem, justifyContent: 'center' }}>
                Loading
            </div>
          )
        }

        if (item.isInComapre) return null;
        return (
          <LazyLoad height={45} key={ key } once={ true } resize={ true }
                    overflow={ true }
                    unmountIfInvisible={ true }
                    placeholder={ placeholder() }
                    offset={[-15, 0]} debounce={350}>
            <PlayerItem item={ item } onAdd={ this.addTo } selectedOpt={ this.state.selectedOpt } />
          </LazyLoad>

        );
      },

      addTo(where, id){
        var { form, list, selectedOpt, players } = this.state;
        var temp = copy(form)
        // console.log(id, where)
        temp[where].push(id);
        this.setState({ form: temp, isLoading: true });
        var _that = this;
        // setTimeout(function() {
        this.sortBy(selectedOpt)
        // }, 350);
      },

      removePlayer(id){
        var { form, players, originalList  } = this.state;
        var index, temp = []//copy(form);
        for (var x in form) {
          if (form[x] && form[x].length) {
            for (var i = 0; i < form[x].length; i++) {
              if (form[x][i] === id) {
                form[x] = _.filter(form[x], (item)=>{
                  return item !== id
                })
                break;
              }
            }
          }
        }
        temp = form;
        this.setState({ form: temp });
        this.filterList(originalList, true)
      },

      filterList(list, updateState){
        var { form } = this.state;
        var mlist = list, ids = [];
        for (var d in form) {
          if (form[d].length){
            for( var x = 0; x < form[d].length; x++) {
              ids.push(form[d][x])
            }
          }
        }
        if (ids && ids.length) {
          mlist = _.map(list, (item)=>{
            if (ids.indexOf(item.PlayerID) > -1) {
              return { ...item, isInComapre: true }
            }
            else {
              return { ...item, isInComapre: false }
            }
          });
        }
        if (!updateState) return mlist;
        this.setState({ players: mlist, isLoading: false, searchLoading: false })
      },

      makeCompare(){
        core.run('comparePlayers', { form: { ...this.state.form, Period: '364' } })
            .then((data)=>{
              core.emit('compared.players', data);
            })
      },

      toggleSearchPlayers(){
        var { toggleSearch } = this.state;
        this.setState({ toggleSearch: !toggleSearch });

      },

      onSearchPlayers(){
        let { list, players, originalList, query, searchLoading } = this.state;
        this.setState({ searchLoading: true })
        var temp;
        if (!query) {
          temp = this.filterList(originalList, false);
        } else {
          temp  =  _.filter(players, o => {
            return o.Name.toLowerCase().indexOf(query.toLowerCase()) > -1 || o.LastName.toLowerCase().indexOf(query.toLowerCase()) > -1
          });
        }
        temp = _.sortBy(temp, 'LastName');

        // setTimeout(()=>{
          this.setState({ players: temp, searchLoading: false })
        // }, 1500)
      },

      onReset(){
        this.initForm();
        this.setState({ query: '', isLoading: true });
        setTimeout(()=>{
          this.filterList(this.state.originalList, true);
          this.setState({ selectedOpt: { type: 'LastName', label: 'Last Name' }, isLoading: false })
        }, 350);
      },

      onKeyDown(e, string){
        this.setState({ query: string })
      },

      renderToolbar(){
        var { toggleSearch, query } = this.state;
        var textfield = {
          transition: 'margin 0.15s ease-in-out, width 0.10s ease-in-out',
          marginLeft: toggleSearch ? 15 : 0,
          marginRight: 15,
          width: toggleSearch ? '145px' : '0px',
          fontSize: '12px'
        }
        var fieldWrap = {
          transition: 'all 0.10s ease-in-out',
          opacity: toggleSearch ? '1' : '0',
          width: toggleSearch ? '175px' : '0px',
          display: 'flex'
        }
        var icon = { display: 'flex', alignItems: 'center', fontSize: 18, cursor: 'pointer' };
        return (
          <Toolbar style={{ width: '100%', paddingRight: 0, background: '#fff', borderBottom: '1px solid #dedede' }}>
            <ToolbarGroup firstChild={true}>
              <FontIcon className="material-icons"
                        onTouchTap={ this.toggleSearchPlayers }
                        style={ icon }>
                        search
              </FontIcon>

              <div style={ fieldWrap }>
                <TextField id={ 'search_players' } underlineStyle={{ borderColor: 'rgb(0, 188, 212)' }} style={ textfield } value={ query } onChange={ this.onKeyDown } />
                <FontIcon className="material-icons"
                          disabled={ !this.state.query }
                          onTouchTap={ this.onSearchPlayers }
                          style={{ ...icon, marginRight: '0.5em' }} >
                          navigate_next
                </FontIcon>
                <FontIcon className="material-icons"
                          onTouchTap={ this.clear }
                          disabled={ !this.state.query }
                          style={{ ...icon, fontSize: 16 }} >
                          clear
                </FontIcon>
              </div>
              <ToolbarSeparator />
            </ToolbarGroup>
            <ToolbarGroup >
              <FlatButton labelStyle={{ fontSize: 12 }} disabled={ this.getDisabled('list') } label="reset" onTouchTap={ this.onReset } />
                <ToolbarSeparator style={{ marginLeft: 0 }}/>
              <FlatButton labelStyle={{ fontSize: 12 }} disabled={ this.getDisabled('form') } label="compare" primary={true} onTouchTap={ this.makeCompare } />
            </ToolbarGroup>
          </Toolbar>
        )
      },

      clear(){
        this.setState({ query: '', toggleSearch: false });
        setTimeout(()=>{
          this.onSearchPlayers()
        }, 250);
      },

      getDisabled(type){
        var { form } = this.state;
        switch (type) {
          case 'form':
            return _.isEmpty(form) || _.isEmpty(form['Target Players']) || _.isEmpty(form['My Players'])
          case 'list':
            if (!_.isEmpty(form['Target Players']) || !_.isEmpty(form['My Players'])) return false;
            else return true;
        }
      },

      getTotal(){
        var { total, form } = this.state;
        var realTotal;
        var num = Number(total) - Number(form['My Players'].length) - Number(form['Target Players'].length);
        return num;
      },

      renderOptions(){
        var { players } = this.state;
        var options = [];
        if (!players || !players.length) return null;
        options = _.map(stats, (val , stat) => {
            return {
              type: stat,
              label: val
            };
        } );
        options.push({ type: 'Name', label: 'First Name' }, { type: 'LastName', label: 'Last Name'});
        options = _.sortBy(options, 'label');
        return _.map(options, (opt, i)=>{
          return <MenuItem value={ opt.type } key={ i } primaryText={ opt.label }  onTouchTap={ (e)=> { this.sortBy(opt); } }/>
        });
      },

      renderPlayersHeader(){
        var { selectedOpt } = this.state;
        var sort = {
          marginRight: 15
        }
        const style = (i) => { return {
            cursor: 'pointer',
            width: '40px',
            textAlign: 'center',
            marginRight : (i === ms.length -1) || i === 'sel' ? 30 : 10
        }}
        const mainStats = () => {

          return _.map(ms, (opt, i)=>{
            return (
              <span key={ i } onClick={ () => { this.sortBy(opt) } }  style={ style(i) }>
                { opt.type }
              </span>
            );
          });
        }

        return (
          <Subheader style={ styles.subheader }>
            Players by { selectedOpt.label }
            <div style={{ display: 'flex' }}>
              {/* mainStats() */}
              <IconMenu iconStyle={{ color: '#fff', fontSize: 14 }} menuStyle={{ fontSize: 14 }} style={{ marginRight: '45px'}}
                  iconButtonElement={
                      <IconButton
                          tooltip="Sort by"
                          iconClassName="material-icons">
                          sort
                      </IconButton>
                  }
                  menuStyle={{ fontSize: 12 }}
                  anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
                  maxHeight={202}>
                  { this.renderOptions() }
              </IconMenu>
              <Badge secondary={ true } badgeContent={ this.getTotal() }
                    style={ styles.badgeWrap }
                    badgeStyle={ styles.badge(true) } />
            </div>
          </Subheader>
        )
      },

      sortBy(obj){
        let { players, searchLoading, isLoading } = this.state;
        this.setState({ searchLoading: true, isLoading: true })
        var temp;
        if (!obj) {
          temp = this.filterList(players, false);
        }
        else {
          var { type, label } = obj;
          if ((type.toLowerCase() !== 'lastname') && (type.toLowerCase() !== 'name') ) {
            temp = temp = _.orderBy(players, `Statistics.${type}`, ['desc']);
          }
          else {
            temp = _.orderBy(players, type, ['asc']);
          }
        }

        this.filterList(temp, true);
        this.setState({ selectedOpt: obj });

      },

      render () {
        let { players, isLoading, searchLoading, form } = this.state;

          return (
            <div style={ styles.wrap }>
              { this.renderToolbar() }
               <div style={{ display:'flex', padding: 15 , flexDirection:'row', width: '100%', height: '100%' }}>
                  <Paper style={{ ...styles.paper, position: 'relative' }} onScroll={ this.onScroll }>
                    <div>
                      { this.renderPlayersHeader() }
                    </div>
                    { this.renderPlayersList(players) }
                    <div style={{ ...styles.spinner, display: searchLoading || isLoading ? 'flex' : 'none' }}>
                      <CircularProgress style={{  opacity: searchLoading || isLoading ? 1 : 0 }} />
                    </div>
                  </Paper>

                  <div style={{ display:'flex', flex: 1, flexDirection: 'column', marginLeft: 15 }}>
                    <Paper style={ styles.paper } onScroll={ this.onScroll }>
                      <Subheader style={ styles.subheader }>
                        Give Players
                        <Badge primary={ true } badgeContent={ form['My Players'].length }
                            style={ styles.badgeWrap }
                             badgeStyle={ styles.badge(false) }/>
                      </Subheader>
                      { this.renderComparePlayers(form['My Players']) }
                    </Paper>

                    <Paper style={{ marginTop: 15, ...styles.paper }} onScroll={ this.onScroll }>
                      <Subheader style={ styles.subheader }>
                        Get Players
                        <Badge primary={ true } badgeContent={ form['Target Players'].length }
                               style={ styles.badgeWrap }
                               badgeStyle={ styles.badge(false) }/>
                      </Subheader>
                      { this.renderComparePlayers(form['Target Players']) }
                    </Paper>
                  </div>
              </div>
            </div>
          );
      }
  }
});
const displayStat = (selectedOpt) => {
  return {
    display: (selectedOpt.type.toLowerCase() !== 'lastname') ||  (selectedOpt.type.toLowerCase() !== 'name') ? 'flex' : 'none'
  }
}
const styles = {
  spinner: {
    position: 'absolute',
    top: '50px',
    bottom: '0',
    left: '0',
    display: 'flex',
    right: '0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: 'rgba(255,255,255,0.6)'
  },
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
    image: { maxWidth: '100%' }
  },
   paper : {
    display:'flex', flex: 1, width: '100%', overflow: 'auto', flexDirection: 'column',
    boxShadow: 'rgba(0, 0, 0, 0.107647) 0px 1px 2px, rgba(0, 0, 0, 0.107647) 0px 1px 1px'
  },
  subheader: {
    backgroundColor: '#323e51',
    position: 'relative',
    fontSize: '12px',
    fontWeight: '700',
    color: '#E0F2F1',
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItem: {
    padding: '10px 15px !important', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
  },
  wrap: { height: '100%', paddingBottom: '60px' },
  badgeWrap: { position: 'absolute',  right: '15px',  top: '12px', fontSize: 12 },
  badge: (primary) => { return { width: '34px', height: '24px', borderRadius: '15%', background: primary ? 'rgba(70, 187, 194, 0.5)': 'rgba(255, 64, 129, .35)'   } }
};
