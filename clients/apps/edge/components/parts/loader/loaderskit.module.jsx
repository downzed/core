var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

import Loader from 'react-loaders';
require('loaders.css');
require('./loader-color.css'); //change colors here!!


core.Component('LoadersKit', [], ()=> {
  return {
    propTypes:{
      active  : PropTypes.bool,
      type    : PropTypes.string, //"ball-grid-pulse"
    },
    getDefaultProps() {
      return {
        active: true,
        type  : 'ball-triangle-path'
      };
    },
    render(){
      return (
       <Loader type={ this.props.type } active={ this.props.active } />
      );
    }
  }
});
