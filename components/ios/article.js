import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, ListView, Image } from 'react-native';
import { store } from '../../reducers';

export class ArticlePage extends React.Component {
  
  constructor(props) {
    super(props);
    var articles = store.getState().articles;
    var page_id = store.getState().page_id;
    this.state = {
      comment: ""
    }
    for (var i = 0; i < articles.length; ++i)
      if (articles[i].uid === page_id)
        this.state.article = articles[i];
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

  listItemRender(rowData) {
    if (rowData.type === 'image')
      return (
        <View style={styles.listItem}>
          <View style={styles.imageView}>
            <Image source={{uri: rowData.content}}
              style={styles.listItemImage} />
          </View>
        </View>);
    else if (rowData.type === 'content') {
      return(
        <View style={styles.whiteboard}>
          <Text style={styles.listItemText}>
            {rowData.content}
          </Text>
        </View>);
    }
    else if (rowData.type === 'other') {
          return (
            <View style={styles.starAndAuthorBoard}>
              <Text style={styles.starAndAuthor}>
              {"Stars: " + this._getStar(rowData.content) + " Comments: " + this._getComment(rowData.content) + "   " + this.state.article['author']}
              </Text>
            </View>);
    }
    else if (rowData.type === 'comment') {
      return(
        <View style={styles.commentWhiteboard}>
          <Text>
            {rowData.content.author + ": " + rowData.content.content}
          </Text>
        </View>);
    }
    else if (rowData.type === 'input') {
      return (
        <TextInput
          style={styles.commentInput}
          onChangeText={(comment, props)=>this.setState({comment: comment})}
          value={this.state.comment}
          placeholder={"Comment"}
        />
      );
    }
  }

  _back() {
    store.dispatch({
      type: "router",
      router: "BROWSER_PAGE"
    })
  }

  _star() {
    var author = store.getState().state, uid = this.state.article.uid;
    store.dispatch({
      type: "star",
      star: {"author": author, uid: uid}
    });
    this.forceUpdate();
  }

  _comment() {
    var author = store.getState().state, uid = this.state.article.uid;
    store.dispatch({
      type: "comment",
      comment: { author: author, uid: uid, content: this.state.comment }
    });
    this.forceUpdate();
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    list = this.state.article.images.map((image) => {return {type: 'image', content: image}});
    list.push({type: 'content', content: this.state.article['content']});
    var comments = store.getState().comments;
    for (var i = 0; i < comments.length; ++i)
      if (comments[i].uid == this.state.article.uid)
        list.push({type: 'comment', content: comments[i]});
    list.push({type: 'input'});
    list.push({type: 'other', content: this.state.article['uid']});
    const dataSource = ds.cloneWithRows(list)
    return (
      <View style={styles.container}>
        <View>
          <ListView
            dataSource={dataSource}
            renderRow={this.listItemRender.bind(this)}
          />
        </View>
        <View style={styles.footer} >
            <TouchableHighlight onPress={this._back} underlayColor={'#6699CC'}>
              <View style={styles.back} >
                <Text style={styles.backText}>BACK</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._star.bind(this)} underlayColor={'#6699CC'}>
              <View style={styles.star} >
                <Text style={styles.starText}>Star</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._comment.bind(this)} underlayColor={'#6699CC'}>
              <View style={styles.commit} >
                <Text style={styles.commitText}>Commit</Text>
              </View>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  commentInput: {
    height: 100,
    margin: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#79c363",
    alignItems: "center",
    justifyContent: "center"
  },
  listItem: {
    height: 180,
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
    color: '#ffffff'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignItems: "center",
    flex: 1,
    flexDirection: 'row',
  },
  star: {
    backgroundColor:'#77DDFF',
    alignItems: "center",
    width: 100,
    height: 50,
  },
  starText: {
    marginTop: 5.5,
    marginLeft: 25,
    height: 30,
    width: 80,
    fontSize: 30,
    color: "#ffffff",
    flexDirection:'row',
  },
  commit: {
    backgroundColor:'#66CCFF',
    alignItems: "center",
    width: 100,
    height: 50,
  },
  commitText: {
    marginTop: 5.5,
    marginLeft: 7,
    height: 30,
    width: 80,
    fontSize: 30,
    color: "#ffffff",
    flexDirection:'row',
  },
  back: {
    backgroundColor:'#66CCFF',
    alignItems: "center",
    width: 100,
    height: 50,
  },
  backText: {
    marginTop: 5.5,
    marginLeft: 5,
    height: 30,
    width: 80,
    fontSize: 30,
    color: "#ffffff",
    flexDirection:'row',
  },
  whiteboard: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 50,
  },
  commentWhiteboard: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    height: 30,
  },
  starAndAuthorBoard: {
    margin: 10,
    paddingBottom: 20
  }
});
