import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false,
      username: "",
      password: ""
    }
  }

  onSubmit() {
    
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
          <Button
            onPress={this.onSubmit}
            title="SUBMIT"
            color="#70bd56"
            theme='dark'
            raised={true}
            overrides={{backgroundColor: "#70bd56"}}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

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
    backgroundColor: "#70bd56"
  }
});
