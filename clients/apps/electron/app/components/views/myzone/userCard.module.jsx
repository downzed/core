var React = require('react');
var PropTypes = React.PropTypes;
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

core.Component('UserCard', ['PlayerDialog'],
 (PlayerDialog)=> {
  return {
    bindings: {
      'isLoggedIn': ['isLoggedIn'],
      'myPlayers': ['myPlayers']
    },
    getInitialState(){
      return {
        user: this.props.user
      }
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.user && this.props.user.id !== nextProps.user.id) this.setState({ user: nextProps.user })
    },
    renderAvatar(user){
      var props = {};
      var { isLoggedIn } = this.state;
      if (user && user.id !== null) {
        props['src'] = user.avatar;
      } else if (!isLoggedIn){
        props['icon'] = <i className={ 'fa fa-user-plus' } ></i>
      } else {
        props['icon'] = <i className={ 'fa fa-circle-o-notch fa-spin' } ></i>
      }
      return props;
    },
    renderPlayer(player, key){
      return (
        <div key={ key }>
          <ListItem  leftAvatar={ <Avatar  icon={ <i className={ 'fa fa-thumbs-o-up' } style={{ height: 40 }} ></i> } /> }
            insetChildren={true}
            primaryText={ <div style={{ fontSize: 14 }}>{player.Name +' '+player.LastName}</div> }
            secondaryText={ <span style={{ fontSize: 12 }}>{player.teamName}</span> } />
          <Divider />
        </div>
      )
    },
    renderMyPlayers(){
      var { myPlayers, isLoggedIn } = this.state;
      if ((!myPlayers || !myPlayers.length )&& !isLoggedIn){

        return (
          <ListItem leftAvatar={ <Avatar  icon={ <i className={ 'fa fa-user-plus' } ></i> } /> }
            insetChildren={ true }
            primaryText={ <div> <FlatButton label={ 'add player' } /> </div> }>
          </ListItem>
        )
      }
      else {
        return (
          <List style={{ overflowY:'auto' }}>
            { _.map(myPlayers, this.renderPlayer) }
          </List>
        )
      }
    },

    render(){
      // console.log('this.props -> ',  this.props)
      var { user } = this.props;
      return (
        <div style={ styles.wrap }>
          <ListItem leftAvatar={ <Avatar  { ...this.renderAvatar(user) } /> }
            insetChildren={true}
            primaryText={ (user  && user.fullName) ? user.fullName : 'Loading'  }
            secondaryText={ `Email: ${ (user && user.email) ? user.email : 'Loading' }` }>
          </ListItem>
          <List style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Subheader style={ styles.subheader }>My Players</Subheader>
            <Divider />
            { this.renderMyPlayers() }
          </List>
        </div>
      );
    }
  }
});
const styles = {
  subheader: {
    fontFamily: 'Roboto, sans-serif',
  },
  wrap: {
    height: '450px',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
};
