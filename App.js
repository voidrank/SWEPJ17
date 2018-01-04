import React from 'react';
import { StyleSheet, Text, View, TextInput,
  TouchableHighlight } from 'react-native';
import {LoginPage} from './components/ios/login.js';
import {UploadPage} from './components/ios/upload.js';
import {BrowserPage} from './components/ios/browser.js';
import {ArticlePage} from './components/ios/article.js';
import {RegisterPage} from './components/ios/register.js';
import {ProfilePage} from './components/ios/profile.js';
import {FollowPage} from './components/ios/follow.js';
import {AdminPage} from './components/ios/admin.js';
import {store} from './reducers';


const LOGIN_PAGE = "LOGIN_PAGE",
  UPLOAD_PAGE = "UPLOAD_PAGE",
  BROWSER_PAGE = "BROWSER_PAGE",
  ARTICLE_PAGE = "ARTICLE_PAGE",
  REGISTER_PAGE = "REGISTER_PAGE",
  PROFILE_PAGE = "PROFILE_PAGE";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      LOGIN_PAGE: <LoginPage />,
      UPLOAD_PAGE: <UploadPage />,
      BROWSER_PAGE: <BrowserPage />,
      ARTICLE_PAGE: <ArticlePage />,
      REGISTER_PAGE: <RegisterPage />,
      PROFILE_PAGE: <ProfilePage />,
      FOLLOW_PAGE: <FollowPage />,
      ADMIN_PAGE: <AdminPage />,
      current: LOGIN_PAGE
    }
  }

  componentDidMount() {
    store.subscribe((()=>{
      router = store.getState().router;
      this.setState({current: router});
    }).bind(this));
  }

  render() {
    this.state.current = store.getState().router;
    return this.state[this.state.current];
  }
};

