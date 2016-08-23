var React = require('react');
var PropTypes = React.PropTypes;
var core = require('core');
var theme = core.theme;
var _ = require('lodash');

core.Component('news', ['ui.Header','afa.NewsCard'], (Header, NewsCard)=> {
  return {

    getInitialState: function() {
      return {
        players : [],
        articles : []
      };
    },

    renderCards(item, key){
      /*
      ""
      categories:      Array[0]
      content:      "The Warriors and Elliot Williams have agreed to a one-year deal."
      description:      "The Warriors and Elliot Williams have agreed to a one-year deal."
      guid:      "304233"
      link:      ":/www.rotoworld.com/player/nba/1703/elliot-williams"
      pubDate:      "2016-08-0::0"
      thumbnail:      ""
      title:      "War
      */
      return (
        <NewsCard key={ key }
                  title={ item.title }
                  link={ item.link }
                  content={ item.content }
                  date={ item.pubDate } />
      )
    },

    componentDidMount() {
      core.run('getRSS', { type: 'players' })
          .then((res)=>{
            if (res.status === 'ok') {
              this.setState({ players: res.items });
            }
            console.debug('players:',res)
          });
      core.run('getRSS', { type: 'article' })
          .then((res)=>{
            if (res.status === 'ok') {
              this.setState({ articles: res.items });
            }
            console.debug('articles:',res)
          });

      // core.run('getPlayerStats').then((res)=>{console.debug('res:',res)});
    },
    render(){
      let { articles, players } = this.state
      return (
        <div style={ news.main }>
          <div style={ {...news.wrap, background: theme('colors.error')} }>
            <span style={ news.title }>Articles</span>
            <div style={ {...news.articles} }>
              { _.map(articles, this.renderCards) }
            </div>
          </div>
          <div style={ {...news.wrap, marginLeft: 15} }>
            <span style={ news.title }>Players</span>
            <div style={ news.articles }>
              { _.map(players, this.renderCards) }
            </div>
          </div>

        </div>
      );
    }
  }
});
let news = {
  title: {
    padding: '0 0.5em'
  },
  main :{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  wrap : {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    flex: '1',
    padding: '0.5em',
    flexDirection:'column',
    display: 'flex',
    borderRadius: 4,
    background: 'rgba(255,255,255,0.2)',

  },
  articles: {
    display: 'flex',
    flexFlow: 'row wrap',
    overflow: 'auto',
    justifyContent: 'space-around',
  }
}
