import React from 'react';
import {StyleSheet, Text, View, TextInput,
  TouchableHighlight } from 'react-native';

export class UploadPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  onSubmit() {
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text)=>this.setState({text})}
          value={this.state.text}
          placeholder={"How do you do?"}
          multiline={true}
        />
        <TouchableHighlight onPress={this.onSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              SUBMIT
            </Text>
          </View>
        </TouchableHighlight>
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
    margin: 10,
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#79c363"
  }
});
