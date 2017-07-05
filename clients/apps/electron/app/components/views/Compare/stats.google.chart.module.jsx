
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');

import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

core.Component('Stats.Google.Chart', [], ()=>{
  return {

      getInitialState(){
        return {
          data: this.props.data
        }
      },

      componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
      },
      
      componentDidMount(){
        this.setState({ data: this.props.data });
      },
      
      drawChart(){
        var { data } = this.state;
        if (!data) return null;
        var labels = [], set = [];
        for (var l = 0; l < data.length; l++) {
          labels.push(data[l].key)
          set.push(data[l].value)
        }

        var chartData = {
          labels: [...labels],     
          datasets: [{
            data: [...set],
            options: {
              legend: {
                  display: false
                }
            }
          }],
          legend: {
              display: false
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return tooltipItem.yLabel;
              }
            }
          }
        };
        
        return (
          <Line ref='chart' data={ chartData } />
        )
      },

      render () {
        return(
          <div className={ 'chart_wrap' } style={{ height: '100%', width: '100%', padding: 15 }}>
            { this.drawChart() }
          </div>
        );
      }
  }
});
const styles = {
  avatar: {
    paper: {
      height: 45,
      width: 45,
      overflow:'hidden',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    },
    image: {
      maxWidth: '100%'
    }

  },

  wrap: {
    height: '100%',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};
