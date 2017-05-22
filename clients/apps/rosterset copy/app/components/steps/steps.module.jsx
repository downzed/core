
var React = require('react');
var core = require('core');
import { Button } from 'react-bootstrap';
var moment = require('moment');
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


core.Component('Steps', ['ui.Loader', 'Steps.One', 'Steps.Two', 'RotoNews'], (Loader, StepOne, StepTwo, RotoNews)=>{
  return {

      getInitialState(){
          return {
            roster: { }
          }
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

      handleNameChange(name){
        this.props.handleNameChange(name);
        this.setState({ roster : { teamName: name } })
      },

      changeCap(e) {
        console.log(e)
        this.setState({ roster : { cap: e.target.value } });
      },

      renderView(view){
        let { roster } = this.state;
        let { changeSteps } = this.props;
        console.log(roster);
        switch (view) {
          case 0:
            return (
              <StepOne callback={ data => { this.setState({ roster: data });  changeSteps(1); } }
                       handleName={ this.handleNameChange }
                       capChange={ roster.cap }
              />
            );

          case 1:
            return (
              <StepTwo date={ roster.date || null } open={ roster.open } cap={ roster.cap }
                changeCap={ this.changeCap }
                callback={ data => { this.setState({ roster: { ...roster, ...data }  }); } }/>
            );
          case 2:
            return (
              <RotoNews />
            );
        }
      },

      render () {
        let { roster } = this.state;
        let { initialView, stepIndex } = this.props;

          return (
            <div className={'steps'} style={{ height: '100%' }}>
                  { this.renderView(stepIndex || initialView) }
            </div>
          );
      }
  }
});
