var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var moment = require('moment');
core.Component('afa.NewsCard', ['ui.Card'], (Card)=> {
  return {
    propTypes: {
      content : PropTypes.string,
      title   : PropTypes.string,
      date    : PropTypes.string,
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
      let title = this.props.title;
      let date = this.props.date;
      let cardStyle = {
        background: theme('colors.card'),
        color: theme('colors.dark'),
        ...card.main,
        ...this.props.style
      }
      if (!title || !content) return null;
      return (
        <div className="card user" style={ cardStyle } onClick={ this.props.onClick }>
          <div className="news-title" style={ card.title }>
            <span> { title } </span>
            <span style={ {fontSize: 11, marginTop:'.2em'} }> { moment(date).format('LLLL') } </span>
          </div>
          <div className="news-content" style={ card.content }>
            { content }
          </div>
        </div>

      );
    }
  }
});

let card = {
  title: {
    display:'flex',
    flexDirection:'column',
    fontSize:14,
  },
  content: {
    marginTop:'0.3em',
    fontSize: 12
  },
  link: {

  },
  main: {
    padding: '0.5em',
    margin: '0.5em',
    color: 'rgb(36, 44, 57)',
    flex: 'auto',
    overflow: 'auto',
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    borderRadius: '4px',
    maxHeight: '220px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
}
