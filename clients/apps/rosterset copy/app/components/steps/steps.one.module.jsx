
var React = require('react');
var sa = require('superagent')
var core = require('core');

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import DatePicker from 'material-ui/DatePicker';

core.Component('Steps.One', ['ui.Loader'], (Loader)=>{
  return {

      getInitialState(){
        return {
          teamName: '',
          imagePreview: '',
          cap: '',
          dchange: false,
          date: new Date()
        }
      },
      componentWillReceiveProps(nextProps){
        if (nextProps.capChange) this.setState({ cap: nextProps.capChange });
      },

      handleCapChange(e){
        this.setState({ cap: e.target.value });
      },

      handleDateChange(e, date){
        this.setState({ date: date, dchange: true });
      },

      handleName(e){
        var { handleName } = this.props;
        handleName(e.target.value);
        this.setState({ teamName: e.target.value });
      },

      handleImageChange(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        if (file.type.indexOf('image') !== 0) return;
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreview: reader.result
          });
        }

        reader.readAsDataURL(file);
      },

      getValidationState() {
        var { cap, date, teamName } = this.state;
        // return cap < 1 ;
        const length = teamName.length;
        if (length === 0 || cap.length === 0) return true;
        return false;
      },

      click(){
        var inputFile = document.getElementById('inputFile');
        inputFile.click()
      },



      render () {

        let { teamName, imagePreview, cap, date, dchange} = this.state;
        let { callback } = this.props;

        var iconStyle = {
          color: teamName ? '#bbb' : '#fff',
        }
          return (
            <div style={ styles.wrap }>
              <Paper style={ styles.avatar } zDepth={1} >
                <img onTouchTap={ this.click }
                  src={ imagePreview ? imagePreview : "assets/thumbnail.png" }
                  style={{ cursor: 'pointer', maxWidth: '100%' }}
                />
                <input style={{ opacity: 0, position:'absolute', top:0, left:0, bottom: 0, width: '100%', height: 0, width: 0 }}
                        type={ 'file' }
                        id={ 'inputFile' }
                        onChange={ this.handleImageChange } />
              </Paper>

              <div style={{ margin: '25px 0' }}>
                <Avatar icon={ <FontIcon className={'fa fa-pencil'} style={{ color: teamName ? '#bbb' : '#fff' }}/> }
                  size={ 30 }
                  backgroundColor={ teamName ? 'transparent' : '#ccc' }
                  style={{ marginRight: '15px' }}
                />
                <TextField hintText="Name Here..." onChange={ this.handleName } />
              </div>

              <div  style={{ marginBottom: 25 }}>
                <Avatar icon={ <FontIcon className={'fa fa-keyboard-o'} style={{ color: cap ? '#bbb' : '#fff' }} /> }
                  size={ 30 }
                  backgroundColor={ cap ? 'transparent' : '#ccc' }
                  style={{ marginRight: '15px' }}
                />
              <TextField hintText="Game Limits..." type={ 'number' } onChange={ this.handleCapChange } />
              </div>


              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Avatar icon={ <FontIcon  className={ dchange ? 'fa fa-calendar-check-o' : 'fa fa-calendar-times-o'} style={{ color: dchange ? '#bbb' : '#fff' }} /> }
                  size={ 30 }
                  backgroundColor={ dchange ? 'transparent' : '#ccc' }
                  style={{ marginRight: '15px' }}
                />
              <DatePicker mode="landscape" id={'DatePicker'}
                  hintText="Matchup Start At..."
                  onChange={ this.handleDateChange }
                  firstDayOfWeek={ 0 }
                  minDate={ date } />
              </div>



            <RaisedButton label="Next"
              style={{ position:'absolute', right: 15, bottom: 15 }}
              disabled={ this.getValidationState() } onClick={ e => { callback(this.state) } } />
            </div>
          );
      }
  }
});
const styles = {
  avatar: {
    height: 155,
    width: 155,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    overflow:'hidden'
  },
  icon: {

  },
  wrap: {
    height: '100%',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};
