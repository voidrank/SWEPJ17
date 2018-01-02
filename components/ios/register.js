import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, Image } from 'react-native';
import {Actions} from "react-native-router-flux";
import {store} from "../../reducers";


export class RegisterPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      tags: [],
      current_tag: "",
    }
  }

  _onPress() {
    store.dispatch({
      type: 'register',
      user: {
        username: this.state.username,
        password: this.state.password,
        tags: this.state.tags,
      }
    });
    this.setState({
      username: "",
      password: "",
      tags: [],
      current_tag: "",
    });
  }

  _addTag() {
    this.state.tags.push(this.state.current_tag);
    this.setState({current_tag: ""});
  }

  _goLogin() {
    store.dispatch({
      type: "router",
      router: "LOGIN_PAGE",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.username}
            onChangeText={(username, props)=>this.setState({username})}
            value={this.state.username}
            placeholder={"username"}
          />
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
            <Text>{this.state.tags.reduce((r1, r2)=>(r1 = r1 + " " + r2), "")}</Text>
          </View>
          <Button onPress={this._addTag.bind(this)}
              title="ADD TAGS" color="#888888" />
          <Button onPress={this._onPress.bind(this)}
                title="SUBMIT" color="#888888" />
          <Button onPress={this._goLogin.bind(this)}
                title="LOGIN" color="#888888"/>
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
    width: 180, height: 40, 
    backgroundColor: "#eeeeee",
    padding: 6, margin: 5
  },
  password: { 
    width: 180, height: 40, 
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
    height: 100,
    backgroundColor: "#ffffff"
  },
});
