
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import {List, ListItem} from 'material-ui/List';
import LazyLoad from 'react-lazyload';
import LinearProgress from 'material-ui/LinearProgress';

core.Component('compare.player.List', ['player.ListItem'], (PlayerItem)=>{
  return {

      getInitialState(){
        return { list: this.props.list }
      },

      componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.props.list) {
          this.setState({ list : nextProps.list });
        } else {
          this.setState({ list : this.props.list });
        }
      },

      shouldComponentUpdate(nextProps, nextState){
        return nextState.list !== this.state.list;
      },


      renderList(item, key){
        this.value = 25;
        const progress = () => {
          this.value = 75;
          setTimeout(()=>{
            this.value = 100;
          }, 10)
        };

        const placeholder = () => {
          progress()
          return (
            <div style={{ ...styles.listItem, justifyContent: 'center'  }}>
              <LinearProgress mode="determinate" value={ this.value } />
            </div>
          )
        }

        if (item.isInComapre) return null;

        return (
          <LazyLoad height={45} key={ key } once={ true } resize={ true }
                    overflow={ true }
                    unmountIfInvisible={ true }
                    placeholder={ placeholder() }
                    offset={[-15, 0]} debounce={350}>
            <PlayerItem item={ item } onAdd={ this.props.onAdd } selectedOpt={ this.props.selectedOpt } onRemove={ this.props.onRemove } />
          </LazyLoad>

        );
      },

      renderSimpleList(item, key) {
        return (<PlayerItem  key={ key } item={ item } selectedOpt={ this.props.selectedOpt } onRemove={ this.props.onRemove } />);
      },

      render () {
        var { list } = this.state;
        var { id } = this.props;

        return (
          id && id == 'to_compare' ?
          <List style={ styles.list } >
            { _.map(list, this.renderSimpleList) }
          </List>
          :
          <List style={ styles.list } >
            { _.map(list, this.renderList) }
            </List>
          )
      }
  }
});

const styles = {
  list: { fontSize: 12, overflow: 'auto', flex: 1, padding: '0px !important' },
  listItem: {
    padding: '10px 15px !important', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
  }
};
