import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  id: number;
  username = '';
  selectedFile: any;
  text = '';
  posts: Array<any> = [];
  commentText: Array<string> = [];

  constructor(private storage: AngularFireStorage, private userService: UserService, private postService: PostService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.username = this.userService.user.username;
    this.id = this.userService.user.id;
    this.postService.getPosts().subscribe(
      (response: any) => {
        this.posts = response;
        for(const post of this.posts) {
          this.commentText.push('');
        }
      },
      (error) => console.error(error)
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  post() {
    this.snackBar.open('Creating the post ...', '', {duration: 10000});
    if (this.selectedFile !== undefined || this.selectedFile != null) {
      this.uploadImage()
        .then((imageURL) => {
          console.log(imageURL);
          const postObject = {
            username: this.username,
            text: this.text,
            imageURL,
            likes: [],
            comments: []
          };
          this.posts.push(postObject);
          this.postService.saveNewPost(postObject).subscribe(
            (res) => {
              console.log(res);
              this.snackBar.open('Posted successfully', 'ok');
            },
            (error) => {
              console.error(error);
            }
          );
        }).catch((err) => {
        console.log(err);
      });
    } else {
      const postObject = {
        username: this.username,
        text: this.text,
        imageURL: '',
        likes: [],
        comments: []
      };
      this.posts.push(postObject);
      this.postService.saveNewPost(postObject).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.open('Posted successfully', 'ok');
        },
        (error) => {
          console.error(error);
        }
      );
      this.selectedFile = undefined;
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      const date = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${date}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              if (downloadURL) {
                console.log(downloadURL);
                resolve(downloadURL);
              }
            });
          })
        ).subscribe(downloadURL => {
        console.log(`Yeah ${downloadURL}`);
      });
    });
  }

  like(index: number) {
    for (const post of this.posts) {
      if (post.id === index) {
        // if the image has a like, delete it (just one like per user)
        if (post.likes.indexOf(this.id) >= 0) {
          post.likes.splice(post.likes.indexOf(this.id), 1);
        } else {
          // do the like
          post.likes.push(this.id);
        }
        this.postService.updateLikes(post).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  comment(postId: number, commentIndex: number) {
    for (const post of this.posts) {
      if (post.id === postId) {
        const commentObj = {
          username: this.username,
          comment: this.commentText[commentIndex]
        };
        post.comments.push(commentObj);
        this.commentText[commentIndex] = '';
        this.postService.updateComments(post).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
