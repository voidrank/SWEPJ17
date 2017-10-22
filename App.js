import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false,
      username: "username",
      password: ""
    }
  }

  onSubmit() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          LOGIN
        </Text>
        <Text style={styles.text}>
          username
        </Text>
        <TextInput
          style={styles.username}
          onChangeText={(username, props)=>this.setState({username})}
          value={this.state.username}
        />
        <Text style={styles.text}>
          password
        </Text>
        <TextInput
          style={styles.password}
          onChangeText={(password, props)=>this.setState({password})}
          secureTextEntry={true}
          value={this.state.password}
        />
        <Button
          onPress={this.onSubmit}
          title="SUBMIT"
          style={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17
  },
  username: { width: 80, height: 18, borderWidth: 1, borderColor: 'gray' },
  password: { width: 80, height: 18, borderWidth: 1, borderColor: 'gray' },
  button: {}
});
