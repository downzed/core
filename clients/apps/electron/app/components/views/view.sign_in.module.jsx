
var React = require('react');
var core = require('core');
// var moment = require('moment');
// var google = require('googleapis');
// var compute = google.compute('v1');
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

core.Component('view.SignIn', [], ()=>{
  return {

      getInitialState(){
          return {
            roster: { }
          }
      },
      componentWillMount() {
        core.on('google.click', ()=>{
          console.log('1 -> ',  1)
        })
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
        console.debug('response => ',  response)
        var profile = response.getBasicProfile();
        console.debug('google response', profile);
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // profile['id_token'] = response.getAuthResponse().id_token;
      },

      responseFacebook(response) {
        console.debug('fb response', response);
      },

      render () {

          return (
            <div style={ signin.wrap }>
              <GoogleLogin ref={ 'google_btn' }
                  clientId="79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com"
                  scope={ 'email profile' }
                  uxMode={'popup'}
                  buttonText="Log444in"
                  onSuccess={this.responseGoogle}
                  onFailure={this.onLogin}
                  />

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
