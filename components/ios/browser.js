import React from 'react';
import { StyleSheet, Text, View, TextInput,
  TouchableHighlight, ListView } from 'react-native';

const TEST_CASES = [
  ["How do you do today?", ""],
  ["emmmmmmm....", ""],
  ["Shame on you, fake news", ""],
];

export class BrowserPage extends React.Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(TEST_CASES)
    };
  }

  listItemRender(rowData) {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>
          {rowData[0]}
        </Text>
      </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.listItemRender}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#79c363",
    alignItems: "center",
    justifyContent: "center"
  },
  listItem: {
    height: 100,
    width: 250,
    padding: 10,
    backgroundColor: "#f0f0f0",
    margin: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: '#000000'
  }
});
