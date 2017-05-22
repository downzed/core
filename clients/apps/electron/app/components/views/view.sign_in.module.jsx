
var React = require('react');
var core = require('core');
// var moment = require('moment');
// var google = require('googleapis');
// var compute = google.compute('v1');
import GoogleLogin from 'react-google-login';

core.Component('view.SignIn', [], ()=>{
  return {

      getInitialState(){
          return {
            roster: { }
          }
      },

      // setLocalStorage(data){
      //
      //   let { changeSteps, getLocalStorageDetails, stepIndex } = this.props;
      //
      //   if (!data.teamName) {
      //     console.warn('bad boy why no name?')
      //     return;
      //   } else {
      //     window.chrome.storage.local.set({ 'rosterSetObject':  {...data} }, (e) => {
      //       window.chrome.storage.local.get('rosterSetObject', (val)=>{
      //         getLocalStorageDetails(val['rosterSetObject'])
      //         changeSteps(stepIndex+1);
      //       });
      //     });
      //   }
      //
      // },

      onLogin (login) {
        console.log(login);

      },

      render () {

          return (
            <div style={ signin.wrap }>
              <GoogleLogin
      clientId="79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={this.onLogin}
      onFailure={this.onLogin}
    />
            </div>
          );
      }
  }
});

let signin = {

  wrap: {
    height: '100%',
    width: '100%',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  players: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}
