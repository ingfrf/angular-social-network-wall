import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  saveNewPost(postObject: any) {
    return this.httpClient.post('http://localhost:3000/posts', postObject);
  }

  getPosts() {
    return this.httpClient.get('http://localhost:3000/posts');
  }

  updateLikes(postObject: any) {
    return this.httpClient.put(`http://localhost:3000/posts/${postObject.id}`, postObject);
  }

  updateComments(postObject: any) {
    return this.httpClient.put(`http://localhost:3000/posts/${postObject.id}`, postObject);
  }
}
