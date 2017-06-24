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

	var React = __webpack_require__(211);
	var core = __webpack_require__(247);
	var ReactDom = __webpack_require__(302);


	(0, _reactTapEventPlugin2.default)();

	core.loadContext('index', __webpack_require__(428));
	// core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
	core.loadContext('source', __webpack_require__(428));
	// core.run('loadGoogleChart').then( ()=>{
	//     console.log('google.load')
	//     google.load("visualization", "1", {
	//       packages:["corechart"],
	//     //   callback: function() {
	//     //     that.startRenderingComponents();
	//     //   }
	//     });
	// });


	core.require(['Index'], function (Index) {

	    ReactDom.render(React.createElement(
	        _MuiThemeProvider2.default,
	        { muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default) },
	        React.createElement(Index, null)
	    ), document.getElementById('app'));
	});

/***/ },

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Index.module.jsx": 429,
		"./actions/actions.module.jsx": 503,
		"./actions/comparePlayers.module.jsx": 505,
		"./actions/getAllPlayers.module.jsx": 506,
		"./components/Loader/ui.Loader.module.jsx": 507,
		"./components/modules/player_dialog.module.jsx": 510,
		"./components/modules/roto_player.module.jsx": 643,
		"./components/modules/roto_player_dialog.module.jsx": 668,
		"./components/modules/stats.google.chart.module.jsx": 675,
		"./components/modules/stats_dialog.module.jsx": 734,
		"./components/views/Compare.module.jsx": 842,
		"./components/views/view.myZone.module.jsx": 845,
		"./components/views/view.rotoNews.module.jsx": 856,
		"./components/views/view.sign_in.module.jsx": 857,
		"./components/views/view.steps.one.module.jsx": 859,
		"./components/views/view.steps.two.module.jsx": 876,
		"./components/views/views.module.jsx": 881
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
	webpackContext.id = 428;


/***/ },

/***/ 429:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Drawer = __webpack_require__(430);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _AppBar = __webpack_require__(495);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(498);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);
	// var _ = window._;//
	// console.dir(_);


	var teams = __webpack_require__(502);
	var allPlayers = core.tree.select('allPlayers');

	core.Component('Index', ['core.App', 'Views', 'PlayerDialog', 'Stats.Diaglog'], function (App, Views, PlayerDialog, StatsDiaglog) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        apps: {},
	        open: true,
	        view: 'Compare',
	        roster: {},
	        name: 'Fantasy Edge',
	        dialogOpen: false,
	        comparedData: [],
	        timeframe: '365',
	        menuItems: [{ label: 'Home', icon: 'home', ref: 'myZone', active: false }, { label: 'News', icon: 'description', ref: 'RotoNews', active: false }, { label: 'Compare', icon: 'compare_arrows', ref: 'Compare', active: true }, { label: 'SignIn', icon: 'settings', ref: 'SignIn', active: false }]

	      };
	    },
	    componentWillMount: function componentWillMount() {
	      this.getPlayers();
	      this.allPlayers = core.tree.select('allPlayers');
	      core.on('compared.players', this.handleCompare);
	    },
	    getPlayers: function getPlayers(period) {
	      var _this = this;

	      var _state = this.state;
	      var allPlayers = _state.allPlayers;
	      var timeframe = _state.timeframe;

	      if (!period) period = timeframe;
	      core.run('getAllPlayers', { period: period }).then(function (_ref) {
	        var isError = _ref.isError;

	        if (isError) return;
	        // console.debug('this.allPlayers.get() => ', this.allPlayers.get());

	        var _allPlayers$get = _this.allPlayers.get();

	        var players = _allPlayers$get.players;
	        var total = _allPlayers$get.total;
	        // console.debug('players => ', players);
	        // console.debug('total => ', total);
	        // var res = this.getTeams(list);
	        // var chunks =  _.chunk(res, 13);
	        // var myplayers = chunks[6];

	        core.emit('players.loaded', { players: players, total: total });
	        // core.tree.set('players', chunks[5]);
	        // core.tree.set('myPlayers', myplayers)
	      });
	      //   this.setMax(res);
	    },
	    handleCompare: function handleCompare(data) {
	      console.dir(data);
	      this.setState({ comparedData: data, dialogOpen: true });
	    },
	    getTeams: function getTeams(players) {
	      var wteams = [];

	      for (var x = 0; x < players.length; x++) {
	        for (var t = 0; t < teams.length; t++) {
	          if (Number(players[x].TeamID) === teams[t].teamId) {
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
	    handleModalCLose: function handleModalCLose() {
	      this.setState({ dialogOpen: false, comparedData: {} });
	    },
	    changeViews: function changeViews(view) {
	      var menuItems = this.state.menuItems;


	      menuItems = _.map(menuItems, function (item) {
	        return _extends({}, item, {
	          active: item.ref === view
	        });
	      });
	      this.setState({ view: view, menuItems: menuItems, open: true });
	    },
	    getLocalStorageDetails: function getLocalStorageDetails(details) {
	      console.log('obj');
	      this.setState({ roster: _extends({}, roster, details) });
	    },
	    renderMenu: function renderMenu() {
	      var _this2 = this;

	      var _state2 = this.state;
	      var menuItems = _state2.menuItems;
	      var view = _state2.view;


	      return _.map(menuItems, function (item, i) {
	        var icon = item.icon;
	        var label = item.label;
	        var ref = item.ref;
	        var active = item.active;

	        var itemStyle = {
	          icon: { color: active ? '#f2fafa' : '#9196a6', fontSize: 18 },
	          div: { color: active ? '#f2fafa' : '#9196a6', fontSize: 14, background: active ? '#46bbc2' : 'none' }
	        };
	        return React.createElement(
	          _MenuItem2.default,
	          { key: i,
	            leftIcon: React.createElement(
	              _FontIcon2.default,
	              { style: itemStyle.icon, className: 'material-icons' },
	              icon
	            ),
	            style: itemStyle.div,
	            innerDivStyle: { paddingLeft: 45, background: active ? '#46bbc2' : 'none' },
	            onTouchTap: _this2.changeViews.bind(_this2, ref) },
	          label
	        );
	      });
	    },
	    render: function render() {
	      var _this3 = this;

	      var _state3 = this.state;
	      var open = _state3.open;
	      var view = _state3.view;
	      var name = _state3.name;
	      var type = _state3.type;
	      var dialogOpen = _state3.dialogOpen;
	      var comparedData = _state3.comparedData;

	      return React.createElement(
	        App,
	        null,
	        React.createElement(_AppBar2.default, { title: name, style: { background: '#323e51', fontSize: 18, paddingLeft: '140px' }, showMenuIconButton: false,
	          onLeftIconButtonTouchTap: function onLeftIconButtonTouchTap(e) {
	            _this3.setState({ open: true });
	          } }),
	        React.createElement(
	          _Drawer2.default,
	          {
	            containerStyle: { backgroundColor: '#323e51', top: 64, boxShadow: 'rgba(0, 0, 0, 0.227) 1px 5px 10px' },
	            docked: true,
	            width: 140,
	            open: true,
	            onRequestChange: function onRequestChange(e) {
	              _this3.setState({ open: true });
	            } },
	          this.renderMenu()
	        ),
	        React.createElement(
	          'div',
	          { className: 'wrapper', style: _extends({}, isOpen(open), { position: 'absolute' }) },
	          React.createElement(Views, {
	            getLocalStorageDetails: this.getLocalStorageDetails,
	            view: view,
	            handleNameChange: function handleNameChange(name) {
	              _this3.setState({ name: name });
	            } }),
	          React.createElement(StatsDiaglog, { open: dialogOpen, data: comparedData, onClose: this.handleModalCLose })
	        )
	      );
	    }
	  };
	});
	var isOpen = function isOpen(open) {
	  return {
	    left: open ? 140 : 0,
	    padding: '0', bottom: '0', top: '65px', right: 0,
	    transition: 'all 0.015s ease-in-out'
	  };
	};

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(211);
	var core = __webpack_require__(247);
	var sa = __webpack_require__(256);
	var _ = __webpack_require__(501);
	var teams = __webpack_require__(504);
	var base = 'http://46.121.135.238:3310/api/v1.0/';
	var nbaAvatar = 'http://stats.nba.com/media/players/230x185/';
	var nbaTL = 'http://stats.nba.com/media/img/teams/logos/';
	var yoBase = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge/';
	// http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge/GetAllPlayersAvg?Period=364
	core.Action('getPlayerAvatar', { id: 'number' }, function (data, promise) {
	  // avatar: `http://stats.nba.com/media/players/230x185/${players[x].Player_ID}.png` ,
	  sa.get('' + nbaAvatar + data.id + '.png').end(function (err, res) {
	    if (res && res.ok) {
	      console.dir(res.body);
	    } else {
	      console.log('err', err);
	    }
	  });
	});

	core.Action('getTeams', { players: 'array' }, function (data, promise) {
	  var players = [].concat(_toConsumableArray(data.players));
	  console.dir(players);
	  var wteams = [];

	  for (var x = 0; x < players.length; x++) {
	    for (var t = 0; t < teams.length; t++) {
	      if (Number(players[x].teamId) === teams[t].teamId) {
	        wteams.push(_extends({}, players[x], teams[t], {
	          teamLogo: nbaTL + teams[t].abbreviation + '_logo.svg'
	        }));
	      }
	    }
	  }
	  console.dir(wteams);
	  promise.resolve(wteams);
	});

	core.Action('getRSS', {
	  type: 'string' // <- type 'string' and the '!' means it's required [string!].
	}, function (data, promise) {
	  sa.get('http://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.rotoworld.com%2Frss%2Ffeed.aspx%3Fsport%3Dnba%26ftype%3D' + data.type + '%26count%3D12%26format%3Drss').on('progress', function (e) {
	    // var percentage = Math.round((e.loaded/e.total)*100);
	    // console.log("percent " + percentage + '%' );
	  }).end(function (err, res) {
	    if (res && res.body) {
	      promise.resolve(res.body);
	    }
	  });
	});

	core.Action('loadGoogleChart', {
	  type: 'string' // <- type 'string' and the '!' means it's required [string!].
	}, function (data, promise) {
	  sa.get('https://www.google.com/jsapi').end(function (err, res) {
	    if (res && res.ok) {
	      console.debug('res => ', res);
	      promise.resolve(res.ok);
	    }
	  });
	});

/***/ },

/***/ 504:
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
	  "teamId": 1610612737,
	  "abbreviation": "ATL",
	  "teamName": "Atlanta Hawks",
	  "simpleName": "Hawks",
	  "location": "Atlanta"
	}, {
	  "teamId": 1610612738,
	  "abbreviation": "BOS",
	  "teamName": "Boston Celtics",
	  "simpleName": "Celtics",
	  "location": "Boston"
	}, {
	  "teamId": 1610612751,
	  "abbreviation": "BKN",
	  "teamName": "Brooklyn Nets",
	  "simpleName": "Nets",
	  "location": "Brooklyn"
	}, {
	  "teamId": 1610612766,
	  "abbreviation": "CHA",
	  "teamName": "Charlotte Hornets",
	  "simpleName": "Hornets",
	  "location": "Charlotte"
	}, {
	  "teamId": 1610612741,
	  "abbreviation": "CHI",
	  "teamName": "Chicago Bulls",
	  "simpleName": "Bulls",
	  "location": "Chicago"
	}, {
	  "teamId": 1610612739,
	  "abbreviation": "CLE",
	  "teamName": "Cleveland Cavaliers",
	  "simpleName": "Cavaliers",
	  "location": "Cleveland"
	}, {
	  "teamId": 1610612742,
	  "abbreviation": "DAL",
	  "teamName": "Dallas Mavericks",
	  "simpleName": "Mavericks",
	  "location": "Dallas"
	}, {
	  "teamId": 1610612743,
	  "abbreviation": "DEN",
	  "teamName": "Denver Nuggets",
	  "simpleName": "Nuggets",
	  "location": "Denver"
	}, {
	  "teamId": 1610612765,
	  "abbreviation": "DET",
	  "teamName": "Detroit Pistons",
	  "simpleName": "Pistons",
	  "location": "Detroit"
	}, {
	  "teamId": 1610612744,
	  "abbreviation": "GSW",
	  "teamName": "Golden State Warriors",
	  "simpleName": "Warriors",
	  "location": "Golden State"
	}, {
	  "teamId": 1610612745,
	  "abbreviation": "HOU",
	  "teamName": "Houston Rockets",
	  "simpleName": "Rockets",
	  "location": "Houston"
	}, {
	  "teamId": 1610612754,
	  "abbreviation": "IND",
	  "teamName": "Indiana Pacers",
	  "simpleName": "Pacers",
	  "location": "Indiana"
	}, {
	  "teamId": 1610612746,
	  "abbreviation": "LAC",
	  "teamName": "Los Angeles Clippers",
	  "simpleName": "Clippers",
	  "location": "Los Angeles"
	}, {
	  "teamId": 1610612747,
	  "abbreviation": "LAL",
	  "teamName": "Los Angeles Lakers",
	  "simpleName": "Lakers",
	  "location": "Los Angeles"
	}, {
	  "teamId": 1610612763,
	  "abbreviation": "MEM",
	  "teamName": "Memphis Grizzlies",
	  "simpleName": "Grizzlies",
	  "location": "Memphis"
	}, {
	  "teamId": 1610612748,
	  "abbreviation": "MIA",
	  "teamName": "Miami Heat",
	  "simpleName": "Heat",
	  "location": "Miami"
	}, {
	  "teamId": 1610612749,
	  "abbreviation": "MIL",
	  "teamName": "Milwaukee Bucks",
	  "simpleName": "Bucks",
	  "location": "Milwaukee"
	}, {
	  "teamId": 1610612750,
	  "abbreviation": "MIN",
	  "teamName": "Minnesota Timberwolves",
	  "simpleName": "Timberwolves",
	  "location": "Minnesota"
	}, {
	  "teamId": 1610612740,
	  "abbreviation": "NOP",
	  "teamName": "New Orleans Pelicans",
	  "simpleName": "Pelicans",
	  "location": "New Orleans"
	}, {
	  "teamId": 1610612752,
	  "abbreviation": "NYK",
	  "teamName": "New York Knicks",
	  "simpleName": "Knicks",
	  "location": "New York"
	}, {
	  "teamId": 1610612760,
	  "abbreviation": "OKC",
	  "teamName": "Oklahoma City Thunder",
	  "simpleName": "Thunder",
	  "location": "Oklahoma City"
	}, {
	  "teamId": 1610612753,
	  "abbreviation": "ORL",
	  "teamName": "Orlando Magic",
	  "simpleName": "Magic",
	  "location": "Orlando"
	}, {
	  "teamId": 1610612755,
	  "abbreviation": "PHI",
	  "teamName": "Philadelphia 76ers",
	  "simpleName": "76ers",
	  "location": "Philadelphia"
	}, {
	  "teamId": 1610612756,
	  "abbreviation": "PHX",
	  "teamName": "Phoenix Suns",
	  "simpleName": "Suns",
	  "location": "Phoenix"
	}, {
	  "teamId": 1610612757,
	  "abbreviation": "POR",
	  "teamName": "Portland Trail Blazers",
	  "simpleName": "Trail Blazers",
	  "location": "Portland"
	}, {
	  "teamId": 1610612758,
	  "abbreviation": "SAC",
	  "teamName": "Sacramento Kings",
	  "simpleName": "Kings",
	  "location": "Sacramento"
	}, {
	  "teamId": 1610612759,
	  "abbreviation": "SAS",
	  "teamName": "San Antonio Spurs",
	  "simpleName": "Spurs",
	  "location": "San Antonio"
	}, {
	  "teamId": 1610612761,
	  "abbreviation": "TOR",
	  "teamName": "Toronto Raptors",
	  "simpleName": "Raptors",
	  "location": "Toronto"
	}, {
	  "teamId": 1610612762,
	  "abbreviation": "UTA",
	  "teamName": "Utah Jazz",
	  "simpleName": "Jazz",
	  "location": "Utah"
	}, {
	  "teamId": 1610612764,
	  "abbreviation": "WAS",
	  "teamName": "Washington Wizards",
	  "simpleName": "Wizards",
	  "location": "Washington"
	}];

/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(211);
	var core = __webpack_require__(247);
	var sa = __webpack_require__(256);
	var _ = __webpack_require__(501);
	var teams = __webpack_require__(504);
	var base = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge';

	core.Action('comparePlayers', { form: 'object' }, function (data, promise) {
	  var compared = core.tree.select('compared');
	  var form = data.form;

	  console.debug('form => ', form);
	  sa.post(base + '/ComparePlayers').send(_extends({}, form)).end(function (err, res) {
	    if (res && res.ok) {
	      promise.resolve(_extends({ stats: res.body }, form));
	    } else {
	      promise.resolve(_extends({ isError: true }, err));
	    }
	  });
	});

/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(211);
	var core = __webpack_require__(247);
	var sa = __webpack_require__(256);
	var _ = __webpack_require__(501);
	var teams = __webpack_require__(504);
	var base = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge';

	core.Action('getAllPlayers', { period: 'string' }, function (data, promise) {
	  var allPlayers = core.tree.select('allPlayers');
	  var total = 0;
	  sa.post(base + '/GetAllPlayersAvg?Period=' + data.period)
	  // .send(data)
	  .end(function (err, res) {
	    if (res && res.ok) {
	      var body = res.body;
	      var headers = res.headers;

	      if (headers['players-count']) total = headers['players-count'];
	      if (body['Players'] && !_.isEmpty(body['Players'])) {
	        allPlayers.set({ players: body['Players'], total: total });
	        promise.resolve({ isError: false });
	      } else {
	        allPlayers.set(undefined);
	        promise.resolve(err);
	      }
	    } else {
	      promise.resolve(_extends({ isError: true }, err));
	    }
	  });
	});

	core.Action('getPlayersByPage', { period: 'string', page: 'number' }, function (data, promise) {
	  var pagePlayers = core.tree.select('pagePlayers');
	  // pagePlayers.set(undefined);
	  var total = 0;
	  sa.post(base + '/GetAllPlayersAvg?Period=' + data.period + '&Page=' + data.page)
	  // .send(data)
	  .end(function (err, res) {
	    if (res && res.ok) {
	      var body = res.body;
	      var headers = res.headers;
	      // console.debug('res => ', res);

	      if (headers['players-count']) total = headers['players-count'];
	      if (body['Players'] && !_.isEmpty(body['Players'])) {
	        // pagePlayers.set(body['Players'])
	        promise.resolve({ data: _extends({}, body, { total: total }), isError: false });
	      } else {
	        pagePlayers.set(undefined);
	        promise.resolve(err);
	        promise.resolve({ data: err, isError: false });
	      }
	    } else {
	      promise.resolve({ isError: true, data: err });
	    }
	  });
	});

/***/ },

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(211);
	var PropTypes = React.PropTypes;

	var core = __webpack_require__(247);
	var myCss = __webpack_require__(508);

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

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(509);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(295)(content, {});
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

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(294)();
	// imports


	// module
	exports.push([module.id, ".spinner {\n  width: 70px;\n  text-align: center;\n}\n\n.spinner > div {\n  width: 10px;\n  height: 10px;\n  background-color: #333;\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n\n.spinner .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.spinner .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n.sk-fading-circle {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}\n\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #333;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n      -ms-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n      -ms-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n      -ms-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n      -ms-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n      -ms-transform: rotate(300deg);\n          transform: rotate(300deg);\n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n      -ms-transform: rotate(330deg);\n          transform: rotate(330deg);\n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n          animation-delay: -1s;\n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n          animation-delay: -0.7s;\n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s;\n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n          animation-delay: -0.5s;\n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n          animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n          animation-delay: -0.1s;\n}\n\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n.circle {\n  width: 40px;\n  height: 40px;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n  animation: sk-scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes sk-scaleout {\n  0% { -webkit-transform: scale(0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 100% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n    opacity: 0;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 510:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Dialog = __webpack_require__(511);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _FlatButton = __webpack_require__(498);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(481);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Table = __webpack_require__(515);

	var _List = __webpack_require__(528);

	var _GridList = __webpack_require__(530);

	var _CircularProgress = __webpack_require__(533);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Tabs = __webpack_require__(535);

	var _colors = __webpack_require__(170);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);
	var moment = __webpack_require__(540);

	var urls = [{
	  title: 'stats',
	  url: 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID='
	}, {
	  title: 'news',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId='
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
	        attr: [{ attr: 'MATCHUP', label: 'OPP' }, { attr: 'GAME_DATE', label: 'date' }, { attr: 'PTS', label: 'PTS' }, { attr: 'AST', label: 'AST' }, { attr: 'REB', label: 'REB' }, { attr: 'STL', label: 'STL' }, { attr: 'BLK', label: 'BLK' }, { attr: 'FG3M', label: '3PM' }, { attr: 'FG3A', label: '3PA' }, { attr: 'FGM', label: 'FGM' }, { attr: 'FGA', label: 'FGA' }, { attr: 'FTM', label: 'FTM' }, { attr: 'FTA', label: 'FTA' }, { attr: 'TOV', label: 'TOV' }, { attr: 'MIN', label: 'MIN' }, { attr: 'WL', label: 'WL' }],
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
	      core.tree.set(['player', 'popup', 'open'], true);

	      // setTimeout(()=>{
	      if (this.isMounted()) this.setState({ loading: false });
	      //
	      // }, 2500)
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

/***/ 541:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 542,
		"./af.js": 542,
		"./ar": 543,
		"./ar-ma": 544,
		"./ar-ma.js": 544,
		"./ar-sa": 545,
		"./ar-sa.js": 545,
		"./ar-tn": 546,
		"./ar-tn.js": 546,
		"./ar.js": 543,
		"./az": 547,
		"./az.js": 547,
		"./be": 548,
		"./be.js": 548,
		"./bg": 549,
		"./bg.js": 549,
		"./bn": 550,
		"./bn.js": 550,
		"./bo": 551,
		"./bo.js": 551,
		"./br": 552,
		"./br.js": 552,
		"./bs": 553,
		"./bs.js": 553,
		"./ca": 554,
		"./ca.js": 554,
		"./cs": 555,
		"./cs.js": 555,
		"./cv": 556,
		"./cv.js": 556,
		"./cy": 557,
		"./cy.js": 557,
		"./da": 558,
		"./da.js": 558,
		"./de": 559,
		"./de-at": 560,
		"./de-at.js": 560,
		"./de.js": 559,
		"./dv": 561,
		"./dv.js": 561,
		"./el": 562,
		"./el.js": 562,
		"./en-au": 563,
		"./en-au.js": 563,
		"./en-ca": 564,
		"./en-ca.js": 564,
		"./en-gb": 565,
		"./en-gb.js": 565,
		"./en-ie": 566,
		"./en-ie.js": 566,
		"./en-nz": 567,
		"./en-nz.js": 567,
		"./eo": 568,
		"./eo.js": 568,
		"./es": 569,
		"./es-do": 570,
		"./es-do.js": 570,
		"./es.js": 569,
		"./et": 571,
		"./et.js": 571,
		"./eu": 572,
		"./eu.js": 572,
		"./fa": 573,
		"./fa.js": 573,
		"./fi": 574,
		"./fi.js": 574,
		"./fo": 575,
		"./fo.js": 575,
		"./fr": 576,
		"./fr-ca": 577,
		"./fr-ca.js": 577,
		"./fr-ch": 578,
		"./fr-ch.js": 578,
		"./fr.js": 576,
		"./fy": 579,
		"./fy.js": 579,
		"./gd": 580,
		"./gd.js": 580,
		"./gl": 581,
		"./gl.js": 581,
		"./he": 582,
		"./he.js": 582,
		"./hi": 583,
		"./hi.js": 583,
		"./hr": 584,
		"./hr.js": 584,
		"./hu": 585,
		"./hu.js": 585,
		"./hy-am": 586,
		"./hy-am.js": 586,
		"./id": 587,
		"./id.js": 587,
		"./is": 588,
		"./is.js": 588,
		"./it": 589,
		"./it.js": 589,
		"./ja": 590,
		"./ja.js": 590,
		"./jv": 591,
		"./jv.js": 591,
		"./ka": 592,
		"./ka.js": 592,
		"./kk": 593,
		"./kk.js": 593,
		"./km": 594,
		"./km.js": 594,
		"./ko": 595,
		"./ko.js": 595,
		"./ky": 596,
		"./ky.js": 596,
		"./lb": 597,
		"./lb.js": 597,
		"./lo": 598,
		"./lo.js": 598,
		"./lt": 599,
		"./lt.js": 599,
		"./lv": 600,
		"./lv.js": 600,
		"./me": 601,
		"./me.js": 601,
		"./mk": 602,
		"./mk.js": 602,
		"./ml": 603,
		"./ml.js": 603,
		"./mr": 604,
		"./mr.js": 604,
		"./ms": 605,
		"./ms-my": 606,
		"./ms-my.js": 606,
		"./ms.js": 605,
		"./my": 607,
		"./my.js": 607,
		"./nb": 608,
		"./nb.js": 608,
		"./ne": 609,
		"./ne.js": 609,
		"./nl": 610,
		"./nl.js": 610,
		"./nn": 611,
		"./nn.js": 611,
		"./pa-in": 612,
		"./pa-in.js": 612,
		"./pl": 613,
		"./pl.js": 613,
		"./pt": 614,
		"./pt-br": 615,
		"./pt-br.js": 615,
		"./pt.js": 614,
		"./ro": 616,
		"./ro.js": 616,
		"./ru": 617,
		"./ru.js": 617,
		"./se": 618,
		"./se.js": 618,
		"./si": 619,
		"./si.js": 619,
		"./sk": 620,
		"./sk.js": 620,
		"./sl": 621,
		"./sl.js": 621,
		"./sq": 622,
		"./sq.js": 622,
		"./sr": 623,
		"./sr-cyrl": 624,
		"./sr-cyrl.js": 624,
		"./sr.js": 623,
		"./ss": 625,
		"./ss.js": 625,
		"./sv": 626,
		"./sv.js": 626,
		"./sw": 627,
		"./sw.js": 627,
		"./ta": 628,
		"./ta.js": 628,
		"./te": 629,
		"./te.js": 629,
		"./th": 630,
		"./th.js": 630,
		"./tl-ph": 631,
		"./tl-ph.js": 631,
		"./tlh": 632,
		"./tlh.js": 632,
		"./tr": 633,
		"./tr.js": 633,
		"./tzl": 634,
		"./tzl.js": 634,
		"./tzm": 635,
		"./tzm-latn": 636,
		"./tzm-latn.js": 636,
		"./tzm.js": 635,
		"./uk": 637,
		"./uk.js": 637,
		"./uz": 638,
		"./uz.js": 638,
		"./vi": 639,
		"./vi.js": 639,
		"./x-pseudo": 640,
		"./x-pseudo.js": 640,
		"./zh-cn": 641,
		"./zh-cn.js": 641,
		"./zh-tw": 642,
		"./zh-tw.js": 642
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
	webpackContext.id = 541;


/***/ },

/***/ 643:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(646);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(490);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _RefreshIndicator = __webpack_require__(649);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(533);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(651);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(653);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(511);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _IconButton = __webpack_require__(481);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(665);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(666);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);


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

	    componentDidMount: function componentDidMount() {
	      this.compare = [];
	    },
	    openPopup: function openPopup(type, player) {
	      console.log(type);
	      console.log(player);
	    },
	    addToCompare: function addToCompare(team, player) {
	      var _$find = _.find(urls, ['title', 'stats']);

	      var url = _$find.url;
	      var img = _$find.img;
	      // var limit = type === 'stats';
	      // this.getInfo(url, player.PlayerID, true)

	      var stats = this.getInfo(url, player.PlayerID, true);
	      this.compare.push(player);
	      core.tree.set(['player', 'popup', 'player'], player);
	      core.emit('get.Player.data', { player: player, type: 'stats' });
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
	      //showPopup: true, popupType: 'stats'
	      this.setState({ data: stats, showPopup: true, popupType: 'stats' });
	      return stats;
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
	          { onTouchTap: this.addToCompare.bind(this, 'team1', player) },
	          'team 1'
	        ),
	        React.createElement(
	          _MenuItem2.default,
	          { onTouchTap: this.addToCompare.bind(this, 'team2', player) },
	          'team 2'
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
	            React.createElement('img', { style: selectedStyle, id: player.PlayerID })
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

/***/ 668:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Drawer = __webpack_require__(430);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _AppBar = __webpack_require__(495);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(498);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(481);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _List = __webpack_require__(528);

	var _close = __webpack_require__(669);

	var _close2 = _interopRequireDefault(_close);

	var _Toolbar = __webpack_require__(670);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);


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

/***/ 675:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactChartjs = __webpack_require__(676);

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);

	core.Component('Stats.Google.Chart', [], function () {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        data: this.props.data
	      };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	      this.setState({ data: nextProps.data });
	    },
	    componentDidMount: function componentDidMount() {
	      this.setState({ data: this.props.data });
	    },
	    drawChart: function drawChart() {
	      var data = this.state.data;

	      if (!data) return null;
	      var labels = [],
	          set = [];
	      for (var l = 0; l < data.length; l++) {
	        labels.push(data[l].key);
	        set.push(data[l].value);
	      }

	      var chartData = {
	        labels: [].concat(labels),
	        datasets: [{
	          data: [].concat(set),
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
	            label: function label(tooltipItem) {
	              return tooltipItem.yLabel;
	            }
	          }
	        }
	      };

	      return React.createElement(_reactChartjs.Line, { ref: 'chart', data: chartData });
	    },
	    render: function render() {
	      return React.createElement(
	        'div',
	        { className: 'chart_wrap', style: { height: '100%', width: '100%', padding: 15 } },
	        this.drawChart()
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

/***/ 734:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(646);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(490);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _CircularProgress = __webpack_require__(533);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(651);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(653);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Drawer = __webpack_require__(430);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _colors = __webpack_require__(170);

	var _IconButton = __webpack_require__(481);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(665);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(666);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _saladUi = __webpack_require__(735);

	var _saladUi2 = _interopRequireDefault(_saladUi);

	var _LinearProgress = __webpack_require__(736);

	var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

	var _Tabs = __webpack_require__(535);

	var _reactSwipeableViews = __webpack_require__(738);

	var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);

	core.Component('Stats.Diaglog', ['Stats.Google.Chart'], function (Chart) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        open: false,
	        players: [],
	        tabIndex: 0
	      };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	      this.setState({ open: next.open, data: next.data });
	      if (next.data && !_.isEmpty(next.data)) {
	        this.setPlayers(next.data);
	      }
	    },
	    componentWillMount: function componentWillMount() {
	      var _this = this;

	      core.on('players.loaded', function (_ref) {
	        var players = _ref.players;
	        var total = _ref.total;

	        _this.setState({ players: players });
	      });
	    },
	    componentWillUnmount: function componentWillUnmount() {
	      this.setState({ data: null });
	    },
	    setPlayers: function setPlayers(data) {
	      var players = this.state.players;

	      var myIds = data['My Players'];
	      var targetIds = data['Target Players'];

	      var get = function get(arr) {
	        return _.filter(players, function (player) {
	          return arr.indexOf(player.PlayerID) > -1;
	        });
	      };
	      var newTeam = {
	        'MyPlayers': { data: get(myIds), label: 'My Players' },
	        'TargetPlayers': { data: get(targetIds), label: 'Target Players' }
	      };

	      this.setState(_extends({}, newTeam));
	    },
	    handleClose: function handleClose() {
	      this.setState({ open: false });
	      if (this.props.onClose) this.props.onClose();
	    },
	    renderPlayers: function renderPlayers(players) {
	      var style = {
	        flex: 1,
	        height: '250px',
	        margin: '0px 15px',
	        paddingBottom: '48px',
	        overflow: 'hidden'
	      };

	      if (!players || !players.data) return null;
	      return React.createElement(
	        _Paper2.default,
	        { key: _.uniqueId(), style: _extends({}, style, style.paper) },
	        React.createElement(
	          _Subheader2.default,
	          { style: styles.subheader },
	          players.label
	        ),
	        React.createElement(
	          _List.List,
	          { style: { height: '100%', overflowY: 'auto' } },
	          _.map(players.data, this.renderPlayer)
	        )
	      );
	    },
	    renderPlayer: function renderPlayer(player, key) {
	      return React.createElement(_List.ListItem, { key: key,
	        innerDivStyle: styles.listItem,
	        primaryText: this.renderPrimary(player),
	        leftIcon: React.createElement(
	          _FontIcon2.default,
	          { className: 'material-icons', style: {
	              height: 'auto',
	              width: 'auto',
	              top: '0',
	              margin: '0 5px 0 0',
	              left: '0',
	              position: 'relative',
	              fontSize: '18px'
	            } },
	          'person'
	        ),
	        secondaryTextLines: 1
	      });
	    },
	    renderPrimary: function renderPrimary(item) {
	      var Name = item.Name;
	      var LastName = item.LastName;
	      var PlayerID = item.PlayerID;

	      var primary = {
	        wrap: {
	          width: '100%',
	          display: 'flex',
	          alignItems: 'center',
	          justifyContent: 'space-between'

	        }
	      };
	      return React.createElement(
	        'div',
	        { style: primary.wrap },
	        React.createElement(
	          'div',
	          { style: { width: 180 } },
	          LastName,
	          ', ',
	          Name
	        )
	      );
	    },
	    renderStats: function renderStats(data) {
	      var mainStats = [];
	      if (!data) return null;else {
	        var stats = data.stats;


	        for (var x in stats) {
	          if (x === 'PTS') mainStats.push({ label: 'Points', val: stats[x] });
	          if (x === 'AST') mainStats.push({ label: 'Assits', val: stats[x] });
	          if (x === 'REB') mainStats.push({ label: 'Rebounds', val: stats[x] });
	        }
	        return React.createElement(
	          'div',
	          { style: { display: 'flex', padding: '15px 5px' } },
	          _.map(mainStats, this.renderStatBox)
	        );
	      }
	      /**
	       * AST, PTS, REB
	         */
	    },
	    renderOverallStats: function renderOverallStats(data) {
	      var mainStats = [];
	      if (!data) return null;else {
	        var stats = data.stats;

	        mainStats = _.map(stats, function (value, key) {
	          return { key: key, value: value };
	        });

	        return React.createElement(
	          _Paper2.default,
	          { style: _extends({ display: 'flex', padding: 0, flexDirection: 'column', margin: '5px 20px 15px' }, style.paper) },
	          React.createElement(
	            _Subheader2.default,
	            { style: style.sub },
	            'OverallS Stats'
	          ),
	          React.createElement(Chart, { data: mainStats })
	        );
	      }
	      /**
	       * AST, PTS, REB
	         */
	    },
	    renderStatBox: function renderStatBox(stat, key) {

	      var getVal = function getVal(val) {
	        var text = 'you ';
	        if (val * 10 < 0) {
	          text += 'give ';
	          val = val * -1;
	        } else text += 'get ';
	        return text + val;
	      };
	      return React.createElement(
	        _Paper2.default,
	        { key: key, style: _extends({}, style.box, style.paper) },
	        React.createElement(
	          _Subheader2.default,
	          { style: style.sub },
	          stat.label
	        ),
	        React.createElement(
	          'div',
	          { style: style.bar },
	          React.createElement(
	            'div',
	            { style: { marginBottom: '15px' } },
	            getVal(stat.val)
	          ),
	          React.createElement(_LinearProgress2.default, {
	            color: stat.val * 10 < 0 ? '#F44336' : '#03A9F4',
	            mode: 'determinate',
	            value: stat.val * 10 < 0 ? stat.val * -1 : stat.val,
	            min: 0, max: 30 })
	        )
	      );
	    },
	    handleTabChange: function handleTabChange(val) {
	      this.setState({ tabIndex: val });
	    },
	    renderTabs: function renderTabs() {
	      var _state = this.state;
	      var tabIndex = _state.tabIndex;
	      var data = _state.data;

	      var styles = {
	        headline: {
	          fontSize: 24,
	          paddingTop: 16,
	          marginBottom: 12,
	          fontWeight: 400
	        }
	      };

	      return React.createElement(
	        'div',
	        { style: { padding: 20 } },
	        React.createElement(
	          _Tabs.Tabs,
	          { onChange: this.handleTabChange,
	            value: this.state.tabIndex },
	          React.createElement(_Tabs.Tab, { label: 'Basic Stats', value: 0 }),
	          React.createElement(_Tabs.Tab, { label: 'Overall Stats', value: 1 })
	        ),
	        React.createElement(
	          _reactSwipeableViews2.default,
	          {
	            index: this.state.tabIndex,
	            onChangeIndex: this.handleTabChange
	          },
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'h2',
	              { style: styles.headline },
	              'Tabs with slide effect'
	            ),
	            'Swipe to see the next slide.',
	            React.createElement('br', null)
	          ),
	          this.renderStats(data)
	        )
	      );
	    },
	    render: function render() {
	      var _state2 = this.state;
	      var open = _state2.open;
	      var MyPlayers = _state2.MyPlayers;
	      var TargetPlayers = _state2.TargetPlayers;
	      var data = _state2.data;


	      var customContentStyle = {
	        width: open ? 'calc(100% - 140px)' : 0, top: 65,
	        background: '#f5f9fc'
	      };
	      {/*{ this.renderTabs() }*/}
	      return React.createElement(
	        _Drawer2.default,
	        { containerStyle: customContentStyle, openSecondary: true, open: open },
	        React.createElement(
	          _IconButton2.default,
	          { iconStyle: { fontSize: 16 },
	            iconClassName: 'material-icons',
	            onTouchTap: this.handleClose.bind(this, null) },
	          'clear_all'
	        ),
	        React.createElement(
	          'div',
	          { style: { display: 'flex', padding: 5 } },
	          this.renderPlayers(MyPlayers),
	          this.renderPlayers(TargetPlayers)
	        ),
	        this.renderStats(data),
	        this.renderOverallStats(data)
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
	    image: { maxWidth: '100%' }
	  },
	  subheader: {
	    backgroundColor: '#323e51',
	    position: 'relative',
	    fontSize: '12px',
	    fontWeight: '700',
	    color: '#E0F2F1'
	  },
	  listItem: { padding: '10px 15px', fontSize: 14, height: 35, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' },
	  wrap: { height: '100%', paddingBottom: '60px' },
	  badgeWrap: { position: 'absolute', right: '15px', top: '12px', fontSize: 12 },
	  badge: function badge(primary) {
	    return { width: '34px', height: '24px', borderRadius: '15%', background: primary ? 'rgba(70, 187, 194, 0.5)' : 'rgba(255, 64, 129, .35)' };
	  }
	};
	var style = {
	  box: {
	    flex: 1,
	    height: 'auto',
	    margin: '0 15px',
	    flexDirection: 'column',
	    justifyContent: 'space-between',
	    alignItems: 'center'
	  },
	  paper: {
	    boxShadow: 'rgba(0, 0, 0, 0.107647) 0px 1px 2px, rgba(0, 0, 0, 0.107647) 0px 1px 1px'
	  },
	  sub: {
	    height: 30, color: '#E0F2F1', backgroundColor: '#323e51',
	    display: 'flex', alignItems: 'center', lineHeight: 'normal', paddingLeft: 15, position: 'relative',
	    fontSize: '12px', fontWeight: '700', borderBottom: '1px solid #ddd'
	  },
	  bar: { padding: '10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100px', flex: '1', flexDirection: 'column' }
	};

/***/ },

/***/ 842:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FlatButton = __webpack_require__(498);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(646);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(490);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _RefreshIndicator = __webpack_require__(649);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _LinearProgress = __webpack_require__(736);

	var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

	var _SelectField = __webpack_require__(651);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(653);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(511);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _IconButton = __webpack_require__(481);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(665);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(666);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _Badge = __webpack_require__(843);

	var _Badge2 = _interopRequireDefault(_Badge);

	var _Toolbar = __webpack_require__(670);

	var _CircularProgress = __webpack_require__(533);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _reactLazyload = __webpack_require__(909);

	var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);


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
	var copy = function copy(obj) {
	  if (null == obj || "object" != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;
	  var copy = obj.constructor();
	  for (var attr in obj) {
	    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	  }
	  return copy;
	};
	core.Component('view.Compare', ['RotoPlayer'], function (RotoPlayer) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        selected: 'players', // Rotoworld
	        players: [],
	        selectedOpt: 'Last Name',
	        list: [],
	        origList: [],
	        query: '',
	        isLoading: true,
	        toggleSearch: false,
	        hoverID: null,
	        form: {
	          'Target Players': [],
	          'My Players': []
	        },
	        pageNumber: 1,
	        total: 0
	      };
	    },
	    componentWillMount: function componentWillMount() {
	      var _this = this;

	      this.initForm();
	      core.on('players.loaded', function (_ref) {
	        var players = _ref.players;
	        var total = _ref.total;

	        setTimeout(function () {
	          _this.setState({ total: total, players: _.orderBy(players, 'LastName') });
	          _this.handleList(players);
	        }, 250);
	      });
	    },
	    componentDidMount: function componentDidMount() {
	      // this.loadPlayers(this.state.pageNumber, this.handleList);

	      // setTimeout(() => {
	      //   this.loadMore(2)
	      //   setTimeout(() => {
	      //     this.loadMore(3)
	      //   }, 1000);
	      // }, 1000);

	    },

	    // loadPlayers(pageNumber, callback) {
	    //   core.run('getPlayersByPage' ,{ period: '365', page: pageNumber })
	    //       .then(({ data, isError })=>{
	    //         if (isError) return;
	    //         else {
	    //           var { Players, total } = data;
	    //           if (Players && total) {
	    //             this.setState({ total: total });
	    //             if (callback) callback(this.state.players)
	    //           }
	    //         }
	    //       }); 
	    // },

	    // loadMore(number){
	    //   var { list } = this.state;
	    //   var temp;
	    //   this.setState({ isLoading: true })
	    //   const addMorePlayers = (players) => {
	    //     temp = list.concat(players);
	    //     temp = _.sortBy(temp, 'LastName');
	    //     this.setState({ list: temp, origList: temp, isLoading: false, pageNumber: number })
	    //   }
	    //   this.loadPlayers(number, addMorePlayers)
	    // },

	    initForm: function initForm() {
	      this.setState({
	        form: {
	          'Target Players': [],
	          'My Players': []
	        }
	      });
	    },
	    handleList: function handleList(players) {
	      var list, chunks;
	      if (players && players instanceof Array) {
	        list = _.sortBy(players, 'LastName');
	        this.setState({ origList: list, list: list, isLoading: false });
	      }
	      // console.debug('players => ', players);
	    },
	    renderPlayersList: function renderPlayersList(list) {
	      if (list && list.length) {
	        return React.createElement(
	          _List.List,
	          { style: { fontSize: 12, overflow: 'auto', flex: 1, padding: '0px !important' } },
	          _.map(list, this.renderList)
	        );
	      }
	      return null;
	    },
	    renderComparedList: function renderComparedList(item, key) {
	      var _state = this.state;
	      var selected = _state.selected;
	      var isLoading = _state.isLoading;
	      var list = _state.list;
	      // console.log(item)

	      var style = {
	        transition: 'all 0.2s ease-in-out 0.1s',
	        WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	        opacity: isLoading ? 0 : 1,
	        transform: isLoading ? 'scale(0.4)' : 'scale(1)',
	        WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)'
	      };
	      return React.createElement(_List.ListItem, { key: key,
	        innerDivStyle: styles.listItem,
	        primaryText: this.renderPrimary(item),
	        leftIcon: React.createElement(
	          _FontIcon2.default,
	          { className: 'material-icons', style: {
	              height: 'auto',
	              width: 'auto',
	              top: '0',
	              margin: '0 5px 0 0',
	              left: '0',
	              position: 'relative',
	              fontSize: '18px'
	            } },
	          'person'
	        ),
	        secondaryTextLines: 1
	      });
	    },
	    renderList: function renderList(item, key) {
	      var _state2 = this.state;
	      var selected = _state2.selected;
	      var isLoading = _state2.isLoading;

	      var style = {
	        transition: 'all 0.2s ease-in-out 0.1s',
	        WebkitTransition: 'all 0.2s ease-in-out 0.1s',
	        opacity: isLoading ? 0 : 1,
	        transform: isLoading ? 'scale(0.4)' : 'scale(1)',
	        WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)'
	      };

	      var placeholder = function placeholder() {
	        return React.createElement(
	          'div',
	          { style: _extends({}, styles.listItem, { justifyContent: 'center' }) },
	          'Loading'
	        );
	      };
	      if (item.isInComapre) console.log(item);
	      if (item.isInComapre) return null;
	      return React.createElement(
	        _reactLazyload2.default,
	        { height: 45, key: key, once: true, resize: true, overflow: true, placeholder: placeholder(), offset: [-90, 0], debounce: 500 },
	        React.createElement(_List.ListItem, { key: key,
	          innerDivStyle: styles.listItem,
	          primaryText: this.renderPrimary(item, key),
	          leftIcon: React.createElement(
	            _FontIcon2.default,
	            { className: 'material-icons', style: {
	                height: 'auto',
	                width: 'auto',
	                top: '0',
	                margin: '0 5px 0 0',
	                left: '0',
	                position: 'relative',
	                fontSize: '18px'
	              } },
	            'person'
	          ),
	          secondaryTextLines: 1
	        })
	      );
	    },
	    onMouseEnter: function onMouseEnter(id) {
	      this.setState({ hoverID: id });
	    },
	    onMouseLeave: function onMouseLeave() {
	      this.setState({ hoverID: null });
	    },
	    renderPrimary: function renderPrimary(item, i) {
	      var _this2 = this;

	      var _state3 = this.state;
	      var hoverID = _state3.hoverID;
	      var selectedOpt = _state3.selectedOpt;
	      var Name = item.Name;
	      var LastName = item.LastName;
	      var PlayerID = item.PlayerID;
	      var isInComapre = item.isInComapre;
	      var Statistics = item.Statistics;

	      var primary = {
	        wrap: {
	          width: '100%',
	          display: 'flex',
	          alignItems: 'center',
	          justifyContent: 'space-between'

	        },
	        buttons: {
	          fontSize: 16,
	          width: 26
	        },
	        smallIcon: {
	          height: 26
	        },
	        add: {
	          display: isInComapre ? 'none' : 'flex'
	        },
	        remove: {
	          display: !isInComapre ? 'none' : 'flex'
	        }
	      };
	      var getFontWeight = function getFontWeight(i) {
	        if (i <= 2) return 700;else return 500;
	      };
	      var renderStat = function renderStat() {
	        if (isInComapre || !selectedOpt || selectedOpt.toLowerCase() === 'first name' || selectedOpt.toLowerCase() === 'last name') {
	          return null;
	        } else return React.createElement(
	          'span',
	          { style: { marginRight: 15, fontWeight: getFontWeight(i) } },
	          Statistics[selectedOpt],
	          ' '
	        );
	      };

	      return React.createElement(
	        'div',
	        { style: primary.wrap },
	        React.createElement(
	          'div',
	          { style: { width: '100%', display: 'flex', justifyContent: 'space-between' } },
	          LastName,
	          ', ',
	          Name,
	          renderStat()
	        ),
	        React.createElement(
	          'div',
	          { style: _extends({ flex: '0 auto' }, primary.add) },
	          React.createElement(
	            _IconButton2.default,
	            { style: { marginRight: 2.5 },
	              iconStyle: { fontSize: 16 },
	              iconClassName: 'material-icons',
	              onTouchTap: function onTouchTap(e) {
	                _this2.addTo('Target Players', PlayerID);
	              } },
	            'add_shopping_cart'
	          ),
	          React.createElement(
	            _IconButton2.default,
	            {
	              iconClassName: 'material-icons',
	              iconStyle: { fontSize: 16 },
	              onTouchTap: function onTouchTap(e) {
	                _this2.addTo('My Players', PlayerID);
	              } },
	            'remove_shopping_cart'
	          )
	        ),
	        React.createElement(
	          'div',
	          { style: _extends({ flex: '0 auto' }, primary.remove) },
	          React.createElement(
	            _IconButton2.default,
	            { iconStyle: { fontSize: 16 },
	              iconClassName: 'material-icons',
	              onTouchTap: function onTouchTap(e) {
	                _this2.removePlayer(PlayerID);
	              } },
	            'remove_circle'
	          )
	        )
	      );
	    },
	    addTo: function addTo(where, id) {
	      var _state4 = this.state;
	      var form = _state4.form;
	      var list = _state4.list;
	      var origList = _state4.origList;
	      var selectedOpt = _state4.selectedOpt;
	      var players = _state4.players;

	      var temp = copy(form);
	      // console.log(id, where)
	      temp[where].push(id);
	      this.setState({ form: temp, isLoading: true });
	      var _that = this;
	      // setTimeout(function() {
	      this.filterBy(selectedOpt);
	      // }, 350);
	    },
	    removePlayer: function removePlayer(id) {
	      var _state5 = this.state;
	      var form = _state5.form;
	      var list = _state5.list;
	      var origList = _state5.origList;

	      var index,
	          temp = []; //copy(form);
	      for (var x in form) {
	        if (form[x] && form[x].length) {
	          for (var i = 0; i < form[x].length; i++) {
	            if (form[x][i] === id) {
	              form[x] = _.filter(form[x], function (item) {
	                return item !== id;
	              });
	              break;
	            }
	          }
	        }
	      }
	      temp = form;
	      this.setState({ form: temp });
	      this.filterList(origList, true);
	    },
	    filterList: function filterList(list, updateState) {
	      var _state6 = this.state;
	      var form = _state6.form;
	      var selectedOpt = _state6.selectedOpt;

	      var mlist = list,
	          ids = [];
	      for (var d in form) {
	        if (form[d].length) {
	          for (var x = 0; x < form[d].length; x++) {
	            ids.push(form[d][x]);
	          }
	        }
	      }
	      if (ids && ids.length) {
	        mlist = _.map(list, function (item) {
	          if (ids.indexOf(item.PlayerID) > -1) {
	            return _extends({}, item, { isInComapre: true });
	          } else {
	            return _extends({}, item, { isInComapre: false });
	          }
	        });
	        // var players = _.map(players, (item)=>{
	        //   if (ids.indexOf(item.PlayerID) > -1) {
	        //     return { ...item, isInComapre: true }
	        //   }
	        //   else {
	        //     return { ...item, isInComapre: false }
	        //   }
	        // });
	      }
	      if (!updateState) return mlist;
	      this.setState({ list: mlist, isLoading: false, searchLoading: false });
	    },
	    makeCompare: function makeCompare() {
	      core.run('comparePlayers', { form: _extends({}, this.state.form, { Period: '364' }) }).then(function (data) {
	        core.emit('compared.players', data);
	      });
	    },
	    toggleSearchPlayers: function toggleSearchPlayers() {
	      var toggleSearch = this.state.toggleSearch;

	      this.setState({ toggleSearch: !toggleSearch });
	    },
	    onSearchPlayers: function onSearchPlayers() {
	      var _state7 = this.state;
	      var list = _state7.list;
	      var players = _state7.players;
	      var origList = _state7.origList;
	      var query = _state7.query;
	      var searchLoading = _state7.searchLoading;

	      this.setState({ searchLoading: true });
	      var temp;
	      if (!query) {
	        temp = this.filterList(players, false);
	      } else {
	        temp = _.filter(players, function (o) {
	          return o.Name.toLowerCase().indexOf(query.toLowerCase()) > -1 || o.LastName.toLowerCase().indexOf(query.toLowerCase()) > -1;
	        });
	      }
	      temp = _.sortBy(temp, 'LastName');

	      // setTimeout(()=>{
	      this.setState({ list: temp, searchLoading: false });
	      // }, 1500)
	    },
	    onReset: function onReset() {
	      this.initForm();
	      this.setState({ query: '' });
	      this.filterList(this.state.players, true);
	      this.setState({ selectedOpt: 'Last Name' });
	    },
	    onKeyDown: function onKeyDown(e, string) {
	      this.setState({ query: string });
	    },
	    onScroll: function onScroll(e) {
	      // var { total, pageNumber, origList } = this.state;
	      // total = Number(total);
	      // console.log(origList.length,'::', total)
	      // var { clientHeight, scrollHeight, scrollTop } = e.target;
	      // if (scrollHeight - scrollTop === clientHeight) {
	      //   if (total >= origList.length) {
	      //     pageNumber += 1;
	      //     this.loadMore(pageNumber)
	      //   }
	      // }
	    },
	    renderComparePlayers: function renderComparePlayers(ids, title) {
	      var _state8 = this.state;
	      var origList = _state8.origList;
	      var players = _state8.players;

	      if (!ids || !ids.length) return null;
	      var mlist = _.filter(players, function (item) {
	        return ids.indexOf(item.PlayerID) > -1;
	      });
	      if (!mlist || !mlist.length) return null;else mlist = _.map(mlist, function (item) {
	        return _extends({}, item, {
	          isInComapre: true
	        });
	      });
	      return React.createElement(
	        _List.List,
	        { style: { fontSize: 12, width: '100%', padding: '0px !important' } },
	        _.map(mlist, this.renderComparedList)
	      );
	    },
	    renderToolbar: function renderToolbar() {
	      var _state9 = this.state;
	      var toggleSearch = _state9.toggleSearch;
	      var query = _state9.query;

	      var textfield = {
	        transition: 'margin 0.15s ease-in-out, width 0.10s ease-in-out',
	        marginLeft: toggleSearch ? 15 : 0,
	        marginRight: 15,
	        width: toggleSearch ? '145px' : '0px',
	        fontSize: '12px'
	      };
	      var fieldWrap = {
	        transition: 'all 0.10s ease-in-out',
	        opacity: toggleSearch ? '1' : '0',
	        width: toggleSearch ? '175px' : '0px',
	        display: 'flex'
	      };
	      var icon = { display: 'flex', alignItems: 'center', fontSize: 18, cursor: 'pointer' };
	      return React.createElement(
	        _Toolbar.Toolbar,
	        { style: { width: '100%', paddingRight: 0, background: '#fff', borderBottom: '1px solid #dedede' } },
	        React.createElement(
	          _Toolbar.ToolbarGroup,
	          { firstChild: true },
	          React.createElement(
	            _FontIcon2.default,
	            { className: 'material-icons',
	              onTouchTap: this.toggleSearchPlayers,
	              style: icon },
	            'search'
	          ),
	          React.createElement(
	            'div',
	            { style: fieldWrap },
	            React.createElement(_TextField2.default, { id: 'search_players', underlineStyle: { borderColor: 'rgb(0, 188, 212)' }, style: textfield, value: query, onChange: this.onKeyDown }),
	            React.createElement(
	              _FontIcon2.default,
	              { className: 'material-icons',
	                disabled: !this.state.query,
	                onTouchTap: this.onSearchPlayers,
	                style: _extends({}, icon, { marginRight: '0.5em' }) },
	              'navigate_next'
	            ),
	            React.createElement(
	              _FontIcon2.default,
	              { className: 'material-icons',
	                onTouchTap: this.clear,
	                disabled: !this.state.query,
	                style: _extends({}, icon, { fontSize: 16 }) },
	              'clear'
	            )
	          ),
	          React.createElement(_Toolbar.ToolbarSeparator, null)
	        ),
	        React.createElement(
	          _Toolbar.ToolbarGroup,
	          null,
	          React.createElement(_FlatButton2.default, { labelStyle: { fontSize: 12 }, disabled: this.getDisabled('list'), label: 'reset', onTouchTap: this.onReset }),
	          React.createElement(_Toolbar.ToolbarSeparator, { style: { marginLeft: 0 } }),
	          React.createElement(_FlatButton2.default, { labelStyle: { fontSize: 12 }, disabled: this.getDisabled('form'), label: 'compare', primary: true, onTouchTap: this.makeCompare })
	        )
	      );
	    },
	    clear: function clear() {
	      var _this3 = this;

	      this.setState({ query: '', toggleSearch: false });
	      setTimeout(function () {
	        _this3.onSearchPlayers();
	      }, 250);
	    },
	    getDisabled: function getDisabled(type) {
	      var _state10 = this.state;
	      var form = _state10.form;
	      var list = _state10.list;
	      var origList = _state10.origList;

	      switch (type) {
	        case 'form':
	          return _.isEmpty(form) || _.isEmpty(form['Target Players']) || _.isEmpty(form['My Players']);
	        case 'list':
	          if (!_.isEmpty(form['Target Players']) || !_.isEmpty(form['My Players'])) return false;else return true;
	      }
	    },
	    getTotal: function getTotal() {
	      var _state11 = this.state;
	      var total = _state11.total;
	      var form = _state11.form;

	      var realTotal;
	      var num = Number(total) - Number(form['My Players'].length) - Number(form['Target Players'].length);
	      return num;
	    },
	    renderOptions: function renderOptions() {
	      var _this4 = this;

	      var players = this.state.players;

	      var options = [];
	      if (!players || !players.length) return null;
	      options = _.map(players[0].Statistics, function (val, stat) {
	        return stat;
	      });
	      options.unshift('First Name');
	      options.unshift('Last Name');
	      return _.map(options, function (opt, i) {
	        return React.createElement(_MenuItem2.default, { value: opt, key: i, primaryText: opt, onTouchTap: function onTouchTap(e) {
	            _this4.filterBy(opt);
	          } });
	      });;
	    },
	    renderPlayersHeader: function renderPlayersHeader() {
	      var selectedOpt = this.state.selectedOpt;

	      return React.createElement(
	        _Subheader2.default,
	        { style: styles.subheader },
	        'Players by ',
	        selectedOpt,
	        React.createElement(
	          _IconMenu2.default,
	          { iconStyle: { color: '#fff', fontSize: 14 }, style: { marginRight: '45px' },
	            iconButtonElement: React.createElement(
	              _IconButton2.default,
	              {
	                tooltip: 'filter list',
	                iconClassName: 'material-icons' },
	              'filter_list'
	            ),
	            menuStyle: { fontSize: 12 },
	            anchorOrigin: { horizontal: 'middle', vertical: 'top' },
	            targetOrigin: { horizontal: 'middle', vertical: 'top' },
	            maxHeight: 202 },
	          this.renderOptions()
	        ),
	        React.createElement(_Badge2.default, { secondary: true, badgeContent: this.getTotal(),
	          style: styles.badgeWrap,
	          badgeStyle: styles.badge(true) })
	      );
	    },
	    filterBy: function filterBy(obj) {
	      var _state12 = this.state;
	      var players = _state12.players;
	      var origList = _state12.origList;
	      var list = _state12.list;
	      var searchLoading = _state12.searchLoading;
	      var isLoading = _state12.isLoading;

	      this.setState({ searchLoading: true, isLoading: true });
	      var temp;
	      if (!obj) {
	        temp = this.filterList(players, false);
	      } else {
	        if (obj.toLowerCase() === 'last name') temp = _.sortBy(list, 'LastName');else if (obj.toLowerCase() === 'first name') temp = _.sortBy(list, 'Name');else {
	          temp = _.orderBy(players, 'Statistics.' + obj, ['desc']);
	        }
	      }
	      this.filterList(temp, true);
	      this.setState({ selectedOpt: obj });
	    },
	    render: function render() {
	      var _state13 = this.state;
	      var type = _state13.type;
	      var list = _state13.list;
	      var players = _state13.players;
	      var isLoading = _state13.isLoading;
	      var searchLoading = _state13.searchLoading;
	      var form = _state13.form;
	      var total = _state13.total;


	      return React.createElement(
	        'div',
	        { style: styles.wrap },
	        this.renderToolbar(),
	        React.createElement(
	          'div',
	          { style: { display: 'flex', padding: 15, flexDirection: 'row', width: '100%', height: '100%' } },
	          React.createElement(
	            _Paper2.default,
	            { style: _extends({}, styles.paper, { position: 'relative' }), onScroll: this.onScroll },
	            React.createElement(
	              'div',
	              null,
	              this.renderPlayersHeader()
	            ),
	            this.renderPlayersList(list),
	            React.createElement(
	              'div',
	              { style: _extends({}, styles.spinner, { display: searchLoading || isLoading ? 'flex' : 'none' }) },
	              React.createElement(_CircularProgress2.default, { style: { opacity: searchLoading || isLoading ? 1 : 0 } })
	            )
	          ),
	          React.createElement(
	            'div',
	            { style: { display: 'flex', flex: 1, flexDirection: 'column', marginLeft: 15 } },
	            React.createElement(
	              _Paper2.default,
	              { style: styles.paper, onScroll: this.onScroll },
	              React.createElement(
	                _Subheader2.default,
	                { style: styles.subheader },
	                'Give Players',
	                React.createElement(_Badge2.default, { primary: true, badgeContent: form['My Players'].length,
	                  style: styles.badgeWrap,
	                  badgeStyle: styles.badge(false) })
	              ),
	              this.renderComparePlayers(form['My Players'])
	            ),
	            React.createElement(
	              _Paper2.default,
	              { style: _extends({ marginTop: 15 }, styles.paper), onScroll: this.onScroll },
	              React.createElement(
	                _Subheader2.default,
	                { style: styles.subheader },
	                'Get Players',
	                React.createElement(_Badge2.default, { primary: true, badgeContent: form['Target Players'].length,
	                  style: styles.badgeWrap,
	                  badgeStyle: styles.badge(false) })
	              ),
	              this.renderComparePlayers(form['Target Players'])
	            )
	          )
	        )
	      );
	    }
	  };
	});
	var styles = {
	  spinner: {
	    position: 'absolute',
	    top: '50px',
	    bottom: '0',
	    left: '0',
	    display: 'flex',
	    right: '0',
	    alignItems: 'center',
	    justifyContent: 'center',
	    width: '100%',
	    background: 'rgba(255,255,255,0.6)'
	  },
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
	    image: { maxWidth: '100%' }
	  },
	  paper: {
	    display: 'flex', flex: 1, width: '100%', overflow: 'auto', flexDirection: 'column',
	    boxShadow: 'rgba(0, 0, 0, 0.107647) 0px 1px 2px, rgba(0, 0, 0, 0.107647) 0px 1px 1px'
	  },
	  subheader: {
	    backgroundColor: '#323e51',
	    position: 'relative',
	    fontSize: '12px',
	    fontWeight: '700',
	    color: '#E0F2F1',
	    display: 'flex',
	    justifyContent: 'space-between'
	  },
	  listItem: { padding: '10px 15px', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' },
	  wrap: { height: '100%', paddingBottom: '60px' },
	  badgeWrap: { position: 'absolute', right: '15px', top: '12px', fontSize: 12 },
	  badge: function badge(primary) {
	    return { width: '34px', height: '24px', borderRadius: '15%', background: primary ? 'rgba(70, 187, 194, 0.5)' : 'rgba(255, 64, 129, .35)' };
	  }
	};

/***/ },

/***/ 845:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(846);

	var _GridList = __webpack_require__(530);

	var _CircularProgress = __webpack_require__(533);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Subheader = __webpack_require__(490);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _FlatButton = __webpack_require__(498);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _IconButton = __webpack_require__(481);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var PropTypes = React.PropTypes;
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);


	var imgUrl = 'http://stats.nba.com/media/players/230x185/';
	var teamUrl = 'http://stats.nba.com/media/img/teams/logos/';
	var urls = [{
	  title: 'stats',
	  url: 'http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&Season=2016-17&SeasonType=Regular+Season&PlayerID=',
	  img: imgUrl
	}, {
	  title: 'news',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=',
	  img: imgUrl
	}];

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
	      core.tree.set(['player', 'popup', 'player'], player);
	      core.emit('get.Player.data', { player: player, type: 'stats' });
	    },
	    getAvatar: function getAvatar() {},
	    renderPlayerCard: function renderPlayerCard(player, i) {
	      var hovered = this.state.hovered;


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
	        React.createElement('img', { src: '' + imgUrl + player.id + '.png', style: images.player }),
	        React.createElement('img', { src: '' + teamUrl + player.teamLogo, style: images.team })
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
	          { id: 'zoneCard', style: { height: '100%', width: '100%' } },
	          React.createElement(_Card.CardHeader, {
	            title: 'Without Avatar',
	            subtitle: 'Subtitle',
	            avatar: 'http://www.rotoworld.com/images/headshots/NBA/2671.jpg'
	          }),
	          React.createElement(
	            _Card.CardText,
	            { style: { overflow: 'auto' } },
	            React.createElement(
	              'div',
	              { style: zone.players, className: 'zone-players' },
	              React.createElement(
	                _GridList.GridList,
	                {
	                  cols: 3,
	                  padding: 15,
	                  cellHeight: 110,
	                  style: { width: '100%', height: '100%' }
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
	    height: '100%',
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around'
	  }
	};

/***/ },

/***/ 856:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(646);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(490);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _RefreshIndicator = __webpack_require__(649);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(533);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(651);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _MenuItem = __webpack_require__(442);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var _ = __webpack_require__(501);


	// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
	// const baseUrl = '
	// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.fantasypros.com/nba/stats/rodney-stuckey.php&format=rss&num=30;

	var urls = [
	// {
	//   title : 'The Score',
	//   url : 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.thescore.com/nba.rss&format=rss&num=30'
	// },
	{
	  title: 'Roto Wire',
	  url: 'http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?v=717525&limit=10',
	  img: 'http://stats.nba.com/media/players/230x185/'
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
	  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
	  return returnText;
	};

	core.Component('view.RotoNews', ['ui.Loader'], function (Loader) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        selected: 'Roto Wire', // Rotoworld
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

/***/ 857:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactGoogleLogin = __webpack_require__(858);

	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var core = __webpack_require__(247);
	// var moment = require('moment');
	// var google = require('googleapis');
	// var compute = google.compute('v1');


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

	    onLogin: function onLogin(login) {
	      console.log(login);
	    },
	    render: function render() {

	      return React.createElement(
	        'div',
	        { style: signin.wrap },
	        React.createElement(_reactGoogleLogin2.default, {
	          clientId: '79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com',
	          buttonText: 'Login',
	          onSuccess: this.onLogin,
	          onFailure: this.onLogin
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

/***/ 859:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TextField = __webpack_require__(653);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(646);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _DatePicker = __webpack_require__(860);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);

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

/***/ 876:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Snackbar = __webpack_require__(877);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _RaisedButton = __webpack_require__(513);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FlatButton = __webpack_require__(498);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _List = __webpack_require__(528);

	var _Subheader = __webpack_require__(490);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Dialog = __webpack_require__(511);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _Paper = __webpack_require__(439);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _TextField = __webpack_require__(653);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Chip = __webpack_require__(646);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Avatar = __webpack_require__(644);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _FontIcon = __webpack_require__(483);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(211);
	var sa = __webpack_require__(256);
	var core = __webpack_require__(247);
	var moment = __webpack_require__(540);
	var _ = __webpack_require__(501);

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

/***/ 881:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(211);
	var core = __webpack_require__(247);
	var moment = __webpack_require__(540);

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