import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, Image } from 'react-native';
import {Actions} from "react-native-router-flux";
import {store} from "../../reducers";


export class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  _onPress() {
    store.dispatch({
      type: 'login',
      user: {
        username: this.state.username,
        password: this.state.password
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../../media/logo.png")} style={styles.logo} />
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
          <Button onPress={this._onPress.bind(this)}
                title="SUBMIT" color="#888888" />
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
    width: 240,
    height: 100,
    flex: 0.3,
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
  }
});
