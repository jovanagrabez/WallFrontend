import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/Post';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FullPosts} from '../../model/FullPosts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  newPost: Post = new Post();
  allPosts: FullPosts[];
  date: string[];
  time: string[];

  constructor(private token: TokenStorageService, private postService: PostService, private toastr: ToastrService) { }

  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };

    this.newPost.username = this.token.getUsername();
    this.postService.allPosts().subscribe(posts => {
      this.allPosts = posts;
      for ( let i = 0; i < this.allPosts.length; i++) {
        this.date =  this.allPosts[i].dateAndTime.split('T');
        this.time = this.date[1].split('.');
        this.allPosts[i].dateAndTime = this.date[0].concat('  ' + this.time[0]);
      }
    });

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

}
