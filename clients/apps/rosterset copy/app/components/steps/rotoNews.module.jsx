
var React = require('react');
var sa = require('superagent')
var core = require('core');
var _ = require('lodash');
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// http://ejohn.org/apps/rss2json/?url=http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=headlines&count=20&format=rss
// const baseUrl = '
// https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=;

const urls = [
  {
    title : 'The Score',
    url : 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.thescore.com/nba.rss&format=rss&num=30'
  },
  {
    title : 'Rotoworld',
    url : `https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=
            http://www.rotoworld.com/rss/feed.aspx?sport=nba&ftype=article&count=30
              &format=rss&num=30`,
    img : `http://www.rotoworld.com/images/headshots/NBA/`
  }
];

const returnAvatar = (id, uri, type) => {
  switch (type) {
    case 'rotoworld':
      return run(`${uri}${id}.jpg`)
    case 'the score':
      return run(uri)
  }

  function run(uri){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      document.getElementById(id).src = window.URL.createObjectURL(xhr.response);
      // return window.URL.createObjectURL(xhr.response);
    }
    xhr.open('GET', uri, true);
    xhr.send();
  }

};

const replaceStr = (str) => {
      var returnText = str;
      //-- remove BR tags and replace them with line break
      returnText=returnText.replace(/<br>/gi, "\n");
      returnText=returnText.replace(/<br\s\/>/gi, "\n");
      returnText=returnText.replace(/<br\/>/gi, "\n");
      returnText=returnText.replace(/<blockquote.*>/gi, "\n");

      // //-- remove P and A tags but preserve what's inside of them
      returnText=returnText.replace(/<p.*>/gi, "\n");
      // console.info('p',returnText)
      // returnText=returnText.replace(/<div.*>(.*?)<\/div>/gi, "$1");
      // console.info('div',returnText)
      returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

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
}

core.Component('RotoNews', ['ui.Loader'], (Loader)=>{
  return {

      getInitialState(){
        return {
          selected: 'The Score', // Rotoworld
          news: [],
          urls: urls,
          listItemOpen: false,
          isLoading: true,
        }
      },

      getRss(url){
        this.setState({ isLoading: true })
        var newsJson;
        return new Promise((resolve, reject) => {
          sa.get(url)
            .end((err, res) => {
              if (res && (res.text || res.status === 200)) {
                var temp = JSON.parse(res.text);
                newsJson = temp.responseData.feed;

                this.setEntries(newsJson['entries'])
              }
          });
        });
      },



      setEntries(newEntries){
        var { selected, img, entries } = this.state;
        var id, news, title, avatar, url, type;

        // if (newEntries === entries) {
        //   return;
        // }
        this.setState({ news: [] });
        news = _.map(newEntries, (entry) => {

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

          return {
            ...entry,
            title: title,
            id: id,
            avatar: avatar,
            contentSnippet: replaceStr(entry.contentSnippet),//entry.contentSnippet.replace(/<(?:.|\n)*?>/gm, '');,
            // content: replaceStr(entry.content),//entry.content.replace(/<(?:.|\n)*?>/gm, '');,
          }
        });

        this.setState({ news: news, isLoading: false, entries: newEntries });
      },

      componentDidMount() {
        this.loadUrl(this.state.selected);
      },

      loadUrl(selected) {
        let { urls } = this.state;
        let { url, img } = _.find(urls, ['title' , selected ]);
        this.setState({ selected, img });

        this.getRss(url);
      },

      handleSelectFeed(event, index, value) {
        this.loadUrl(value);
      },

      renderNews(item, key){
        let { selected, isLoading } = this.state;
        let style = {
          transition: 'all 0.2s ease-in-out 0.1s',
          WebkitTransition: 'all 0.2s ease-in-out 0.1s',
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'scale(0.4)' : 'scale(1)',
          WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)',
        }
        const selectedStyle = selected.toLowerCase() === 'rotoworld' ? { maxWidth: '100%' } : { maxHeight: '100%' }
        return (
          <ListItem key={ key }
                leftAvatar={
                  <Paper style={{ ...styles.avatar.paper, ...style }} zDepth={ 2 }>
                    <img style={ selectedStyle } id={ item.id }

                      />
                  </Paper>
                }
                primaryText={ item.title }
                primaryTogglesNestedList={ true }
                secondaryText={ item.contentSnippet }
                secondaryTextLines={ 1 }
                  nestedItems={[
                    <div key={ key }
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      style={{ padding: '15px', backgroundColor: '#eee', marginLeft: 0, borderTop: '1px solid #ddd' }}>

                    </div>

                  ]}/>
              );
      },

      renderSelectList(item, key){
        return (
          <MenuItem key={ key } value={ item.title }  primaryText={ item.title } />
        );
      },

      render () {
        let { type, news, isLoading, urls, selected } = this.state;
          return (
            <div style={ styles.wrap }>
              <SelectField
                 value={ selected }
                 onChange={ this.handleSelectFeed }
                 floatingLabelText="Read feed from">
                 { _.map(urls, this.renderSelectList) }
               </SelectField>

              <Paper style={{ width: '100%', overflow: 'auto' }}>
                { news && news.length ?
                  <List>
                    { _.map(news, this.renderNews) }
                  </List>
                : null }
              </Paper>

              <RaisedButton
                icon={<FontIcon className={isLoading ? 'fa fa-circle-o-notch fa-spin' : 'fa fa-refresh'} />}
                onTouchTap={ this.loadUrl.bind(this, selected) }
                style={{ position:'absolute', right: 15, top: 15,
                  transition: 'all 0.5s ease-in',
                  WebkitTransition: 'all 0.5s ease-in',
                  transform: isLoading ? 'scale(0.4)' : 'scale(1)',
                  WebkitTransform: isLoading ? 'scale(0.4)' : 'scale(1)', }} />

            </div>
          );
      }
  }
});
const styles = {
  avatar: {
    paper: {
      height: 45,
      width: 45,
      overflow:'hidden',
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
    alignItems: 'center',
  }
};
