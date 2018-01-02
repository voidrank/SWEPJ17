import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, Image } from 'react-native';
import {Actions} from "react-native-router-flux";
import {store} from "../../reducers";


export class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    var users = store.getState().users, user, username = store.getState().state;
    for (var i = 0; i < users.length; ++i)
      if (username === users[i].username)
        this.state.user = users[i]
    this.state.password = "";
    this.state.current_tag = "";
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

  _logout() {
    store.dispatch({
      type: "logout",
    });
    store.dispatch({
      type: "router",
      router: "LOGIN_PAGE"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.username}>{this.state.user.username}</Text>
          <TextInput
            style={styles.password}
            onChangeText={(password, props)=>this.setState({password})}
            secureTextEntry={true}
            value={this.state.password}
            placeholder={"password"}
          />
          <TextInput
            style={styles.username}
            onChangeText={(current_tag, props)=>this.setState({current_tag: current_tag})}
            value={this.state.current_tag}
            placeholder={"add tag"}
          />
          <View style={styles.tags}>
            <Text>TAGS</Text>
            <Text style={styles.tagText}>{this.state.user.tags.reduce((r1, r2)=>(r1 = r1 + " " + r2), "")}</Text>
          </View>
          <Button onPress={this._onPress.bind(this)}
                title="SUBMIT" color="#888888" />
          <Button onPress={this._goBack.bind(this)}
                title="GOBACK" color="#888888"/>
          <Button onPress={this._logout.bind(this)}
                title="LOGOUT" color='#888888'/>
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
