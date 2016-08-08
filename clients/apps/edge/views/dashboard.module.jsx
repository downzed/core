var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');


var players = require('./players.js');
var stats = require('./stats.js');


function mapPlayersAndStats(players, stats) {
  var list = [];
  for (var x = 0; x < stats.length; x++) {
    for (var j = 0; j < players.length; j++) {
      if (stats[x].Player_ID === Number(players[j].playerID)) {
        list.push({
          ...players[j],
          avatar: `http://stats.nba.com/media/players/230x185/${players[j].playerID}.png`,
          stats: {...stats[x]}
        })
      }
    }
  }
  return list;
}
var newList = mapPlayersAndStats(players, stats);

var players = _.reject(newList, ['TeamID', 0]);

players = _.chunk(players, 13)[1];



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
console.log('lsUser', JSON.parse(lsUser));



core.Component('Dashboard',
  ['MyZone', 'Menu.top', 'Menu.left', 'News', 'Compare'],
  (MyZone, TopMenu, LeftMenu, News, Compare)=> {

  return {
    bindings: {
      user : ['user']
    },
    getInitialState(){
      return {
        isMenuOpen: false,
        selectedView: { ref: 'myzone' },
        currentView: '',
        myPlayers: players
      }
    },

    componentDidMount() {
      core.tree.set('players', newList);
    },

    renderView(view){
      switch (view.ref.toLowerCase()) {
      case 'myzone':
        return <MyZone myPlayers={ this.state.myPlayers } user={ this.state.user }/>
        break;
      case 'compare':
        return (<Compare />)
      case 'news':
        return <News />

      }
    },

    setTab(tab, e){
      this.setState({ selectedView: tab });
      if (this.state.isMenuOpen) this.setState({ isMenuOpen: false });
    },

    toggleMenu(){
      this.setState({ isMenuOpen: !this.state.isMenuOpen })
    },

    render(){
      return (
        <div style={ {...dashboard.main, backgroundColor: theme('colors.secondary')} }>
          <TopMenu toggleMenu={ this.toggleMenu } currentView={ this.state.selectedView.title } />
          <LeftMenu isOpen={ this.state.isMenuOpen } onSelectTab={ this.setTab } />

          <div className="content-view" style={ dashboard.content }>
            { this.renderView(this.state.selectedView) }
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
