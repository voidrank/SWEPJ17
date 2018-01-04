import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, ListView, Image } from 'react-native';
import { store } from '../../reducers';

export class BrowserPage extends React.Component {
  
  constructor(props) {
    super(props)
    var ststate = store.getState();
    this.state = {
      articles: store.getState().articles,
      use_tag: false
    };
    for (var i = 0; i < ststate.users.length; ++i)
      if (ststate.users[i].username == ststate.state)
        this.state.tags = ststate.users[i].tags;
  }

  _getStar(uid) {
    var stars = store.getState().stars;
    var count = 0;
    for (var i = 0; i < stars.length; ++i)
      if (stars[i].uid === uid)
        count++;
    return count;
  }

  _getComment(uid) {
    var comments = store.getState().comments;
    var count = 0;
    for (var i = 0; i < comments.length; ++i)
      if (comments[i].uid === uid)
        count++;
    return count;
  }

  _goArticle(uid) {
    store.dispatch({
      type: "page_id",
      page_id: uid
    });
    store.dispatch({
      type: "router",
      router: ARTICLE_PAGE 
    });
  }

  listItemRender(rowData) {
    return (
      <TouchableHighlight onPress={()=>{this._goArticle(rowData['uid'])}}>
        <View style={styles.listItem}>
          <View style={styles.imageView}>
            <Image source={{uri: rowData['images'][0]}}
              style={styles.listItemImage} />
          </View>
          <Text style={styles.listItemText}>
            {rowData['content'].slice(0, 50)}
          </Text>
          <Text style={styles.starAndAuthor}>
            {"Stars: " + this._getStar(rowData['uid']) + " Comments: " + this._getComment(rowData['uid']) + "   " + rowData['author']}
          </Text>
        </View>
      </TouchableHighlight>);
  }

  _upload() {
    store.dispatch({
      type: 'router',
      router: "UPLOAD_PAGE"
    });
  }

  _goFriends() {
    store.dispatch({
      type: "router",
      router: "FOLLOW_PAGE",
    });
  }

  _goProfile() {
    store.dispatch({
      type: "router",
      router: "PROFILE_PAGE",
    });
  }

  _goAdmin() {
    if (store.getState().state === 'Lanshiyi')
      store.dispatch({
        type: "router",
        router: "ADMIN_PAGE"
      });
  }

  _use_tag() {
    this.setState({use_tag: !this.state.use_tag});
  }

  render() {

    var articles = this.state.articles, that = this;

    if (this.state.use_tag) {
      articles = articles.sort((function(a, b) {
        var count_a = 0, count_b = 0, tags = this.state.tags;
        for (var i = 0; i < tags.length; ++i) {
          if (a.content.toLowerCase().search(tags[i].toLowerCase()) >= 0)
            count_a++;
          if (b.content.toLowerCase().search(tags[i].toLowerCase()) >= 0)
            count_b++;
        }
        if (count_a > 0 || count_b > 0)
          console.log(count_a, count_b);
        return -count_a + count_b;
      }).bind(this));
    }

    articles = articles.filter(function(a) {
      var ban = store.getState().ban;
      for (var i = 0; i < ban.length; ++i)
        if (a.author == ban[i])
          return false;
      return true;
    });

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(articles);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={this.listItemRender.bind(this)}
        />
        <TouchableHighlight style={styles.footer} onPress={this._upload.bind(this)} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.friends} onPress={this._goFriends.bind(this)} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>F</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.admin} onPress={this._goAdmin.bind(this)} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>A</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.use_tags} onPress={this._use_tag.bind(this)} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>T</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.me} onPress={this._goProfile} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>M</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#79c363",
    alignItems: "center",
    justifyContent: "center"
  },
  listItem: {
    height: 250,
    width: 250,
    padding: 10,
    backgroundColor: "#f0f0f0",
    margin: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: '#000000'
  },
  listItemText: {
    paddingTop: 10
  },
  listItemImage: {
    height: 160,
    width: 230
  },
  starAndAuthor: {
    paddingTop: 20,
    color: '#aaaaaa'
  },
  me: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: 50,
    height: 50,
    backgroundColor:'#66CCFF',
    borderRadius: 40,
    alignItems: "center"
  },
  admin: {
    position: 'absolute',
    bottom: 0,
    left: 72.5,
    width: 50,
    height: 50,
    backgroundColor:'#66CCFF',
    borderRadius: 40,
    alignItems: "center"
  },
  use_tags: {
    position: 'absolute',
    bottom: 0,
    right: 72.5,
    width: 50,
    height: 50,
    backgroundColor:'#66CCFF',
    borderRadius: 40,
    alignItems: "center"
  },
  friends: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor:'#66CCFF',
    borderRadius: 40,
    alignItems: "center"
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: 50,
    height: 50,
    backgroundColor:'#66CCFF',
    borderRadius: 40,
    alignItems: "center"
  },
  upload: {
    marginTop: 5.5,
    marginLeft: 2,
    height: 30,
    fontSize: 30,
    color: "#ffffff",
    flexDirection:'row',
  }
});


