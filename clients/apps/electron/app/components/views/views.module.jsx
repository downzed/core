
var React = require('react');
var core = require('core');
var moment = require('moment');
import CircularProgress from 'material-ui/CircularProgress';


core.Component('Views', [], ()=>{
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
        // this.props.handleNameChange(name);
        // this.setState({ roster : { teamName: name } })
      },

      // changeCap(e) {
      //   console.log(e)
      //   this.setState({ roster : { cap: e.target.value } });
      // },

      renderView(view){
        let { changeViews, isLoading } = this.props;
        var View = core.components[`view.${view}`];
        if (isLoading) return (
          <div style={{ display: 'flex',  height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={80} thickness={5} color={ 'rgba(50, 62, 81, 0.75)' } />
          </div>
        );
        if (View) return <View />
        else return (<span> error </span>)
      },

      render () {
        let { roster } = this.state;
        let { view } = this.props;

          return (
            <div className={'steps'} style={{ height: '100%' }}>
                { this.renderView(view) }
            </div>
          );
      }
  }
});
