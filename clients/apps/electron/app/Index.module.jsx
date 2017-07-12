
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
// var _ = window._;//
// console.dir(_);
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import {
  BrowserRouter as Router,
  Route,
  HashRouter ,
  Link,
  browserHistory,
  Switch
} from 'react-router-dom';


var teams = require('../assets/teams.js');
var allPlayers = core.tree.select('allPlayers');
var isLoggedIn = false;
var lsUser =JSON.parse(localStorage.getItem('user')) || {
  id: null,
  fullName: null,
  avatar: null,
  email: null
};

if (!_.isEmpty(lsUser) && lsUser.id !== null) {
  isLoggedIn = true;
}

core.Component('Index', ['core.App', 'view.myZone', 'view.RotoNews', 'view.Compare', 'PlayerDialog', 'Stats.Diaglog'],
(App, Home, News, Compare, PlayerDialog, StatsDiaglog)=>{
  return {

      getInitialState(){
        return {
          apps: {},
          open: true ,
          popopen: false ,
          roster: {},
          name: 'Fantasy Edge',
          dialogOpen: false,
          comparedData: [],
          location: this.props.hash || '/',
          loading: true,
          isLoggedIn: isLoggedIn,
          timeframe: '14',

          user: lsUser,

          routes: [
            {
              path: '/',
              exact: true,
              label: 'Home',
              active: true,
              ref: Home,
              icon: 'home',
            },
            {
              path: '/news',
              ref: News,
              label: 'News',
              icon: 'description',
            },
            {
              path: '/compare',
              ref: Compare,
              label: 'Compare',
              icon: 'compare_arrows',
            }
          ]

        };
      },

      componentWillMount() {
        this.getPlayers();
        this.allPlayers = core.tree.select('allPlayers');
        // console.log(this.state.user)

        core.on('compared.players', this.handleCompare);

      },

      componentDidMount() {
        var { user } = this.state;
        if (user && user.id !== null) {
          this.emitUser(user)
        }
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
              res = _.sortBy(res, 'fullName');
              core.tree.set('allPlayers', { players: res, total: total });
              // { players: res instanceof Array ? res : [], total: total });
              // var res = this.getTeams(players, this.getColor);
              var chunks =  _.chunk(res, 13);
              var myplayers = chunks[6];
              core.emit('players.loaded',{ players: res, total: total })
              this.setState({ loading: false })
              core.tree.set('players', chunks[5]);
              core.tree.set('myPlayers', chunks[5]);
            });
        //   this.setMax(res);
      },

      handleCompare(data){
        this.setState({ comparedData: data, dialogOpen: true })
      },

      getTeams(players, callback){
        var wteams = [];

        for (let x = 0; x < players.length; x++) {
          for (let t = 0; t < teams.length; t++) {
            if (Number(players[x].TeamID) === teams[t].teamId){
              wteams.push({
                ...players[x],
                ...teams[t],
                fullName: players[x].Name +' '+players[x].LastName,
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
        var { routes } = this.state;

         routes = _.map(routes, (item)=>{
          return {
            ...item,
            active: item.path === view.path
          }
        });
        this.setState({ view: view, routes: routes, open: true });
      },

      getLocalStorageDetails(details) {
        console.log('obj');
        this.setState({ roster: {...roster, ...details} })
      },

      changePath(path){
        location.hash = '#'+path;
        this.setState({ location: path })
      },

      renderMenu(){
        var { routes, location } = this.state;

        return _.map(routes, (route, i)=>{
          var { icon, label, ref, path } = route;
          var active = location === path;
          var itemStyle = {
            icon: { color: active ? '#f2fafa':'#9196a6', fontSize: 18 },
            div: {  color: active ? '#f2fafa':'#9196a6', fontSize: 14, background: active ? '#46bbc2' : 'none' }
          }
          return (

              <MenuItem key={ i }
                        leftIcon={ <FontIcon style={ itemStyle.icon } className="material-icons">{ icon }</FontIcon> }
                        style={ itemStyle.div }
                        onTouchTap={ this.changePath.bind(this, path) }
                        innerDivStyle={{ paddingLeft: 45, background: active ? '#46bbc2' : 'none'  }}>{ label }</MenuItem>
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
        var {isLoggedIn, user} = this.state;
        if (isLoggedIn) return <FlatButton
            style={{ marginTop: -8, color: '#fafafa', marginRight: 15  }}
            label={ user.fullName } />;
        return (
          <div>
            <FlatButton
                onTouchTap={this.handleTouchTap}
                style={{ marginTop: -8, color: '#fafafa', marginRight: 15  }}
                label={ 'Login' } />
            <Popover
                open={this.state.popopen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ 'horizontal': 'left', 'vertical': 'bottom' }}
                targetOrigin={{ 'horizontal': 'right', 'vertical': 'bottom' }}
                onRequestClose={ e => { this.setState({ popopen: false }) }} >
                <Menu desktop={true} style={{ padding: 0 }}>
                  <MenuItem primaryText="Google" onTouchTap={ e => { this.google_btn.signIn() } } />
                  <MenuItem primaryText="Facebook" disabled={ false } onTouchTap={ e => { this.fb_btn.click() } }/>
                </Menu>
            </Popover>

          </div>
        )
      },

      emitUser(user){
        core.emit('user.logged.in', user)
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ popopen: false, isLoggedIn: true });
        core.tree.set('user', user);
        core.tree.set('isLoggedIn', isLoggedIn);
      },

      renderLoginButtons () {
        var { user } = this.state;
        var at;

        const responseGoogle = (response) => {
          if (response && !_.isEmpty(response) && response.accessToken) {
            var profile = response.getBasicProfile();
            at = response['accessToken']

            // console.debug('google response', profile);
            // console.log('ID: ' + profile.getId());
            // console.log('Full Name: ' + profile.getName());
            // console.log('Given Name: ' + profile.getGivenName());
            // console.log('Family Name: ' + profile.getFamilyName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());

            user['id'] = profile.getId();
            user['fullName'] = profile.getName();
            user['avatar'] = profile.getImageUrl();
            user['email'] = profile.getEmail();
            this.emitUser(user)
          }
          else {
            console.error('response [Google] eror! > ',  response)
          }

        };

        const responseFacebook = (response) => {
          if (response && !_.isEmpty(response) && response.accessToken) {
            at = response['accessToken']
            user['id'] = response.id || response.userID;
            user['fullName'] = response.name;
            user['avatar'] = response.picture.data.url;
            user['email'] = response.email;
            this.emitUser(user)
          } else {
            console.error('response [Facebook] eror! > ',  response)
          }
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

      renderRoutes(){
        var { routes, user } = this.state;
        return (
            <Switch className={ 'routes-wrapper' }>
           {
              _.map(routes, (item, key)=>{
                return <Route
                           user={ user }
                           key={ key }
                           path={ item.path }
                           exact={ item.exact }
                           component={ item.ref } />
             })
           }
           </Switch>
        )
      },

      render () {
        let { open, view, name, type, dialogOpen, comparedData, loading } = this.state;

          return (

            <HashRouter basename="/">
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
                      <div className={ 'menu_routes-wrapper' }>
                    { this.renderMenu() }
                      </div>
                  </Drawer>
                { this.renderLoginButtons() }
                  <div className={'wrapper'} style={{ ...isOpen(open),  position: 'absolute' }}>

                 { this.renderRoutes(view) }
                <StatsDiaglog open={ dialogOpen } data={ comparedData } onClose={ this.handleModalCLose } />

                  </div>
                </App>
            </HashRouter>
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
