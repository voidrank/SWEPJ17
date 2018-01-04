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
    {username: 'Lanshiyi', password: 'lanshiyi', tags:["dogfood", 'breakfast'], follows: ['']}
  ],
  ban: [],
  page_id: "1",
  state: 'Lanshiyi',
  router: BROWSER_PAGE,
  articles: [
    { content: "How do you do today?", images: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515384828&di=6f28bc327997be3bf63c922849eb6897&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff7246b600c3387447d2db0ff5b0fd9f9d62aa04d.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3633315665,1697461962&fm=200&gp=0.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3633315665,1697461962&fm=200&gp=0.jpg"], uid: "1", author: "Lanshiyi"},
    { content: "emmmmmmm....", images: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515387805&di=145da2779b38ca3892293acc16a75b60&imgtype=jpg&er=1&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1207%2F0819%2Fntk17248.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3633315665,1697461962&fm=200&gp=0.jpg"], uid: "2", author: "Lanshiyi"},
    { content: "Shame on you, fake news", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOK8SjrJ94pKcq0u2k1GC_0IqD5bcoQ3kBFNLf0P4CKZkmaItX"], uid: "3", author: "Lanshiyi"},
	{
		"content":"good breakfast!!!",
		"images":["http://img0.imgtn.bdimg.com/it/u=3273504783,3852995593&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=169530487,1404510145&fm=200&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=2624181122,1638887850&fm=27&gp=0.jpg"],
		"uid":"11",
		"star":0,
		"author":"LanShiyi"
	},
{
		"content":"nice food ,nice day!",
		"images":["http://img2.imgtn.bdimg.com/it/u=2250514746,4236207246&fm=200&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=4110647852,3059427370&fm=200&gp=0.jpg",
			"http://img4.imgtn.bdimg.com/it/u=3172892871,4043671343&fm=200&gp=0.jpg"],
		"uid":"12",
		"author":"LanShiyi"
	}
,
{
		"content":"a good night with my delicious food",
		"images":["http://img2.imgtn.bdimg.com/it/u=2825025442,1560891698&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=325000423,815195119&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=638742883,1585674577&fm=27&gp=0.jpg"],
		"uid":"13",
		"author":"LanShiyi"
	}
,
{
		"content":"hot day,have an ice lolly!",
		"images":["http://img0.imgtn.bdimg.com/it/u=1530269118,3446519308&fm=200&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=157688878,3018004353&fm=200&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=2854715351,1478262667&fm=200&gp=0.jpg"],
		"uid":"14",
		"author":"LanShiyi"
	}
,
{
		"content":"fresh me!!!",
		"images":["http://img2.imgtn.bdimg.com/it/u=2661215435,261079419&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=3708991577,2198324365&fm=200&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=3748070640,1378554762&fm=200&gp=0.jpg"],
		"uid":"15",
		"author":"LanShiyi"
	}
,
{
		"content":"noodles make happy",
		"images":["http://img1.imgtn.bdimg.com/it/u=2219041346,2194033929&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=2488110002,2553275931&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=339284397,2027293432&fm=27&gp=0.jpg"],
		"uid":"16",
		"author":"LanShiyi"
	}
,
{
		"content":"delicious hot pot!!!",
		"images":["http://img2.imgtn.bdimg.com/it/u=3547411648,878150192&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=3571727976,1272612630&fm=27&gp=0.jpg",
			"http://img3.imgtn.bdimg.com/it/u=982782703,1226037704&fm=200&gp=0.jpg"],
		"uid":"17",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	},
	{
		"content":"nice pizza!!!",
		"images":["http://img5.imgtn.bdimg.com/it/u=1277613835,93406618&fm=200&gp=0.jpg",
			"http://img5.imgtn.bdimg.com/it/u=2248030248,2589903645&fm=200&gp=0.jpg",
			"http://img5.imgtn.bdimg.com/it/u=1428146233,2764595842&fm=200&gp=0.jpg"],
		"uid":"18",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	},
	{
		"content":"went to japanese restaraunt with my friends!!",
		"images":["http://img1.imgtn.bdimg.com/it/u=1930397349,767295574&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=2189571940,1000154367&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=2465201851,3240160936&fm=27&gp=0.jpg"],
		"uid":"19",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	},
	{
		"content":"a nice day in peach garden",
		"images":["http://img1.imgtn.bdimg.com/it/u=1106007486,1164651817&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=1155316103,3577119246&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=2358697487,894336116&fm=27&gp=0.jpg"],
		"uid":"20",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	},
	{
		"content":"nice beef",
		"images":["http://img2.imgtn.bdimg.com/it/u=1647453762,3934991700&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=195272537,1289174055&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=1989651041,2084277567&fm=200&gp=0.jpg"],
		"uid":"21",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	},
	{
		"content":"not day,have some fruit",
		"images":["http://img1.imgtn.bdimg.com/it/u=1230747561,1011761806&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=2428743917,77525084&fm=27&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=901889633,938689880&fm=27&gp=0.jpg"],
		"uid":"22",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	},
	{
		"content":"nice barbecue!!!",
		"images":["http://img1.imgtn.bdimg.com/it/u=2361156728,645821345&fm=200&gp=0.jpg",
			"http://img1.imgtn.bdimg.com/it/u=3363663482,806327777&fm=27&gp=0.jpg",
			"http://img2.imgtn.bdimg.com/it/u=1338839223,395804417&fm=200&gp=0.jpg"],
		"uid":"23",
		"star":0,
		"comments": [],
		"author":"LanShiyi"
	}],
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
  ban: banReducer,
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

function banReducer(state=[], action) {
  if (typeof state === "undefined") 
    return [];
  else if (action.type === "ban") {
    let newState = state.slice();
    newState.push(action.username);
    return newState;
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
    console.log(state);
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

