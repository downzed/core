
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
// var _ = window._;//
// console.dir(_);
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import * as Vibrant from 'node-vibrant';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

var teams = require('../assets/teams.js');
var allPlayers = core.tree.select('allPlayers');

core.Component('Index', ['core.App','Views', 'PlayerDialog', 'Stats.Diaglog'],
(App, Views, PlayerDialog, StatsDiaglog)=>{
  return {

      getInitialState(){
        return {
          apps: {},
          open: true ,
          popopen: false ,
          view: 'myZone',
          roster: {},
          name: 'Fantasy Edge',
          dialogOpen: false,
          comparedData: [],
          timeframe: '14',
          menuItems:  [
            { label: 'Home', icon: 'home', ref: 'myZone', active: false },
            { label: 'News', icon: 'description', ref: 'RotoNews', active: false },
            { label: 'Compare', icon: 'compare_arrows', ref: 'Compare', active: false },
            { label: 'SignIn', icon: 'settings', ref: 'SignIn', active: false }
          ]

        };
      },

      componentDidMount(){
        this.changeViews(this.state.view)
      },

      componentWillMount() {
          this.getPlayers();
          this.allPlayers = core.tree.select('allPlayers');
          core.on('compared.players', this.handleCompare);
      },

      getPlayers(period){
        var { allPlayers, timeframe } = this.state;
        if (!period) period = timeframe;
        core.run('getAllPlayers', { period })
            .then(({ isError })=>{
              if (isError) return;
              var { players, total } = this.allPlayers.get();
              // console.debug('players => ', players);
              // console.debug('total => ', total);
              var res = this.getTeams(players);
              res = _.sortBy(res, 'LastName');
              core.tree.set('allPlayers', { players: res, total: total });
              // { players: res instanceof Array ? res : [], total: total });
              // var res = this.getTeams(players, this.getColor);
              var chunks =  _.chunk(res, 13);
              var myplayers = chunks[6];
              core.emit('players.loaded',{ players: res, total: total })
              core.tree.set('players', chunks[5]);
              core.tree.set('myPlayers', chunks[5]);
            });
        //   this.setMax(res);
      },

      handleCompare(data){
        this.setState({ comparedData: data, dialogOpen: true })
      },

      getColor(players){
        const get = (src) => {
          if (!src) return '#fff';
          var r, g, b, pal;
          var x;
          Vibrant.from(src).getPalette((err, palette) => {
            if (err){ console.error(err); x = 'red'; }
            // if (palette && palette.hasOwnProperty('Vibrant')) {
            //     if (palette['Vibrant'].hasOwnProperty('_rgb')) {
                  // console.debug('palette[Vibrant][_rgb] => ',  palette['Vibrant']['_rgb'])
                  if (palette && palette['Vibrant'] !== null && palette['Vibrant']['_rgb']) {
                    pal = palette['Vibrant']['_rgb'];
                    r = pal[0];
                    g = pal[1];
                    b = pal[2];
                    x= `rgba(${r},${g},${b}, .6)`;
                  }
                // }
                else x = 'green'
            // }
          });
          return x;

        };
        return _.map(players, (player)=>{
          return {
            ...player,
            color:get(player.teamLogo)
          }
        })
      },

      getTeams(players, callback){
        var wteams = [];

        for (let x = 0; x < players.length; x++) {
          for (let t = 0; t < teams.length; t++) {
            if (Number(players[x].TeamID) === teams[t].teamId){
              wteams.push({
                ...players[x],
                ...teams[t],
                teamLogo: `http://stats.nba.com/media/img/teams/logos/${teams[t].abbreviation}_logo.svg`
              })
            }
          }
        }
        return wteams//callback(wteams)
      },

      setMax(players) {
        var rP, aP, pP;

        rP =_.maxBy(players, 'REB');
        aP = _.maxBy(players, 'AST');
        pP = _.maxBy(players, 'PTS');
        var max = {
          reb: { val: rP.REB, player: rP.firstName+' '+rP.lastName, id: rP.id },
          ast: { val: aP.AST, player: aP.firstName+' '+aP.lastName, id: aP.id },
          pts: { val: pP.PTS, player: pP.firstName+' '+pP.lastName, id: pP.id },
        };
        core.tree.set(['stats', 'max'], max);
        // console.dir(core.tree.get(['stats', 'max']));
      },

      handleModalCLose(){
        this.setState({ dialogOpen: false, comparedData: {} });
      },

      changeViews(view){
        var { menuItems } = this.state;

         menuItems = _.map(menuItems, (item)=>{
          return {
            ...item,
            active: item.ref === view
          }
        });
        this.setState({ view: view, menuItems: menuItems, open: true });
      },

      getLocalStorageDetails(details) {
        console.log('obj');
        this.setState({ roster: {...roster, ...details} })
      },

      renderMenu(){
        var { menuItems, view } = this.state;

        return _.map(menuItems, (item, i)=>{
          var { icon, label, ref, active } = item;
          var itemStyle = {
            icon: { color: active ? '#f2fafa':'#9196a6', fontSize: 18 },
            div: {  color: active ? '#f2fafa':'#9196a6', fontSize: 14, background: active ? '#46bbc2' : 'none' }
          }
          return (
            <MenuItem key={ i }
                      leftIcon={ <FontIcon style={ itemStyle.icon } className="material-icons">{ icon }</FontIcon> }
                      style={ itemStyle.div }
                      innerDivStyle={{ paddingLeft: 45, background: active ? '#46bbc2' : 'none'  }}
                      onTouchTap={ this.changeViews.bind(this, ref) }>{ label }</MenuItem>
          )
        });
      },

      handleTouchTap(e){
        e.preventDefault();
        this.setState({
          popopen: true,
          anchorEl: e.currentTarget,
        });
      },

      rightIcon(){

        return (
          <div>
            <IconButton
                onTouchTap={this.handleTouchTap}
                style={{ marginTop: -8  }}
                iconStyle={{ color: '#fafafa' }}
                iconClassName="material-icons">
                input
            </IconButton>
            <Popover
                open={this.state.popopen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ 'horizontal': 'left', 'vertical': 'bottom' }}
                targetOrigin={{ 'horizontal': 'right', 'vertical': 'bottom' }}
                onRequestClose={ e => { this.setState({ popopen: false }) }} >
              <div>
                <div onTouchTap={ e => { this.google_btn.signIn() } }>
                  <span> google</span>
                  <span className={ 'fa fa-google'  }></span>
                </div>
                <MenuItem primaryText="Facebook" onTouchTap={ e => { this.fb_btn.click() } } leftIcon={<IconButton style={{ fontSize: 16 }} iconClassName={ 'fa fa-facebook' }/>} />
              </div>
            </Popover>

          </div>
        )
      },

      renderLoginButtons () {

        const responseGoogle = (response) => {
          console.debug('response => ',  response)
          var profile = response.getBasicProfile();
          console.debug('google response', profile);
          console.log('ID: ' + profile.getId());
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
        };

        const responseFacebook = (response) => {
          console.debug('fb response', response);
        };

        return (
          <div style={{ display : 'none' }}>
            <GoogleLogin ref={ e => this.google_btn = e }
                clientId="79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com"
                scope={ 'email profile' }
                uxMode={'popup'}
                buttonText="Log444in"
                onSuccess={responseGoogle}
                onFailure={this.onError}
                />

                <FacebookLogin
                  ref={ e => this.fb_btn = e }
                  appId="302562886764541"
                  autoLoad={ false }
                  xfbml={ true }
                  version='2.7'
                  fields="name,email,picture"
                  callback={ responseFacebook }
                  icon="fa-facebook"
                />
          </div>
        );
      },

      render () {
        let { open, view, name, type, dialogOpen, comparedData } = this.state;
          return (
              <App>
                <AppBar title={ name }
                  style={{ background: '#323e51', fontSize: 18, paddingLeft: '140px', paddingRight: 15, alignItems: 'center',  justifyContent: 'space-between' }} showMenuIconButton={ false }
                  iconElementRight={ this.rightIcon() }
                  onLeftIconButtonTouchTap={ e => { this.setState({open: true }); } } />
                  <Drawer
                    containerStyle={{ backgroundColor: '#323e51', top: 64, boxShadow: 'rgba(0, 0, 0, 0.227) 1px 5px 10px' }}
                    docked={ true }
                    width={ 140 }
                    open={ true }
                    onRequestChange={ e => { this.setState({open: true }); }} >
                    { this.renderMenu() }
                  </Drawer>
                { this.renderLoginButtons() }
                  <div className={'wrapper'} style={{ ...isOpen(open),  position: 'absolute' }}>

                    <Views
                        getLocalStorageDetails={ this.getLocalStorageDetails }
                        view={ view }
                        handleNameChange={ name => { this.setState({ name: name }) } } />
                    <StatsDiaglog open={ dialogOpen } data={ comparedData } onClose={ this.handleModalCLose } />

                  </div>
                  {/*
                  <FlatButton icon={ <FontIcon className={ 'fa fa-arrow-left' } /> }
                    style={{ position:'absolute', left: 25, bottom: 25 }}
                    onClick={ e => { this.changeSteps(stepIndex-1) } } />
                    */}
                </App>

          );
      }
  }
});
const isOpen = (open) => {
  return {
    left: open ? 140 : 0,
    padding: '0', bottom: '0', top: '65px', right: 0,
    transition: 'all 0.015s ease-in-out'
  }
}
