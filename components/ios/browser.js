import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, ListView, Image } from 'react-native';
import { store } from '../../reducers';

export class BrowserPage extends React.Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(store.getState().articles)
    };
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
    console.log("????");
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
      router: "FRIEND_PAGE",
    });
  }

  _goProfile() {
    store.dispatch({
      type: "router",
      router: "PROFILE_PAGE",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.listItemRender.bind(this)}
        />
        <TouchableHighlight style={styles.footer} onPress={this._upload} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.friends} onPress={this._goFriends} underlayColor={'#6699CC'}>
          <Text style={styles.upload}>F</Text>
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
    left: 20,
    width: 50,
    height: 50,
    backgroundColor:'#66CCFF',
    borderRadius: 40,
    alignItems: "center"
  },
  friends: {
    position: 'absolute',
    bottom: 0,
    right: 20,
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


