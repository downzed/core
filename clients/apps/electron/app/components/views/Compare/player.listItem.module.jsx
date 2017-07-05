
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import * as Vibrant from 'node-vibrant';

var stats = {
  'BLK': 'Blocks',
  'FGA': 'FG Attemptes',
  'OREB': 'Off. Rebounds',
  'STL': 'Steals',
  'DREB': 'Def. Rebounds',
  'FGM': 'FG Made',
  'FG3A': '3 Points Attempts',
  'FTA': 'Free Throws Attempts',
  'MIN': 'Minutes',
  'PF': 'Personal Fouls',
  'TOV': 'Turnovers',
  'FG3M': '3 Points Made',
  'FTM': 'Free Throws Attempts',
  'PTS': 'Points',
  'REB': 'Rebounds',
  'AST': 'Assists'
};


core.Component('player.ListItem', [], ()=>{
  return {

      // propTypes: {
      //   item:
      // },
      getInitialState(){
        return { open: false, backcolor: '#fff' }
      },
      componentDidMount(){
        this.getColor(this.props.item.teamLogo)
        // console.log('this.props -> ',  this.props)
      },

      renderPrimary(item, i){
        var { selectedOpt } = this.props;
        var { Name, LastName, PlayerID, isInComapre, Statistics, teamLogo } = item;
        var primary = {
          wrap: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

          },
          buttons: {
            fontSize: 16,
            width: 26,
          },
          smallIcon: {
            height: 26,
          },
          add: {
            display: isInComapre ? 'none' : 'flex',
          },
          remove: {
            display: !isInComapre ? 'none' : 'flex',
          }
        }

        const style ={
          width: '40px',
          textAlign: 'center',
          marginRight : 5,
        };
        const renderStat = () => {
          if (isInComapre || !selectedOpt) {
            return null;
          } else {

            return (
              <div style={{ display: 'flex' }}>
                <span style={ style }>
                  { Statistics[selectedOpt.type] }
                </span>
              </div>
            )
          }
        };

        return (
          <div style={ primary.wrap }  >

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              { LastName }, { Name }
              { renderStat() }
            </div>

            <div style={{ flex:'0 auto', ...primary.add }}>
              <IconButton style={{ marginRight: 2.5 }}
                  iconStyle={{ fontSize: 16 }}
                  iconClassName="material-icons"
                  onTouchTap={ (e)=>{ this.addTo('Target Players', PlayerID) } }>
                  add_shopping_cart
              </IconButton>

              <IconButton
                  iconClassName="material-icons"
                  iconStyle={{ fontSize: 16 }}
                  onTouchTap={ (e)=>{ this.addTo('My Players', PlayerID) } }>
                remove_shopping_cart
              </IconButton>
            </div>
            <div style={{ flex:'0 auto', ...primary.remove }}>
              <IconButton iconStyle={{ fontSize: 16 }}
                  iconClassName="material-icons"
                  onTouchTap={ (e)=>{ this.removePlayer(PlayerID) } }>
                  remove_circle
              </IconButton>
            </div>

          </div>
        )
      },

      addTo(where, id){
        this.props.onAdd(where, id);
      },

      removePlayer(id){
        this.props.onRemove(id);
      },

      handlePlayerPop(e){
        e.preventDefault();
        this.setState({
          open: true,
          anchorEl: e.currentTarget,
        });
      },

      getColor(src){
        if (!src) { console.log('src -> ',  src); return '#000'; }
        var r, g, b, pal;
        var x;
        Vibrant.from(src).getPalette((err, palette) => {
            // console.log('palette -> ',  palette)
            if (err){ console.error(err); return this.setState({ backcolor: 'red' }); }
            if (palette && palette['Vibrant'] !== null && palette['Vibrant']['_rgb']) {
              pal = palette['Vibrant']['_rgb'];
              r = pal[0];
              g = pal[1];
              b = pal[2];
              x= `rgba(${r},${g},${b}, .26)`;
              console.log('x -> ',  x)
              this.setState({ backcolor: x })
            }
          else this.setState({ backcolor: 'green' })
        });
      },

      renderStats(item){
        var { open, backcolor } = this.state;
        var { Name, LastName, PlayerID, isInComapre, Statistics, teamLogo, teamName } = item;
        if (!open) return;

        var logo = {
          height: '100%',
          position: 'absolute',
          opacity: '0.25',
          top: '0',
          background: `url(${teamLogo})`,          backgroundSize: 'cover',          backgroundRepeat: 'no-repeat',          backgroundPosition: '0, 0',          bottom: '0',          right: '0',
          left: '0',
        }

        return (
          <div style={{ position: 'relative', backgroundColor: backcolor, padding: 15, width: 350, height: 240 }}>
            <div style={logo}></div>
            <span>
              { teamName }
            </span>

          </div>
        )
      },

      render () {
        let { item } = this.props;
        let { open, anchorEl } = this.state;
        return (
          <div>
            <ListItem
                  innerDivStyle={ styles.listItem }
                  onTouchTap={ this.handlePlayerPop }
                  primaryText={ this.renderPrimary(item) }
                  leftIcon={ <FontIcon className="material-icons" style={{
                        height: 'auto',
                        width: 'auto',
                        top: '0',
                        margin: '0 5px 0 0',
                        left: '0',
                        position: 'relative',
                        fontSize: '18px'
                   }}>person</FontIcon> }
                  secondaryTextLines={ 1 }
                />
                <Popover
                    open={ open }
                    anchorEl={ anchorEl }
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{ horizontal: 'left', vertical: 'top'}}
                    onRequestClose={()=>{ this.setState({ open: false }) }}
                  >
                  { this.renderStats(item) }

              </Popover>
        </div>
        )
      }
  }
});
const displayStat = (selectedOpt) => {
  return {
    display: (selectedOpt.type.toLowerCase() !== 'lastname') ||  (selectedOpt.type.toLowerCase() !== 'name') ? 'flex' : 'none'
  }
}
const styles = {
  listItem: {
    paddingRight: 0, paddingLeft: '15px', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
  }
};
