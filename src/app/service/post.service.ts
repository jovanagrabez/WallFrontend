import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append('Authorization', 'Bearer ' + sessionStorage.getItem('AuthToken'));


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}


  addPost(post): any {
    return this.http.post('/api/posts/add', post);

  }
  allPosts(): any {
    return this.http.get('/api/posts');
  }
  allPostsByUser(username): any {
    return this.http.get('/api/posts/'.concat(username));
  }

  deletePost(id): any {
    return this.http.delete('/api/posts/'.concat(id));
  }
  editPost(post): any {
    return this.http.put('/api/posts/edit', post);
  }
  addComments(comment) {
    return this.http.post('/api/comments/add', comment);
  }
  editComments(comment): any{
    return this.http.put('/api/comments/edit', comment);

  }

  deleteComment(comment): any {
    const httpOptions = {
      body: comment
  };

    // @ts-ignore
    return this.http.delete('/api/comments/delete', httpOptions);
  }

}
