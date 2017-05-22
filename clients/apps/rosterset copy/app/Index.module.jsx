
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
var Pusher = require('pusher-js');

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
// var Pusher = require('pusher');

core.Component('Index', ['core.App','Steps', 'Steps.One', 'Steps.Two', 'RotoNews'], (App, Steps, StepOne, StepTwo, RotoNews)=>{
  return {
      getInitialState(){
        return {
          apps: {},
          open: false,
          initialView: 0,
          stepIndex: null,
          steps: [StepOne, StepTwo, RotoNews],
          roster: {},
          name: 'Team Name Roster'
        };
      },



      handleClose(){
        this.setState({ open: false });
      },

      componentDidMount() {
        var pusher = new Pusher({
          appId: '273991',
          key: 'ecee059ea7615fb35875',
          secret: 'e98aa588d71964d7df79',
          cluster: 'eu',
          encrypted: true
        });
        pusher.trigger('test_channel', 'my_event', {
          "message": "hello world"
        });
      },

      changeSteps(step){
        let { open, steps, stepIndex, name } = this.state;
        if (open) this.setState({ open: false })
        if (step > steps.length-1) this.setState({ stepIndex: 0 });
        else if (step < 0) this.setState({ stepIndex: steps.length-1 });
        else this.setState({ stepIndex: step });
        this.setState({ stepIndex: step });
        if (step === 2) this.setState({ name: 'Rotoworld Headlines' });
        else if (step === 0) this.setState({ name: "Team Name Roster" })
        else this.setState({ name: name ? name+" Roster": "Team Name Roster" });
      },

      getLocalStorageDetails(details) {
        console.log('obj');
        this.setState({ roster: {...roster, ...details} })
      },

      render () {
        let { open, initialView, stepIndex, name, type } = this.state;
          return (
              <App>
                <AppBar title={ name }
                  onLeftIconButtonTouchTap={ e => { this.setState({open: !open}); } } />
                  <Drawer
                    docked={ false }
                    width={ 200 }
                    open={ open }
                    onRequestChange={ e => { this.setState({open: !open}); }} >
                    <MenuItem onTouchTap={ this.changeSteps.bind(this, 0)}>Home</MenuItem>
                    <MenuItem onTouchTap={ this.changeSteps.bind(this, 2)}>News</MenuItem>
                  </Drawer>

                  <div className={'wrapper'} style={{ padding: '25px', bottom: '0', top: '65px', width: '100%', position: 'absolute' }}>

                    <Steps
                        getLocalStorageDetails={ this.getLocalStorageDetails }
                        initialView={ initialView }
                        stepIndex={ stepIndex }
                        handleNameChange={ name => { this.setState({ name: name }) } }
                        changeSteps={ this.changeSteps }/>
                  </div>
                  {/*
                  <FlatButton icon={ <FontIcon className={ 'fa fa-arrow-left' } /> }
                    style={{ position:'absolute', left: 25, bottom: 25 }}
                    onClick={ e => { this.changeSteps(stepIndex-1) } } />
                    */}
                </App>

          );
      }
  }
});
