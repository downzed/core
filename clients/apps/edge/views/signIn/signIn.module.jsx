var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Modal } from 'react-bootstrap';

core.Component('SignIn.Modal', ['ui.Icon','ui.Button'], (Icon, Button)=> {
  return {
    propTypes : {
      showModal   : PropTypes.bool,
      onLoggedIn  : PropTypes.func,
      close       : PropTypes.func,
    },


    responseGoogle(response) {
      // console.debug('google response', response.getAuthResponse().id_token);
      var profile = response.getBasicProfile();
      profile['id_token'] = response.getAuthResponse().id_token;
      this.props.onLoggedIn(profile, 'google')
    },
    responseFacebook(response) {
      // console.debug('fb response', response);
      this.props.onLoggedIn(response, 'facebook')
    },
    render(){
      return (
        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div style={ {background: theme('colors.dark')} }>

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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal>

      );
    }
  };
});
