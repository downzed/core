
var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;

var Circle = require('rc-progress').Circle;
var Line = require('rc-progress').Line;


core.Component('afa.MiniPie', ['ui.Card'], (Card)=> {
  return {
    bindings: {
      max : ['stats', 'max']
    },

    propTypes: {
      type: PropTypes.string,
      stats: PropTypes.object
    },

    getPercentage(){
      let { type, stats } = this.props;
      let { max } = this.state;
      let prct = ( (stats[type.toUpperCase()] / max[type]) * 100).toFixed(2);
      return parseInt(prct);
    },

    render(){
      let type = this.props.type.toUpperCase();
      let stats = this.props.stats;

      return (
        <div className="pie-container" style={ {...pie.main, ...this.props.style} }>
          <div className="pie-text" style={ pie.text } >
            <span >{ type }</span>
              <Line percent={ this.getPercentage() } strokeWidth="4" strokeColor={ theme('colors.secondary') } />
            <span >{ stats[type] }</span>
          </div>
        </div>

      );
    }
  }
});

let pie = {
  main: {
    width: '100%',
    height: '35px',
    display: 'flex',
    position: 'relative',
    textAlign: 'center',
    margin: '0px auto',
    alignItems: 'center',
    zIndex: '50',
    justifyContent: 'center'
  },
  text: {
    color: '#444',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    width: '100%',
        fontSize: '10px',
  },
}
