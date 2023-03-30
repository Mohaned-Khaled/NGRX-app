import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Post } from '../posts/state/posts.reducer';
import { AppState } from '../state/app.state';
import { showLoadingAction } from '../state/shared/shared.action';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  fetchPosts() {
    return this.http
      .get<Post[]>('https://hooksrevisi-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((data) => {
          console.log(data);

          const postArr = [];

          for (let key in data) {
            postArr.push({ id: key, ...data[key] });
          }

          return postArr;
        })
      );
  }

  addPost(post: Post) {
    return this.http.post<{ name: string }>(
      'https://hooksrevisi-default-rtdb.firebaseio.com/posts.json',
      { ...post }
    );
  }

  editPost(post: Post) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };

    return this.http.patch<{ name: string }>(
      'https://hooksrevisi-default-rtdb.firebaseio.com/posts.json',
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://hooksrevisi-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
