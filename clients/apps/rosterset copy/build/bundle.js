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
		"./components/Loader/ui.Loader.module.jsx": 467,
		"./components/steps/rotoNews.module.jsx": 470,
		"./components/steps/steps.module.jsx": 498,
		"./components/steps/steps.one.module.jsx": 863,
		"./components/steps/steps.two.module.jsx": 882
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
	var Pusher = __webpack_require__(466);

	// var Pusher = require('pusher');

	core.Component('Index', ['core.App', 'Steps', 'Steps.One', 'Steps.Two', 'RotoNews'], function (App, Steps, StepOne, StepTwo, RotoNews) {
	  return {
	    getInitialState: function getInitialState() {
	      return {
	        apps: {},
	        open: false,
	        initialView: 0,
	        stepIndex: null,
	        steps: [StepOne, StepTwo, RotoNews],
	        roster: {},
	        name: 'Team Name Roster'
	      };
	    },
	    handleClose: function handleClose() {
	      this.setState({ open: false });
	    },
	    componentDidMount: function componentDidMount() {
	      var pusher = new Pusher({
	        appId: '273991',
	        key: 'ecee059ea7615fb35875',
	        secret: 'e98aa588d71964d7df79',
	        cluster: 'eu',
	        encrypted: true
	      });
	      pusher.trigger('test_channel', 'my_event', {
	        "message": "hello world"
	      });
	    },
	    changeSteps: function changeSteps(step) {
	      var _state = this.state;
	      var open = _state.open;
	      var steps = _state.steps;
	      var stepIndex = _state.stepIndex;
	      var name = _state.name;

	      if (open) this.setState({ open: false });
	      if (step > steps.length - 1) this.setState({ stepIndex: 0 });else if (step < 0) this.setState({ stepIndex: steps.length - 1 });else this.setState({ stepIndex: step });
	      this.setState({ stepIndex: step });
	      if (step === 2) this.setState({ name: 'Rotoworld Headlines' });else if (step === 0) this.setState({ name: "Team Name Roster" });else this.setState({ name: name ? name + " Roster" : "Team Name Roster" });
	    },
	    getLocalStorageDetails: function getLocalStorageDetails(details) {
	      console.log('obj');
	      this.setState({ roster: _extends({}, roster, details) });
	    },
	    render: function render() {
	      var _this = this;

	      var _state2 = this.state;
	      var open = _state2.open;
	      var initialView = _state2.initialView;
	      var stepIndex = _state2.stepIndex;
	      var name = _state2.name;
	      var type = _state2.type;

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
	            { onTouchTap: this.changeSteps.bind(this, 0) },
	            'Home'
	          ),
	          React.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.changeSteps.bind(this, 2) },
	            'News'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'wrapper', style: { padding: '25px', bottom: '0', top: '65px', width: '100%', position: 'absolute' } },
	          React.createElement(Steps, {
	            getLocalStorageDetails: this.getLocalStorageDetails,
	            initialView: initialView,
	            stepIndex: stepIndex,
	            handleNameChange: function handleNameChange(name) {
	              _this.setState({ name: name });
	            },
	            changeSteps: this.changeSteps })
	        )
	      );
	    }
	  };
	});

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(29);
	var PropTypes = React.PropTypes;

	var core = __webpack_require__(211);
	var myCss = __webpack_require__(468);

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

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(469);
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

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(258)();
	// imports


	// module
	exports.push([module.id, ".spinner {\n  width: 70px;\n  text-align: center;\n}\n\n.spinner > div {\n  width: 10px;\n  height: 10px;\n  background-color: #333;\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n\n.spinner .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.spinner .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n.sk-fading-circle {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}\n\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #333;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n      -ms-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n      -ms-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n      -ms-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n      -ms-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n      -ms-transform: rotate(300deg);\n          transform: rotate(300deg);\n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n      -ms-transform: rotate(330deg);\n          transform: rotate(330deg);\n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n          animation-delay: -1s;\n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n          animation-delay: -0.7s;\n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s;\n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n          animation-delay: -0.5s;\n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n          animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n          animation-delay: -0.1s;\n}\n\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n.circle {\n  width: 40px;\n  height: 40px;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n  animation: sk-scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes sk-scaleout {\n  0% { -webkit-transform: scale(0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 100% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n    opacity: 0;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _RaisedButton = __webpack_require__(471);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(473);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(475);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _List = __webpack_require__(478);

	var _RefreshIndicator = __webpack_require__(480);

	var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

	var _CircularProgress = __webpack_require__(482);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	var _SelectField = __webpack_require__(484);

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
	// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=;

	var urls = [{
	  title: 'The Score',
	  url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.thescore.com/nba.rss&format=rss&num=30'
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

	core.Component('RotoNews', ['ui.Loader'], function (Loader) {
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
	          if (res && (res.text || res.status === 200)) {
	            var temp = JSON.parse(res.text);
	            newsJson = temp.responseData.feed;

	            _this.setEntries(newsJson['entries']);
	          }
	        });
	      });
	    },
	    setEntries: function setEntries(newEntries) {
	      var _state = this.state;
	      var selected = _state.selected;
	      var img = _state.img;
	      var entries = _state.entries;

	      var id, news, title, avatar, url, type;

	      // if (newEntries === entries) {
	      //   return;
	      // }
	      this.setState({ news: [] });
	      news = _.map(newEntries, function (entry) {

	        if (entry.link.indexOf('rotoworld') > -1) {
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
	      var _state3 = this.state;
	      var type = _state3.type;
	      var news = _state3.news;
	      var isLoading = _state3.isLoading;
	      var urls = _state3.urls;
	      var selected = _state3.selected;

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
	            WebkitTransition: 'all 0.5s ease-in',
	            transform: isLoading ? 'scale(0.4)' : 'scale(1)',
	            WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)' } })
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

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reactBootstrap = __webpack_require__(499);

	var _Card = __webpack_require__(750);

	var React = __webpack_require__(29);
	var core = __webpack_require__(211);

	var moment = __webpack_require__(760);


	core.Component('Steps', ['ui.Loader', 'Steps.One', 'Steps.Two', 'RotoNews'], function (Loader, StepOne, StepTwo, RotoNews) {
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
	      this.props.handleNameChange(name);
	      this.setState({ roster: { teamName: name } });
	    },
	    changeCap: function changeCap(e) {
	      console.log(e);
	      this.setState({ roster: { cap: e.target.value } });
	    },
	    renderView: function renderView(view) {
	      var _this = this;

	      var roster = this.state.roster;
	      var changeSteps = this.props.changeSteps;

	      console.log(roster);
	      switch (view) {
	        case 0:
	          return React.createElement(StepOne, { callback: function callback(data) {
	              _this.setState({ roster: data });changeSteps(1);
	            },
	            handleName: this.handleNameChange,
	            capChange: roster.cap
	          });

	        case 1:
	          return React.createElement(StepTwo, { date: roster.date || null, open: roster.open, cap: roster.cap,
	            changeCap: this.changeCap,
	            callback: function callback(data) {
	              _this.setState({ roster: _extends({}, roster, data) });
	            } });
	        case 2:
	          return React.createElement(RotoNews, null);
	      }
	    },
	    render: function render() {
	      var roster = this.state.roster;
	      var _props = this.props;
	      var initialView = _props.initialView;
	      var stepIndex = _props.stepIndex;


	      return React.createElement(
	        'div',
	        { className: 'steps', style: { height: '100%' } },
	        this.renderView(stepIndex || initialView)
	      );
	    }
	  };
	});

/***/ },

/***/ 761:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 762,
		"./af.js": 762,
		"./ar": 763,
		"./ar-ma": 764,
		"./ar-ma.js": 764,
		"./ar-sa": 765,
		"./ar-sa.js": 765,
		"./ar-tn": 766,
		"./ar-tn.js": 766,
		"./ar.js": 763,
		"./az": 767,
		"./az.js": 767,
		"./be": 768,
		"./be.js": 768,
		"./bg": 769,
		"./bg.js": 769,
		"./bn": 770,
		"./bn.js": 770,
		"./bo": 771,
		"./bo.js": 771,
		"./br": 772,
		"./br.js": 772,
		"./bs": 773,
		"./bs.js": 773,
		"./ca": 774,
		"./ca.js": 774,
		"./cs": 775,
		"./cs.js": 775,
		"./cv": 776,
		"./cv.js": 776,
		"./cy": 777,
		"./cy.js": 777,
		"./da": 778,
		"./da.js": 778,
		"./de": 779,
		"./de-at": 780,
		"./de-at.js": 780,
		"./de.js": 779,
		"./dv": 781,
		"./dv.js": 781,
		"./el": 782,
		"./el.js": 782,
		"./en-au": 783,
		"./en-au.js": 783,
		"./en-ca": 784,
		"./en-ca.js": 784,
		"./en-gb": 785,
		"./en-gb.js": 785,
		"./en-ie": 786,
		"./en-ie.js": 786,
		"./en-nz": 787,
		"./en-nz.js": 787,
		"./eo": 788,
		"./eo.js": 788,
		"./es": 789,
		"./es-do": 790,
		"./es-do.js": 790,
		"./es.js": 789,
		"./et": 791,
		"./et.js": 791,
		"./eu": 792,
		"./eu.js": 792,
		"./fa": 793,
		"./fa.js": 793,
		"./fi": 794,
		"./fi.js": 794,
		"./fo": 795,
		"./fo.js": 795,
		"./fr": 796,
		"./fr-ca": 797,
		"./fr-ca.js": 797,
		"./fr-ch": 798,
		"./fr-ch.js": 798,
		"./fr.js": 796,
		"./fy": 799,
		"./fy.js": 799,
		"./gd": 800,
		"./gd.js": 800,
		"./gl": 801,
		"./gl.js": 801,
		"./he": 802,
		"./he.js": 802,
		"./hi": 803,
		"./hi.js": 803,
		"./hr": 804,
		"./hr.js": 804,
		"./hu": 805,
		"./hu.js": 805,
		"./hy-am": 806,
		"./hy-am.js": 806,
		"./id": 807,
		"./id.js": 807,
		"./is": 808,
		"./is.js": 808,
		"./it": 809,
		"./it.js": 809,
		"./ja": 810,
		"./ja.js": 810,
		"./jv": 811,
		"./jv.js": 811,
		"./ka": 812,
		"./ka.js": 812,
		"./kk": 813,
		"./kk.js": 813,
		"./km": 814,
		"./km.js": 814,
		"./ko": 815,
		"./ko.js": 815,
		"./ky": 816,
		"./ky.js": 816,
		"./lb": 817,
		"./lb.js": 817,
		"./lo": 818,
		"./lo.js": 818,
		"./lt": 819,
		"./lt.js": 819,
		"./lv": 820,
		"./lv.js": 820,
		"./me": 821,
		"./me.js": 821,
		"./mk": 822,
		"./mk.js": 822,
		"./ml": 823,
		"./ml.js": 823,
		"./mr": 824,
		"./mr.js": 824,
		"./ms": 825,
		"./ms-my": 826,
		"./ms-my.js": 826,
		"./ms.js": 825,
		"./my": 827,
		"./my.js": 827,
		"./nb": 828,
		"./nb.js": 828,
		"./ne": 829,
		"./ne.js": 829,
		"./nl": 830,
		"./nl.js": 830,
		"./nn": 831,
		"./nn.js": 831,
		"./pa-in": 832,
		"./pa-in.js": 832,
		"./pl": 833,
		"./pl.js": 833,
		"./pt": 834,
		"./pt-br": 835,
		"./pt-br.js": 835,
		"./pt.js": 834,
		"./ro": 836,
		"./ro.js": 836,
		"./ru": 837,
		"./ru.js": 837,
		"./se": 838,
		"./se.js": 838,
		"./si": 839,
		"./si.js": 839,
		"./sk": 840,
		"./sk.js": 840,
		"./sl": 841,
		"./sl.js": 841,
		"./sq": 842,
		"./sq.js": 842,
		"./sr": 843,
		"./sr-cyrl": 844,
		"./sr-cyrl.js": 844,
		"./sr.js": 843,
		"./ss": 845,
		"./ss.js": 845,
		"./sv": 846,
		"./sv.js": 846,
		"./sw": 847,
		"./sw.js": 847,
		"./ta": 848,
		"./ta.js": 848,
		"./te": 849,
		"./te.js": 849,
		"./th": 850,
		"./th.js": 850,
		"./tl-ph": 851,
		"./tl-ph.js": 851,
		"./tlh": 852,
		"./tlh.js": 852,
		"./tr": 853,
		"./tr.js": 853,
		"./tzl": 854,
		"./tzl.js": 854,
		"./tzm": 855,
		"./tzm-latn": 856,
		"./tzm-latn.js": 856,
		"./tzm.js": 855,
		"./uk": 857,
		"./uk.js": 857,
		"./uz": 858,
		"./uz.js": 858,
		"./vi": 859,
		"./vi.js": 859,
		"./x-pseudo": 860,
		"./x-pseudo.js": 860,
		"./zh-cn": 861,
		"./zh-cn.js": 861,
		"./zh-tw": 862,
		"./zh-tw.js": 862
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
	webpackContext.id = 761;


/***/ },

/***/ 863:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TextField = __webpack_require__(486);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _RaisedButton = __webpack_require__(471);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _Avatar = __webpack_require__(473);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _Chip = __webpack_require__(475);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _DatePicker = __webpack_require__(864);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);

	core.Component('Steps.One', ['ui.Loader'], function (Loader) {
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

/***/ 882:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Snackbar = __webpack_require__(883);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _RaisedButton = __webpack_require__(471);

	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

	var _FlatButton = __webpack_require__(462);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _List = __webpack_require__(478);

	var _Subheader = __webpack_require__(454);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Dialog = __webpack_require__(880);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _colors = __webpack_require__(170);

	var _Paper = __webpack_require__(403);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _TextField = __webpack_require__(486);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Chip = __webpack_require__(475);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _Avatar = __webpack_require__(473);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _FontIcon = __webpack_require__(447);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(29);
	var sa = __webpack_require__(220);
	var core = __webpack_require__(211);
	var moment = __webpack_require__(760);
	var _ = __webpack_require__(465);

	core.Component('Steps.Two', ['Slot'], function (Slot) {
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

/***/ }

});