
var React = require('react');
var core = require('core');
var moment = require('moment');


import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

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
      responseGoogle(response) {
        console.debug('google response', response);
        var profile = response.getBasicProfile();
        profile['id_token'] = response.getAuthResponse().id_token;
        // this.props.onLoggedIn(profile, 'google')
        console.debug('google profile', profile);

      },
      responseFacebook(response) {
        console.debug('fb response', response);
        // this.props.onLoggedIn(response, 'facebook')
      },
      render () {

          return (
            <div style={ signin.wrap }>
              <GoogleLogin
                  clientId={'79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com'}
                  callback={this.responseGoogle}
                  cssClass={ 'fla-google-login' }
                  offline={ false } >
              </GoogleLogin>

              <FacebookLogin
                appId="302562886764541"
                autoLoad={ false }
                xfbml={ true }
                version='2.7'
                fields="name,email,picture"
                callback={ this.responseFacebook }
                icon="fa-facebook"
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
