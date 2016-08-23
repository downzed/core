var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
require('./leftmenu.css');
core.Component('menu.left', ['ui.Icon'], (Icon)=> {
  return {
    propTypes: {
      isOpen: PropTypes.bool,
      onSelectTab: PropTypes.func
    },

    getInitialState(){
      return {
        tabs: [],
        selectedTab: 'myzone',
      }
    },

    componentWillMount(){

      let tabs = [
        { title: 'My Zone', ref: 'myzone', icon: 'fa-user' },
        { title: 'Compare Players', ref: 'compare', icon: 'fa-coffee' },
        { title: 'Mock Draft', ref: 'mock', icon: 'fa-cogs' },
        { title: 'News', ref: 'news', icon: 'fa-newspaper-o' },
      ]
      this.setState({ tabs: tabs });
    },

    renderTabs(tab, i){
      tab.isActive = tab.ref === this.state.selectedTab;
      var active = tab.isActive ? { color: theme('colors.default') } : {};
      return (
        <div key={ i } style={ {...menu.tab.main, ...active} } className='tab' onClick={ this.onSelectTab.bind(this, tab) }>
          <i className={ 'fa '+tab.icon }></i>
          <span style={ menu.tab.text }>  { tab.title } </span>
          { tab.isActive ? <span className="arrow"></span> : null }
        </div>
      );
    },

    onSelectTab(tab){
      this.setState({ selectedTab: tab.ref });
      this.props.onSelectTab(tab);
    },
    render(){
      var showHide = this.props.isOpen ? menu.show : menu.hide;
      // console.log('render');
      return (
        <div style={ {...menu.main, left: 0, backgroundColor: theme('colors.dark') } }>
          { this.state.tabs && this.state.tabs.length ? _.map(this.state.tabs, this.renderTabs) : null }
        </div>
      );
    }
  };
});

let menu = {
  tab: {
    main: {
      cursor:'pointer',
      display:'flex',
      alignItems:'center',
      justifyContent: 'flex-start',
      padding: '15px',
      height: 45
    },
    isActive: {
      color: '#fff'
    },
    text: { paddingLeft: 15 },
    icon: {
      fontSize: 18,
      padding: 15,
    }
  },
  main: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 180,
    fontSize: 14,
    height: '100%',
    boxShadow: '5px 0px 20px -10px rgb(13, 15, 15)',
    transition: 'left 0.25s ease-in-out',
    WebkitTransition: 'left 0.25s ease-in-out',
  },
  hide : {
    left: -235
  },
  show : {
    left: 0
  }

}
