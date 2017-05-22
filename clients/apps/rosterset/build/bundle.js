webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactTapEventPlugin = __webpack_require__(2);

	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

	var _MuiThemeProvider = __webpack_require__(28);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _darkBaseTheme = __webpack_require__(210);

	var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);

	var _lightBaseTheme = __webpack_require__(169);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _getMuiTheme = __webpack_require__(54);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var core = __webpack_require__(211);
	var ReactDom = __webpack_require__(266);


	(0, _reactTapEventPlugin2.default)();

	core.loadContext('index', __webpack_require__(392));
	// core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
	core.loadContext('source', __webpack_require__(392));

	core.require(['Index'], function (Index) {

	  ReactDom.render(React.createElement(
	    _MuiThemeProvider2.default,
	    { muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default) },
	    React.createElement(Index, null)
	  ), document.getElementById('app'));
	});

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Index.module.jsx": 393,
		"./components/Loader/ui.Loader.module.jsx": 469,
		"./components/views/player_dialog.module.jsx": 472,
		"./components/views/roto_player.module.jsx": 605,
		"./components/views/roto_player_dialog.module.jsx": 630,
		"./components/views/roto_players.module.jsx": 637,
		"./components/views/view.myZone.module.jsx": 638,
		"./components/views/view.rotoNews.module.jsx": 649,
		"./components/views/view.sign_in.module.jsx": 650,
		"./components/views/view.steps.one.module.jsx": 653,
		"./components/views/view.steps.two.module.jsx": 670,
		"./components/views/views.module.jsx": 675
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 392;


/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Drawer = __webpack_require__(394);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(406);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _AppBar = __webpack_require__(459);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(462);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);
	console.dir(_);

	// var Pusher = require('pusher');
	var base = 'http://46.121.135.238:3310/api/v1.0/';
	var nbaTL = 'http://stats.nba.com/media/img/teams/logos/';

	var players = __webpack_require__(466);
	var stats = __webpack_require__(467).filter(function (pl) {
	  return pl.TimeFrame > 1 && pl.PTS > 5;
	});
	// console.debug('√ß',stats);
	var teams = __webpack_require__(468);

	var mapPlayersAndStats = function mapPlayersAndStats(players, stats) {
	  var list = [];

	  for (var j = 0; j < players.length; j++) {
	    list.push({
	      firstName: players[j].firstName,
	      lastName: players[j].lastName,
	      id: players[j].playerID,
	      teamId: players[j].TeamID || null
	    });
	  }
	  for (var x in stats) {
	    for (var p in list) {
	      if (stats[x].Player_ID === Number(list[p].id)) {
	        list[p] = _extends({}, list[p], {
	          'AST': stats[x].AST,
	          'TOV': stats[x].TOV,
	          'PTS': stats[x].PTS,
	          'PF': stats[x].PF,
	          'REB': stats[x].REB,
	          'OREB': stats[x].OREB,
	          'DREB': stats[x].DREB,
	          '3P': stats[x].P3,
	          'MIN': stats[x].MIN,
	          'GP': stats[x].GP,
	          'BLK': stats[x].BLK,
	          'STL': stats[x].STL,
	          'FTA': stats[x].FTA,
	          'FTM': stats[x].FTM,
	          'FT': stats[x].FT,
	          'FGA': stats[x].FGA,
	          'FGM': stats[x].FGM,
	          'FG': stats[x].FG,
	          'FG3A': stats[x].FG3A,
	          'FG3M': stats[x].FG3M
	        });
	      }
	    }
	  }
	  return list.filter(function (x) {
	    return x.MIN > 5;
	  });
	};

	var newList = mapPlayersAndStats(players, stats);

	core.Component('Index', ['core.App', 'Views'], function (App, Views) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        apps: {},
	        open: false,
	        view: 'myZone',
	        roster: {},
	        name: 'Team Name Roster',
	        timeframe: 365
	      };
	    },
	    componentDidMount: function componentDidMount() {
	      this.getPlayers();
	    },
	    getPlayers: function getPlayers() {
	      // console.log('getPlayers')
	      // sa.get(`${base}stats/players?timeframe=${this.state.timeframe}`)
	      //   .end((err, res)=>{
	      //     if (res && res.ok) {
	      //       console.dir(res.body);
	      //
	      //       // promise.resolve(res.body.body);
	      //
	      //     } else {
	      //       console.log(err)
	      //
	      //       // promise.resolve('error');
	      //     }
	      //   });chunks =  _.chunk(res, 13);
	      var res = this.getTeams(newList);
	      var chunks = _.chunk(res, 13);
	      var myplayers = chunks[6];
	      // console.dir(myplayers);
	      core.tree.set('players', res);
	      core.tree.set('myPlayers', myplayers);
	      this.setMax(res);
	    },
	    getTeams: function getTeams(players) {
	      console.dir(players);
	      var wteams = [];

	      for (var x = 0; x < players.length; x++) {
	        for (var t = 0; t < teams.length; t++) {
	          if (Number(players[x].teamId) === teams[t].teamId) {
	            wteams.push(_extends({}, players[x], teams[t], {
	              teamLogo: teams[t].abbreviation + '_logo.svg'
	            }));
	          }
	        }
	      }
	      return wteams;
	    },
	    setMax: function setMax(players) {
	      var rP, aP, pP;

	      rP = _.maxBy(players, 'REB');
	      aP = _.maxBy(players, 'AST');
	      pP = _.maxBy(players, 'PTS');
	      var max = {
	        reb: { val: rP.REB, player: rP.firstName + ' ' + rP.lastName, id: rP.id },
	        ast: { val: aP.AST, player: aP.firstName + ' ' + aP.lastName, id: aP.id },
	        pts: { val: pP.PTS, player: pP.firstName + ' ' + pP.lastName, id: pP.id }
	      };
	      core.tree.set(['stats', 'max'], max);
	      // console.dir(core.tree.get(['stats', 'max']));
	    },
	    handleClose: function handleClose() {
	      this.setState({ open: false });
	    },
	    changeViews: function changeViews(view) {
	      this.setState({ view: view, open: false });
	    },
	    getLocalStorageDetails: function getLocalStorageDetails(details) {
	      console.log('obj');
	      this.setState({ roster: _extends({}, roster, details) });
	    },
	    render: function render() {
	      var _this = this;

	      var _state = this.state;
	      var open = _state.open;
	      var view = _state.view;
	      var name = _state.name;
	      var type = _state.type;

	      return React.createElement(
	        App,
	        null,
	        React.createElement(_AppBar2.default, { title: name,
	          onLeftIconButtonTouchTap: function onLeftIconButtonTouchTap(e) {
	            _this.setState({ open: !open });
	          } }),
	        React.createElement(
	          _Drawer2.default,
	          {
	            docked: false,
	            width: 200,
	            open: open,
	            onRequestChange: function onRequestChange(e) {
	              _this.setState({ open: !open });
	            } },
	          React.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.changeViews.bind(this, 'myZone') },
	            'Home'
	          ),
	          React.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.changeViews.bind(this, 'RotoNews') },
	            'News'
	          ),
	          React.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.changeViews.bind(this, 'RotoPlayers') },
	            'Players'
	          ),
	          React.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.changeViews.bind(this, 'SignIn') },
	            'Sign In'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'wrapper', style: { padding: '25px', bottom: '0', top: '65px', width: '100%', position: 'absolute' } },
	          React.createElement(Views, {
	            getLocalStorageDetails: this.getLocalStorageDetails,
	            view: view,
	            handleNameChange: function handleNameChange(name) {
	              _this.setState({ name: name });
	            } })
	        )
	      );
	    }
	  };
	});

/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(29);
	var PropTypes = React.PropTypes;

	var core = __webpack_require__(211);
	var myCss = __webpack_require__(470);

	var allScreen = {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	  position: 'absolute',
	  top: 0,
	  bottom: 0,
	  left: 0,
	  right: 0,
	  zIndex: 1
	};

	var box = {
	  position: 'absolute',
	  top: 0,
	  bottom: 0,
	  left: 0,
	  right: 0,
	  zIndex: 1
	};

	core.Component('ui.Loader', [], function () {
	  return {

	    propTypes: {
	      type: PropTypes.number,
	      background: PropTypes.string, // the background of the 'allScreen' wrapper. [color in hex, or rgb] none for no background
	      opacity: PropTypes.number // the opacity of the 'allScreen' wrapper.
	    },

	    getDefaultProps: function getDefaultProps() {
	      return {
	        type: 1,
	        background: '#FFF',
	        opacity: 0.5
	      };
	    },
	    renderLoader: function renderLoader() {
	      if (this.props.type === 1) {
	        return React.createElement(
	          'div',
	          { className: 'spinner' },
	          React.createElement('div', { className: 'bounce1' }),
	          React.createElement('div', { className: 'bounce2' }),
	          React.createElement('div', { className: 'bounce3' })
	        );
	      }

	      if (this.props.type === 2) {
	        return React.createElement(
	          'div',
	          { className: 'sk-fading-circle' },
	          React.createElement('div', { className: 'sk-circle1 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle2 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle3 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle4 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle5 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle6 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle7 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle8 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle9 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle10 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle11 sk-circle' }),
	          React.createElement('div', { className: 'sk-circle12 sk-circle' })
	        );
	      }

	      if (this.props.type === 3) {
	        return React.createElement('div', { className: 'circle' });
	      }
	    },
	    render: function render() {
	      return React.createElement(
	        'div',
	        { style: _extends({}, box, this.props.style) },
	        ' ',
	        React.createElement(
	          'div',
	          { style: _extends({}, allScreen, { background: this.props.background, opacity: this.props.opacity }) },
	          this.renderLoader()
	        )
	      );
	    }
	  };
	});

	{/*
	   calling to <Loader /> will be like:
	  <Loader background="#000" style={ {width: 10px, marginLeft: 15px} } show={!this.state.data} spinner={1} />
	  */}

/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(471);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(259)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./loader-theme.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./loader-theme.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(258)();
	// imports


	// module
	exports.push([module.id, ".spinner {\n  width: 70px;\n  text-align: center;\n}\n\n.spinner > div {\n  width: 10px;\n  height: 10px;\n  background-color: #333;\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n\n.spinner .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.spinner .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n.sk-fading-circle {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}\n\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #333;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n      -ms-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n      -ms-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n      -ms-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n      -ms-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n      -ms-transform: rotate(300deg);\n          transform: rotate(300deg);\n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n      -ms-transform: rotate(330deg);\n          transform: rotate(330deg);\n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n          animation-delay: -1s;\n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n          animation-delay: -0.7s;\n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s;\n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n          animation-delay: -0.5s;\n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n          animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n          animation-delay: -0.1s;\n}\n\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n.circle {\n  width: 40px;\n  height: 40px;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n  animation: sk-scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes sk-scaleout {\n  0% { -webkit-transform: scale(0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 100% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n    opacity: 0;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Dialog = __webpack_require__(473);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _FlatButton = __webpack_require__(462);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _MenuItem = __webpack_require__(406);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(445);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Table = __webpack_require__(477);

	var _List = __webpack_require__(490);

	var _GridList = __webpack_require__(492);

	var _CircularProgress = __webpack_require__(495);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Tabs = __webpack_require__(497);

	var _colors = __webpack_require__(170);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);
	var moment = __webpack_require__(502);

	var returnAvatar = function returnAvatar(id) {

	  run('http://stats.nba.com/media/players/230x185/' + id + '.png');

	  function run(uri) {
	    console.log(uri);
	    var xhr = new XMLHttpRequest();
	    xhr.responseType = 'blob';
	    xhr.onload = function () {
	      try {
	        return window.URL.createObjectURL(xhr.response);
	      } catch (e) {
	        console.error(e);
	      }
	      // return window.URL.createObjectURL(xhr.response);
	    };
	    xhr.open('GET', uri, true);
	    xhr.send();
	  }
	};
	var urls = [{
	  title: 'stats',
	  url: 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}, {
	  title: 'news',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}];

	core.Component('PlayerDialog', [], function () {
	  return {

	    bindings: {
	      open: ['player', 'popup', 'open'],
	      player: ['player', 'popup', 'player'],
	      data: ['player', 'popup', 'data']
	    },

	    getInitialState: function getInitialState() {
	      return {
	        loading: false,
	        modes: ['news', 'stats'],
	        attr: [{ attr: 'MATCHUP', label: 'OPP' }, { attr: 'GAME_DATE', label: '' }, { attr: 'PTS', label: 'PTS' }, { attr: 'AST', label: 'AST' }, { attr: 'REB', label: 'REB' }, { attr: 'STL', label: 'STL' }, { attr: 'BLK', label: 'BLK' }, { attr: 'FG3M', label: '3PM' }, { attr: 'FG3A', label: '3PA' }, { attr: 'FGM', label: 'FGM' }, { attr: 'FGA', label: 'FGA' }, { attr: 'FTM', label: 'FTM' }, { attr: 'FTA', label: 'FTA' }, { attr: 'TOV', label: 'TOV' }, { attr: 'MIN', label: 'MIN' }, { attr: 'WL', label: 'WL' }],
	        value: 'stats'
	      };
	    },
	    componentDidMount: function componentDidMount() {
	      core.on('get.Player.data', this.getData);
	    },
	    getData: function getData(_ref) {
	      var player = _ref.player;
	      var type = _ref.type;

	      // console.log('player', player)
	      core.tree.set(['player', 'popup', 'data'], []);

	      this.setState({ loading: true });

	      var _$find = _.find(urls, ['title', type]);

	      var url = _$find.url;
	      var img = _$find.img;

	      var limit = type === 'stats';
	      this.getInfo(url, player.id, limit);
	    },
	    getInfo: function getInfo(url, id, limit) {
	      var _this = this;

	      var playersJson;
	      if (!limit) {
	        url += id + '&limit=6';
	      } else url += id;
	      return new Promise(function (resolve, reject) {
	        sa.get(url).end(function (err, res) {
	          console.dir(res);
	          if (res && res.status === 200) {
	            if (!_.isEmpty(res.body)) {
	              if (!limit) _this.setNews(res.body.PlayerRotowires);else _this.setDetails(res.body.resultSets[0]);
	            }
	          }
	        });
	      });
	    },
	    setNews: function setNews(news) {
	      var _this2 = this;

	      console.debug('news', news);

	      news = _.map(news, function (nooz) {
	        return _extends({}, nooz, {
	          Headline: nooz.lastUpdate });
	      });
	      core.tree.set(['player', 'popup', 'data'], news);
	      setTimeout(function () {
	        if (_this2.isMounted()) _this2.setState({ loading: false });
	      }, 2500);
	    },
	    setDetails: function setDetails(data, limit) {
	      var _this3 = this;

	      var gameObjects = [],
	          header,
	          temp,
	          games,
	          list,
	          gh = [];
	      var attr = this.state.attr;


	      var headers = [];
	      for (var x = 0; x < attr.length; x++) {
	        headers.push(attr[x].attr);
	      }
	      for (var i = 0; i < data.rowSet.length; i++) {
	        var gameRow = data.rowSet[i];
	        gameObjects.push(gameRow);
	      }

	      games = _.map(gameObjects, function (game) {
	        return _.zipObject(data.headers, game);
	      });

	      var array = [];

	      for (var g = 0; g < games.length; g++) {
	        var obj = {};
	        for (var _i in headers) {
	          if (_.has(games[g], headers[_i])) {
	            obj[headers[_i]] = games[g][headers[_i]];
	          }
	        }
	        array.push(obj);
	      }
	      var findStr = function findStr(str) {
	        if (str.indexOf('vs.') > -1) {
	          return str.substring(str.indexOf('vs.'));
	        } else return str.substring(str.indexOf('@'));
	      };
	      array = array.map(function (item) {
	        return _extends({}, item, {
	          MATCHUP: findStr(item.MATCHUP),
	          GAME_DATE: moment(new Date(item.GAME_DATE)).format('DD/MM/YY')
	        });
	      });
	      core.tree.set(['player', 'popup', 'data'], array);
	      setTimeout(function () {
	        if (_this3.isMounted()) _this3.setState({ loading: false });
	      }, 2500);
	    },
	    renderButtons: function renderButtons(mode, key) {
	      var getClassName = function getClassName() {
	        if (mode === 'news') return 'fa fa-newspaper-o';else return 'fa fa-pie-chart';
	      };
	      return React.createElement(_IconButton2.default, { key: key,
	        iconClassName: getClassName(), tooltip: mode.toUpperCase(),
	        tooltipPosition: 'bottom-center'
	      });
	    },
	    handleClose: function handleClose() {
	      core.tree.set(['player', 'popup', 'open'], false);
	      core.tree.set(['player', 'popup', 'data'], {});
	      this.setState({ value: 'stats' });
	    },
	    handleChange: function handleChange(value) {
	      this.setState({ value: value });
	      this.getData({ player: this.state.player, type: value });
	    },
	    renderHeaders: function renderHeaders(header, key) {
	      return React.createElement(
	        _Table.TableHeaderColumn,
	        { style: { width: '45px !important', padding: '0.2em', fontSize: 10, height: 45 }, key: key },
	        header.label
	      );
	    },
	    renderGameRow: function renderGameRow(game, key) {
	      return React.createElement(
	        _Table.TableRow,
	        { key: key },
	        _.map(game, this.renderCube)
	      );
	    },
	    renderCube: function renderCube(at, i) {
	      // console.log(at)
	      return React.createElement(
	        _Table.TableRowColumn,
	        { key: i, style: { width: '45px !important', padding: '0.2em', fontSize: 10, height: 43 } },
	        at
	      );
	    },
	    renderNews: function renderNews(item, key) {
	      var loading = this.state.loading;

	      var style = {
	        transition: 'all 0.2s ease-in-out 0.1s',
	        WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	        opacity: loading ? 0 : 1,
	        transform: loading ? 'scale(0.4)' : 'scale(1)',
	        WebkitTransform: loading ? 'scale(0.4)' : 'scale(1)'
	      };
	      var card = {
	        height: '100%',
	        fontSize: 12,
	        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
	      };
	      return React.createElement(
	        _GridList.GridTile,
	        {
	          key: key,
	          style: card,
	          title: React.createElement(
	            'span',
	            { style: { left: '10px',
	                position: 'absolute',
	                fontSize: '13px',
	                top: 0,
	                bottom: 0,
	                display: 'flex',
	                alignItems: 'center' } },
	            item.Headline
	          ),
	          titlePosition: 'top' },
	        React.createElement(
	          'div',
	          {
	            style: { height: '100%',
	              overflowY: 'auto',
	              padding: '55px 15px 15px 15px', backgroundColor: '#eee', marginLeft: 0, borderTop: '1px solid #ddd' } },
	          item.ListItemDescription
	        )
	      );
	    },
	    render: function render() {
	      var _state = this.state;
	      var player = _state.player;
	      var open = _state.open;
	      var value = _state.value;
	      var attr = _state.attr;
	      var loading = _state.loading;
	      var data = _state.data;

	      var actions = [React.createElement(_FlatButton2.default, {
	        label: 'Close',
	        primary: true,
	        onTouchTap: this.handleClose
	      })];
	      var customContentStyle = {
	        width: '95%',
	        maxWidth: 'none'
	      };

	      var loader = function loader(show) {
	        var cp = {
	          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
	          zIndex: 1,
	          background: 'rgba(225,225,225,0.6)',
	          flex: 1,
	          display: 'flex',
	          alignItems: 'center',
	          justifyContent: 'center'
	        };
	        if (show) return React.createElement(
	          'div',
	          { style: cp },
	          React.createElement(_CircularProgress2.default, { mode: 'indeterminate' })
	        );
	        return null;
	      };

	      return React.createElement(
	        _Dialog2.default,
	        {
	          title: open && player ? player.lastName : '',
	          actions: actions,
	          modal: false,
	          contentStyle: customContentStyle,
	          bodyStyle: { padding: 0, maxHeight: '600px' },
	          autoScrollBodyContent: false /* value !== 'stats' */,
	          open: open || false,
	          onRequestClose: this.handleClose
	        },
	        loader(loading),
	        React.createElement(
	          _Tabs.Tabs,
	          {
	            tabItemContainerStyle: { backgroundColor: _colors.cyan700 },
	            inkBarStyle: { backgroundColor: _colors.deepPurple100 },
	            style: { padding: 0 },
	            value: value,
	            onChange: this.handleChange
	          },
	          React.createElement(
	            _Tabs.Tab,
	            { label: 'Stats', value: 'stats', style: { height: '100%' } },
	            !loading && data && value === 'stats' ? React.createElement(
	              _Table.Table,
	              { fixedHeader: true, height: '405px', bodyStyle: { padding: '0 5px' }, headerStyle: { padding: '0 5px' } },
	              React.createElement(
	                _Table.TableHeader,
	                { displaySelectAll: false, adjustForCheckbox: false },
	                React.createElement(
	                  _Table.TableRow,
	                  null,
	                  attr && _.map(attr, this.renderHeaders)
	                )
	              ),
	              React.createElement(
	                _Table.TableBody,
	                { showRowHover: true, displayRowCheckbox: false },
	                data && _.map(data, this.renderGameRow)
	              )
	            ) : null
	          ),
	          React.createElement(
	            _Tabs.Tab,
	            { label: 'News', value: 'news' },
	            !loading && data && value === 'news' ? React.createElement(
	              _GridList.GridList,
	              {
	                cols: 3,
	                padding: 15,
	                cellHeight: 200,
	                style: { margin: 0, width: '100%', height: 'auto', overflowY: 'auto' }
	              },
	              _.map(data, this.renderNews)
	            ) : null
	          )
	        )
	      );
	    }
	  };
	});
	var styles = {
	  avatar: {
	    paper: {
	      height: 45,
	      width: 45,
	      overflow: 'hidden',
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
	    alignItems: 'center'
	  }
	};

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 504,
		"./af.js": 504,
		"./ar": 505,
		"./ar-ma": 506,
		"./ar-ma.js": 506,
		"./ar-sa": 507,
		"./ar-sa.js": 507,
		"./ar-tn": 508,
		"./ar-tn.js": 508,
		"./ar.js": 505,
		"./az": 509,
		"./az.js": 509,
		"./be": 510,
		"./be.js": 510,
		"./bg": 511,
		"./bg.js": 511,
		"./bn": 512,
		"./bn.js": 512,
		"./bo": 513,
		"./bo.js": 513,
		"./br": 514,
		"./br.js": 514,
		"./bs": 515,
		"./bs.js": 515,
		"./ca": 516,
		"./ca.js": 516,
		"./cs": 517,
		"./cs.js": 517,
		"./cv": 518,
		"./cv.js": 518,
		"./cy": 519,
		"./cy.js": 519,
		"./da": 520,
		"./da.js": 520,
		"./de": 521,
		"./de-at": 522,
		"./de-at.js": 522,
		"./de.js": 521,
		"./dv": 523,
		"./dv.js": 523,
		"./el": 524,
		"./el.js": 524,
		"./en-au": 525,
		"./en-au.js": 525,
		"./en-ca": 526,
		"./en-ca.js": 526,
		"./en-gb": 527,
		"./en-gb.js": 527,
		"./en-ie": 528,
		"./en-ie.js": 528,
		"./en-nz": 529,
		"./en-nz.js": 529,
		"./eo": 530,
		"./eo.js": 530,
		"./es": 531,
		"./es-do": 532,
		"./es-do.js": 532,
		"./es.js": 531,
		"./et": 533,
		"./et.js": 533,
		"./eu": 534,
		"./eu.js": 534,
		"./fa": 535,
		"./fa.js": 535,
		"./fi": 536,
		"./fi.js": 536,
		"./fo": 537,
		"./fo.js": 537,
		"./fr": 538,
		"./fr-ca": 539,
		"./fr-ca.js": 539,
		"./fr-ch": 540,
		"./fr-ch.js": 540,
		"./fr.js": 538,
		"./fy": 541,
		"./fy.js": 541,
		"./gd": 542,
		"./gd.js": 542,
		"./gl": 543,
		"./gl.js": 543,
		"./he": 544,
		"./he.js": 544,
		"./hi": 545,
		"./hi.js": 545,
		"./hr": 546,
		"./hr.js": 546,
		"./hu": 547,
		"./hu.js": 547,
		"./hy-am": 548,
		"./hy-am.js": 548,
		"./id": 549,
		"./id.js": 549,
		"./is": 550,
		"./is.js": 550,
		"./it": 551,
		"./it.js": 551,
		"./ja": 552,
		"./ja.js": 552,
		"./jv": 553,
		"./jv.js": 553,
		"./ka": 554,
		"./ka.js": 554,
		"./kk": 555,
		"./kk.js": 555,
		"./km": 556,
		"./km.js": 556,
		"./ko": 557,
		"./ko.js": 557,
		"./ky": 558,
		"./ky.js": 558,
		"./lb": 559,
		"./lb.js": 559,
		"./lo": 560,
		"./lo.js": 560,
		"./lt": 561,
		"./lt.js": 561,
		"./lv": 562,
		"./lv.js": 562,
		"./me": 563,
		"./me.js": 563,
		"./mk": 564,
		"./mk.js": 564,
		"./ml": 565,
		"./ml.js": 565,
		"./mr": 566,
		"./mr.js": 566,
		"./ms": 567,
		"./ms-my": 568,
		"./ms-my.js": 568,
		"./ms.js": 567,
		"./my": 569,
		"./my.js": 569,
		"./nb": 570,
		"./nb.js": 570,
		"./ne": 571,
		"./ne.js": 571,
		"./nl": 572,
		"./nl.js": 572,
		"./nn": 573,
		"./nn.js": 573,
		"./pa-in": 574,
		"./pa-in.js": 574,
		"./pl": 575,
		"./pl.js": 575,
		"./pt": 576,
		"./pt-br": 577,
		"./pt-br.js": 577,
		"./pt.js": 576,
		"./ro": 578,
		"./ro.js": 578,
		"./ru": 579,
		"./ru.js": 579,
		"./se": 580,
		"./se.js": 580,
		"./si": 581,
		"./si.js": 581,
		"./sk": 582,
		"./sk.js": 582,
		"./sl": 583,
		"./sl.js": 583,
		"./sq": 584,
		"./sq.js": 584,
		"./sr": 585,
		"./sr-cyrl": 586,
		"./sr-cyrl.js": 586,
		"./sr.js": 585,
		"./ss": 587,
		"./ss.js": 587,
		"./sv": 588,
		"./sv.js": 588,
		"./sw": 589,
		"./sw.js": 589,
		"./ta": 590,
		"./ta.js": 590,
		"./te": 591,
		"./te.js": 591,
		"./th": 592,
		"./th.js": 592,
		"./tl-ph": 593,
		"./tl-ph.js": 593,
		"./tlh": 594,
		"./tlh.js": 594,
		"./tr": 595,
		"./tr.js": 595,
		"./tzl": 596,
		"./tzl.js": 596,
		"./tzm": 597,
		"./tzm-latn": 598,
		"./tzm-latn.js": 598,
		"./tzm.js": 597,
		"./uk": 599,
		"./uk.js": 599,
		"./uz": 600,
		"./uz.js": 600,
		"./vi": 601,
		"./vi.js": 601,
		"./x-pseudo": 602,
		"./x-pseudo.js": 602,
		"./zh-cn": 603,
		"./zh-cn.js": 603,
		"./zh-tw": 604,
		"./zh-tw.js": 604
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 503;


/***/ },

/***/ 605:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(606);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(608);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(490);

	var _RefreshIndicator = __webpack_require__(611);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(495);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(613);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(615);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(473);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _IconButton = __webpack_require__(445);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(627);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(628);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(406);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);


	// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
	// const baseUrl = '
	// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.fantasypros.com/nba/stats/rodney-stuckey.php&format=rss&num=30;

	var urls = [{
	  title: 'stats',
	  url: 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}, {
	  title: 'news',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}];

	core.Component('RotoPlayer', ['RotoPlayerDialog'], function (RotoPlayerDialog) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        player: {},
	        popupType: 'stats',
	        showPopup: false,
	        isLoading: true,
	        urls: urls
	      };
	    },
	    openPopup: function openPopup(type, player) {
	      console.log(type);
	      console.log(player);

	      var _$find = _.find(urls, ['title', type]);

	      var url = _$find.url;
	      var img = _$find.img;

	      var limit = type === 'stats';
	      this.getInfo(url, player.id, limit);
	    },
	    getInfo: function getInfo(url, id, limit) {
	      var _this = this;

	      var playersJson;
	      if (!limit) {
	        url += id + '&limit=3';
	      } else url += id;
	      return new Promise(function (resolve, reject) {
	        sa.get(url).end(function (err, res) {
	          console.dir(res);
	          if (res && res.status === 200) {
	            if (!_.isEmpty(res.body)) {
	              if (!limit) _this.setNews(res.body.PlayerRotowires);else _this.setDetails(res.body.resultSets[0]);
	            }
	          }
	        });
	      });
	    },
	    setNews: function setNews(news) {
	      this.setState({ data: news, showPopup: true, popupType: 'news' });
	    },
	    setDetails: function setDetails(data, limit) {
	      var gameObjects = [],
	          header,
	          temp,
	          stats,
	          list;

	      for (var i = 0; i < data.rowSet.length; i++) {
	        var gameRow = data.rowSet[i];
	        gameObjects.push(gameRow);
	      }

	      stats = _.map(gameObjects, function (game) {
	        return _.zipObject(data.headers, game);
	      });

	      this.setState({ data: stats, showPopup: true, popupType: 'stats' });
	    },
	    handleClose: function handleClose() {
	      this.setState({ showPopup: false });
	    },
	    render: function render() {
	      var _state = this.state;
	      var showPopup = _state.showPopup;
	      var data = _state.data;
	      var popupType = _state.popupType;
	      var _props = this.props;
	      var player = _props.player;
	      var selected = _props.selected;
	      var isLoading = _props.isLoading;

	      var selectedStyle = selected.toLowerCase() === 'rotoworld' ? { maxWidth: '100%' } : { maxHeight: '100%' };
	      var style = {
	        transition: 'all 0.2s ease-in-out 0.1s',
	        WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	        opacity: isLoading ? 0 : 1,
	        transform: isLoading ? 'scale(0.4)' : 'scale(1)',
	        WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)'
	      };
	      var iconButtonElement = React.createElement(
	        _IconButton2.default,
	        { touch: true },
	        React.createElement(_moreVert2.default, null)
	      );

	      var rightIconMenu = React.createElement(
	        _IconMenu2.default,
	        { iconButtonElement: iconButtonElement },
	        React.createElement(
	          _MenuItem2.default,
	          { onTouchTap: this.openPopup.bind(this, 'stats', player) },
	          'Stats'
	        ),
	        React.createElement(
	          _MenuItem2.default,
	          { onTouchTap: this.openPopup.bind(this, 'news', player) },
	          'News'
	        )
	      );
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(_List.ListItem, {
	          rightIconButton: rightIconMenu,
	          leftAvatar: React.createElement(
	            _Paper2.default,
	            { style: _extends({}, styles.avatar.paper, style), zDepth: 2, circle: true },
	            React.createElement('img', { style: selectedStyle, id: player.id })
	          ),
	          primaryText: player.DISPLAY_LAST_COMMA_FIRST,
	          secondaryText: player.TEAM_CITY + ' ' + player.TEAM_NAME
	        }),
	        React.createElement(RotoPlayerDialog, { showPopup: showPopup, data: data,
	          player: player,
	          type: popupType,
	          handleClose: this.handleClose,
	          primaryLabel: player.DISPLAY_LAST_COMMA_FIRST,
	          secondaryLabel: player.TEAM_CITY + ' ' + player.TEAM_NAME })
	      );
	    }
	  };
	});
	var styles = {
	  avatar: {
	    paper: {
	      height: 45,
	      width: 45,
	      overflow: 'hidden',
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
	    alignItems: 'center'
	  }
	};

/***/ },

/***/ 630:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Drawer = __webpack_require__(394);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _AppBar = __webpack_require__(459);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(462);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _MenuItem = __webpack_require__(406);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(445);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _List = __webpack_require__(490);

	var _close = __webpack_require__(631);

	var _close2 = _interopRequireDefault(_close);

	var _Toolbar = __webpack_require__(632);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);


	var returnAvatar = function returnAvatar(id) {

	  run('http://stats.nba.com/media/players/230x185/' + id + '.png');

	  function run(uri) {
	    console.log(uri);
	    var xhr = new XMLHttpRequest();
	    xhr.responseType = 'blob';
	    xhr.onload = function () {
	      try {
	        return window.URL.createObjectURL(xhr.response);
	      } catch (e) {
	        console.error(e);
	      }
	      // return window.URL.createObjectURL(xhr.response);
	    };
	    xhr.open('GET', uri, true);
	    xhr.send();
	  }
	};
	// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
	// const baseUrl = '
	// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.fantasypros.com/nba/stats/rodney-stuckey.php&format=rss&num=30;

	var urls = [{
	  title: 'stats',
	  url: 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}, {
	  title: 'news',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}];

	core.Component('RotoPlayerDialog', ['ui.Loader'], function (Loader) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        open: this.props.showPopup,
	        modes: ['news', 'stats']
	      };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	      if (nextProps.data !== this.props.data) console.debug('data', nextProps.data);
	    },
	    renderButtons: function renderButtons(mode, key) {
	      var getClassName = function getClassName() {
	        if (mode === 'news') return 'fa fa-newspaper-o';else return 'fa fa-pie-chart';
	      };
	      return React.createElement(_IconButton2.default, { key: key,
	        iconClassName: getClassName(), tooltip: mode.toUpperCase(),
	        tooltipPosition: 'bottom-center'
	      });
	    },
	    render: function render() {
	      var _props = this.props;
	      var primaryLabel = _props.primaryLabel;
	      var secondaryLabel = _props.secondaryLabel;
	      var data = _props.data;
	      var player = _props.player;
	      var handleClose = _props.handleClose;
	      var showPopup = _props.showPopup;

	      if (!showPopup) return null;
	      return React.createElement(
	        _Drawer2.default,
	        { width: 450, openSecondary: true, open: showPopup },
	        React.createElement(
	          _List.ListItem,
	          {
	            rightIconButton: React.createElement(_IconButton2.default, { onTouchTap: handleClose, iconClassName: 'fa fa-times' }),
	            leftAvatar: React.createElement(
	              _Paper2.default,
	              { zDepth: 1, circle: true, style: styles.avatar.paper },
	              React.createElement('img', { src: showPopup ? returnAvatar(player.id) : null, style: { maxWidth: '100%' }, id: player.id })
	            ),
	            primaryText: player.DISPLAY_LAST_COMMA_FIRST,
	            secondaryText: player.TEAM_CITY + ' ' + player.TEAM_NAME
	          },
	          showPopup && data.length ? _.map(this.state.modes, this.renderButtons) : null
	        )
	      );
	    }
	  };
	});
	var styles = {
	  avatar: {
	    paper: {
	      height: 45,
	      width: 45,
	      overflow: 'hidden',
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
	    alignItems: 'center'
	  }
	};

/***/ },

/***/ 637:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(606);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(608);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(490);

	var _RefreshIndicator = __webpack_require__(611);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(495);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(613);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(615);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(473);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _IconButton = __webpack_require__(445);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(627);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(628);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(406);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);


	// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
	// const baseUrl = '
	// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.fantasypros.com/nba/stats/rodney-stuckey.php&format=rss&num=30;

	var urls = [{
	  title: 'players',
	  url: 'http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=2016-17',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}, {
	  title: 'Roto Wire',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?v=717525&limit=10',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}];

	var returnAvatar = function returnAvatar(id, uri, type) {
	  run('' + uri + id + '.png');
	  function run(uri) {
	    var xhr = new XMLHttpRequest();
	    xhr.responseType = 'blob';
	    xhr.onload = function () {
	      try {
	        document.getElementById(id).src = window.URL.createObjectURL(xhr.response);
	      } catch (e) {}
	      // console.error(e)

	      // return window.URL.createObjectURL(xhr.response);
	    };
	    xhr.open('GET', uri, true);
	    xhr.send();
	  }
	};

	core.Component('view.RotoPlayers', ['RotoPlayer'], function (RotoPlayer) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        selected: 'players', // Rotoworld
	        players: [],
	        list: [],
	        urls: urls,
	        listItemOpen: false,
	        isLoading: true
	      };
	    },
	    getRss: function getRss(url) {
	      var _this = this;

	      this.setState({ isLoading: true });
	      var playersJson;
	      return new Promise(function (resolve, reject) {
	        sa.get(url).end(function (err, res) {
	          if (res && res.status === 200) {
	            if (!_.isEmpty(res.body)) {
	              _this.setListItems(res.body.resultSets[0]);
	            }
	          }
	        });
	      });
	    },
	    setListItems: function setListItems(json) {

	      // console.debug('JSON', json);
	      var _state = this.state;
	      var selected = _state.selected;
	      var img = _state.img;
	      var players = _state.players;


	      var playerObjects = [],
	          header,
	          temp,
	          res,
	          list;
	      for (var i = 0; i < 550; i++) {
	        var playerRow = json.rowSet[i];
	        playerObjects.push(playerRow);
	      }

	      res = _.map(playerObjects, function (player) {
	        return _.zipObject(json.headers, player);
	      }).filter(function (p) {
	        return p.ROSTERSTATUS !== 0;
	      });
	      res = _.map(res, function (pl) {
	        return _extends({}, pl, {
	          id: pl.PERSON_ID
	        });
	      });

	      list = this.createList(res);
	      this.setState({ list: list, players: res, entries: json });
	    },
	    componentDidMount: function componentDidMount() {
	      this.loadUrl('players');
	    },
	    createList: function createList(res) {
	      var img = this.state.img;

	      var list = { letters: [] };
	      _.forEach(res, function (player) {
	        var itLetter = player.DISPLAY_LAST_COMMA_FIRST.substring(0, 1).toUpperCase();
	        player.avatar = returnAvatar(player.id, img);
	        if (!(itLetter in list)) {
	          list[itLetter] = [];
	          list.letters.push(itLetter);
	        }
	        list[itLetter].push(player);
	      });
	      list.letters.sort();
	      this.setState({ isLoading: false });
	      return list;
	    },
	    loadUrl: function loadUrl(selected) {
	      var urls = this.state.urls;

	      var _$find = _.find(urls, ['title', selected]);

	      var url = _$find.url;
	      var img = _$find.img;

	      this.setState({ selected: selected, img: img });

	      this.getRss(url);
	    },
	    handleSelectFeed: function handleSelectFeed(event, index, value) {
	      this.loadUrl(value);
	    },
	    renderList: function renderList(item, key) {
	      var _state2 = this.state;
	      var selected = _state2.selected;
	      var isLoading = _state2.isLoading;
	      var list = _state2.list;


	      var style = {
	        transition: 'all 0.2s ease-in-out 0.1s',
	        WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	        opacity: isLoading ? 0 : 1,
	        transform: isLoading ? 'scale(0.4)' : 'scale(1)',
	        WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)'
	      };

	      return React.createElement(_List.ListItem, { key: key,
	        style: { height: '55px' },
	        leftAvatar: React.createElement(
	          _Avatar2.default,
	          {
	            style: _extends({}, style) },
	          item
	        ),
	        primaryTogglesNestedList: true,
	        secondaryTextLines: 1,
	        nestedItems: [].concat(_toConsumableArray(_.map(list[item], this.renderNested)))
	      });
	    },
	    renderNested: function renderNested(player, key) {
	      var _state3 = this.state;
	      var selected = _state3.selected;
	      var isLoading = _state3.isLoading;
	      var list = _state3.list;


	      return React.createElement(RotoPlayer, { key: key, player: player, selected: selected, isLoading: isLoading });
	      // const selectedStyle = selected.toLowerCase() === 'rotoworld' ? { maxWidth: '100%' } : { maxHeight: '100%' }
	      // let style = {
	      //   transition: 'all 0.2s ease-in-out 0.1s',
	      //   WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	      //   opacity: isLoading ? 0 : 1,
	      //   transform: isLoading  ? 'scale(0.4)' : 'scale(1)',
	      //   WebkitTransform: isLoading  ? 'scale(0.4)' : 'scale(1)'
	      // }
	      // const iconButtonElement = (
	      //   <IconButton
	      //     touch={true}
	      //     tooltip="more"
	      //     tooltipPosition={ key === list.length-1  ? "top-left" : "bottom-left" }
	      //   >
	      //     <MoreVertIcon />
	      //   </IconButton>
	      // );
	      //
	      // const rightIconMenu = (
	      //   <IconMenu iconButtonElement={iconButtonElement}>
	      //     <MenuItem >Stats</MenuItem>
	      //     <MenuItem>News</MenuItem>
	      //   </IconMenu>
	      // );
	      // return(
	      //    <ListItem key={ key }
	      //      rightIconButton={ rightIconMenu }
	      //      leftAvatar={
	      //        <Paper style={{ ...styles.avatar.paper, ...style }} zDepth={ 2 } circle={ true }>
	      //          <img style={ selectedStyle } id={ player.id }
	      //
	      //            />
	      //        </Paper>
	      //      }
	      //      primaryText={ player.DISPLAY_LAST_COMMA_FIRST }
	      //      secondaryText={ player.TEAM_CITY + ' ' + player.TEAM_NAME }
	      //    />);
	    },
	    renderSelectList: function renderSelectList(item, key) {
	      return React.createElement(_MenuItem2.default, { key: key, value: item.title, primaryText: item.title });
	    },
	    filterPlayers: function filterPlayers(string) {
	      var players = this.state.players;

	      var temp = _.filter(players, function (o) {
	        return o.DISPLAY_FIRST_LAST.toLowerCase().indexOf(string.toLowerCase()) > -1 || o.DISPLAY_LAST_COMMA_FIRST.toLowerCase().indexOf(string.toLowerCase()) > -1;
	      });

	      var xlist = this.createList(temp);
	      this.setState({ list: xlist });
	    },
	    onKeyDown: function onKeyDown(e, string) {
	      var _this2 = this;

	      var _makeSearchRequest = function _makeSearchRequest() {
	        _this2.filterPlayers(string);
	      };

	      var search = _.debounce(_makeSearchRequest, 250);

	      search();
	    },
	    render: function render() {
	      var _state4 = this.state;
	      var type = _state4.type;
	      var list = _state4.list;
	      var players = _state4.players;
	      var isLoading = _state4.isLoading;
	      var urls = _state4.urls;
	      var selected = _state4.selected;

	      return React.createElement(
	        'div',
	        { style: styles.wrap },
	        React.createElement(_TextField2.default, { id: 'filterPlayers',
	          onChange: this.onKeyDown,
	          hintText: 'Filter Players',
	          floatingLabelText: 'Filter Players'
	        }),
	        React.createElement(
	          _Paper2.default,
	          { style: { width: '100%', overflow: 'auto' } },
	          list.letters && list.letters.length ? React.createElement(
	            _List.List,
	            null,
	            _.map(list.letters, this.renderList)
	          ) : null
	        ),
	        React.createElement(_RaisedButton2.default, {
	          icon: React.createElement(_FontIcon2.default, { className: isLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-refresh' }),
	          onTouchTap: this.loadUrl.bind(this, selected),
	          style: { position: 'absolute', right: 15, top: 15,
	            transition: 'all 0.5s ease-in',
	            WebkitTransition: 'all 0.5s ease-in'
	          } })
	      );
	    }
	  };
	});
	var styles = {
	  avatar: {
	    paper: {
	      height: 45,
	      width: 45,
	      overflow: 'hidden',
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
	    alignItems: 'center'
	  }
	};

/***/ },

/***/ 638:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(639);

	var _GridList = __webpack_require__(492);

	var _CircularProgress = __webpack_require__(495);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _FlatButton = __webpack_require__(462);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _IconButton = __webpack_require__(445);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Avatar = __webpack_require__(606);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var PropTypes = React.PropTypes;
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);


	var imgUrl = 'http://stats.nba.com/media/players/230x185/';
	var teamUrl = 'http://stats.nba.com/media/img/teams/logos/';
	var urls = [{
	  title: 'stats',
	  url: 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}, {
	  title: 'news',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}];
	var returnAvatar = function returnAvatar(id, type, index, callback) {
	  if (type === 'player') {
	    var el = document.getElementById(id);
	    if (el != null && el.src && el.src.length) return;else {
	      run('' + imgUrl + id + '.png', id, callback);
	    }
	  } else {
	    var _el = document.getElementById(index);
	    if (_el != null && _el.src && _el.src.length) return;else {
	      run('' + teamUrl + id, index, callback);
	    }
	  }

	  function run(uri, idx, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.responseType = 'blob';
	    xhr.onload = function () {
	      try {
	        document.getElementById(idx).src = window.URL.createObjectURL(xhr.response);
	        callback({ ok: true });
	      } catch (e) {}
	      // console.error(e)

	      // return window.URL.createObjectURL(xhr.response);
	    };
	    xhr.open('GET', uri, true);
	    xhr.send();
	  }
	};

	core.Component('view.myZone', ['PlayerDialog'], function (PlayerDialog) {
	  return {

	    bindings: {
	      myplayers: ['myPlayers']
	    },

	    getInitialState: function getInitialState() {
	      return {
	        hovered: ''
	      };
	    },


	    // shouldComponentUpdate(nextProps, nextState) {
	    //     return nextState.myplayers !== this.state.myplayers;
	    // },

	    onMouseEnter: function onMouseEnter(id) {
	      this.setState({ hovered: id });
	    },
	    onMouseLeave: function onMouseLeave(id) {
	      this.setState({ hovered: '' });
	    },
	    openPopup: function openPopup(player) {
	      // console.log(player)
	      //
	      // let { url, img } = _.find(urls, ['title' , 'stats' ]);
	      // var limit = true; //type === 'stats';
	      // this.getInfo(url, player.id, limit)
	      core.tree.set(['player', 'popup', 'open'], true);
	      core.tree.set(['player', 'popup', 'player'], player);
	      core.emit('get.Player.data', { player: player, type: 'stats' });
	    },
	    renderPlayerCard: function renderPlayerCard(player, i) {
	      var hovered = this.state.hovered;

	      returnAvatar(player.id, 'player', this.getBack);
	      returnAvatar(player.teamLogo, 'team', i, this.getBack);

	      var images = {
	        team: { width: '100%', position: 'absolute', left: 0, top: '-30px', opacity: '.3', right: 0, zIndex: -1 },
	        player: { maxHeight: '50%', bottom: 0, position: 'absolute', right: 0, zIndex: 1 }
	      };

	      var card = {
	        transition: 'box-shadow 0.23s ease',
	        cursor: 'pointer',
	        boxShadow: hovered === player.id ? '0px 8px 14px rgba(0, 0, 0, 0.12) , 0px 6px 8px rgba(0, 0, 0, 0.50) ' : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
	      };
	      var getSubtitle = function getSubtitle() {
	        return React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'b',
	            null,
	            player.teamName
	          )
	        );
	      };

	      return React.createElement(
	        _GridList.GridTile,
	        {
	          onMouseEnter: this.onMouseEnter.bind(this, player.id),
	          onMouseLeave: this.onMouseLeave.bind(this, player.id),
	          key: i,
	          onTouchTap: this.openPopup.bind(this, player),
	          style: card,

	          title: player.firstName + ' ' + player.lastName,
	          subtitle: getSubtitle()
	        },
	        React.createElement('img', { id: player.id, style: images.player }),
	        React.createElement('img', { id: i, style: images.team })
	      );
	    },
	    render: function render() {
	      var myplayers = this.state.myplayers;

	      var loader = function loader(show) {
	        var cp = {
	          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
	          zIndex: 1,
	          background: 'rgba(225,225,225,0.6)',
	          flex: 1,
	          display: 'flex',
	          alignItems: 'center',
	          justifyContent: 'center'
	        };
	        if (show) return React.createElement(
	          'div',
	          { style: cp },
	          React.createElement(_CircularProgress2.default, { mode: 'indeterminate' })
	        );
	        return null;
	      };
	      return React.createElement(
	        'div',
	        { style: zone.wrap },
	        React.createElement(
	          _Card.Card,
	          { style: { height: '100%', width: '100%' } },
	          React.createElement(_Card.CardHeader, {
	            title: 'Without Avatar',
	            subtitle: 'Subtitle',
	            avatar: 'http://www.rotoworld.com/images/headshots/NBA/2671.jpg'
	          }),
	          React.createElement(
	            _Card.CardText,
	            null,
	            React.createElement(
	              'div',
	              { style: zone.players, className: 'zone-players' },
	              React.createElement(
	                _GridList.GridList,
	                {
	                  cols: 3,
	                  padding: 15,
	                  cellHeight: 110,
	                  style: { width: '100%', height: 600, overflowY: 'auto' }
	                },
	                myplayers && myplayers.length ? _.map(myplayers, this.renderPlayerCard) : loader(true)
	              )
	            )
	          )
	        ),
	        React.createElement(PlayerDialog, null)
	      );
	    }
	  };
	});
	var zone = {

	  wrap: {
	    height: '100%',
	    width: '100%',
	    minHeight: '300px',
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center'
	  },
	  card: {
	    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
	  },
	  players: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around'
	  }
	};

/***/ },

/***/ 649:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(606);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(608);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(490);

	var _RefreshIndicator = __webpack_require__(611);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(495);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(613);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _MenuItem = __webpack_require__(406);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(465);


	// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
	// const baseUrl = '
	// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.fantasypros.com/nba/stats/rodney-stuckey.php&format=rss&num=30;

	var urls = [{
	  title: 'The Score',
	  url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.thescore.com/nba.rss&format=rss&num=30'
	}, {
	  title: 'Roto Wire',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?v=717525&limit=10',
	  img: 'http://stats.nba.com/media/players/230x185/'
	}, {
	  title: 'Rotoworld',
	  url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=\n            http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=article&count=30\n              &format=rss&num=30',
	  img: 'http://www.rotoworld.com/images/headshots/NBA/'
	}];

	var returnAvatar = function returnAvatar(id, uri, type) {
	  switch (type) {
	    case 'rotoworld':
	      return run('' + uri + id + '.jpg');
	    case 'the score':
	      return run(uri);
	    case 'roto wire':
	      return run('' + uri + id + '.png');
	  }

	  function run(uri) {
	    var xhr = new XMLHttpRequest();
	    xhr.responseType = 'blob';
	    xhr.onload = function () {
	      document.getElementById(id).src = window.URL.createObjectURL(xhr.response);
	      // return window.URL.createObjectURL(xhr.response);
	    };
	    xhr.open('GET', uri, true);
	    xhr.send();
	  }
	};

	var replaceStr = function replaceStr(str) {
	  var returnText = str;
	  //-- remove BR tags and replace them with line break
	  returnText = returnText.replace(/<br>/gi, "\n");
	  returnText = returnText.replace(/<br\s\/>/gi, "\n");
	  returnText = returnText.replace(/<br\/>/gi, "\n");
	  returnText = returnText.replace(/<blockquote.*>/gi, "\n");

	  // //-- remove P and A tags but preserve what's inside of them
	  returnText = returnText.replace(/<p.*>/gi, "\n");
	  // console.info('p',returnText)
	  // returnText=returnText.replace(/<div.*>(.*?)<\/div>/gi, "$1");
	  // console.info('div',returnText)
	  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

	  //-- remove all inside SCRIPT and STYLE tags
	  // returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
	  // returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
	  // //-- remove all else
	  // returnText=returnText.replace(/<(?:.|\s)*?>/g, "");
	  //
	  // //-- get rid of more than 2 multiple line breaks:
	  // returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");
	  //
	  // //-- get rid of more than 2 spaces:
	  // returnText = returnText.replace(/ +(?= )/g,'');
	  //
	  // //-- get rid of html-encoded characters:
	  // returnText=returnText.replace(/&nbsp;/gi," ");
	  // returnText=returnText.replace(/&amp;/gi,"&");
	  // returnText=returnText.replace(/&quot;/gi,'"');
	  // returnText=returnText.replace(/&lt;/gi,'<');
	  // returnText=returnText.replace(/&gt;/gi,'>');
	  // returnText=returnText.replace(/&#39;/gi,"'");
	  return returnText;
	};

	core.Component('view.RotoNews', ['ui.Loader'], function (Loader) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        selected: 'The Score', // Rotoworld
	        news: [],
	        urls: urls,
	        listItemOpen: false,
	        isLoading: true
	      };
	    },
	    getRss: function getRss(url) {
	      var _this = this;

	      this.setState({ isLoading: true });
	      var newsJson;
	      return new Promise(function (resolve, reject) {
	        sa.get(url).end(function (err, res) {
	          if (res && res.status === 200) {
	            if (!_.isEmpty(res.body)) {
	              console.debug('res body', res.body);
	              _this.setListItems(res.body);
	            } else if (res.text) {
	              var temp = JSON.parse(res.text);
	              newsJson = temp.responseData.feed;

	              _this.setEntries(newsJson['entries']);
	            }
	          }
	        });
	      });
	    },
	    setListItems: function setListItems(json) {
	      var _state = this.state;
	      var selected = _state.selected;
	      var img = _state.img;
	      var entries = _state.entries;
	      var ListItems = json.ListItems;

	      var news = _.map(ListItems, function (entry) {
	        var Headline = entry.Headline;
	        var PlayerID = entry.PlayerID;
	        var ListItemCaption = entry.ListItemCaption;
	        var ListItemDescription = entry.ListItemDescription;

	        return _extends({}, entry, {
	          title: Headline,
	          id: PlayerID,
	          avatar: returnAvatar(PlayerID, img, selected.toLowerCase()),
	          contentSnippet: ListItemCaption, //contentSnippet.replace(/<(?:.|\n)*?>/gm, '');,
	          content: ListItemDescription });
	      });
	      this.setState({ news: news, isLoading: false, entries: json });
	    },
	    setEntries: function setEntries(newEntries) {
	      var _state2 = this.state;
	      var selected = _state2.selected;
	      var img = _state2.img;
	      var entries = _state2.entries;

	      var id, news, title, avatar, url, type;

	      // if (newEntries === entries) {
	      //   return;
	      // }
	      this.setState({ news: [] });
	      news = _.map(newEntries, function (entry) {

	        if (entry.link.indexOf('world') > -1) {
	          id = entry.link.split('http://www.rotoworld.com/player/nba/')[1].split('/')[0];
	          title = entry.title.split('- ')[1].split(' |')[0];
	          url = img;
	          avatar = returnAvatar(id, url, selected.toLowerCase());
	        }

	        if (entry.link.indexOf('score') > -1) {
	          id = _.uniqueId('entry_');
	          title = entry.title;
	          url = entry['mediaGroups'][0].contents[0].url;
	          avatar = returnAvatar(id, url, selected.toLowerCase());
	        }

	        return _extends({}, entry, {
	          title: title,
	          id: id,
	          avatar: avatar,
	          contentSnippet: replaceStr(entry.contentSnippet) });
	      });

	      this.setState({ news: news, isLoading: false, entries: newEntries });
	    },
	    componentDidMount: function componentDidMount() {
	      this.loadUrl(this.state.selected);
	    },
	    loadUrl: function loadUrl(selected) {
	      var urls = this.state.urls;

	      var _$find = _.find(urls, ['title', selected]);

	      var url = _$find.url;
	      var img = _$find.img;

	      this.setState({ selected: selected, img: img });

	      this.getRss(url);
	    },
	    handleSelectFeed: function handleSelectFeed(event, index, value) {
	      this.loadUrl(value);
	    },
	    renderNews: function renderNews(item, key) {
	      var _state3 = this.state;
	      var selected = _state3.selected;
	      var isLoading = _state3.isLoading;

	      var style = {
	        transition: 'all 0.2s ease-in-out 0.1s',
	        WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	        opacity: isLoading ? 0 : 1,
	        transform: isLoading ? 'scale(0.4)' : 'scale(1)',
	        WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)'
	      };
	      var selectedStyle = selected.toLowerCase() === 'rotoworld' ? { maxWidth: '100%' } : { maxHeight: '100%' };
	      return React.createElement(_List.ListItem, { key: key,
	        leftAvatar: React.createElement(
	          _Paper2.default,
	          { style: _extends({}, styles.avatar.paper, style), zDepth: 2 },
	          React.createElement('img', { style: selectedStyle, id: item.id

	          })
	        ),
	        primaryText: item.title,
	        primaryTogglesNestedList: true,
	        secondaryText: item.contentSnippet,
	        secondaryTextLines: 1,
	        nestedItems: [React.createElement('div', { key: key,
	          dangerouslySetInnerHTML: { __html: item.content },
	          style: { padding: '15px', backgroundColor: '#eee', marginLeft: 0, borderTop: '1px solid #ddd' } })] });
	    },
	    renderSelectList: function renderSelectList(item, key) {
	      return React.createElement(_MenuItem2.default, { key: key, value: item.title, primaryText: item.title });
	    },
	    render: function render() {
	      var _state4 = this.state;
	      var type = _state4.type;
	      var news = _state4.news;
	      var isLoading = _state4.isLoading;
	      var urls = _state4.urls;
	      var selected = _state4.selected;

	      return React.createElement(
	        'div',
	        { style: styles.wrap },
	        React.createElement(
	          _SelectField2.default,
	          {
	            value: selected,
	            onChange: this.handleSelectFeed,
	            floatingLabelText: 'Read feed from' },
	          _.map(urls, this.renderSelectList)
	        ),
	        React.createElement(
	          _Paper2.default,
	          { style: { width: '100%', overflow: 'auto' } },
	          news && news.length ? React.createElement(
	            _List.List,
	            null,
	            _.map(news, this.renderNews)
	          ) : null
	        ),
	        React.createElement(_RaisedButton2.default, {
	          icon: React.createElement(_FontIcon2.default, { className: isLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-refresh' }),
	          onTouchTap: this.loadUrl.bind(this, selected),
	          style: { position: 'absolute', right: 15, top: 15,
	            transition: 'all 0.5s ease-in',
	            WebkitTransition: 'all 0.5s ease-in'
	          } })
	      );
	    }
	  };
	});
	var styles = {
	  avatar: {
	    paper: {
	      height: 45,
	      width: 45,
	      overflow: 'hidden',
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
	    alignItems: 'center'
	  }
	};

/***/ },

/***/ 650:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactGoogleLogin = __webpack_require__(651);

	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

	var _reactFacebookLogin = __webpack_require__(652);

	var _reactFacebookLogin2 = _interopRequireDefault(_reactFacebookLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var core = __webpack_require__(211);
	var moment = __webpack_require__(502);

	core.Component('view.SignIn', [], function () {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        roster: {}
	      };
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
	    responseGoogle: function responseGoogle(response) {
	      console.debug('google response', response);
	      var profile = response.getBasicProfile();
	      profile['id_token'] = response.getAuthResponse().id_token;
	      // this.props.onLoggedIn(profile, 'google')
	      console.debug('google profile', profile);
	    },
	    responseFacebook: function responseFacebook(response) {
	      console.debug('fb response', response);
	      // this.props.onLoggedIn(response, 'facebook')
	    },
	    render: function render() {

	      return React.createElement(
	        'div',
	        { style: signin.wrap },
	        React.createElement(_reactGoogleLogin2.default, {
	          clientId: '79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com',
	          callback: this.responseGoogle,
	          cssClass: 'fla-google-login',
	          offline: false }),
	        React.createElement(_reactFacebookLogin2.default, {
	          appId: '302562886764541',
	          autoLoad: false,
	          xfbml: true,
	          version: '2.7',
	          fields: 'name,email,picture',
	          callback: this.responseFacebook,
	          icon: 'fa-facebook'
	        })
	      );
	    }
	  };
	});

	var signin = {

	  wrap: {
	    height: '100%',
	    width: '100%',
	    minHeight: '300px',
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center'
	  },
	  card: {
	    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
	  },
	  players: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around'
	  }
	};

/***/ },

/***/ 653:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TextField = __webpack_require__(615);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(606);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(608);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _DatePicker = __webpack_require__(654);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);

	core.Component('view.Steps.One', ['ui.Loader'], function (Loader) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        teamName: '',
	        imagePreview: '',
	        cap: '',
	        dchange: false,
	        date: new Date()
	      };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	      if (nextProps.capChange) this.setState({ cap: nextProps.capChange });
	    },
	    handleCapChange: function handleCapChange(e) {
	      this.setState({ cap: e.target.value });
	    },
	    handleDateChange: function handleDateChange(e, date) {
	      this.setState({ date: date, dchange: true });
	    },
	    handleName: function handleName(e) {
	      var handleName = this.props.handleName;

	      handleName(e.target.value);
	      this.setState({ teamName: e.target.value });
	    },
	    handleImageChange: function handleImageChange(e) {
	      var _this = this;

	      e.preventDefault();

	      var reader = new FileReader();
	      var file = e.target.files[0];
	      if (file.type.indexOf('image') !== 0) return;
	      reader.onloadend = function () {
	        _this.setState({
	          file: file,
	          imagePreview: reader.result
	        });
	      };

	      reader.readAsDataURL(file);
	    },
	    getValidationState: function getValidationState() {
	      var _state = this.state;
	      var cap = _state.cap;
	      var date = _state.date;
	      var teamName = _state.teamName;
	      // return cap < 1 ;

	      var length = teamName.length;
	      if (length === 0 || cap.length === 0) return true;
	      return false;
	    },
	    click: function click() {
	      var inputFile = document.getElementById('inputFile');
	      inputFile.click();
	    },
	    render: function render() {
	      var _this2 = this;

	      var _state2 = this.state;
	      var teamName = _state2.teamName;
	      var imagePreview = _state2.imagePreview;
	      var cap = _state2.cap;
	      var date = _state2.date;
	      var dchange = _state2.dchange;
	      var callback = this.props.callback;


	      var iconStyle = {
	        color: teamName ? '#bbb' : '#fff'
	      };
	      return React.createElement(
	        'div',
	        { style: styles.wrap },
	        React.createElement(
	          _Paper2.default,
	          { style: styles.avatar, zDepth: 1 },
	          React.createElement('img', { onTouchTap: this.click,
	            src: imagePreview ? imagePreview : "assets/thumbnail.png",
	            style: { cursor: 'pointer', maxWidth: '100%' }
	          }),
	          React.createElement('input', { style: _defineProperty({ opacity: 0, position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', height: 0 }, 'width', 0),
	            type: 'file',
	            id: 'inputFile',
	            onChange: this.handleImageChange })
	        ),
	        React.createElement(
	          'div',
	          { style: { margin: '25px 0' } },
	          React.createElement(_Avatar2.default, { icon: React.createElement(_FontIcon2.default, { className: 'fa fa-pencil', style: { color: teamName ? '#bbb' : '#fff' } }),
	            size: 30,
	            backgroundColor: teamName ? 'transparent' : '#ccc',
	            style: { marginRight: '15px' }
	          }),
	          React.createElement(_TextField2.default, { hintText: 'Name Here...', onChange: this.handleName })
	        ),
	        React.createElement(
	          'div',
	          { style: { marginBottom: 25 } },
	          React.createElement(_Avatar2.default, { icon: React.createElement(_FontIcon2.default, { className: 'fa fa-keyboard-o', style: { color: cap ? '#bbb' : '#fff' } }),
	            size: 30,
	            backgroundColor: cap ? 'transparent' : '#ccc',
	            style: { marginRight: '15px' }
	          }),
	          React.createElement(_TextField2.default, { hintText: 'Game Limits...', type: 'number', onChange: this.handleCapChange })
	        ),
	        React.createElement(
	          'div',
	          { style: { display: 'flex', alignItems: 'flex-end' } },
	          React.createElement(_Avatar2.default, { icon: React.createElement(_FontIcon2.default, { className: dchange ? 'fa fa-calendar-check-o' : 'fa fa-calendar-times-o', style: { color: dchange ? '#bbb' : '#fff' } }),
	            size: 30,
	            backgroundColor: dchange ? 'transparent' : '#ccc',
	            style: { marginRight: '15px' }
	          }),
	          React.createElement(_DatePicker2.default, { mode: 'landscape', id: 'DatePicker',
	            hintText: 'Matchup Start At...',
	            onChange: this.handleDateChange,
	            firstDayOfWeek: 0,
	            minDate: date })
	        ),
	        React.createElement(_RaisedButton2.default, { label: 'Next',
	          style: { position: 'absolute', right: 15, bottom: 15 },
	          disabled: this.getValidationState(), onClick: function onClick(e) {
	            callback(_this2.state);
	          } })
	      );
	    }
	  };
	});
	var styles = {
	  avatar: {
	    height: 155,
	    width: 155,
	    textAlign: 'center',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	    margin: '0 auto',
	    overflow: 'hidden'
	  },
	  icon: {},
	  wrap: {
	    height: '100%',
	    minHeight: '300px',
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center'
	  }
	};

/***/ },

/***/ 670:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Snackbar = __webpack_require__(671);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _RaisedButton = __webpack_require__(475);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FlatButton = __webpack_require__(462);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _List = __webpack_require__(490);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Dialog = __webpack_require__(473);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _TextField = __webpack_require__(615);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Chip = __webpack_require__(608);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Avatar = __webpack_require__(606);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var moment = __webpack_require__(502);
	var _ = __webpack_require__(465);

	core.Component('view.Steps.Two', ['Slot'], function (Slot) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        dates: this.initDates(),
	        open: false,
	        modalOpen: false,
	        limit: 0,
	        cap: this.props.cap,
	        newCap: '',
	        modalMessage: '',
	        modalTitle: '',
	        clearAll: false,
	        message: 'Matchup start at ' + moment(this.props.date).local().format('ddd, MMM DD') };
	    },
	    componentDidMount: function componentDidMount() {
	      var _this = this;

	      this.res = 0;
	      setTimeout(function () {
	        _this.setState({ open: true, games: [] });
	      }, 200);
	    },
	    initDates: function initDates() {
	      var date = this.props.date;

	      var startOfWeek = moment(date);
	      var endOfWeek = moment(date).add(6, 'days');
	      var days = [];
	      var day = startOfWeek;
	      while (day <= endOfWeek) {
	        days.push(day.toDate());
	        day = day.clone().add(1, 'd');
	      }
	      return days;
	    },
	    calcLimits: function calcLimits(index, num) {
	      var games = this.state.games;

	      if (!games.length) {
	        games.push({ index: index, num: num });
	      } else {
	        for (var i = 0; i < games.length; i++) {
	          var game = games[i];
	          if (game && game.index === index || game.num.length === 0) {
	            games.splice(games.indexOf(game), 1);
	          }
	        }
	        games.push({ index: index, num: num });
	      }
	      console.log(games);
	      this.setState({ games: games });
	    },
	    getMoreNumbers: function getMoreNumbers() {
	      var _state = this.state;
	      var games = _state.games;
	      var limit = _state.limit;

	      var res = 0;

	      if (!games || !games.length) return;else {
	        for (var x = 0; x < games.length; x++) {
	          var game = games[x];
	          if (game.num.length !== 0) res = limit += parseInt(game.num);
	        }
	      }
	      this.res = res;
	      return { resStr: res.toString(), resNum: res };
	    },
	    getValidationState: function getValidationState() {
	      var _this2 = this;

	      var cap = this.state.cap;

	      var str = '',
	          message = '';
	      var num = parseInt(cap);

	      var getplayers = function getplayers(str) {
	        return str > 1 ? ' players' : ' player';
	      };

	      if (this.res < num) {
	        str = num - this.res;
	        message = 'you should add ' + str.toString() + getplayers(str);
	        this.setState({ message: message });
	      } else if (this.res > num) {
	        str = this.res - num;
	        message = 'you should remove ' + str.toString() + getplayers(str);
	        this.setState({ message: message });
	      } else {
	        message = 'you are A-Ok! ';
	        this.setState({ message: message });
	      }
	      setTimeout(function () {
	        _this2.setState({ open: true });
	        return _this2.res < num || _this2.res > num;
	      }, 500);
	    },
	    openModal: function openModal() {
	      this.setState({
	        modalTitle: 'Reset Days',
	        modalOpen: true,
	        modalMessage: 'Are you sure?',
	        reset: 'days'
	      });
	    },
	    dontBeAnAssSnackbar: function dontBeAnAssSnackbar() {
	      this.setState({
	        open: true,
	        message: "Nobody likes a smartass!"
	      });
	    },
	    openResetCapDialog: function openResetCapDialog() {
	      this.setState({
	        modalOpen: true,
	        modalTitle: 'Reset Game Limits',
	        modalMessage: 'Reset Game Limits Now? Realy?',
	        reset: 'cap'
	      });
	    },
	    clearAll: function clearAll() {
	      var _this3 = this;

	      var games = this.state.games;

	      games = [];
	      this.res = 0;
	      this.setState({ games: games, clearAll: true, modalOpen: false });
	      setTimeout(function () {
	        _this3.setState({ clearAll: false });
	      }, 200);
	    },
	    reset: function reset(what) {
	      switch (what) {
	        case 'cap':
	          this.setState({ cap: this.state.newCap, modalOpen: false });
	          // this.props.callback(this.state)

	          this.props.changeCap(this.state.newCap);
	          break;
	        case 'days':
	          this.clearAll();
	          break;
	      }
	    },
	    onNewCap: function onNewCap(e) {
	      this.setState({ newCap: e.target.value });
	    },
	    renderDays: function renderDays(day, key) {
	      var clearAll = this.state.clearAll;

	      return React.createElement(Slot, { key: key, day: moment(day).local().format('ddd, MMM DD'), onClearAll: clearAll,
	        onValChange: this.calcLimits.bind(this, key) });
	    },
	    renderBottomButtons: function renderBottomButtons() {
	      var _this4 = this;

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(_RaisedButton2.default, {
	          icon: React.createElement(_FontIcon2.default, { className: 'fa fa-check' }),
	          onTouchTap: function onTouchTap(e) {
	            _this4.getValidationState(); /*callback(this.state); */
	          },
	          style: { position: 'absolute', right: 15, bottom: 15 } }),
	        React.createElement(_RaisedButton2.default, {
	          icon: React.createElement(_FontIcon2.default, { className: 'fa fa-repeat' }),
	          onTouchTap: this.openModal /*callback(this.state); */,
	          style: { position: 'absolute', left: 15, bottom: 15 } })
	      );
	    },
	    render: function render() {
	      var _this5 = this;

	      var _props = this.props;
	      var callback = _props.callback;
	      var date = _props.date;
	      var _state2 = this.state;
	      var dates = _state2.dates;
	      var cap = _state2.cap;
	      var open = _state2.open;
	      var modalMessage = _state2.modalMessage;
	      var modalTitle = _state2.modalTitle;
	      var message = _state2.message;
	      var modalOpen = _state2.modalOpen;
	      var reset = _state2.reset;

	      var checkThermo = function checkThermo() {
	        var x = { str: 'fa-thermometer-empty' },
	            res = _this5.getMoreNumbers() ? _this5.getMoreNumbers().resNum : 0;
	        cap = parseInt(cap);

	        if (res === 0) {
	          x.str = 'fa-thermometer-empty';
	        } else if (res <= cap / 3 && res > 0) {
	          x.str = 'fa-thermometer-quarter';
	        } else if (res < cap && res > cap / 2) {
	          x.str = 'fa-thermometer-three-quarters';
	        } else if (res <= cap / 2 && res >= cap / 3) {
	          x.str = 'fa-thermometer-half';
	        } else if (res > cap) {
	          x.str = 'fa-thermometer-full';x.color = _colors.deepOrange700;x.icolor = _colors.deepOrange900;
	        } else if (res === cap) {
	          x.str = 'fa-thermometer-full';x.color = _colors.lightGreen300;x.icolor = _colors.lightGreen700;
	        }

	        return x;
	      };
	      var actions = [React.createElement(_FlatButton2.default, {
	        label: 'Cancel',
	        primary: true,
	        style: { marginRight: 15 },
	        keyboardFocused: true,
	        onTouchTap: function onTouchTap(e) {
	          _this5.setState({ modalOpen: false });
	        }
	      }), React.createElement(_FlatButton2.default, {
	        label: 'Reset',
	        onTouchTap: this.reset.bind(this, reset)
	      })];
	      return React.createElement(
	        'div',
	        { style: { height: '100%' } },
	        React.createElement(
	          'div',
	          { style: {
	              height: '100%',
	              minHeight: '300px',
	              flexDirection: 'column',
	              display: 'flex',
	              overflow: 'auto',
	              position: 'relative'
	            } },
	          React.createElement(
	            _List.List,
	            { style: { flexFlow: 'row wrap', display: 'flex', justifyContent: 'space-between' } },
	            dates && dates.length ? _.map(dates, this.renderDays) : null
	          ),
	          React.createElement(_Snackbar2.default, {
	            open: open,
	            message: message,
	            autoHideDuration: 2000,
	            onRequestClose: function onRequestClose(e) {
	              _this5.setState({ open: false });
	            }
	          }),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              _Dialog2.default,
	              {
	                title: modalTitle,
	                actions: actions,
	                modal: false,
	                open: modalOpen,
	                onRequestClose: function onRequestClose(e) {
	                  _this5.setState({ modalOpen: false });
	                }
	              },
	              modalMessage,
	              React.createElement(
	                'div',
	                { style: { marginBottom: 25 } },
	                reset === 'cap' ? React.createElement(_Avatar2.default, { icon: React.createElement(_FontIcon2.default, { className: 'fa fa-keyboard-o', style: { color: cap ? '#bbb' : '#fff' } }),
	                  size: 30,
	                  backgroundColor: cap ? 'transparent' : '#ccc',
	                  style: { marginRight: '15px' }
	                }) : null,
	                reset === 'cap' ? React.createElement(_TextField2.default, { hintText: 'New Game Limits...', type: 'number',
	                  onChange: this.onNewCap }) : null
	              )
	            )
	          ),
	          React.createElement(
	            _Chip2.default,
	            { onTouchTap: this.openResetCapDialog,
	              backgroundColor: checkThermo() && checkThermo().color ? checkThermo().color : '',
	              style: { position: 'absolute', top: '50%', right: '15px',
	                WebkitTransition: 'all 0.2s ease-in-out',
	                transition: 'all 0.2s ease-in-out' } },
	            React.createElement(_Avatar2.default, { size: 32, style: { display: 'flex !important', alignItems: 'center', justifyContent: 'center', backgroundColor: checkThermo() && checkThermo().icolor ? checkThermo().icolor : '' },
	              icon: React.createElement(_FontIcon2.default, { className: 'runover fa ' + checkThermo().str }) }),
	            (this.getMoreNumbers() ? this.getMoreNumbers().resStr : 0) + ' / ' + cap
	          )
	        ),
	        this.renderBottomButtons()
	      );
	    }
	  };
	});

	var style = {
	  display: 'flex',
	  alignItems: 'baseline',
	  height: '72px',
	  justifyContent: 'flex-start'
	};

	var underlineStyle = {
	  right: '5px',
	  left: '5px',
	  width: 'auto'
	};

	core.Component('Slot', ['ui.Loader'], function (Loader) {
	  return {
	    getInitialState: function getInitialState() {
	      return { day: this.props.day || {}, cap: '' };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	      if (nextProps.onClearAll) this.setState({ cap: '' });
	    },
	    handleCapChange: function handleCapChange(e) {
	      var onValChange = this.props.onValChange;


	      if (parseInt(e.target.value) < 0) return;else {
	        this.setState({ cap: e.target.value });
	        onValChange(e.target.value);
	      }
	    },
	    render: function render() {
	      var _props2 = this.props;
	      var callback = _props2.callback;
	      var day = _props2.day;
	      var onClearAll = _props2.onClearAll;

	      var cap;
	      if (onClearAll) cap = '';else cap = this.state.cap;
	      return React.createElement(
	        'div',
	        { style: style },
	        React.createElement(_FontIcon2.default, { className: cap ? 'fa fa-calendar-check-o' : 'fa fa-calendar-plus-o', style: { marginRight: 15 } }),
	        React.createElement(_TextField2.default, {
	          style: { padding: '5px', width: '100%', maxWidth: '100px' },
	          underlineStyle: underlineStyle,
	          floatingLabelText: day,
	          hintText: day,
	          type: 'number',
	          value: cap,
	          onChange: this.handleCapChange })
	      );
	    }
	  };
	});

/***/ },

/***/ 675:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(29);
	var core = __webpack_require__(211);
	var moment = __webpack_require__(502);

	core.Component('Views', [], function () {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        roster: {}
	      };
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

	    handleNameChange: function handleNameChange(name) {
	      // this.props.handleNameChange(name);
	      // this.setState({ roster : { teamName: name } })
	    },


	    // changeCap(e) {
	    //   console.log(e)
	    //   this.setState({ roster : { cap: e.target.value } });
	    // },

	    renderView: function renderView(view) {
	      var changeViews = this.props.changeViews;

	      var View = core.components['view.' + view];
	      if (View) return React.createElement(View, null);else return React.createElement(
	        'span',
	        null,
	        ' error '
	      );
	    },
	    render: function render() {
	      var roster = this.state.roster;
	      var view = this.props.view;


	      return React.createElement(
	        'div',
	        { className: 'steps', style: { height: '100%' } },
	        this.renderView(view)
	      );
	    }
	  };
	});

/***/ }

});