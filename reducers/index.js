import { createStore, combineReducers } from 'redux';

const LOGIN_PAGE = "LOGIN_PAGE",
  UPLOAD_PAGE = "UPLOAD_PAGE",
  BROWSER_PAGE = "BROWSER_PAGE",
  ARTICLE_PAGE = "ARTICLE_PAGE",
  REGISTER_PAGE = "REGISTER_PAGE",
  PROFILE_PAGE = 'PROFILE_PAGE',
  FOLLOW_PAGE = 'FOLLOW_PAGE';

initial_state = {
  users: [
    {username: 'Lanshiyi', password: 'lanshiyi', tags:["dogfood"], follows: ['']}
  ],
  page_id: "1",
  state: 'Lanshiyi',
  router: FOLLOW_PAGE,
  articles: [
    { content: "How do you do today?", images: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515384828&di=6f28bc327997be3bf63c922849eb6897&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff7246b600c3387447d2db0ff5b0fd9f9d62aa04d.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3633315665,1697461962&fm=200&gp=0.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3633315665,1697461962&fm=200&gp=0.jpg"], uid: "1", author: "Lanshiyi"},
    { content: "emmmmmmm....", images: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515387805&di=145da2779b38ca3892293acc16a75b60&imgtype=jpg&er=1&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1207%2F0819%2Fntk17248.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3633315665,1697461962&fm=200&gp=0.jpg"], uid: "2", author: "Lanshiyi"},
    { content: "Shame on you, fake news", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOK8SjrJ94pKcq0u2k1GC_0IqD5bcoQ3kBFNLf0P4CKZkmaItX"], uid: "3", author: "Lanshiyi"},
  ],
  stars: [
    {author:"Lanshiyi", uid: "1"},
    {author:"Lanshiyi", uid: "2"}
  ],
  comments: [
    {author: "Lanshiyi", uid: "1", content: "真好吃"}
  ]
};


const reducer = combineReducers({
  users: userReducer,
  state: stateReducer,
  router: routerReducer,
  articles: articleReducer,
  stars: starReducer,
  comments: commentReducer,
  page_id: pageIdReducer,
});


store = createStore(
  reducer,
  initial_state
);


function pageIdReducer(state=[], action) {
  if (typeof state === "undefined") 
    return [];
  else if (action.type === "page_id") {
    return action.page_id;
  }
  else
    return state;
}


function commentReducer(state=[], action) {
  if (typeof state === "undefined")
    return [];
  else if (action.type === 'comment') {
    let newState = state.slice();
    newState.splice(-1, 0, action.comment);
    return newState;
  }
  else 
    return state;
}


function starReducer(state=[], action) {
  if (typeof state === 'undefined') {
    return [];
  }
  else if (action.type === 'star') {
    let uid = action.star.uid, author = action.star.author;
    let newState = state.slice();
    var found = 0, idx;
    for (var i = 0; i < newState.length; ++i)
      if (newState[i].uid === uid && newState[i].author === author) {
        found = 1;
        idx = i;
        break;
      }
    if (found === 0)
      newState.splice(-1, 0, action.star);
    else
      newState.pop(idx);
    return newState;
  }
  else
    return state
}


function routerReducer(state=LOGIN_PAGE, action) {
  if (action.type === 'router') {
    return action.router;
  }
  else {
    if (typeof state === 'undefined')
      return LOGIN_PAGE;
    else
      return state;
  }
}

/* add user
 * action.type = 'register'
 * action.payload = {username: $, password: $}
 */
function userReducer(state=[], action) {
  if (action.type === 'register') {
    let newState = state.slice();
    newState.splice(-1, 0, action.user);
    console.log(newState);
    return newState;
  }
  else if (action.type === 'alter_password') {
    let username = action.user.username, password = action.user.password,
      newState = state.slice(), user;
    for (var i = 0; i < newState.length; ++i)
      if (newState[i].username === username) {
        user = newState[i]
        newState.pop(i);
        break;
      }
    user.password = password;
    newState.push(user);
    return newState;
  }
  else if (action.type === 'add_tag') {
    let username = action.user.username, tag = action.user.tag,
      newState = state.slice(), user;
    for (var i = 0; i < newState.length; ++i)
      if (newState[i].username === username) {
        user = newState[i]
        newState.pop(i);
        break;
      }
    user.tags.push(tag);
    newState.push(user);
    return newState;
 
  }
  else if (action.type === 'add_follow') {
    let username = action.username, add_follow = action.add_follow,
      newState = state.slice();
    console.log(action);
    for (var i = 0; i < newState.length; ++i)
      if (newState[i].username === username) {
        user = newState[i]
        newState.pop(i);
        break;
      }
    user.follows.push(add_follow);
    newState.push(user);
    return newState;

  }
  else {
    return state;
  }
}


/* login
 * action.type = 'login'
 * action.payload = {username: $, password: $}
 */
function stateReducer(state='anonymous', action) {
  if (action.type === 'login') {
    if (typeof store === 'undefined')
      users = [];
    else
      users = store.getState().users;
    for (var i = 0; i < users.length; ++i) {
      if (action.user.username == users[i].username && action.user.password == users[i].password) {
        return users[i].username;
      }
    }
    return state;
  }
  else if (action.type === "logout") {
    return "anonymous";
  }
  else {
    if (typeof state === 'undefined')
      return 'anonymous'
    else
      return state;
  }
}

function articleReducer(state=[], action) {
  if (action.type === 'undefined') {
    return [];
  }
  else {
    if (action.type === 'upload') {
      let newState = state.slice();
      newState.splice(-1, 0, action.article);
      return newState;
    }
    else
      return state;
  }
}


// router
store.subscribe(() => {
  state = store.getState();
  // login
  if (state.state !== 'anonymous' && state.router === LOGIN_PAGE)
    store.dispatch({ 
      type: 'router',
      router: BROWSER_PAGE
    });
});

module.exports = { store: store }

