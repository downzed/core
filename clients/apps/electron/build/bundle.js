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

	var _MuiThemeProvider = __webpack_require__(27);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _darkBaseTheme = __webpack_require__(210);

	var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);

	var _lightBaseTheme = __webpack_require__(167);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _getMuiTheme = __webpack_require__(152);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var core = __webpack_require__(211);
	var ReactDom = __webpack_require__(266);


	(0, _reactTapEventPlugin2.default)();

	core.loadContext('index', __webpack_require__(408));
	// core.loadContext('modules', require.context('modules', true, /.*\.module\.js/));
	core.loadContext('source', __webpack_require__(408));
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

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Index.module.jsx": 409,
		"./actions/actions.module.jsx": 675,
		"./actions/comparePlayers.module.jsx": 677,
		"./actions/getAllPlayers.module.jsx": 678,
		"./components/Loader/ui.Loader.module.jsx": 679,
		"./components/modules/player_dialog.module.jsx": 682,
		"./components/modules/roto_player.module.jsx": 816,
		"./components/modules/roto_player_dialog.module.jsx": 845,
		"./components/views/@@view.myZone.module.jsx": 852,
		"./components/views/Compare/Compare.module.jsx": 863,
		"./components/views/Compare/player.listItem.module.jsx": 876,
		"./components/views/Compare/stats.google.chart.module.jsx": 877,
		"./components/views/Compare/stats_dialog.module.jsx": 928,
		"./components/views/view.myZone.module.jsx": 1035,
		"./components/views/view.rotoNews.module.jsx": 1036,
		"./components/views/view.sign_in.module.jsx": 1037,
		"./components/views/view.steps.one.module.jsx": 1038,
		"./components/views/view.steps.two.module.jsx": 1055,
		"./components/views/views.module.jsx": 1060
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
	webpackContext.id = 408;


/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Drawer = __webpack_require__(410);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _Menu = __webpack_require__(431);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _AppBar = __webpack_require__(480);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _IconMenu = __webpack_require__(486);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Popover = __webpack_require__(488);

	var _Popover2 = _interopRequireDefault(_Popover);

	var _nodeVibrant = __webpack_require__(490);

	var Vibrant = _interopRequireWildcard(_nodeVibrant);

	var _reactGoogleLogin = __webpack_require__(671);

	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

	var _reactFacebookLogin = __webpack_require__(672);

	var _reactFacebookLogin2 = _interopRequireDefault(_reactFacebookLogin);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);
	// var _ = window._;//
	// console.dir(_);


	var teams = __webpack_require__(674);
	var allPlayers = core.tree.select('allPlayers');

	core.Component('Index', ['core.App', 'Views', 'PlayerDialog', 'Stats.Diaglog'], function (App, Views, PlayerDialog, StatsDiaglog) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        apps: {},
	        open: true,
	        popopen: false,
	        view: 'myZone',
	        roster: {},
	        name: 'Fantasy Edge',
	        dialogOpen: false,
	        comparedData: [],
	        timeframe: '14',
	        menuItems: [{ label: 'Home', icon: 'home', ref: 'myZone', active: false }, { label: 'News', icon: 'description', ref: 'RotoNews', active: false }, { label: 'Compare', icon: 'compare_arrows', ref: 'Compare', active: false }, { label: 'SignIn', icon: 'settings', ref: 'SignIn', active: false }]

	      };
	    },
	    componentDidMount: function componentDidMount() {
	      this.changeViews(this.state.view);
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

	        var _allPlayers$get = _this.allPlayers.get();

	        var players = _allPlayers$get.players;
	        var total = _allPlayers$get.total;
	        // console.debug('players => ', players);
	        // console.debug('total => ', total);

	        var res = _this.getTeams(players);
	        res = _.sortBy(res, 'LastName');
	        core.tree.set('allPlayers', { players: res, total: total });
	        // { players: res instanceof Array ? res : [], total: total });
	        // var res = this.getTeams(players, this.getColor);
	        var chunks = _.chunk(res, 13);
	        var myplayers = chunks[6];
	        core.emit('players.loaded', { players: res, total: total });
	        core.tree.set('players', chunks[5]);
	        core.tree.set('myPlayers', chunks[5]);
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
	    handleTouchTap: function handleTouchTap(e) {
	      e.preventDefault();
	      this.setState({
	        popopen: true,
	        anchorEl: e.currentTarget
	      });
	    },
	    rightIcon: function rightIcon() {
	      var _this3 = this;

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          _IconButton2.default,
	          {
	            onTouchTap: this.handleTouchTap,
	            style: { marginTop: -8 },
	            iconStyle: { color: '#fafafa' },
	            iconClassName: 'material-icons' },
	          'input'
	        ),
	        React.createElement(
	          _Popover2.default,
	          {
	            open: this.state.popopen,
	            anchorEl: this.state.anchorEl,
	            anchorOrigin: { 'horizontal': 'left', 'vertical': 'bottom' },
	            targetOrigin: { 'horizontal': 'right', 'vertical': 'bottom' },
	            onRequestClose: function onRequestClose(e) {
	              _this3.setState({ popopen: false });
	            } },
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'div',
	              { onTouchTap: function onTouchTap(e) {
	                  _this3.google_btn.signIn();
	                } },
	              React.createElement(
	                'span',
	                null,
	                ' google'
	              ),
	              React.createElement('span', { className: 'fa fa-google' })
	            ),
	            React.createElement(_MenuItem2.default, { primaryText: 'Facebook', onTouchTap: function onTouchTap(e) {
	                _this3.fb_btn.click();
	              }, leftIcon: React.createElement(_IconButton2.default, { style: { fontSize: 16 }, iconClassName: 'fa fa-facebook' }) })
	          )
	        )
	      );
	    },
	    renderLoginButtons: function renderLoginButtons() {
	      var _this4 = this;

	      var responseGoogle = function responseGoogle(response) {
	        console.debug('response => ', response);
	        var profile = response.getBasicProfile();
	        console.debug('google response', profile);
	        console.log('ID: ' + profile.getId());
	        console.log('Full Name: ' + profile.getName());
	        console.log('Given Name: ' + profile.getGivenName());
	        console.log('Family Name: ' + profile.getFamilyName());
	        console.log('Image URL: ' + profile.getImageUrl());
	        console.log('Email: ' + profile.getEmail());
	      };

	      var responseFacebook = function responseFacebook(response) {
	        console.debug('fb response', response);
	      };

	      return React.createElement(
	        'div',
	        { style: { display: 'none' } },
	        React.createElement(_reactGoogleLogin2.default, { ref: function ref(e) {
	            return _this4.google_btn = e;
	          },
	          clientId: '79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com',
	          scope: 'email profile',
	          uxMode: 'popup',
	          buttonText: 'Log444in',
	          onSuccess: responseGoogle,
	          onFailure: this.onError
	        }),
	        React.createElement(_reactFacebookLogin2.default, {
	          ref: function ref(e) {
	            return _this4.fb_btn = e;
	          },
	          appId: '302562886764541',
	          autoLoad: false,
	          xfbml: true,
	          version: '2.7',
	          fields: 'name,email,picture',
	          callback: responseFacebook,
	          icon: 'fa-facebook'
	        })
	      );
	    },
	    render: function render() {
	      var _this5 = this;

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
	        React.createElement(_AppBar2.default, { title: name,
	          style: { background: '#323e51', fontSize: 18, paddingLeft: '140px', paddingRight: 15, alignItems: 'center', justifyContent: 'space-between' }, showMenuIconButton: false,
	          iconElementRight: this.rightIcon(),
	          onLeftIconButtonTouchTap: function onLeftIconButtonTouchTap(e) {
	            _this5.setState({ open: true });
	          } }),
	        React.createElement(
	          _Drawer2.default,
	          {
	            containerStyle: { backgroundColor: '#323e51', top: 64, boxShadow: 'rgba(0, 0, 0, 0.227) 1px 5px 10px' },
	            docked: true,
	            width: 140,
	            open: true,
	            onRequestChange: function onRequestChange(e) {
	              _this5.setState({ open: true });
	            } },
	          this.renderMenu()
	        ),
	        this.renderLoginButtons(),
	        React.createElement(
	          'div',
	          { className: 'wrapper', style: _extends({}, isOpen(open), { position: 'absolute' }) },
	          React.createElement(Views, {
	            getLocalStorageDetails: this.getLocalStorageDetails,
	            view: view,
	            handleNameChange: function handleNameChange(name) {
	              _this5.setState({ name: name });
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

/***/ 675:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(114);
	var core = __webpack_require__(211);
	var sa = __webpack_require__(220);
	var _ = __webpack_require__(673);
	var teams = __webpack_require__(676);
	var base = 'http://46.121.135.238:3310/api/v1.0/';
	var nbaAvatar = 'http://stats.nba.com/media/players/230x185/';
	var nbaTL = 'http://stats.nba.com/media/img/teams/logos/';
	var yoBase = 'Fantasyedge.ddns.net:8080/FantasyEdge/';
	// Fantasyedge.ddns.net:8080/FantasyEdge/GetAllPlayersAvg?Period=364
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

/***/ 676:
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

/***/ 677:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(114);
	var core = __webpack_require__(211);
	var sa = __webpack_require__(220);
	var _ = __webpack_require__(673);
	var teams = __webpack_require__(676);
	var base = 'Fantasyedge.ddns.net:8080/FantasyEdge';

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

/***/ 678:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(114);
	var core = __webpack_require__(211);
	var sa = __webpack_require__(220);
	var _ = __webpack_require__(673);
	var teams = __webpack_require__(676);
	var base = 'http://Fantasyedge.ddns.net:8080/FantasyEdge';
	// Fantasyedge.ddns.net
	core.Action('getAllPlayers', { period: 'string' }, function (data, promise) {
	  var allPlayers = core.tree.select('allPlayers');
	  var total = 0;
	  console.log(1111);
	  sa.post(base + '/GetAllPlayersAvg?Period=' + data.period)
	  // .send(data)
	  .end(function (err, res) {
	    if (res && res.ok) {
	      var body = res.body;
	      var headers = res.headers;

	      console.debug('headers => ', headers);
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

/***/ 679:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(114);
	var PropTypes = React.PropTypes;

	var core = __webpack_require__(211);
	var myCss = __webpack_require__(680);

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

/***/ 680:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(681);
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

/***/ 681:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(258)();
	// imports


	// module
	exports.push([module.id, ".spinner {\n  width: 70px;\n  text-align: center;\n}\n\n.spinner > div {\n  width: 10px;\n  height: 10px;\n  background-color: #333;\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n\n.spinner .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.spinner .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n.sk-fading-circle {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}\n\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #333;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n      -ms-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n      -ms-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n      -ms-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n      -ms-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n      -ms-transform: rotate(300deg);\n          transform: rotate(300deg);\n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n      -ms-transform: rotate(330deg);\n          transform: rotate(330deg);\n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n          animation-delay: -1s;\n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n          animation-delay: -0.7s;\n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s;\n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n          animation-delay: -0.5s;\n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n          animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n          animation-delay: -0.1s;\n}\n\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n.circle {\n  width: 40px;\n  height: 40px;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n  animation: sk-scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes sk-scaleout {\n  0% { -webkit-transform: scale(0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 100% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n    opacity: 0;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 682:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Dialog = __webpack_require__(683);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Table = __webpack_require__(687);

	var _List = __webpack_require__(700);

	var _GridList = __webpack_require__(702);

	var _CircularProgress = __webpack_require__(706);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Tabs = __webpack_require__(708);

	var _colors = __webpack_require__(168);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);
	var moment = __webpack_require__(713);

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

/***/ 714:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 715,
		"./af.js": 715,
		"./ar": 716,
		"./ar-ma": 717,
		"./ar-ma.js": 717,
		"./ar-sa": 718,
		"./ar-sa.js": 718,
		"./ar-tn": 719,
		"./ar-tn.js": 719,
		"./ar.js": 716,
		"./az": 720,
		"./az.js": 720,
		"./be": 721,
		"./be.js": 721,
		"./bg": 722,
		"./bg.js": 722,
		"./bn": 723,
		"./bn.js": 723,
		"./bo": 724,
		"./bo.js": 724,
		"./br": 725,
		"./br.js": 725,
		"./bs": 726,
		"./bs.js": 726,
		"./ca": 727,
		"./ca.js": 727,
		"./cs": 728,
		"./cs.js": 728,
		"./cv": 729,
		"./cv.js": 729,
		"./cy": 730,
		"./cy.js": 730,
		"./da": 731,
		"./da.js": 731,
		"./de": 732,
		"./de-at": 733,
		"./de-at.js": 733,
		"./de.js": 732,
		"./dv": 734,
		"./dv.js": 734,
		"./el": 735,
		"./el.js": 735,
		"./en-au": 736,
		"./en-au.js": 736,
		"./en-ca": 737,
		"./en-ca.js": 737,
		"./en-gb": 738,
		"./en-gb.js": 738,
		"./en-ie": 739,
		"./en-ie.js": 739,
		"./en-nz": 740,
		"./en-nz.js": 740,
		"./eo": 741,
		"./eo.js": 741,
		"./es": 742,
		"./es-do": 743,
		"./es-do.js": 743,
		"./es.js": 742,
		"./et": 744,
		"./et.js": 744,
		"./eu": 745,
		"./eu.js": 745,
		"./fa": 746,
		"./fa.js": 746,
		"./fi": 747,
		"./fi.js": 747,
		"./fo": 748,
		"./fo.js": 748,
		"./fr": 749,
		"./fr-ca": 750,
		"./fr-ca.js": 750,
		"./fr-ch": 751,
		"./fr-ch.js": 751,
		"./fr.js": 749,
		"./fy": 752,
		"./fy.js": 752,
		"./gd": 753,
		"./gd.js": 753,
		"./gl": 754,
		"./gl.js": 754,
		"./he": 755,
		"./he.js": 755,
		"./hi": 756,
		"./hi.js": 756,
		"./hr": 757,
		"./hr.js": 757,
		"./hu": 758,
		"./hu.js": 758,
		"./hy-am": 759,
		"./hy-am.js": 759,
		"./id": 760,
		"./id.js": 760,
		"./is": 761,
		"./is.js": 761,
		"./it": 762,
		"./it.js": 762,
		"./ja": 763,
		"./ja.js": 763,
		"./jv": 764,
		"./jv.js": 764,
		"./ka": 765,
		"./ka.js": 765,
		"./kk": 766,
		"./kk.js": 766,
		"./km": 767,
		"./km.js": 767,
		"./ko": 768,
		"./ko.js": 768,
		"./ky": 769,
		"./ky.js": 769,
		"./lb": 770,
		"./lb.js": 770,
		"./lo": 771,
		"./lo.js": 771,
		"./lt": 772,
		"./lt.js": 772,
		"./lv": 773,
		"./lv.js": 773,
		"./me": 774,
		"./me.js": 774,
		"./mk": 775,
		"./mk.js": 775,
		"./ml": 776,
		"./ml.js": 776,
		"./mr": 777,
		"./mr.js": 777,
		"./ms": 778,
		"./ms-my": 779,
		"./ms-my.js": 779,
		"./ms.js": 778,
		"./my": 780,
		"./my.js": 780,
		"./nb": 781,
		"./nb.js": 781,
		"./ne": 782,
		"./ne.js": 782,
		"./nl": 783,
		"./nl.js": 783,
		"./nn": 784,
		"./nn.js": 784,
		"./pa-in": 785,
		"./pa-in.js": 785,
		"./pl": 786,
		"./pl.js": 786,
		"./pt": 787,
		"./pt-br": 788,
		"./pt-br.js": 788,
		"./pt.js": 787,
		"./ro": 789,
		"./ro.js": 789,
		"./ru": 790,
		"./ru.js": 790,
		"./se": 791,
		"./se.js": 791,
		"./si": 792,
		"./si.js": 792,
		"./sk": 793,
		"./sk.js": 793,
		"./sl": 794,
		"./sl.js": 794,
		"./sq": 795,
		"./sq.js": 795,
		"./sr": 796,
		"./sr-cyrl": 797,
		"./sr-cyrl.js": 797,
		"./sr.js": 796,
		"./ss": 798,
		"./ss.js": 798,
		"./sv": 799,
		"./sv.js": 799,
		"./sw": 800,
		"./sw.js": 800,
		"./ta": 801,
		"./ta.js": 801,
		"./te": 802,
		"./te.js": 802,
		"./th": 803,
		"./th.js": 803,
		"./tl-ph": 804,
		"./tl-ph.js": 804,
		"./tlh": 805,
		"./tlh.js": 805,
		"./tr": 806,
		"./tr.js": 806,
		"./tzl": 807,
		"./tzl.js": 807,
		"./tzm": 808,
		"./tzm-latn": 809,
		"./tzm-latn.js": 809,
		"./tzm.js": 808,
		"./uk": 810,
		"./uk.js": 810,
		"./uz": 811,
		"./uz.js": 811,
		"./vi": 812,
		"./vi.js": 812,
		"./x-pseudo": 813,
		"./x-pseudo.js": 813,
		"./zh-cn": 814,
		"./zh-cn.js": 814,
		"./zh-tw": 815,
		"./zh-tw.js": 815
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
	webpackContext.id = 714;


/***/ },

/***/ 816:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(819);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(700);

	var _RefreshIndicator = __webpack_require__(822);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(706);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(831);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(833);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(683);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(168);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(844);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(486);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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

/***/ 845:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Drawer = __webpack_require__(410);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _AppBar = __webpack_require__(480);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _List = __webpack_require__(700);

	var _close = __webpack_require__(846);

	var _close2 = _interopRequireDefault(_close);

	var _Toolbar = __webpack_require__(847);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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

/***/ 852:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Card = __webpack_require__(853);

	var _GridList = __webpack_require__(702);

	var _CircularProgress = __webpack_require__(706);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var PropTypes = React.PropTypes;
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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

/***/ 863:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(700);

	var _LinearProgress = __webpack_require__(864);

	var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

	var _TextField = __webpack_require__(833);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _IconMenu = __webpack_require__(486);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _Badge = __webpack_require__(866);

	var _Badge2 = _interopRequireDefault(_Badge);

	var _Toolbar = __webpack_require__(847);

	var _CircularProgress = __webpack_require__(706);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _reactLazyload = __webpack_require__(868);

	var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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

	core.Component('view.Compare', ['player.ListItem'], function (PlayerItem) {
	  return {
	    bindings: {
	      players: ['allPlayers']
	    },

	    getInitialState: function getInitialState() {
	      return {
	        selected: 'players', // Rotoworld
	        selectedOpt: { label: 'Last Name', type: 'LastName' },
	        list: [],
	        originalList: [],
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

	      // this.initForm();
	      core.on('players.loaded', function (_ref) {
	        var players = _ref.players;
	        var total = _ref.total;

	        setTimeout(function () {
	          if (players && players instanceof Array) {
	            var list = _.orderBy(players, 'LastName');
	            _this.setState({ total: total, players: list, originalList: list, isLoading: false });
	          }
	        }, 250);
	      });
	    },
	    initForm: function initForm() {
	      this.setState({
	        form: {
	          'Target Players': [],
	          'My Players': []
	        }
	      });
	    },
	    componentDidMount: function componentDidMount() {
	      if (!this.state.players || !this.state.players.length) {
	        var data = core.tree.get('allPlayers');
	        if (data && typeof data !== 'undefined') {
	          var players = data.players;
	          var total = data.total;

	          if (players && players instanceof Array) {
	            var list = _.orderBy(players, 'LastName');
	            this.setState({ total: total, players: list, originalList: list, isLoading: false });
	          } else return;
	        }
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
	    renderComparePlayers: function renderComparePlayers(ids, title) {
	      var players = this.state.players;

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
	        { style: { fontSize: 12, width: '100%', padding: '0px !important', overflow: 'auto', height: '100%' } },
	        _.map(mlist, this.renderComparedList)
	      );
	    },
	    renderComparedList: function renderComparedList(item, key) {
	      return React.createElement(PlayerItem, { key: key, item: item, onRemove: this.removePlayer, selectedOpt: this.state.selectedOpt });
	    },
	    renderList: function renderList(item, key) {
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
	          unmountIfInvisible: true,
	          placeholder: placeholder(),
	          offset: [-15, 0], debounce: 350 },
	        React.createElement(PlayerItem, { item: item, onAdd: this.addTo, selectedOpt: this.state.selectedOpt })
	      );
	    },
	    addTo: function addTo(where, id) {
	      var _state = this.state;
	      var form = _state.form;
	      var list = _state.list;
	      var selectedOpt = _state.selectedOpt;
	      var players = _state.players;

	      var temp = copy(form);
	      // console.log(id, where)
	      temp[where].push(id);
	      this.setState({ form: temp, isLoading: true });
	      var _that = this;
	      // setTimeout(function() {
	      this.sortBy(selectedOpt);
	      // }, 350);
	    },
	    removePlayer: function removePlayer(id) {
	      var _state2 = this.state;
	      var form = _state2.form;
	      var players = _state2.players;
	      var originalList = _state2.originalList;

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
	      this.filterList(originalList, true);
	    },
	    filterList: function filterList(list, updateState) {
	      var form = this.state.form;

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
	      }
	      if (!updateState) return mlist;
	      this.setState({ players: mlist, isLoading: false, searchLoading: false });
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
	      var _state3 = this.state;
	      var list = _state3.list;
	      var players = _state3.players;
	      var originalList = _state3.originalList;
	      var query = _state3.query;
	      var searchLoading = _state3.searchLoading;

	      this.setState({ searchLoading: true });
	      var temp;
	      if (!query) {
	        temp = this.filterList(originalList, false);
	      } else {
	        temp = _.filter(players, function (o) {
	          return o.Name.toLowerCase().indexOf(query.toLowerCase()) > -1 || o.LastName.toLowerCase().indexOf(query.toLowerCase()) > -1;
	        });
	      }
	      temp = _.sortBy(temp, 'LastName');

	      // setTimeout(()=>{
	      this.setState({ players: temp, searchLoading: false });
	      // }, 1500)
	    },
	    onReset: function onReset() {
	      var _this2 = this;

	      this.initForm();
	      this.setState({ query: '', isLoading: true });
	      setTimeout(function () {
	        _this2.filterList(_this2.state.originalList, true);
	        _this2.setState({ selectedOpt: { type: 'LastName', label: 'Last Name' }, isLoading: false });
	      }, 350);
	    },
	    onKeyDown: function onKeyDown(e, string) {
	      this.setState({ query: string });
	    },
	    renderToolbar: function renderToolbar() {
	      var _state4 = this.state;
	      var toggleSearch = _state4.toggleSearch;
	      var query = _state4.query;

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
	      var form = this.state.form;

	      switch (type) {
	        case 'form':
	          return _.isEmpty(form) || _.isEmpty(form['Target Players']) || _.isEmpty(form['My Players']);
	        case 'list':
	          if (!_.isEmpty(form['Target Players']) || !_.isEmpty(form['My Players'])) return false;else return true;
	      }
	    },
	    getTotal: function getTotal() {
	      var _state5 = this.state;
	      var total = _state5.total;
	      var form = _state5.form;

	      var realTotal;
	      var num = Number(total) - Number(form['My Players'].length) - Number(form['Target Players'].length);
	      return num;
	    },
	    renderOptions: function renderOptions() {
	      var _this4 = this;

	      var players = this.state.players;

	      var options = [];
	      if (!players || !players.length) return null;
	      options = _.map(stats, function (val, stat) {
	        return {
	          type: stat,
	          label: val
	        };
	      });
	      options.push({ type: 'Name', label: 'First Name' }, { type: 'LastName', label: 'Last Name' });
	      options = _.sortBy(options, 'label');
	      return _.map(options, function (opt, i) {
	        return React.createElement(_MenuItem2.default, { value: opt.type, key: i, primaryText: opt.label, onTouchTap: function onTouchTap(e) {
	            _this4.sortBy(opt);
	          } });
	      });
	    },
	    renderPlayersHeader: function renderPlayersHeader() {
	      var _this5 = this,
	          _React$createElement;

	      var selectedOpt = this.state.selectedOpt;

	      var sort = {
	        marginRight: 15
	      };
	      var style = function style(i) {
	        return {
	          cursor: 'pointer',
	          width: '40px',
	          textAlign: 'center',
	          marginRight: i === ms.length - 1 || i === 'sel' ? 30 : 10
	        };
	      };
	      var mainStats = function mainStats() {

	        return _.map(ms, function (opt, i) {
	          return React.createElement(
	            'span',
	            { key: i, onClick: function onClick() {
	                _this5.sortBy(opt);
	              }, style: style(i) },
	            opt.type
	          );
	        });
	      };

	      return React.createElement(
	        _Subheader2.default,
	        { style: styles.subheader },
	        'Players by ',
	        selectedOpt.label,
	        React.createElement(
	          'div',
	          { style: { display: 'flex' } },
	          React.createElement(
	            _IconMenu2.default,
	            (_React$createElement = { iconStyle: { color: '#fff', fontSize: 14 }, menuStyle: { fontSize: 14 }, style: { marginRight: '45px' },
	              iconButtonElement: React.createElement(
	                _IconButton2.default,
	                {
	                  tooltip: 'Sort by',
	                  iconClassName: 'material-icons' },
	                'sort'
	              )
	            }, _defineProperty(_React$createElement, 'menuStyle', { fontSize: 12 }), _defineProperty(_React$createElement, 'anchorOrigin', { horizontal: 'middle', vertical: 'top' }), _defineProperty(_React$createElement, 'targetOrigin', { horizontal: 'middle', vertical: 'top' }), _defineProperty(_React$createElement, 'maxHeight', 202), _React$createElement),
	            this.renderOptions()
	          ),
	          React.createElement(_Badge2.default, { secondary: true, badgeContent: this.getTotal(),
	            style: styles.badgeWrap,
	            badgeStyle: styles.badge(true) })
	        )
	      );
	    },
	    sortBy: function sortBy(obj) {
	      var _state6 = this.state;
	      var players = _state6.players;
	      var searchLoading = _state6.searchLoading;
	      var isLoading = _state6.isLoading;

	      this.setState({ searchLoading: true, isLoading: true });
	      var temp;
	      if (!obj) {
	        temp = this.filterList(players, false);
	      } else {
	        var type = obj.type;
	        var label = obj.label;

	        if (type.toLowerCase() !== 'lastname' && type.toLowerCase() !== 'name') {
	          temp = temp = _.orderBy(players, 'Statistics.' + type, ['desc']);
	        } else {
	          temp = _.orderBy(players, type, ['asc']);
	        }
	      }

	      this.filterList(temp, true);
	      this.setState({ selectedOpt: obj });
	    },
	    render: function render() {
	      var _state7 = this.state;
	      var players = _state7.players;
	      var isLoading = _state7.isLoading;
	      var searchLoading = _state7.searchLoading;
	      var form = _state7.form;


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
	            this.renderPlayersList(players),
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
	var displayStat = function displayStat(selectedOpt) {
	  return {
	    display: selectedOpt.type.toLowerCase() !== 'lastname' || selectedOpt.type.toLowerCase() !== 'name' ? 'flex' : 'none'
	  };
	};
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

/***/ 876:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _List = __webpack_require__(700);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _IconMenu = __webpack_require__(486);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _Popover = __webpack_require__(488);

	var _Popover2 = _interopRequireDefault(_Popover);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _Menu = __webpack_require__(431);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _nodeVibrant = __webpack_require__(490);

	var Vibrant = _interopRequireWildcard(_nodeVibrant);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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

	core.Component('player.ListItem', [], function () {
	  return {

	    // propTypes: {
	    //   item:
	    // },
	    getInitialState: function getInitialState() {
	      return { open: false, backcolor: '#fff' };
	    },
	    componentDidMount: function componentDidMount() {
	      this.getColor(this.props.item.teamLogo);
	      // console.log('this.props -> ',  this.props)
	    },
	    renderPrimary: function renderPrimary(item, i) {
	      var _this = this;

	      var selectedOpt = this.props.selectedOpt;
	      var Name = item.Name;
	      var LastName = item.LastName;
	      var PlayerID = item.PlayerID;
	      var isInComapre = item.isInComapre;
	      var Statistics = item.Statistics;
	      var teamLogo = item.teamLogo;

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

	      var style = {
	        width: '40px',
	        textAlign: 'center',
	        marginRight: 5
	      };
	      var renderStat = function renderStat() {
	        if (isInComapre || !selectedOpt) {
	          return null;
	        } else {

	          return React.createElement(
	            'div',
	            { style: { display: 'flex' } },
	            React.createElement(
	              'span',
	              { style: style },
	              Statistics[selectedOpt.type]
	            )
	          );
	        }
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
	                _this.addTo('Target Players', PlayerID);
	              } },
	            'add_shopping_cart'
	          ),
	          React.createElement(
	            _IconButton2.default,
	            {
	              iconClassName: 'material-icons',
	              iconStyle: { fontSize: 16 },
	              onTouchTap: function onTouchTap(e) {
	                _this.addTo('My Players', PlayerID);
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
	                _this.removePlayer(PlayerID);
	              } },
	            'remove_circle'
	          )
	        )
	      );
	    },
	    addTo: function addTo(where, id) {
	      this.props.onAdd(where, id);
	    },
	    removePlayer: function removePlayer(id) {
	      this.props.onRemove(id);
	    },
	    handlePlayerPop: function handlePlayerPop(e) {
	      e.preventDefault();
	      this.setState({
	        open: true,
	        anchorEl: e.currentTarget
	      });
	    },
	    getColor: function getColor(src) {
	      var _this2 = this;

	      if (!src) {
	        console.log('src -> ', src);return '#000';
	      }
	      var r, g, b, pal;
	      var x;
	      Vibrant.from(src).getPalette(function (err, palette) {
	        // console.log('palette -> ',  palette)
	        if (err) {
	          console.error(err);return _this2.setState({ backcolor: 'red' });
	        }
	        if (palette && palette['Vibrant'] !== null && palette['Vibrant']['_rgb']) {
	          pal = palette['Vibrant']['_rgb'];
	          r = pal[0];
	          g = pal[1];
	          b = pal[2];
	          x = 'rgba(' + r + ',' + g + ',' + b + ', .26)';
	          console.log('x -> ', x);
	          _this2.setState({ backcolor: x });
	        } else _this2.setState({ backcolor: 'green' });
	      });
	    },
	    renderStats: function renderStats(item) {
	      var _state = this.state;
	      var open = _state.open;
	      var backcolor = _state.backcolor;
	      var Name = item.Name;
	      var LastName = item.LastName;
	      var PlayerID = item.PlayerID;
	      var isInComapre = item.isInComapre;
	      var Statistics = item.Statistics;
	      var teamLogo = item.teamLogo;
	      var teamName = item.teamName;

	      if (!open) return;

	      var logo = {
	        height: '100%',
	        position: 'absolute',
	        opacity: '0.25',
	        top: '0',
	        background: 'url(' + teamLogo + ')',
	        backgroundSize: 'cover',
	        backgroundRepeat: 'no-repeat',
	        backgroundPosition: '0, 0',
	        bottom: '0',
	        right: '0',
	        left: '0'
	      };

	      return React.createElement(
	        'div',
	        { style: { position: 'relative', backgroundColor: backcolor, padding: 15, width: 350, height: 240 } },
	        React.createElement('div', { style: logo }),
	        React.createElement(
	          'span',
	          null,
	          teamName
	        )
	      );
	    },
	    render: function render() {
	      var _this3 = this;

	      var item = this.props.item;
	      var _state2 = this.state;
	      var open = _state2.open;
	      var anchorEl = _state2.anchorEl;

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(_List.ListItem, {
	          innerDivStyle: styles.listItem,
	          onTouchTap: this.handlePlayerPop,
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
	        }),
	        React.createElement(
	          _Popover2.default,
	          {
	            open: open,
	            anchorEl: anchorEl,
	            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
	            targetOrigin: { horizontal: 'left', vertical: 'top' },
	            onRequestClose: function onRequestClose() {
	              _this3.setState({ open: false });
	            }
	          },
	          this.renderStats(item)
	        )
	      );
	    }
	  };
	});
	var displayStat = function displayStat(selectedOpt) {
	  return {
	    display: selectedOpt.type.toLowerCase() !== 'lastname' || selectedOpt.type.toLowerCase() !== 'name' ? 'flex' : 'none'
	  };
	};
	var styles = {
	  listItem: {
	    paddingRight: 0, paddingLeft: '15px', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
	  }
	};

/***/ },

/***/ 877:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactChartjs = __webpack_require__(878);

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);

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

/***/ 928:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(819);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(700);

	var _CircularProgress = __webpack_require__(706);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(831);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _TextField = __webpack_require__(833);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Drawer = __webpack_require__(410);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _colors = __webpack_require__(168);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(844);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(486);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _saladUi = __webpack_require__(929);

	var _saladUi2 = _interopRequireDefault(_saladUi);

	var _LinearProgress = __webpack_require__(864);

	var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

	var _Tabs = __webpack_require__(708);

	var _reactSwipeableViews = __webpack_require__(930);

	var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);

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
	        background: '#f5f9fc', overflow: 'hidden'
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
	          { style: { overflow: 'auto', height: '100%', paddingBottom: '115px' } },
	          React.createElement(
	            'div',
	            { style: { display: 'flex', padding: 5 } },
	            this.renderPlayers(MyPlayers),
	            this.renderPlayers(TargetPlayers)
	          ),
	          this.renderStats(data),
	          this.renderOverallStats(data)
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

/***/ 1035:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _IconButton = __webpack_require__(471);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(114);
	var PropTypes = React.PropTypes;
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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
	        hovered: '',
	        cards: [{ label: 'Welcome, user', type: 'user', data: {} }, { label: 'News', type: 'news', data: [] }]
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
	    renderUser: function renderUser(data) {
	      return React.createElement(
	        'span',
	        null,
	        'no data'
	      );
	    },
	    renderNews: function renderNews(data) {
	      return React.createElement(
	        'span',
	        null,
	        'no news'
	      );
	    },
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
	        GridTile,
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
	    renderCardData: function renderCardData(card) {
	      var data = card.data;
	      var type = card.type;

	      switch (type) {
	        case 'user':
	          return this.renderUser(data);
	        case 'news':
	          return this.renderNews(data);

	      }
	    },
	    renderHomeCards: function renderHomeCards(card, i) {
	      var diff = {
	        width: i == 1 ? 'auto' : '275px',
	        marginLeft: i == 1 ? 0 : 15,
	        flex: i == 1 ? 1 : 'none'
	      };
	      return React.createElement(
	        _Paper2.default,
	        { key: i, style: _extends({}, styles.paper, { position: 'relative' }, diff) },
	        React.createElement(
	          _Subheader2.default,
	          { style: styles.subheader },
	          card.label
	        ),
	        this.renderCardData(card)
	      );
	    },
	    render: function render() {
	      var _state = this.state;
	      var myplayers = _state.myplayers;
	      var cards = _state.cards;

	      return React.createElement(
	        'div',
	        { style: styles.wrap },
	        React.createElement(
	          'div',
	          { style: _defineProperty({ height: 450, display: 'flex', padding: '15px 0px', flexDirection: 'row', width: '100%' }, 'height', '100%') },
	          _.map(cards, this.renderHomeCards)
	        )
	      );
	    }
	  };
	});
	var styles = {
	  paper: {
	    display: 'flex', flex: 1, width: '100%', overflow: 'auto', flexDirection: 'column',
	    margin: '0 15px',
	    boxShadow: 'rgba(0, 0, 0, 0.107647) 0px 1px 2px, rgba(0, 0, 0, 0.107647) 0px 1px 1px'
	  },
	  subheader: {
	    backgroundColor: '#323e51',
	    position: 'relative',
	    fontSize: '12px',
	    fontWeight: '700',
	    color: '#E0F2F1',
	    display: 'flex',
	    height: 48,
	    justifyContent: 'space-between'
	  },
	  listItem: {
	    padding: '10px 15px !important', fontSize: 14, height: 45, display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee'
	  },
	  wrap: { height: '100%' }
	};

/***/ },

/***/ 1036:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(819);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(700);

	var _RefreshIndicator = __webpack_require__(822);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(706);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(831);

	var _SelectField2 = _interopRequireDefault(_SelectField);

	var _MenuItem = __webpack_require__(441);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var _ = __webpack_require__(673);


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

/***/ 1037:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactGoogleLogin = __webpack_require__(671);

	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

	var _reactFacebookLogin = __webpack_require__(672);

	var _reactFacebookLogin2 = _interopRequireDefault(_reactFacebookLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var core = __webpack_require__(211);
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
	    componentWillMount: function componentWillMount() {
	      core.on('google.click', function () {
	        console.log('1 -> ', 1);
	      });
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
	      console.debug('response => ', response);
	      var profile = response.getBasicProfile();
	      console.debug('google response', profile);
	      console.log('ID: ' + profile.getId());
	      console.log('Full Name: ' + profile.getName());
	      console.log('Given Name: ' + profile.getGivenName());
	      console.log('Family Name: ' + profile.getFamilyName());
	      console.log('Image URL: ' + profile.getImageUrl());
	      console.log('Email: ' + profile.getEmail());

	      // profile['id_token'] = response.getAuthResponse().id_token;
	    },
	    responseFacebook: function responseFacebook(response) {
	      console.debug('fb response', response);
	    },
	    render: function render() {

	      return React.createElement(
	        'div',
	        { style: signin.wrap },
	        React.createElement(_reactGoogleLogin2.default, { ref: 'google_btn',
	          clientId: '79549914610-lmoailp8g9r956537ammi2jnh93u7vq1.apps.googleusercontent.com',
	          scope: 'email profile',
	          uxMode: 'popup',
	          buttonText: 'Log444in',
	          onSuccess: this.responseGoogle,
	          onFailure: this.onLogin
	        }),
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

/***/ 1038:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TextField = __webpack_require__(833);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(819);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _DatePicker = __webpack_require__(1039);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(114);
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

/***/ 1055:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Snackbar = __webpack_require__(1056);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _RaisedButton = __webpack_require__(685);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FlatButton = __webpack_require__(483);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _List = __webpack_require__(700);

	var _Subheader = __webpack_require__(438);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Dialog = __webpack_require__(683);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(168);

	var _Paper = __webpack_require__(428);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _TextField = __webpack_require__(833);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Chip = __webpack_require__(819);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Avatar = __webpack_require__(817);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _FontIcon = __webpack_require__(473);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(114);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var moment = __webpack_require__(713);
	var _ = __webpack_require__(673);

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

/***/ 1060:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(114);
	var core = __webpack_require__(211);
	var moment = __webpack_require__(713);

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