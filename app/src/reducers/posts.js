import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  DELETE_POST
} from '../actions/actionCreators';

function posts(state = {
  items: [],
  isFetching: false
}, action) {
  switch (action.type) {
    case ADD_POST:
      const newState = [
        ...state.items,
        {
          title: action.title,
          content: action.content,
          author: action.author
        }
      ];
      return Object.assign({}, state, {
        items: newState
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts
      });
    case DELETE_POST:
      return Object.assign({}, state, {
        items: [
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1)
        ]
      });
    default:
      return state;
  }
}

export default posts;
