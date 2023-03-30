import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  editPost,
  loadPosts,
  loadPostsSuccess,
} from './posts.actions';

export interface Post {
  id?: string;
  title: string;
  description: string;
}

export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state: any, action) => {
    console.log(action);
    return {
      ...state,
      posts: [...state.posts, { ...action.post }],
    };
  }),
  on(editPost, (state, action) => {
    const posts = [...state.posts];

    const updatedPosts = posts.map((post) => {
      return post.id === action.post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePostSuccess, (state, action) => {
    const editedPosts = [...state.posts].filter(
      (post) => post.id !== action.id
    );

    return {
      ...state,
      posts: editedPosts,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export const postsReducer = (state: PostState, action) => {
  return _postReducer(state, action);
};
