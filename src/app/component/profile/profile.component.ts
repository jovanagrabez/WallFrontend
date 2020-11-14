import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/Post';
import {FullPosts} from '../../model/FullPosts';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostService} from '../../service/post.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  info: any;
  newPost: Post = new Post();
  allPosts: FullPosts[];
  date: string[];
  time: string[];
  editMode = false;
  dateAndTime: string;

  constructor(private token: TokenStorageService, private postService: PostService, private toastr: ToastrService) { }

  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
    this.onLoad();
  }
  addPost() {
    this.postService.addPost(this.newPost).subscribe(
      res => {
        this.toastr.success('Your post is successfully added', 'Success');
        window.location.reload();
        this.newPost.text = '';
      }, error => {
        this.toastr.error('Something is not right', 'Error');
      });
  }

  deletePost(id: any) {
    if (window.confirm('Are sure you want to delete this post')) {
      this.postService.deletePost(id).subscribe(
        res => {
          this.onLoad();
          this.toastr.success('Your post is successfully deleted', 'Success');
          window.location.reload();
        }, error => {
          this.toastr.error('Something is not right', 'Error');
        });
    }
  }

  editPost(postEdited: any) {
    this.postService.editPost(postEdited).subscribe(
      res => {
        this.toastr.success('Your post is successfully editet', 'Success');
        postEdited.editable = false;
        this.onLoad();
      }, error => {
        this.toastr.error('You don\'t have permission to change post after fife minutes', 'Error');
        this.editMode = false;
        this.onLoad();
      });

  }

  onLoad() {
    this.newPost.username = this.token.getUsername();
    this.postService.allPostsByUser(this.token.getUsername()).subscribe(posts => {
      this.allPosts = posts;
      for ( let i = 0; i < this.allPosts.length; i++) {
        // @ts-ignore
        this.allPosts[i].date =  this.allPosts[i].dateAndTime.split('T', 1);
        // @ts-ignore
        this.allPosts[i].time = this.allPosts[i].dateAndTime.slice(11, 19);
   //     this.allPosts[i].dateAndTime = this.date[0].concat('  ' + this.time[0]);
      }
    });

  }
}
