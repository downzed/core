var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;

core.Component('menu.top', ['ui.Icon','ui.Button', 'SignIn.Modal'], (Icon, Button, SignIn)=> {
  return {
    propTypes:{
      toggleMenu : PropTypes.func,
      currentView : PropTypes.string,
    },
    getInitialState(){
      return {
        showModal: false,
        currentView: 'My Zone'
      }
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.currentView !== this.props.currentView){
        this.setState({ currentView: nextProps.currentView })
      }
    },
    closeSignIn() {
      this.setState({ showModal: false });
    },

    openSignIn() {
      this.setState({ showModal: true });
    },
    setLogIn(profile, sn){
      let user;
      switch (sn) {
        case 'facebook':
          user = {
            name: profile.name,
            email: profile.email,
            avatar: profile.picture.data.url,
            sn: sn
          };
          console.dir(profile);
          break;

        case 'google':
          user = {
            name: profile.getName(),
            email: profile.getEmail(),
            avatar: profile.getImageUrl(),
            sn: sn,
            id: profile.getId(),
            token: profile.id_token
          }
          console.dir(user);
          break;
      }

      this.closeSignIn();
      localStorage.setItem('user', JSON.stringify(user));
      core.tree.set('user', user);

    },
    render(){
      return (
        <div style={ {...menu.main, background: theme('colors.dark'),...this.props.style} }>
          <Icon onColor={ theme('colors.default') } className="fa fa-bars"
            style={ {zIndex: 1} } onClick={ this.props.toggleMenu }  />

          <div className='page-title' style={ {color: theme('colors.default')} }> Edge logo </div>
          <Icon onColor={ theme('colors.default') } className="fa fa-sign-in"
            style={ {zIndex: 1} } onClick={ this.openSignIn }  />

        <SignIn showModal={ this.state.showModal } close={ this.closeSignIn } onLoggedIn={ this.setLogIn } />

      </div>
      );
    }
  };
});

var menu = {
  main: {
    height: '100%',
    right:0,
    left: 0,
    top: 0,
    position:'absolute',
    maxHeight: '45px',
    display: 'flex',
    alignItems:'center',
    boxShadow: '0 5px 20px -10px rgb(13, 15, 15)',
    padding: '5px 15px',
    justifyContent: 'space-between',
    transition: 'transform 0.15s ease-in-out',
    WebkitTransition: 'transform 0.15s ease-in-out',
  }
}
