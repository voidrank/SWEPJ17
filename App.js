import React from 'react';
import { StyleSheet, Text, View, TextInput,
  TouchableHighlight } from 'react-native';
import {LoginPage} from './components/ios/login.js';
import {UploadPage} from './components/ios/upload.js';
import {BrowserPage} from './components/ios/browser.js';

LOGIN_PAGE = "LOGIN_PAGE"
UPLOAD_PAGE = "UPLOAD_PAGE"
BROWSER_PAGE = "BROWSER_PAGE"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current_page: BROWSER_PAGE
    }
  }

  render() {
    if (this.state.current_page == LOGIN_PAGE)
      return <LoginPage/>;
    else if (this.state.current_page == UPLOAD_PAGE)
      return <UploadPage/>;
    else if (this.state.current_page == BROWSER_PAGE)
      return <BrowserPage/>;
  }

};
