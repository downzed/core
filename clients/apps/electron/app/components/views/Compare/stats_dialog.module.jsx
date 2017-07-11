
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
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import { transparent } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
core.Component('Stats.Diaglog', ['Stats.Google.Chart'], (Chart)=>{
  return {

      getInitialState(){
        return {
          open: false,
          players: [],
          tabIndex: 0
        }
      },

      componentWillReceiveProps(next){
        this.setState({ open: next.open, data: next.data });
        if (next.data && !_.isEmpty(next.data)) {
          this.setPlayers(next.data);
        }
      },
      componentWillMount(){
        core.on('players.loaded', ({ players, total })=>{
          this.setState({ players })
        })
      },
      componentWillUnmount(){
        this.setState({ data: null })
      },

      setPlayers(data){
        var { players } = this.state;
        var myIds = data['My Players'];
        var targetIds = data['Target Players'];

        const get = (arr) => {
          return _.filter(players, (player)=>{ return arr.indexOf(player.PlayerID) > -1 });
        };
        var newTeam = {
          'MyPlayers': { data: get(myIds), label: 'My Players' },
          'TargetPlayers': { data: get(targetIds), label: 'Target Players' },
        };

        this.setState({ ...newTeam });
      },

      handleClose(){
        this.setState({ open: false });
        if (this.props.onClose) this.props.onClose()
      },
      renderPlayers(players){
        const style = {
          flex: 1,
          height: '250px',
          margin: '0px 15px',
          paddingBottom: '48px',
          overflow: 'hidden'
        };

        if (!players || !players.data) return null;
        return (
          <Paper key={ _.uniqueId() } style={{ ...style, ...style.paper }} >
            <Subheader style={ styles.subheader }>
             { players.label }
             </Subheader>
             <List style={{ height: '100%', overflowY: 'auto' }} >
                { _.map(players.data, this.renderPlayer) }
             </List>
          </Paper>
        )
      },

      renderPlayer(player, key){
        return (
          <ListItem key={ key }
                innerDivStyle={ styles.listItem }
                primaryText={ this.renderPrimary(player) }
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
        )
      },
      
      renderPrimary(item){
        var { Name, LastName, PlayerID } = item;
        var primary = {
          wrap: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

          }
        }
        return (
          <div style={ primary.wrap }  >

            <div style={{ width: 180 }}>
              { LastName }, { Name }
            </div>


          </div>
        )
      },

      renderStats(data){
        var mainStats = [];
        if (!data) return null;
        else {
          var { stats } = data;

          for (var x in stats) {
            if (x === 'PTS') mainStats.push({ label: 'Points', val: stats[x] })
            if (x === 'AST') mainStats.push({ label: 'Assits', val: stats[x]  })
            if (x === 'REB') mainStats.push({ label: 'Rebounds', val: stats[x] })
          }
          return(
            <div style={{ display: 'flex', padding: '15px 5px' }}>
              {
                _.map(mainStats, this.renderStatBox)
              }
            </div>
          );
        }
     /**
      * AST, PTS, REB
        */
      },

      renderOverallStats(data){
        var mainStats = [];
        if (!data) return null;
        else {
          var { stats } = data;
          mainStats = _.map( stats, (value, key) => ({key,value}) );

          return(
            <Paper style={{ display: 'flex', padding: 0, flexDirection: 'column', margin: '5px 20px 15px', ...style.paper  }}>
                <Subheader style={ style.sub }>
                  OverallS Stats
                </Subheader>

                <Chart data={ mainStats } />
            </Paper>
          );
        }
     /**
      * AST, PTS, REB
        */
      },

      renderStatBox(stat, key){


        const getVal = (val) => {
          var text = 'you ';
          if (val*10 < 0) {
            text += 'give ';
            val = val*-1;
          } else text +='get '
          return text+val;
        }
        return (

          <Paper key={key} style={{ ...style.box, ...style.paper }}>
            <Subheader style={ style.sub }>
              { stat.label }
            </Subheader>
            <div style={ style.bar }>
              <div style={{ marginBottom: '15px' }}>
                { getVal(stat.val) }
              </div>
              <LinearProgress
                  color={ (stat.val*10 < 0) ? '#F44336': '#03A9F4' }
                  mode="determinate"
                  value={ (stat.val*10 < 0) ? stat.val*-1 : stat.val }
                  min={ 0 } max={ 30 } />
            </div>

          </Paper>
        )
      },
      handleTabChange(val){
        this.setState({  tabIndex: val });
      },
      renderTabs(){
        var { tabIndex, data } = this.state;
        const styles = {
          headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
        };

        return (
          <div style={{ padding: 20 }}>
            <Tabs onChange={this.handleTabChange}
              value={this.state.tabIndex} >
              <Tab label={ 'Basic Stats' } value={0} />
              <Tab label={ 'Overall Stats' } value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.tabIndex}
              onChangeIndex={this.handleTabChange}
            >
              <div>
                <h2 style={styles.headline}>Tabs with slide effect</h2>
                Swipe to see the next slide.<br />
              </div>
                { this.renderStats(data) }
            </SwipeableViews>
          </div>
        )
      },

      render () {
        var { open, MyPlayers, TargetPlayers, data } = this.state;

        var customContentStyle = {
          width: open ? 'calc(100% - 140px)' : 0, top: 65,
          background: '#f5f9fc', overflow: 'hidden'
        }
            {/*{ this.renderTabs() }*/}
        return(
          <Drawer containerStyle={ customContentStyle } openSecondary={true} open={ open } >
            <IconButton iconStyle={{ fontSize: 16 }}
                        iconClassName="material-icons"
                        onTouchTap={ this.handleClose.bind(this, null) }>
              clear_all
            </IconButton>
            <div style={{ overflow: 'auto', height: '100%', paddingBottom: '115px' }}>
              <div style={{ display: 'flex', padding: 5 }}>
                { this.renderPlayers(MyPlayers) }
                { this.renderPlayers(TargetPlayers) }
              </div>

              { this.renderStats(data) }
              { this.renderOverallStats(data) }
            </div>
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
    image: { maxWidth: '100%' }
  },
  subheader: {
    backgroundColor: '#323e51',
    position: 'relative',
    fontSize: '12px',
    fontWeight: '700',
    height: 30,
    display: 'flex',
    lineHeight: 'normal',
    alignItems:'center',
    color: '#E0F2F1'
  },
  listItem: { padding: '10px 15px', fontSize: 14, height: 35, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' },
  wrap: { height: '100%', paddingBottom: '60px' },
  badgeWrap: { position: 'absolute',  right: '15px',  top: '12px', fontSize: 12 },
  badge: (primary) => { return { width: '34px', height: '24px', borderRadius: '15%', background: primary ? 'rgba(70, 187, 194, 0.5)': 'rgba(255, 64, 129, .35)'   } }
};
 const style = {
          box: {
            flex: 1,
            height: 'auto',
            margin: '0 15px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          paper : {
            boxShadow: 'rgba(0, 0, 0, 0.107647) 0px 1px 2px, rgba(0, 0, 0, 0.107647) 0px 1px 1px'
          },
          sub : {
            height: 30, color: '#E0F2F1', backgroundColor: '#323e51',
            display: 'flex', alignItems:'center', lineHeight: 'normal', paddingLeft: 15, position: 'relative',
            fontSize: '12px', fontWeight: '700', borderBottom: '1px solid #ddd'
          },
          bar : { padding: '10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100px', flex: '1', flexDirection: 'column' }
        };
