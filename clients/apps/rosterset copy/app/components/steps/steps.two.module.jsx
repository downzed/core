
var React = require('react');
var sa = require('superagent')
var core = require('core');
var moment = require('moment');
var _ = require('lodash');

import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange700,
  deepOrange900,
  lightGreen300,
  lightGreen700,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

core.Component('Steps.Two', ['Slot'], (Slot)=>{
  return {

      getInitialState(){
        return {
          dates: this.initDates(),
          open: false,
          modalOpen: false,
          limit: 0,
          cap: this.props.cap,
          newCap: '',
          modalMessage: '',
          modalTitle: '',
          clearAll: false,
          message:'Matchup start at '+ moment(this.props.date).local().format('ddd, MMM DD') }
      },

      componentDidMount(){
        this.res = 0;
        setTimeout(()=>{
          this.setState({ open: true, games: [] });
        }, 200);
      },

      initDates(){
        let { date } = this.props;
        var startOfWeek = moment(date);
        var endOfWeek = moment(date).add(6, 'days');
        var days = [];
        var day = startOfWeek;
        while (day <= endOfWeek) {
          days.push(day.toDate());
          day = day.clone().add(1, 'd');
        }
        return days ;
      },

      calcLimits(index, num) {
        var { games } = this.state;
        if(!games.length) {
          games.push({ index: index, num: num });
        } else {
            for (let i = 0; i < games.length; i++) {
              let game = games[i];
              if (game && game.index === index || game.num.length === 0) {
                games.splice(games.indexOf(game), 1);
              }
            }
            games.push({ index: index, num: num });
          }
          console.log(games);
          this.setState({ games : games });
      },


      getMoreNumbers(){
        var { games, limit } = this.state;
        var res = 0;

        if(!games || !games.length) return;
        else {
          for (let x = 0; x < games.length; x++) {
            let game = games[x];
            if (game.num.length !== 0) res = limit += parseInt(game.num);
          }
        }
        this.res = res;
        return { resStr: res.toString(), resNum: res };
      },

      getValidationState(){
        const { cap } = this.state;
        var str = '', message = '';
        var num = parseInt(cap);

        const getplayers = (str) => {
          return (str > 1) ? ' players' : ' player';
        }

        if (this.res < num) {
          str = (num - this.res);
          message = 'you should add ' + str.toString() + getplayers(str);
          this.setState({ message: message });

        }
        else if (this.res > num) {
          str = (this.res - num);
          message = 'you should remove ' + str.toString() + getplayers(str);
          this.setState({ message: message });
        } else {
          message = 'you are A-Ok! ';
          this.setState({ message: message });
        }
        setTimeout(()=>{
          this.setState({ open: true });
          return this.res < num || this.res > num;
        }, 500);
      },

      openModal(){
        this.setState({
          modalTitle: 'Reset Days',
          modalOpen: true,
          modalMessage: 'Are you sure?',
          reset: 'days'
        });
      },

      dontBeAnAssSnackbar(){
        this.setState({
          open: true,
          message: "Nobody likes a smartass!",
        });
      },

      openResetCapDialog(){
        this.setState({
          modalOpen: true,
          modalTitle: 'Reset Game Limits',
          modalMessage: 'Reset Game Limits Now? Realy?',
          reset: 'cap'
        });
      },

      clearAll(){
        var { games } = this.state;
        games = [];
        this.res = 0;
        this.setState({ games: games, clearAll: true, modalOpen: false });
        setTimeout(()=>{
          this.setState({ clearAll: false });
        }, 200)
      },

      reset(what) {
        switch (what) {
          case 'cap':
            this.setState({ cap: this.state.newCap, modalOpen: false });
            // this.props.callback(this.state)

            this.props.changeCap(this.state.newCap);
            break;
          case 'days':
            this.clearAll();
            break;
        }
      },

      onNewCap(e){
        this.setState({ newCap: e.target.value });
      },

      renderDays(day, key){
        var { clearAll } = this.state;
        return <Slot key={ key } day={ moment(day).local().format('ddd, MMM DD') } onClearAll={ clearAll }
          onValChange={ this.calcLimits.bind(this, key) } />
      },

      renderBottomButtons(){
        return (
          <div>
            <RaisedButton
              icon={<FontIcon className={'fa fa-check'} />}
              onTouchTap={ e => { this.getValidationState(); /*callback(this.state); */} }
              style={{ position:'absolute', right: 15, bottom: 15 }} />
            <RaisedButton
              icon={<FontIcon className={'fa fa-repeat'} />}
              onTouchTap={ this.openModal /*callback(this.state); */}
              style={{ position:'absolute', left: 15, bottom: 15 }} />
          </div>
        );
      },

      render () {
        let { callback, date } = this.props;
        let { dates, cap, open, modalMessage, modalTitle, message, modalOpen, reset } = this.state;
        const checkThermo = () => {
          let x = {str: 'fa-thermometer-empty'}, res = this.getMoreNumbers() ? this.getMoreNumbers().resNum : 0;
          cap = parseInt(cap);

          if (res === 0) { x.str = 'fa-thermometer-empty' }
          else if (res <= cap / 3 && res > 0){ x.str = 'fa-thermometer-quarter'; }
          else if (res < cap && res > cap / 2){ x.str = 'fa-thermometer-three-quarters'; }
          else if (res <= cap / 2 && res >= cap / 3){ x.str = 'fa-thermometer-half'; }
          else if (res > cap) { x.str = 'fa-thermometer-full'; x.color = deepOrange700; x.icolor = deepOrange900 }
          else if (res === cap) { x.str = 'fa-thermometer-full'; x.color = lightGreen300; x.icolor = lightGreen700 }

          return x;
        };
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            style={{ marginRight: 15 }}
            keyboardFocused={true}
            onTouchTap={ e => { this.setState({ modalOpen : false }); }  }
          />,
          <FlatButton
            label="Reset"
            onTouchTap={ this.reset.bind(this, reset) }
          />,
        ];
          return (
            <div style={{ height:'100%' }}>
              <div style={{
                  height: '100%',
                  minHeight: '300px',
                  flexDirection: 'column',
                  display: 'flex',
                  overflow: 'auto',
                  position: 'relative'
                }}>
                <List style={{ flexFlow: 'row wrap', display: 'flex', justifyContent: 'space-between' }}>
                { dates && dates.length ? _.map(dates, this.renderDays) : null }
                </List>

                <Snackbar
                  open={ open }
                  message={ message }
                  autoHideDuration={ 2000 }
                  onRequestClose={ e => { this.setState({ open: false }); } }
                />

              <div>
                <Dialog
                  title={ modalTitle }
                  actions={ actions }
                  modal={ false }
                  open={ modalOpen }
                  onRequestClose={ e => { this.setState({ modalOpen : false }); } }
                >

                { modalMessage }
                  <div  style={{ marginBottom: 25 }}>
                    { reset === 'cap' ? <Avatar icon={ <FontIcon className={'fa fa-keyboard-o'} style={{ color: cap ? '#bbb' : '#fff' }} /> }
                      size={ 30 }
                      backgroundColor={ cap ? 'transparent' : '#ccc' }
                      style={{ marginRight: '15px' }}
                    /> : null
                  }
                  { reset === 'cap' ? <TextField hintText="New Game Limits..." type={ 'number' }
                                        onChange={ this.onNewCap } /> : null }

                  </div>
                </Dialog>
            </div>

              <Chip onTouchTap={ this.openResetCapDialog }
                  backgroundColor={ checkThermo() && checkThermo().color ? checkThermo().color : '' }
                  style={{ position: 'absolute', top: '50%', right: '15px',
                    WebkitTransition: 'all 0.2s ease-in-out' ,
                    transition: 'all 0.2s ease-in-out' }} >
                  <Avatar size={ 32 } style={{ display:'flex !important', alignItems: 'center', justifyContent: 'center', backgroundColor: checkThermo() && checkThermo().icolor ? checkThermo().icolor : '' }}
                    icon={<FontIcon className={ 'runover fa '+checkThermo().str } />} />
                     { (this.getMoreNumbers() ? this.getMoreNumbers().resStr : 0)+' / '+cap }
                 </Chip>
              </div>

              { this.renderBottomButtons() }

            </div>
          );
      }
  }
});


import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

const style = {
  display: 'flex',
  alignItems: 'baseline',
  height: '72px',
  justifyContent: 'flex-start',
};

const underlineStyle = {
  right: '5px',
  left: '5px',
  width: 'auto',
};

core.Component('Slot', ['ui.Loader'], (Loader)=>{
  return {

      getInitialState(){
        return { day: this.props.day || {}, cap: '' }
      },

      componentWillReceiveProps(nextProps){
        if (nextProps.onClearAll) this.setState({ cap: '' })
      },

      handleCapChange(e){
        let { onValChange } = this.props;

        if (parseInt(e.target.value) < 0) return;
        else {
         this.setState({ cap : e.target.value });
         onValChange(e.target.value)
        }
      },

      render () {
        let { callback, day, onClearAll } = this.props;
        var cap;
        if (onClearAll) cap = '';
        else cap = this.state.cap;
          return (
            <div style={ style } >
                <FontIcon className={ cap ? 'fa fa-calendar-check-o' : 'fa fa-calendar-plus-o'} style={{ marginRight: 15 }}/>

                <TextField
                  style={{ padding: '5px', width: '100%', maxWidth: '100px' }}
                  underlineStyle={ underlineStyle }
                  floatingLabelText={ day }
                  hintText={ day }
                  type={ 'number' }
                  value={ cap }
                  onChange={ this.handleCapChange } />
            </div>
          );
      }
  }
});
