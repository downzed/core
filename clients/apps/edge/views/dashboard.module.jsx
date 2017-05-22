var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

var ProgressBar = require('react-progress-bar-plus');
require('react-progress-bar-plus/lib/progress-bar.css');

var players = require('./players.js');
var stats = require('./stats.js');

const mapPlayersAndStats = (players, stats) => {
  var list = [];
  for (var j = 0; j < players.length; j++) {
        list.push({
          firstName: players[j].firstName,
          lastName: players[j].lastName,
          id: players[j].playerID,
          teamId: players[j].TeamID || null,
        })
    }
  for (var x in stats) {
    for (var p in list){
      if(stats[x].Player_ID === Number(list[p].id)) {
        // console.log('player', list[p])
        list[p] = {
          ...list[p],
        'AST'   : stats[x].AST ,
        'TOV'   : stats[x].TOV ,
        'PTS'   : stats[x].PTS ,
        'PF'    : stats[x].PF ,
        'REB'   : stats[x].REB ,
        'OREB'  : stats[x].OREB ,
        'DREB'  : stats[x].DREB ,
        '3P'    : stats[x].P3 ,
        'MIN'   : stats[x].MIN ,
        'GP'    : stats[x].GP ,
        'BLK'   : stats[x].BLK ,
        'STL'   : stats[x].STL ,
        'FTA'   : stats[x].FTA ,
        'FTM'   : stats[x].FTM ,
        'FT'    : stats[x].FT ,
        'FGA'   : stats[x].FGA ,
        'FGM'   : stats[x].FGM ,
        'FG'    : stats[x].FG ,
        'FG3A'  : stats[x].FG3A ,
        'FG3M'  : stats[x].FG3M
        }

      }

    }
  }
  return list;
}

var newList = mapPlayersAndStats(players, stats);

const mapPlayers = (players) => {
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
    componentWillMount() {
      let chunks, myplayers, newplayers;
      core.run('getPlayerStats', { timeframe: 365 })
          .then( (result) => {
            if (result !== 'error') {
            // if (result === 'error') return;
              this.setState({ percent: 100 });
              newplayers = mapPlayers(result.stats);
              chunks =  _.chunk(newplayers, 13);
              myplayers = chunks[34];
              // console.dir(myplayers);
              core.tree.set('players', chunks[35]);
              core.tree.set('myPlayers', myplayers);
              this.setMax(players);
            } else {
              core.run('getTeams', { players: newList })
                  .then((res)=>{
                    this.setState({ percent : 100 });
                    chunks =  _.chunk(res, 13);
                    myplayers = chunks[2];
                    console.dir(myplayers);
                    core.tree.set('players', res);
                    core.tree.set('myPlayers', myplayers);
                    this.setMax(res);
                    // console.debug('res',res);
                  })
            }
          });
    },
    setMax(players) {
      var max = {
        reb: {},
        ast: {},
        pts: {},
      };

      max.reb = _.maxBy(players, 'REB').REB;
      max.ast = _.maxBy(players, 'AST').AST;
      max.pts = _.maxBy(players, 'PTS').PTS;

      // ((portion/total) * 100).toFixed(2) + '%'
      core.tree.set(['stats', 'max'], max);
    },
    setTab(tab, e){
      this.setState({ selectedView: tab });
      if (this.state.isMenuOpen) this.setState({ isMenuOpen: false });
      location.hash = `/dashboard/${tab.ref}`;
    },

    toggleMenu(){
      this.setState({ isMenuOpen: !this.state.isMenuOpen })
    },

    render(){
      let { children } = this.props;
      let { isMenuOpen } = this.state;
      var menuOpen = {
        transform: isMenuOpen ? 'translateX(180px)' : 'translateX(0)'
      };
      return (
        <div style={ {...dashboard.main, backgroundColor: theme('colors.secondary')} }>
          <TopMenu toggleMenu={ this.toggleMenu } style={ menuOpen } />
          <LeftMenu isOpen={ isMenuOpen } onSelectTab={ this.setTab } />

          <div className="content-view" style={ {...dashboard.content, ...menuOpen} }>
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
    width: '100%',
    background: 'rgb(183, 195, 208)',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    top: '45px',
    flexDirection: 'row',
    transition: 'transform 0.15s ease-in-out',
    WebkitTransition: '-webkit-transform 0.15s ease-in-out',
  }
}
