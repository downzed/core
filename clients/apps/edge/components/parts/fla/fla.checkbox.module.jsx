
var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');

var closeStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 20,
  cursor: 'pointer'
};
core.Component('fla.Checkbox', {

  propTypes: {
    onClick: PropTypes.func,
    label: PropTypes.string,
  },

  getInitialState(){
    return { checked: true }
  },

  onClick(e){
    let input = this.refs[e];
    input.checked = !input.checked;
    this.setState({ checked: input.checked })
    this.onChange(input);
  },

  onChange(e){
    if (!e.target) {
      if(this.props.onClick) this.props.onClick(e);
    } else {
      if(this.props.onClick) this.props.onClick(e.target);
    }
  },

  render () {
    var { label } = this.props;
    return (
      // <div onClick={ this.onClick.bind(this, label) } style={ { cursor: 'pointer', display: 'flex', flex: '1' } }>
        <div htmlFor={ label } style={ styledLabel } onClick={this.onClick.bind(this, label)}>
          <input style={ styledBox }
            defaultChecked={ this.state.checked }
            ref={ label }
            name={ label }
            type="checkbox" />
          <span>{ label }</span>
         </div>
      // </div>
    )
  }

});
let styledBox = {
  width: 15,
  height: 15,
  margin: '0 0.2em 0 0'
}
let styledLabel = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '500',
  margin: '0 0.5em 0 0',
  height: '15px',
}
