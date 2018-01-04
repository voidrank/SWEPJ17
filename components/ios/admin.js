import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, Image, ListView } from 'react-native';
import {Actions} from "react-native-router-flux";
import {store} from "../../reducers";


export class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.current_input = "";
  }

  _goBack() {
    store.dispatch({
      type: "router",
      router: "BROWSER_PAGE",
    });
  }

  _ban() {
    store.dispatch({
      type: "ban",
      username: this.state.current_input,
    });
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(store.getState().ban);
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.username}
            onChangeText={(current_input, props)=>this.setState({current_input: current_input})}
            value={this.state.current_input}
            placeholder={"BAN!!!"}
          />
          <ListView
            dataSource={dataSource}
            renderRow={this._listItemRender.bind(this)}
          />
          <Button onPress={this._ban.bind(this)}
                title="BAN" color="#888888" />
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
