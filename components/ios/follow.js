import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, Image, ListView } from 'react-native';
import {Actions} from "react-native-router-flux";
import {store} from "../../reducers";


export class FollowPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.current_input = "";
  }

  _onPress() {
    if (this.state.password !== "")
      store.dispatch({
        type: 'alter_password',
        user: {
          username: this.state.user.username,
          password: this.state.password,
        }
      });
    if (this.state.current_tag !== []) 
      store.dispatch({
        type: 'add_tag',
        user: {
          username: this.state.user.username,
          tag: this.state.current_tag,
        }
      });
    this.setState({
      password: "",
      current_tag: "",
    });
  }

  _goBack() {
    store.dispatch({
      type: "router",
      router: "BROWSER_PAGE",
    });
  }

  _follow() {
    var follows = this.state.user.follows;
    for (var i = 0; i < follows.length; ++i)
      if (follows[i] === this.state.current_input)
        return;
    var all_usernames = store.getState().users.map((item)=>{return item.username;});
    var found = all_usernames.reduce((r1, r2)=>{ return r1 + (r2 === this.state.current_input); }, 0);
    if (found) {
      store.dispatch({
        type: "add_follow",
        add_follow: this.state.current_input,
        username: this.state.user.username,
      });
    }
    this.forceUpdate();
  }

  _listItemRender(rowData) {
    return (
      <View style={styles.followingWrapper}>
        <Text>
          {rowData}
        </Text>
      </View>
    );
  }

  render() {
    var users = store.getState().users, user, username = store.getState().state;
    for (var i = 0; i < users.length; ++i)
      if (username === users[i].username)
        this.state.user = users[i];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(this.state.user.follows);
    var dataSource = ds.cloneWithRows(this.state.user.follows);
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.username}
            onChangeText={(current_input, props)=>this.setState({current_input: current_input})}
            value={this.state.current_input}
            placeholder={"To follow?"}
          />
          <ListView
            dataSource={dataSource}
            renderRow={this._listItemRender.bind(this)}
          />
          <Button onPress={this._follow.bind(this)}
                title="Follow" color="#888888" />
          <Button onPress={this._goBack.bind(this)}
                title="GOBACK" color="#888888"/>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79c363',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17
  },
  form: {
    backgroundColor: '#ffffff',
    width: 250,
    height: 500,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: '#000000',
  },
  username: { 
    width: 180, height: 30, 
    backgroundColor: "#eeeeee",
    padding: 6, margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  password: { 
    width: 180, height: 30, 
    backgroundColor: "#eeeeee",
    padding: 6, margin: 5
  },
  button: {
    width: 180, height: 40,
    backgroundColor: "#70bd56",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    marginTop: -100,
    marginBottom: 40,
    height: 100,
    width: 100
  },
  tags: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    height: 100,
    backgroundColor: "#ffffff",
  },
  tagText: {
    marginTop: 2,
    color: "#666633",
  }
});
