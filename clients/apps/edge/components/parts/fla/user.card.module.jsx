var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;

require('./flip.scss');
core.Component('afa.UserCard', ['ui.Card', 'ui.Icon'], (Card, Icon)=> {
  return {
    propTypes: {
      user  : PropTypes.object,
      style : PropTypes.object,
      type  : PropTypes.string
    },

    getInitialState(){
      return { user: this.props.user }
    },

    componentWillReceiveProps(nextProps){
      if (nextProps.user !== this.props.user) {
        this.setState({ user : nextProps.user })
      }
    },

    getAvatar(){
      let { type, user } = this.props;
      switch (type) {
        case 'player':
          return `http://stats.nba.com/media/players/230x185/${user.id}.png`
          break;
        default:
          return user.avatar;
          break;
      }
    },
    renderIcons(Icon, key) {
      return Icon;
    },
    render(){
      let { user, style, icons, onClick } = this.props;

      let cardStyle = {
        ...card.main,
        cursor: typeof this.props.onClick === 'function'  ? 'pointer':'noraml',
        background: theme('colors.card'),
        height: 50,
        ...style,
      };
      card.logo = {
        ...card.logo,
        opacity: this.props.selected ? 1 : 0.5,
        maxWidth: user.abbreviation === 'CHA' ? '60' : null
      }
      var chaStyle = {
        ...card.image,
        width: user.abbreviation === 'CHA' ? '75%' : null
      }
      return (
        <div className="card user" style={ cardStyle } onClick={ onClick }>
          <div className="user-avatar" style={ card.avatar }>
            <img src={ this.getAvatar() } style={ card.image }/>
          </div>
          <div className="user-details" style={ card.details }>

            { user.name ?  <span> { user.name } </span> : <span>{ user.lastName + ', '+ user.firstName } </span> }
            { user.sn ? <span style={ {cursor:'pointer', marginTop: '0.5em'} }>{ user.sn }</span> : null }
            { user.email ? <span style={ {cursor:'pointer', marginTop: '0.5em'} }>{ user.email }</span> : null }
          </div>
          <div if={ user.teamLogo } className="user-avatar" style={ {...card.avatar, ...card.logo} }>
            <img src={ user.teamLogo } style={ chaStyle }/>
          </div>

          { icons && icons.length ? icons.map(this.renderIcons) : null }
        </div>

      );
    }
  }
});

core.Component('afa.Card', ['ui.Card'], (Card)=> {
  return {
    propTypes: {
      content : PropTypes.oneOfType([        // any
                PropTypes.string,
                PropTypes.object
              ]),
      style   : PropTypes.object,
      onClick : PropTypes.func,
    },
    getInitialState(){
      return { content: this.props.content }
    },
    // componentWillReceiveProps(nextProps){
    // },

    render(){
      let { content, onClick } = this.props;
      let cardStyle = {
        padding: '0.5em',
        background: theme('colors.card'),
        color: theme('colors.dark'),
        ...card.main,
        ...this.props.style
      }
      return (
        <div className="card user" style={ cardStyle } onClick={ onClick }>
            { content }
        </div>

      );
    }
  }
});

let card = {
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    position: 'relative',
    borderRadius: '4px',
    height: 60,
    width:'100%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)lou, 0 1px 2px rgba(0,0,0,0.24)',
  },
  details: {
    fontSize: '12px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 1em',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: '2',
  },
  avatar: {
    display: 'flex',
    height: '100%',
    width: 'auto',
    minWidth: 60
  },
  logo: {
    opacity: '0.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '0',
    transition: 'opacity 0.3s ease-in-out'
  },
  image: {
    maxHeight: '100%',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    overflow: 'hidden',
    maxWidth: '100%',
  }
}
