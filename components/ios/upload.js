import React from 'react';
import {StyleSheet, Text, View, TextInput,
  TouchableHighlight, ListView } from 'react-native';

LOGIN_PAGE = "LOGIN_PAGE"
UPLOAD_PAGE = "UPLOAD_PAGE"
BROWSER_PAGE = "BROWSER_PAGE"
ARTICLE_PAGE = "ARTICLE_PAGE"

export class UploadPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      images: []
    }
  }

  _onSubmit() {
    var state = store.getState()
    images = this.state.images;
    for (var i = 0; i < 2 - images.length; ++i)
      images.push("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515384828&di=6f28bc327997be3bf63c922849eb6897&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff7246b600c3387447d2db0ff5b0fd9f9d62aa04d.jpg");
    for (var i = images.length - 1; i >= 0; --i)
      if (images[i] === "")
        images.pop();
    article = {
      content: this.state.text,
      author: state.state,
      uid: Math.random().toString(36).substring(7),
      images: images
    };
    store.dispatch({
      type: "upload",
      article: article
    })
    store.dispatch({
      type: "router",
      router: "BROWSER_PAGE"
    });
  }

  _addImage() {
    images = JSON.parse(JSON.stringify(this.state.images));
    images.push("")
    this.setState({images: images});
  }

  _onChangeLink(link, rowId) {
    var state = this.state;
    state['images'][rowId] = link;
    this.setState({'images': state['images']});
  }

  _goBack() {
    store.dispatch({
      type: "router",
      router: "BROWSER_PAGE"
    });
  }

  _onEnter(uid) {
    store.dispatch({
      type: "page_id",
      page_id: uid
    });
    store.dispatch({
      type: "router",
      router: ARTICLE_PAGE
    });
  }

  _listImageLinks(rowData, sectionId, rowId) {
    var that = this;
    return (
        <TextInput
          style={styles.imageLink}
          onChangeText={(link, props)=>{that._onChangeLink(link, rowId)}}
          value={rowData}
          placeholder={"link"}
        />);
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    dataSource = ds.cloneWithRows(this.state.images);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text)=>this.setState({text})}
          value={this.state.text}
          placeholder={"How do you do?"}
          multiline={true}
        />
        <TouchableHighlight onPress={this._addImage.bind(this)} underlayColor={"#33CC66"}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              ADD IMAGE
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onSubmit.bind(this)} underlayColor={"#33CC66"}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              SUBMIT
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._goBack.bind(this)} underlayColor={"#33CC66"}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              BACK
            </Text>
          </View>
        </TouchableHighlight>
        <ListView
          dataSource={dataSource}
          renderRow={this._listImageLinks.bind(this)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79c363',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textinput: {
    backgroundColor: "#fafafa",
    flex: 0.2,
    width: 300,
    padding: 10,
    fontSize: 20,
    color: '#777777',
    marginTop: 40
  },
  button: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#79c363"
  },
  imageLink: {
    width: 300, height: 40,
    backgroundColor: "#eeeeee",
    padding: 6, margin: 5
  }
});
