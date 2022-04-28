import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
// crea un objeto, fillo de puta!
  postSchema = {
    username: '',
    imageURL: '',
    text: '',
    likes: [],
    comments: [{username: '', comment: ''}]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
