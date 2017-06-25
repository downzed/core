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

	var _MuiThemeProvider = __webpack_require__(26);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _darkBaseTheme = __webpack_require__(204);

	var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);

	var _lightBaseTheme = __webpack_require__(161);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _getMuiTheme = __webpack_require__(146);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var core = __webpack_require__(240);
	var ReactDom = __webpack_require__(296);


	(0, _reactTapEventPlugin2.default)();

	core.loadContext('index', __webpack_require__(430));
	// core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
	core.loadContext('source', __webpack_require__(430));
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

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Index.module.jsx": 431,
		"./actions/actions.module.jsx": 432,
		"./actions/comparePlayers.module.jsx": 435,
		"./actions/getAllPlayers.module.jsx": 436,
		"./components/Loader/ui.Loader.module.jsx": 437,
		"./components/modules/player_dialog.module.jsx": 440,
		"./components/modules/roto_player.module.jsx": 658,
		"./components/modules/roto_player_dialog.module.jsx": 690,
		"./components/modules/stats.google.chart.module.jsx": 702,
		"./components/modules/stats_dialog.module.jsx": 753,
		"./components/views/Compare.module.jsx": 769,
		"./components/views/view.myZone.module.jsx": 778,
		"./components/views/view.rotoNews.module.jsx": 789,
		"./components/views/view.sign_in.module.jsx": 790,
		"./components/views/view.steps.one.module.jsx": 792,
		"./components/views/view.steps.two.module.jsx": 809,
		"./components/views/views.module.jsx": 814
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
	webpackContext.id = 430;


/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Drawer = __webpack_require__(691);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _AppBar = __webpack_require__(693);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(465);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _nodeVibrant = __webpack_require__(815);

	var Vibrant = _interopRequireWildcard(_nodeVibrant);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);
	// var _ = window._;//
	// console.dir(_);


	var teams = __webpack_require__(996);
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

	      var _state = this.state,
	          allPlayers = _state.allPlayers,
	          timeframe = _state.timeframe;

	      if (!period) period = timeframe;
	      core.run('getAllPlayers', { period: period }).then(function (_ref) {
	        var isError = _ref.isError;

	        if (isError) return;

	        var _allPlayers$get = _this.allPlayers.get(),
	            players = _allPlayers$get.players,
	            total = _allPlayers$get.total;
	        // console.debug('players => ', players);
	        // console.debug('total => ', total);


	        var res = _this.getTeams(players);
	        // var res = this.getTeams(players, this.getColor);
	        // var chunks =  _.chunk(res, 13);
	        // var myplayers = chunks[6];
	        core.emit('players.loaded', { players: res instanceof Array ? res : [], total: total });
	        // core.tree.set('players', chunks[5]);
	        // core.tree.set('myPlayers', myplayers)
	      });
	      //   this.setMax(res);
	    },
	    handleCompare: function handleCompare(data) {
	      this.setState({ comparedData: data, dialogOpen: true });
	    },
	    getColor: function getColor(players) {
	      var get = function get(src) {
	        if (!src) return '#fff';
	        var r, g, b, pal;
	        var x;
	        Vibrant.from(src).getPalette(function (err, palette) {
	          if (err) {
	            console.error(err);x = 'red';
	          }
	          // if (palette && palette.hasOwnProperty('Vibrant')) {
	          //     if (palette['Vibrant'].hasOwnProperty('_rgb')) {
	          // console.debug('palette[Vibrant][_rgb] => ',  palette['Vibrant']['_rgb'])
	          if (palette && palette['Vibrant'] !== null && palette['Vibrant']['_rgb']) {
	            pal = palette['Vibrant']['_rgb'];
	            r = pal[0];
	            g = pal[1];
	            b = pal[2];
	            x = 'rgba(' + r + ',' + g + ',' + b + ', .6)';
	          }
	          // }
	          else x = 'green';
	          // }
	        });
	        return x;
	      };
	      return _.map(players, function (player) {
	        return _extends({}, player, {
	          color: get(player.teamLogo)
	        });
	      });
	    },
	    getTeams: function getTeams(players, callback) {
	      var wteams = [];

	      for (var x = 0; x < players.length; x++) {
	        for (var t = 0; t < teams.length; t++) {
	          if (Number(players[x].TeamID) === teams[t].teamId) {
	            wteams.push(_extends({}, players[x], teams[t], {
	              teamLogo: 'http://stats.nba.com/media/img/teams/logos/' + teams[t].abbreviation + '_logo.svg'
	            }));
	          }
	        }
	      }
	      return wteams; //callback(wteams)
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

	      var _state2 = this.state,
	          menuItems = _state2.menuItems,
	          view = _state2.view;


	      return _.map(menuItems, function (item, i) {
	        var icon = item.icon,
	            label = item.label,
	            ref = item.ref,
	            active = item.active;

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

	      var _state3 = this.state,
	          open = _state3.open,
	          view = _state3.view,
	          name = _state3.name,
	          type = _state3.type,
	          dialogOpen = _state3.dialogOpen,
	          comparedData = _state3.comparedData;

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

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(205);
	var core = __webpack_require__(240);
	var sa = __webpack_require__(249);
	var _ = __webpack_require__(433);
	var teams = __webpack_require__(434);
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

/***/ 434:
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

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(205);
	var core = __webpack_require__(240);
	var sa = __webpack_require__(249);
	var _ = __webpack_require__(433);
	var teams = __webpack_require__(434);
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

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(205);
	var core = __webpack_require__(240);
	var sa = __webpack_require__(249);
	var _ = __webpack_require__(433);
	var teams = __webpack_require__(434);
	var base = 'http://ec2-13-58-180-255.us-east-2.compute.amazonaws.com:8080/FantasyEdge';

	core.Action('getAllPlayers', { period: 'string' }, function (data, promise) {
	  var allPlayers = core.tree.select('allPlayers');
	  var total = 0;
	  sa.post(base + '/GetAllPlayersAvg?Period=' + data.period)
	  // .send(data)
	  .end(function (err, res) {
	    if (res && res.ok) {
	      var body = res.body,
	          headers = res.headers;

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
	      var body = res.body,
	          headers = res.headers;
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

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(205);
	var PropTypes = React.PropTypes;

	var core = __webpack_require__(240);
	var myCss = __webpack_require__(438);

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

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(439);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(289)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../../node_modules/css-loader/index.js!./loader-theme.css", function() {
				var newContent = require("!!../../../../../node_modules/css-loader/index.js!./loader-theme.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(288)();
	// imports


	// module
	exports.push([module.id, ".spinner {\r\n  width: 70px;\r\n  text-align: center;\r\n}\r\n\r\n.spinner > div {\r\n  width: 10px;\r\n  height: 10px;\r\n  background-color: #333;\r\n  border-radius: 100%;\r\n  display: inline-block;\r\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\r\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\r\n}\r\n\r\n.spinner .bounce1 {\r\n  -webkit-animation-delay: -0.32s;\r\n  animation-delay: -0.32s;\r\n}\r\n\r\n.spinner .bounce2 {\r\n  -webkit-animation-delay: -0.16s;\r\n  animation-delay: -0.16s;\r\n}\r\n\r\n@-webkit-keyframes sk-bouncedelay {\r\n  0%, 80%, 100% { -webkit-transform: scale(0) }\r\n  40% { -webkit-transform: scale(1.0) }\r\n}\r\n\r\n@keyframes sk-bouncedelay {\r\n  0%, 80%, 100% {\r\n    -webkit-transform: scale(0);\r\n    transform: scale(0);\r\n  } 40% {\r\n    -webkit-transform: scale(1.0);\r\n    transform: scale(1.0);\r\n  }\r\n}\r\n\r\n.sk-fading-circle {\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n}\r\n\r\n.sk-fading-circle .sk-circle {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n}\r\n\r\n.sk-fading-circle .sk-circle:before {\r\n  content: '';\r\n  display: block;\r\n  margin: 0 auto;\r\n  width: 15%;\r\n  height: 15%;\r\n  background-color: #333;\r\n  border-radius: 100%;\r\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\r\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\r\n}\r\n.sk-fading-circle .sk-circle2 {\r\n  -webkit-transform: rotate(30deg);\r\n      -ms-transform: rotate(30deg);\r\n          transform: rotate(30deg);\r\n}\r\n.sk-fading-circle .sk-circle3 {\r\n  -webkit-transform: rotate(60deg);\r\n      -ms-transform: rotate(60deg);\r\n          transform: rotate(60deg);\r\n}\r\n.sk-fading-circle .sk-circle4 {\r\n  -webkit-transform: rotate(90deg);\r\n      -ms-transform: rotate(90deg);\r\n          transform: rotate(90deg);\r\n}\r\n.sk-fading-circle .sk-circle5 {\r\n  -webkit-transform: rotate(120deg);\r\n      -ms-transform: rotate(120deg);\r\n          transform: rotate(120deg);\r\n}\r\n.sk-fading-circle .sk-circle6 {\r\n  -webkit-transform: rotate(150deg);\r\n      -ms-transform: rotate(150deg);\r\n          transform: rotate(150deg);\r\n}\r\n.sk-fading-circle .sk-circle7 {\r\n  -webkit-transform: rotate(180deg);\r\n      -ms-transform: rotate(180deg);\r\n          transform: rotate(180deg);\r\n}\r\n.sk-fading-circle .sk-circle8 {\r\n  -webkit-transform: rotate(210deg);\r\n      -ms-transform: rotate(210deg);\r\n          transform: rotate(210deg);\r\n}\r\n.sk-fading-circle .sk-circle9 {\r\n  -webkit-transform: rotate(240deg);\r\n      -ms-transform: rotate(240deg);\r\n          transform: rotate(240deg);\r\n}\r\n.sk-fading-circle .sk-circle10 {\r\n  -webkit-transform: rotate(270deg);\r\n      -ms-transform: rotate(270deg);\r\n          transform: rotate(270deg);\r\n}\r\n.sk-fading-circle .sk-circle11 {\r\n  -webkit-transform: rotate(300deg);\r\n      -ms-transform: rotate(300deg);\r\n          transform: rotate(300deg);\r\n}\r\n.sk-fading-circle .sk-circle12 {\r\n  -webkit-transform: rotate(330deg);\r\n      -ms-transform: rotate(330deg);\r\n          transform: rotate(330deg);\r\n}\r\n.sk-fading-circle .sk-circle2:before {\r\n  -webkit-animation-delay: -1.1s;\r\n          animation-delay: -1.1s;\r\n}\r\n.sk-fading-circle .sk-circle3:before {\r\n  -webkit-animation-delay: -1s;\r\n          animation-delay: -1s;\r\n}\r\n.sk-fading-circle .sk-circle4:before {\r\n  -webkit-animation-delay: -0.9s;\r\n          animation-delay: -0.9s;\r\n}\r\n.sk-fading-circle .sk-circle5:before {\r\n  -webkit-animation-delay: -0.8s;\r\n          animation-delay: -0.8s;\r\n}\r\n.sk-fading-circle .sk-circle6:before {\r\n  -webkit-animation-delay: -0.7s;\r\n          animation-delay: -0.7s;\r\n}\r\n.sk-fading-circle .sk-circle7:before {\r\n  -webkit-animation-delay: -0.6s;\r\n          animation-delay: -0.6s;\r\n}\r\n.sk-fading-circle .sk-circle8:before {\r\n  -webkit-animation-delay: -0.5s;\r\n          animation-delay: -0.5s;\r\n}\r\n.sk-fading-circle .sk-circle9:before {\r\n  -webkit-animation-delay: -0.4s;\r\n          animation-delay: -0.4s;\r\n}\r\n.sk-fading-circle .sk-circle10:before {\r\n  -webkit-animation-delay: -0.3s;\r\n          animation-delay: -0.3s;\r\n}\r\n.sk-fading-circle .sk-circle11:before {\r\n  -webkit-animation-delay: -0.2s;\r\n          animation-delay: -0.2s;\r\n}\r\n.sk-fading-circle .sk-circle12:before {\r\n  -webkit-animation-delay: -0.1s;\r\n          animation-delay: -0.1s;\r\n}\r\n\r\n@-webkit-keyframes sk-circleFadeDelay {\r\n  0%, 39%, 100% { opacity: 0; }\r\n  40% { opacity: 1; }\r\n}\r\n\r\n@keyframes sk-circleFadeDelay {\r\n  0%, 39%, 100% { opacity: 0; }\r\n  40% { opacity: 1; }\r\n}\r\n\r\n.circle {\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: #333;\r\n\r\n  border-radius: 100%;\r\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\r\n  animation: sk-scaleout 1.0s infinite ease-in-out;\r\n}\r\n\r\n@-webkit-keyframes sk-scaleout {\r\n  0% { -webkit-transform: scale(0) }\r\n  100% {\r\n    -webkit-transform: scale(1.0);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes sk-scaleout {\r\n  0% {\r\n    -webkit-transform: scale(0);\r\n    transform: scale(0);\r\n  } 100% {\r\n    -webkit-transform: scale(1.0);\r\n    transform: scale(1.0);\r\n    opacity: 0;\r\n  }\r\n}\r\n", ""]);

	// exports


/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Dialog = __webpack_require__(441);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _FlatButton = __webpack_require__(465);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(500);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Table = __webpack_require__(515);

	var _List = __webpack_require__(528);

	var _GridList = __webpack_require__(530);

	var _CircularProgress = __webpack_require__(534);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Tabs = __webpack_require__(536);

	var _colors = __webpack_require__(162);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);
	var moment = __webpack_require__(541);

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
	      var player = _ref.player,
	          type = _ref.type;

	      // console.log('player', player)
	      core.tree.set(['player', 'popup', 'data'], []);

	      this.setState({ loading: true });

	      var _$find = _.find(urls, ['title', type]),
	          url = _$find.url,
	          img = _$find.img;

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
	          Headline: nooz.lastUpdate //nooz.Headline ? nooz.Headline.split(nooz.LastName+': ')[1] :
	        });
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
	      var _state = this.state,
	          player = _state.player,
	          open = _state.open,
	          value = _state.value,
	          attr = _state.attr,
	          loading = _state.loading,
	          data = _state.data;

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

/***/ 542:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 543,
		"./af.js": 543,
		"./ar": 544,
		"./ar-dz": 545,
		"./ar-dz.js": 545,
		"./ar-kw": 546,
		"./ar-kw.js": 546,
		"./ar-ly": 547,
		"./ar-ly.js": 547,
		"./ar-ma": 548,
		"./ar-ma.js": 548,
		"./ar-sa": 549,
		"./ar-sa.js": 549,
		"./ar-tn": 550,
		"./ar-tn.js": 550,
		"./ar.js": 544,
		"./az": 551,
		"./az.js": 551,
		"./be": 552,
		"./be.js": 552,
		"./bg": 553,
		"./bg.js": 553,
		"./bn": 554,
		"./bn.js": 554,
		"./bo": 555,
		"./bo.js": 555,
		"./br": 556,
		"./br.js": 556,
		"./bs": 557,
		"./bs.js": 557,
		"./ca": 558,
		"./ca.js": 558,
		"./cs": 559,
		"./cs.js": 559,
		"./cv": 560,
		"./cv.js": 560,
		"./cy": 561,
		"./cy.js": 561,
		"./da": 562,
		"./da.js": 562,
		"./de": 563,
		"./de-at": 564,
		"./de-at.js": 564,
		"./de-ch": 565,
		"./de-ch.js": 565,
		"./de.js": 563,
		"./dv": 566,
		"./dv.js": 566,
		"./el": 567,
		"./el.js": 567,
		"./en-au": 568,
		"./en-au.js": 568,
		"./en-ca": 569,
		"./en-ca.js": 569,
		"./en-gb": 570,
		"./en-gb.js": 570,
		"./en-ie": 571,
		"./en-ie.js": 571,
		"./en-nz": 572,
		"./en-nz.js": 572,
		"./eo": 573,
		"./eo.js": 573,
		"./es": 574,
		"./es-do": 575,
		"./es-do.js": 575,
		"./es.js": 574,
		"./et": 576,
		"./et.js": 576,
		"./eu": 577,
		"./eu.js": 577,
		"./fa": 578,
		"./fa.js": 578,
		"./fi": 579,
		"./fi.js": 579,
		"./fo": 580,
		"./fo.js": 580,
		"./fr": 581,
		"./fr-ca": 582,
		"./fr-ca.js": 582,
		"./fr-ch": 583,
		"./fr-ch.js": 583,
		"./fr.js": 581,
		"./fy": 584,
		"./fy.js": 584,
		"./gd": 585,
		"./gd.js": 585,
		"./gl": 586,
		"./gl.js": 586,
		"./gom-latn": 587,
		"./gom-latn.js": 587,
		"./he": 588,
		"./he.js": 588,
		"./hi": 589,
		"./hi.js": 589,
		"./hr": 590,
		"./hr.js": 590,
		"./hu": 591,
		"./hu.js": 591,
		"./hy-am": 592,
		"./hy-am.js": 592,
		"./id": 593,
		"./id.js": 593,
		"./is": 594,
		"./is.js": 594,
		"./it": 595,
		"./it.js": 595,
		"./ja": 596,
		"./ja.js": 596,
		"./jv": 597,
		"./jv.js": 597,
		"./ka": 598,
		"./ka.js": 598,
		"./kk": 599,
		"./kk.js": 599,
		"./km": 600,
		"./km.js": 600,
		"./kn": 601,
		"./kn.js": 601,
		"./ko": 602,
		"./ko.js": 602,
		"./ky": 603,
		"./ky.js": 603,
		"./lb": 604,
		"./lb.js": 604,
		"./lo": 605,
		"./lo.js": 605,
		"./lt": 606,
		"./lt.js": 606,
		"./lv": 607,
		"./lv.js": 607,
		"./me": 608,
		"./me.js": 608,
		"./mi": 609,
		"./mi.js": 609,
		"./mk": 610,
		"./mk.js": 610,
		"./ml": 611,
		"./ml.js": 611,
		"./mr": 612,
		"./mr.js": 612,
		"./ms": 613,
		"./ms-my": 614,
		"./ms-my.js": 614,
		"./ms.js": 613,
		"./my": 615,
		"./my.js": 615,
		"./nb": 616,
		"./nb.js": 616,
		"./ne": 617,
		"./ne.js": 617,
		"./nl": 618,
		"./nl-be": 619,
		"./nl-be.js": 619,
		"./nl.js": 618,
		"./nn": 620,
		"./nn.js": 620,
		"./pa-in": 621,
		"./pa-in.js": 621,
		"./pl": 622,
		"./pl.js": 622,
		"./pt": 623,
		"./pt-br": 624,
		"./pt-br.js": 624,
		"./pt.js": 623,
		"./ro": 625,
		"./ro.js": 625,
		"./ru": 626,
		"./ru.js": 626,
		"./sd": 627,
		"./sd.js": 627,
		"./se": 628,
		"./se.js": 628,
		"./si": 629,
		"./si.js": 629,
		"./sk": 630,
		"./sk.js": 630,
		"./sl": 631,
		"./sl.js": 631,
		"./sq": 632,
		"./sq.js": 632,
		"./sr": 633,
		"./sr-cyrl": 634,
		"./sr-cyrl.js": 634,
		"./sr.js": 633,
		"./ss": 635,
		"./ss.js": 635,
		"./sv": 636,
		"./sv.js": 636,
		"./sw": 637,
		"./sw.js": 637,
		"./ta": 638,
		"./ta.js": 638,
		"./te": 639,
		"./te.js": 639,
		"./tet": 640,
		"./tet.js": 640,
		"./th": 641,
		"./th.js": 641,
		"./tl-ph": 642,
		"./tl-ph.js": 642,
		"./tlh": 643,
		"./tlh.js": 643,
		"./tr": 644,
		"./tr.js": 644,
		"./tzl": 645,
		"./tzl.js": 645,
		"./tzm": 646,
		"./tzm-latn": 647,
		"./tzm-latn.js": 647,
		"./tzm.js": 646,
		"./uk": 648,
		"./uk.js": 648,
		"./ur": 649,
		"./ur.js": 649,
		"./uz": 650,
		"./uz-latn": 651,
		"./uz-latn.js": 651,
		"./uz.js": 650,
		"./vi": 652,
		"./vi.js": 652,
		"./x-pseudo": 653,
		"./x-pseudo.js": 653,
		"./yo": 654,
		"./yo.js": 654,
		"./zh-cn": 655,
		"./zh-cn.js": 655,
		"./zh-hk": 656,
		"./zh-hk.js": 656,
		"./zh-tw": 657,
		"./zh-tw.js": 657
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
	webpackContext.id = 542;


/***/ },

/***/ 658:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(661);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(510);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _RefreshIndicator = __webpack_require__(664);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(534);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(673);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(675);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(441);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(162);

	var _IconButton = __webpack_require__(500);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(687);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(688);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);


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
	      var _$find = _.find(urls, ['title', 'stats']),
	          url = _$find.url,
	          img = _$find.img;
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
	      var _state = this.state,
	          showPopup = _state.showPopup,
	          data = _state.data,
	          popupType = _state.popupType;
	      var _props = this.props,
	          player = _props.player,
	          selected = _props.selected,
	          isLoading = _props.isLoading;

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

/***/ 690:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Drawer = __webpack_require__(691);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _AppBar = __webpack_require__(693);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(465);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(500);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _List = __webpack_require__(528);

	var _close = __webpack_require__(696);

	var _close2 = _interopRequireDefault(_close);

	var _Toolbar = __webpack_require__(697);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);


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
	      var _props = this.props,
	          primaryLabel = _props.primaryLabel,
	          secondaryLabel = _props.secondaryLabel,
	          data = _props.data,
	          player = _props.player,
	          handleClose = _props.handleClose,
	          showPopup = _props.showPopup;

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

/***/ 702:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactChartjs = __webpack_require__(703);

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);

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

/***/ 753:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(661);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(510);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _CircularProgress = __webpack_require__(534);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(673);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(675);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Drawer = __webpack_require__(691);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _colors = __webpack_require__(162);

	var _IconButton = __webpack_require__(500);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(687);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(688);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _saladUi = __webpack_require__(754);

	var _saladUi2 = _interopRequireDefault(_saladUi);

	var _LinearProgress = __webpack_require__(755);

	var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

	var _Tabs = __webpack_require__(536);

	var _reactSwipeableViews = __webpack_require__(757);

	var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);

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
	        var players = _ref.players,
	            total = _ref.total;

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
	      var Name = item.Name,
	          LastName = item.LastName,
	          PlayerID = item.PlayerID;

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
	      var _state = this.state,
	          tabIndex = _state.tabIndex,
	          data = _state.data;

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
	      var _state2 = this.state,
	          open = _state2.open,
	          MyPlayers = _state2.MyPlayers,
	          TargetPlayers = _state2.TargetPlayers,
	          data = _state2.data;


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
	    height: 30,
	    display: 'flex',
	    lineHeight: 'normal',
	    alignItems: 'center',
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

/***/ 769:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _FlatButton = __webpack_require__(465);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Subheader = __webpack_require__(510);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _LinearProgress = __webpack_require__(755);

	var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

	var _TextField = __webpack_require__(675);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _IconButton = __webpack_require__(500);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _IconMenu = __webpack_require__(688);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _Badge = __webpack_require__(770);

	var _Badge2 = _interopRequireDefault(_Badge);

	var _Toolbar = __webpack_require__(697);

	var _CircularProgress = __webpack_require__(534);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _reactLazyload = __webpack_require__(772);

	var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);


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
	        var players = _ref.players,
	            total = _ref.total;

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
	      var _state = this.state,
	          selected = _state.selected,
	          isLoading = _state.isLoading,
	          list = _state.list;
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
	      var _state2 = this.state,
	          selected = _state2.selected,
	          isLoading = _state2.isLoading;

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

	      if (item.isInComapre) return null;
	      return React.createElement(
	        _reactLazyload2.default,
	        { height: 45, key: key, once: true, resize: true,
	          overflow: true,
	          placeholder: placeholder(),
	          offset: [-30, 0], debounce: 350 },
	        React.createElement(_List.ListItem, { key: key,
	          style: { background: item.color },
	          innerDivStyle: _extends({}, styles.listItem, { paddingLeft: 15, background: item.color }),
	          primaryText: this.renderPrimary(item, key),
	          leftIcon: React.createElement(
	            _FontIcon2.default,
	            { className: 'material-icons', color: item.color, style: {
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

	      var _state3 = this.state,
	          hoverID = _state3.hoverID,
	          selectedOpt = _state3.selectedOpt;
	      var Name = item.Name,
	          LastName = item.LastName,
	          PlayerID = item.PlayerID,
	          isInComapre = item.isInComapre,
	          Statistics = item.Statistics,
	          teamLogo = item.teamLogo;

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
	      var getColor = function getColor() {
	        var canvas = document.getElementById('myCanvas');
	        var context = canvas.getContext('2d');
	        var imageObj = new Image();
	        imageObj.onload = function () {
	          canvas.width = imageObj.width;
	          canvas.height = imageObj.height;
	          context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, 400, 300);
	        };
	        imageObj.src = teamLogo;
	        console.log('x >', x);
	      };
	      getColor();
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
	      var _state4 = this.state,
	          form = _state4.form,
	          list = _state4.list,
	          origList = _state4.origList,
	          selectedOpt = _state4.selectedOpt,
	          players = _state4.players;

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
	      var _state5 = this.state,
	          form = _state5.form,
	          list = _state5.list,
	          origList = _state5.origList;

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
	      var _state6 = this.state,
	          form = _state6.form,
	          selectedOpt = _state6.selectedOpt;

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
	      var _state7 = this.state,
	          list = _state7.list,
	          players = _state7.players,
	          origList = _state7.origList,
	          query = _state7.query,
	          searchLoading = _state7.searchLoading;

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
	      var _state8 = this.state,
	          origList = _state8.origList,
	          players = _state8.players;

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
	      var _state9 = this.state,
	          toggleSearch = _state9.toggleSearch,
	          query = _state9.query;

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
	      var _state10 = this.state,
	          form = _state10.form,
	          list = _state10.list,
	          origList = _state10.origList;

	      switch (type) {
	        case 'form':
	          return _.isEmpty(form) || _.isEmpty(form['Target Players']) || _.isEmpty(form['My Players']);
	        case 'list':
	          if (!_.isEmpty(form['Target Players']) || !_.isEmpty(form['My Players'])) return false;else return true;
	      }
	    },
	    getTotal: function getTotal() {
	      var _state11 = this.state,
	          total = _state11.total,
	          form = _state11.form;

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
	      var _state12 = this.state,
	          players = _state12.players,
	          origList = _state12.origList,
	          list = _state12.list,
	          searchLoading = _state12.searchLoading,
	          isLoading = _state12.isLoading;

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
	      var _state13 = this.state,
	          type = _state13.type,
	          list = _state13.list,
	          players = _state13.players,
	          isLoading = _state13.isLoading,
	          searchLoading = _state13.searchLoading,
	          form = _state13.form,
	          total = _state13.total;


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
	        ),
	        React.createElement('canvas', { id: 'myCanvas', style: { display: 'none', width: '300px', height: '300px' } })
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
	  listItem: {
	    padding: '10px 15px !important', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
	  },
	  wrap: { height: '100%', paddingBottom: '60px' },
	  badgeWrap: { position: 'absolute', right: '15px', top: '12px', fontSize: 12 },
	  badge: function badge(primary) {
	    return { width: '34px', height: '24px', borderRadius: '15%', background: primary ? 'rgba(70, 187, 194, 0.5)' : 'rgba(255, 64, 129, .35)' };
	  }
	};

/***/ },

/***/ 778:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(779);

	var _GridList = __webpack_require__(530);

	var _CircularProgress = __webpack_require__(534);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Subheader = __webpack_require__(510);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _FlatButton = __webpack_require__(465);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _IconButton = __webpack_require__(500);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var PropTypes = React.PropTypes;
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);


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

/***/ 789:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(661);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(510);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(528);

	var _RefreshIndicator = __webpack_require__(664);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(534);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(673);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _MenuItem = __webpack_require__(480);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var _ = __webpack_require__(433);


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
	      var _state = this.state,
	          selected = _state.selected,
	          img = _state.img,
	          entries = _state.entries;
	      var ListItems = json.ListItems;

	      var news = _.map(ListItems, function (entry) {
	        var Headline = entry.Headline,
	            PlayerID = entry.PlayerID,
	            ListItemCaption = entry.ListItemCaption,
	            ListItemDescription = entry.ListItemDescription;

	        return _extends({}, entry, {
	          title: Headline,
	          id: PlayerID,
	          avatar: returnAvatar(PlayerID, img, selected.toLowerCase()),
	          contentSnippet: ListItemCaption, //contentSnippet.replace(/<(?:.|\n)*?>/gm, '');,
	          content: ListItemDescription //content.replace(/<(?:.|\n)*?>/gm, '');,
	        });
	      });
	      this.setState({ news: news, isLoading: false, entries: json });
	    },
	    setEntries: function setEntries(newEntries) {
	      var _state2 = this.state,
	          selected = _state2.selected,
	          img = _state2.img,
	          entries = _state2.entries;

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
	          contentSnippet: replaceStr(entry.contentSnippet) //entry.contentSnippet.replace(/<(?:.|\n)*?>/gm, '');,
	          // content: replaceStr(entry.content),//entry.content.replace(/<(?:.|\n)*?>/gm, '');,
	        });
	      });

	      this.setState({ news: news, isLoading: false, entries: newEntries });
	    },
	    componentDidMount: function componentDidMount() {
	      this.loadUrl(this.state.selected);
	    },
	    loadUrl: function loadUrl(selected) {
	      var urls = this.state.urls;

	      var _$find = _.find(urls, ['title', selected]),
	          url = _$find.url,
	          img = _$find.img;

	      this.setState({ selected: selected, img: img });

	      this.getRss(url);
	    },
	    handleSelectFeed: function handleSelectFeed(event, index, value) {
	      this.loadUrl(value);
	    },
	    renderNews: function renderNews(item, key) {
	      var _state3 = this.state,
	          selected = _state3.selected,
	          isLoading = _state3.isLoading;

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
	      var _state4 = this.state,
	          type = _state4.type,
	          news = _state4.news,
	          isLoading = _state4.isLoading,
	          urls = _state4.urls,
	          selected = _state4.selected;

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

/***/ 790:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactGoogleLogin = __webpack_require__(791);

	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var core = __webpack_require__(240);
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

/***/ 792:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TextField = __webpack_require__(675);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(661);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _DatePicker = __webpack_require__(793);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);

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
	      var _state = this.state,
	          cap = _state.cap,
	          date = _state.date,
	          teamName = _state.teamName;
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

	      var _state2 = this.state,
	          teamName = _state2.teamName,
	          imagePreview = _state2.imagePreview,
	          cap = _state2.cap,
	          date = _state2.date,
	          dchange = _state2.dchange;
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

/***/ 809:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Snackbar = __webpack_require__(810);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _RaisedButton = __webpack_require__(478);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FlatButton = __webpack_require__(465);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _List = __webpack_require__(528);

	var _Subheader = __webpack_require__(510);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Dialog = __webpack_require__(441);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(162);

	var _Paper = __webpack_require__(459);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _TextField = __webpack_require__(675);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Chip = __webpack_require__(661);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Avatar = __webpack_require__(659);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _FontIcon = __webpack_require__(502);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(205);
	var sa = __webpack_require__(249);
	var core = __webpack_require__(240);
	var moment = __webpack_require__(541);
	var _ = __webpack_require__(433);

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
	      var _state = this.state,
	          games = _state.games,
	          limit = _state.limit;

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

	      var _props = this.props,
	          callback = _props.callback,
	          date = _props.date;
	      var _state2 = this.state,
	          dates = _state2.dates,
	          cap = _state2.cap,
	          open = _state2.open,
	          modalMessage = _state2.modalMessage,
	          modalTitle = _state2.modalTitle,
	          message = _state2.message,
	          modalOpen = _state2.modalOpen,
	          reset = _state2.reset;

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
	      var _props2 = this.props,
	          callback = _props2.callback,
	          day = _props2.day,
	          onClearAll = _props2.onClearAll;

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

/***/ 814:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205);
	var core = __webpack_require__(240);
	var moment = __webpack_require__(541);

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