import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { showLoadingAction } from 'src/app/state/shared/shared.action';
import { editPost } from '../state/posts.actions';
import { Post } from '../state/posts.reducer';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  postId: string;
  paramsSub: Subscription;
  postSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((data) => {
      this.postId = data['id'];

      this.postSub = this.store
        .select(getPostById, { id: this.postId })
        .subscribe((data: Post) => {
          this.createForm(data);
        });
    });
  }

  createForm(data: Post) {
    this.editForm = new FormGroup({
      title: new FormControl(data.title, [Validators.required]),
      description: new FormControl(data.description, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onEditForm() {
    this.store.dispatch(showLoadingAction({ status: true }));

    const editedPost: Post = {
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      id: this.postId,
    };

    this.store.dispatch(editPost({ post: editedPost }));

    this.router.navigate(['posts']);
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
    this.paramsSub?.unsubscribe();
  }
}
