import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/state/app.state';
import { showLoadingAction } from 'src/app/state/shared/shared.action';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  editPost,
  editPostSuccess,
  loadPosts,
  loadPostsSuccess,
} from './posts.actions';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      exhaustMap((data) => {
        return this.postsService.fetchPosts().pipe(
          map((data) => {
            return loadPostsSuccess({ posts: data });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      exhaustMap((data) => {
        return this.postsService.addPost(data.post).pipe(
          map((name) => {
            this.store.dispatch(showLoadingAction({ status: false }));
            const post = { ...data.post, id: name.name };
            this.router.navigate(['posts']);
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  editPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editPost),
      exhaustMap((data) => {
        return this.postsService.editPost(data.post).pipe(
          map((name) => {
            this.store.dispatch(showLoadingAction({ status: false }));
            return editPostSuccess({ post: data.post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((data) => {
        return this.postsService.deletePost(data.id).pipe(
          map(() => {
            this.store.dispatch(showLoadingAction({ status: false }));
            return deletePostSuccess({ id: data.id });
          })
        );
      })
    );
  });
}
