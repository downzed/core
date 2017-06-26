
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { transparent } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
}
core.Component('view.Compare', ['RotoPlayer'], (RotoPlayer)=>{
  return {

      getInitialState(){
        return {
          selected: 'players', // Rotoworld
          players: [],
          selectedOpt: 'Last Name',
          list: [],
          origList: [],
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
        this.initForm();
        core.on('players.loaded', ({ players, total })=>{
          setTimeout(() => {
            this.setState({ total: total, players: _.orderBy(players, 'LastName') })
            this.handleList(players);
          }, 250);
        })

      },

      componentDidMount(){
        // this.loadPlayers(this.state.pageNumber, this.handleList);

        // setTimeout(() => {
        //   this.loadMore(2)
        //   setTimeout(() => {
        //     this.loadMore(3)
        //   }, 1000);
        // }, 1000);
        
      },
      // loadPlayers(pageNumber, callback) {
      //   core.run('getPlayersByPage' ,{ period: '365', page: pageNumber })
      //       .then(({ data, isError })=>{
      //         if (isError) return;
      //         else {
      //           var { Players, total } = data;
      //           if (Players && total) {
      //             this.setState({ total: total });
      //             if (callback) callback(this.state.players)
      //           }
      //         }
      //       }); 
      // },
      
      // loadMore(number){
      //   var { list } = this.state;
      //   var temp;
      //   this.setState({ isLoading: true })
      //   const addMorePlayers = (players) => {
      //     temp = list.concat(players);
      //     temp = _.sortBy(temp, 'LastName');
      //     this.setState({ list: temp, origList: temp, isLoading: false, pageNumber: number })
      //   }
      //   this.loadPlayers(number, addMorePlayers)
      // },

      initForm(){
        this.setState({
          form: {
            'Target Players': [],
            'My Players': []
          }
        });
      },

      handleList(players){
        var list, chunks;
        if (players && players instanceof Array) {
          list = _.sortBy(players, 'LastName');
          this.setState({ origList: list, list: list, isLoading: false });
        } 
        // console.debug('players => ', players);
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

      renderComparedList(item, key){
        let { selected, isLoading, list } = this.state;
        // console.log(item)
        let style = {
          transition: 'all 0.2s ease-in-out 0.1s',
          WebkitTransition: 'all 0.2s ease-in-out 0.1s',
          opacity: isLoading ? 0 : 1,
          transform: isLoading  ? 'scale(0.4)' : 'scale(1)',
          WebkitTransform: isLoading  ? 'scale(0.4)' : 'scale(1)'
        }
        return (
          <ListItem key={ key }
                innerDivStyle={ styles.listItem }
                primaryText={ this.renderPrimary(item) }
                leftIcon={ <FontIcon className="material-icons" style={{
                      height: 'auto',
                      width: 'auto',
                      top: '0',
                      margin: '0 5px 0 0',
                      left: '0',
                      position: 'relative',
                      fontSize: '18px'
                 }}>person</FontIcon> }
                secondaryTextLines={ 1 }
              />

        );
      },

      renderList(item, key){
        let { selected, isLoading } = this.state;
        let style = {
          transition: 'all 0.2s ease-in-out 0.1s',
          WebkitTransition: 'all 0.2s ease-in-out 0.1s',
          opacity: isLoading ? 0 : 1,
          transform: isLoading  ? 'scale(0.4)' : 'scale(1)',
          WebkitTransform: isLoading  ? 'scale(0.4)' : 'scale(1)'
        }

        const placeholder = () => {
          return (
            <div style={{ ...styles.listItem, justifyContent: 'center' }}>
                Loading
            </div>
          )
        }
        if (item.isInComapre) console.log(item)
        if (item.isInComapre) return null;
        return (
          <LazyLoad height={45} key={ key } once={ true } resize={ true } overflow={ true } placeholder={ placeholder() } offset={[-90, 0]} debounce={500}>
            <ListItem key={ key }
                  innerDivStyle={ styles.listItem }
                  primaryText={ this.renderPrimary(item, key) }
                  leftIcon={ <FontIcon className="material-icons" style={{
                        height: 'auto',
                        width: 'auto',
                        top: '0',
                        margin: '0 5px 0 0',
                        left: '0',
                        position: 'relative',
                        fontSize: '18px'
                  }}>person</FontIcon> }
                  secondaryTextLines={ 1 }
                />
          </LazyLoad>

        );
      },

      onMouseEnter(id){
        this.setState({ hoverID: id })
      },
        
      onMouseLeave(){
        this.setState({ hoverID: null })
      },

      renderPrimary(item, i){
        var { hoverID, selectedOpt } = this.state;
        var { Name, LastName, PlayerID, isInComapre, Statistics, teamLogo } = item;
        var primary = {
          wrap: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

          },
          buttons: {
            fontSize: 16,
            width: 26,
          },
          smallIcon: {
            height: 26,
          },
          add: {
            display: isInComapre ? 'none' : 'flex',            
          },
          remove: { 
            display: !isInComapre ? 'none' : 'flex',
          }
        }
        const getFontWeight = (i) => {
          if (i <= 2 ) return 700
          else return 500
        }
        const renderStat = () => {
          if (isInComapre || !selectedOpt || selectedOpt.toLowerCase() === 'first name' || selectedOpt.toLowerCase() === 'last name') {
            return null;
          } else return <span style={{ marginRight: 15, fontWeight: getFontWeight(i) }}>{ Statistics[selectedOpt] } </span>
        };
        return (
          <div style={ primary.wrap }  >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              { LastName }, { Name }
              { renderStat() }
            </div>
  
            <div style={{ flex:'0 auto', ...primary.add }}>
              <IconButton style={{ marginRight: 2.5 }}
                  iconStyle={{ fontSize: 16 }}
                  iconClassName="material-icons"
                  onTouchTap={ (e)=>{ this.addTo('Target Players', PlayerID) } }>
                  add_shopping_cart
              </IconButton>

              <IconButton
                  iconClassName="material-icons"
                  iconStyle={{ fontSize: 16 }}
                  onTouchTap={ (e)=>{ this.addTo('My Players', PlayerID) } }>
                remove_shopping_cart
              </IconButton>
            </div>
            <div style={{ flex:'0 auto', ...primary.remove }}>
              <IconButton iconStyle={{ fontSize: 16 }}
                  iconClassName="material-icons"
                  onTouchTap={ (e)=>{ this.removePlayer(PlayerID) } }>
                  remove_circle
              </IconButton>
            </div>
  
          </div>
        )
      },

      addTo(where, id){
        var { form, list, origList,selectedOpt, players } = this.state;
        var temp = copy(form)
        // console.log(id, where)
        temp[where].push(id);
        this.setState({ form: temp, isLoading: true });
        var _that = this;
        // setTimeout(function() {
        this.filterBy(selectedOpt)
        // }, 350);
      },
      
      removePlayer(id){
        var { form, list, origList  } = this.state;
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
        this.filterList(origList, true)
      },

      filterList(list, updateState){
        var { form, selectedOpt } = this.state;
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
        this.setState({ list: mlist, isLoading: false, searchLoading: false })
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
        let { list, players, origList, query, searchLoading } = this.state;
        this.setState({ searchLoading: true })
        var temp;
        if (!query) {
          temp = this.filterList(players, false);
        } else {
          temp  =  _.filter(players, o => {
            return o.Name.toLowerCase().indexOf(query.toLowerCase()) > -1 || o.LastName.toLowerCase().indexOf(query.toLowerCase()) > -1
          });
        }
        temp = _.sortBy(temp, 'LastName');

        // setTimeout(()=>{
          this.setState({ list: temp, searchLoading: false })
        // }, 1500)
      },

      onReset(){
        this.initForm();
        this.setState({ query: '' });
        this.filterList(this.state.players, true);
        this.setState({ selectedOpt: 'Last Name' })
      },

      onKeyDown(e, string){
        this.setState({ query: string })
      },

      onScroll(e){
        // var { total, pageNumber, origList } = this.state;
        // total = Number(total);
        // console.log(origList.length,'::', total)
        // var { clientHeight, scrollHeight, scrollTop } = e.target;
        // if (scrollHeight - scrollTop === clientHeight) {
        //   if (total >= origList.length) {
        //     pageNumber += 1;
        //     this.loadMore(pageNumber)
        //   }
        // }
      },

      renderComparePlayers(ids, title){
        var { origList, players } = this.state; 
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
           <List style={{ fontSize: 12, width: '100%', padding: '0px !important'}}>
              { _.map(mlist, this.renderComparedList) }
            </List>
        )
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
        var { form, list, origList } = this.state;
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
        options = _.map(players[0].Statistics, (val , stat) => {
          return stat;
        } );
        options.unshift('First Name');
        options.unshift('Last Name');
        return _.map(options, (opt, i)=>{
          return <MenuItem value={ opt } key={ i } primaryText={ opt }  onTouchTap={ (e)=> { this.filterBy(opt); } }/>
        });;
      },  
      
      renderPlayersHeader(){
        var { selectedOpt } = this.state;
        return (
          <Subheader style={ styles.subheader }>
            Players by { selectedOpt }
            <IconMenu iconStyle={{ color: '#fff', fontSize: 14 }} style={{ marginRight: '45px'}}
                iconButtonElement={
                    <IconButton
                        tooltip="filter list"
                        iconClassName="material-icons">
                        filter_list
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
                  badgeStyle={ styles.badge(true) }/>
          </Subheader>
        )
      },
     
      filterBy(obj){
        let { players, origList, list, searchLoading, isLoading } = this.state;
        this.setState({ searchLoading: true, isLoading: true })
        var temp;
        if (!obj) {
          temp = this.filterList(players, false);
        } else {
          if (obj.toLowerCase() === 'last name') temp = _.sortBy(list, 'LastName');
          else if (obj.toLowerCase() === 'first name') temp = _.sortBy(list, 'Name');
          else {
            temp = _.orderBy(players, `Statistics.${obj}`, ['desc']);
          }
        }
        this.filterList(temp, true)
        this.setState({ selectedOpt: obj })
      },

      render () {
        let { type, list, players, isLoading,  searchLoading, form, total } = this.state;
       
          return (
            <div style={ styles.wrap }>
              { this.renderToolbar() }
               <div style={{ display:'flex', padding: 15 , flexDirection:'row', width: '100%', height: '100%' }}>
                  <Paper style={{ ...styles.paper, position: 'relative' }} onScroll={ this.onScroll }>
                    <div>
                      { this.renderPlayersHeader() }
                    </div>
                    { this.renderPlayersList(list) }
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
              <canvas id="myCanvas" style={{ display: 'none', width: '300px', height: '300px' }}></canvas>
            </div>
          );
      }
  }
});
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
  listItem: { padding: '10px 15px', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' },
  wrap: { height: '100%', paddingBottom: '60px' },
  badgeWrap: { position: 'absolute',  right: '15px',  top: '12px', fontSize: 12 },
  badge: (primary) => { return { width: '34px', height: '24px', borderRadius: '15%', background: primary ? 'rgba(70, 187, 194, 0.5)': 'rgba(255, 64, 129, .35)'   } }
};
