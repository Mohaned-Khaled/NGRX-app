import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post, postsReducer, PostState } from './posts.reducer';

const postsSelector = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(postsSelector, (state) => {
  return state.posts;
});

export const getPostById = createSelector(
  postsSelector,
  (state: PostState, props: { id: string }) => {
    return state.posts.find((post: Post) => post.id === props.id);
  }
);
