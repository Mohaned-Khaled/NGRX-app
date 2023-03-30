import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { showLoadingAction } from 'src/app/state/shared/shared.action';
import { addPost } from '../state/posts.actions';
import { Post } from '../state/posts.reducer';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onAddPost() {
    this.store.dispatch(showLoadingAction({ status: true }));

    const { title, description } = this.addForm.value;
    const post: Post = {
      title,
      description,
    };
    this.store.dispatch(addPost({ post }));
  }
}
