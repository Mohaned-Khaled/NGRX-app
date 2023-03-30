import { createAction, props } from '@ngrx/store';
import { Post } from './posts.reducer';

const ADD_POST = '[posts page] ADD_POST';
const ADD_POST_SUCCESS = '[posts page] ADD_POST_SUCCESS';
const EDIT_POST = '[posts page] EDIT_POST';
const EDIT_POST_SUCCESS = '[posts page] EDIT_POST_SUCCESS';
const DELETE_POST = '[posts page] DELETE_POST';
const DELETE_POST_SUCCESS = '[posts page] DELETE_POST_SUCCESS';
const LOAD_POSTS = '[posts page] LOAD_POSTS';
const LOAD_POSTS_SUCCESS = '[posts page] LOAD_POSTS_SUCCESS';

export const addPost = createAction(ADD_POST, props<{ post: Post }>());
export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const editPost = createAction(EDIT_POST, props<{ post: Post }>());
export const editPostSuccess = createAction(
  EDIT_POST_SUCCESS,
  props<{ post: Post }>()
);

export const deletePost = createAction(DELETE_POST, props<{ id: string }>());
export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: string }>()
);

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
