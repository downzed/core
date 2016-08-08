var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;

require('./flip.scss');
core.Component('afa.UserCard', ['ui.Card'], (Card)=> {
  return {
    propTypes: {
      user  : PropTypes.object,
      style : PropTypes.object,
    },
    getInitialState(){
      return { user: this.props.user }
    },
    componentWillReceiveProps(nextProps){
      if (nextProps.user !== this.props.user) {
        this.setState({ user : nextProps.user })
      }
    },

    render(){
      let { user, style } = this.props;

      let cardStyle = {
        ...card.main,
        background: theme('colors.card'),
        ...style,
        height: 50
      };

      return (
        <div className="card user" style={ cardStyle }>
          <div className="user-avatar" style={ card.avatar }>
            <img src={ user.avatar } style={ card.image }/>
          </div>
          <div className="user-details" style={ card.details }>

            { user.name ?  <span> { user.name } </span> : <span>{ user.firstName + ' '+ user.lastName } </span> }
            { user.sn ? <span style={ {cursor:'pointer', marginTop: '0.5em'} }>{ user.sn }</span> : null }
            { user.email ? <span style={ {cursor:'pointer', marginTop: '0.5em'} }>{ user.email }</span> : null }
          </div>
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
      let content = this.props.content;
      let cardStyle = {
        padding: '0.5em',
        background: theme('colors.card'),
        color: theme('colors.dark'),
        ...card.main,
        ...this.props.style
      }
      return (
        <div className="card user" style={ cardStyle } onClick={ this.props.onClick }>
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
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
  },
  image: {
    maxHeight: '100%',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    overflow: 'hidden',
    maxWidth: '100%',
  }
}
