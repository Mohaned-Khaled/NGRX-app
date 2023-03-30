import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { showLoadingAction } from 'src/app/state/shared/shared.action';
import { deletePost, loadPosts } from '../state/posts.actions';
import { Post } from '../state/posts.reducer';
import { getPosts } from '../state/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;

  path: Subject<string>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(loadPosts());

    this.posts$ = this.store.select(getPosts);

    // this.path.next(this.route.children[0].component.)
  }

  onDeletePost(postId: string) {
    if (confirm('Are you sure that you want to delete this post?')) {
      this.store.dispatch(showLoadingAction({ status: true }));
      this.store.dispatch(deletePost({ id: postId }));
    }
  }
}
