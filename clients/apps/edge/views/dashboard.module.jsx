var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

var ProgressBar = require('react-progress-bar-plus');
require('react-progress-bar-plus/lib/progress-bar.css');



var players = require('./players.js');
var stats = require('./stats.js');



function mapPlayersAndStats(players, stats) {
  var list = [];
  for (var j = 0; j < players.length; j++) {
    list.push({
      firstName: players[j].firstName,
      lastName: players[j].lastName,
      id: players[j].playerID,
    })
  }
  return list;
}
var newList = mapPlayersAndStats(players, stats);

function mapPlayers(players) {
  var list = [];
  for (var x = 0; x < players.length; x++) {
      list.push({
        // ...players[x],
        firstName: players[x].firstName,
        lastName: players[x].lastName,
        id: players[x].Player_ID,
        // stats: [
          'AST'   : players[x].AST ,
          'TOV'   : players[x].TOV ,
          'PTS'   : players[x].PTS ,
          'PF'    : players[x].PF ,
          'REB'   : players[x].REB ,
          'OREB'  : players[x].OREB ,
          'DREB'  : players[x].DREB ,
          '3P'    : players[x].P3 ,
          'MIN'   : players[x].MIN ,
          'GP'    : players[x].GP ,
          'BLK'   : players[x].BLK ,
          'STL'   : players[x].STL ,
          'FTA'   : players[x].FTA ,
          'FTM'   : players[x].FTM ,
          'FT'    : players[x].FT ,
          'FGA'   : players[x].FGA ,
          'FGM'   : players[x].FGM ,
          'FG'    : players[x].FG ,
          'FG3A'  : players[x].FG3A ,
          'FG3M'  : players[x].FG3M
        // ]
      })
  }
  return list;
}


var dummyUser = {
  name: 'Uncle Rudy',
  email: 'dummy@email.com',
  avatar: 'http://celebritywc.com/images/joseph-gilgun-3.jpg',
}

var lsUser = localStorage.getItem('user');
if (!lsUser) {
  core.tree.set('user', dummyUser);
} else {
 core.tree.set('user', JSON.parse(lsUser));
}



core.Component('dashboard',
  ['myzone', 'menu.top', 'menu.left', 'news', 'compare'],
  (MyZone, TopMenu, LeftMenu, News, Compare)=> {

  return {
    bindings: {
      user : ['user']
    },
    getInitialState(){
      return {
        isMenuOpen: false,
        selectedView: { ref: 'compare' },
        currentView: '',
        myPlayers: [],
        percent: 0,
        autoIncrement: true,
      }
    },
    //
    // componentDidMount() {
    //   // core.tree.set('players', newList);
    // },

    setTab(tab, e){
      this.setState({ selectedView: tab });
      if (this.state.isMenuOpen) this.setState({ isMenuOpen: false });
      location.hash = `/dashboard/${tab.ref}`;
    },

    toggleMenu(){
      this.setState({ isMenuOpen: !this.state.isMenuOpen })
    },

    render(){
      let { autoIncrement, percent } = this.state;
      let { children } = this.props;

      return (
        <div style={ {...dashboard.main, backgroundColor: theme('colors.secondary')} }>
          <TopMenu toggleMenu={ this.toggleMenu } currentView={ this.state.selectedView.title } />
          <LeftMenu isOpen={ this.state.isMenuOpen } onSelectTab={ this.setTab } />

          <div className="content-view" style={ dashboard.content }>
            {
              children
            }
          </div>


        </div>
      );
    }
  };
});

let dashboard = {
  main: {
    width: '100%',
    height: '100%'
  },
  content: {
    position: 'absolute',
    width: 'calc(100% - 180px)',
    padding: '15px',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    top: '45px',
    flexDirection: 'row',
  }
}
