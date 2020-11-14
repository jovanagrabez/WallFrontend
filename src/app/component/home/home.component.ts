import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/Post';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FullPosts} from '../../model/FullPosts';
import {Comment} from '../../model/Comment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  newPost: Post = new Post();
  newComment: Comment = new Comment();
  allPosts: FullPosts[];
  date: string[];
  time: string[];
  showComments = false;
  isAddComment = false;


  constructor(private token: TokenStorageService, private postService: PostService, private toastr: ToastrService) {
  }

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
        this.onLoad();
        this.newPost.text = '';
      }, error => {
        this.toastr.error('Something is not right', 'Error');
      });
  }

  showOrHide() {
    if (!this.showComments) {
      this.showComments = true;
    } else {
      this.showComments = false;
    }
  }

  addComment(post: any) {
    this.newComment.username = this.token.getUsername();
    this.newComment.postId = post;
    this.postService.addComments(this.newComment).subscribe(
      res => {
        this.toastr.success('Your comment is successfully added', 'Success');
        this.onLoad();
        this.newComment.text = '';
      }, error => {
        this.toastr.error('Something is not right', 'Error');
      });
  }

  onLoad() {
    this.newPost.username = this.token.getUsername();
    this.postService.allPosts().subscribe(posts => {
      this.allPosts = posts;
      for (let i = 0; i < this.allPosts.length; i++) {
        // @ts-ignore
        this.allPosts[i].date = this.allPosts[i].dateAndTime.split('T', 1);
        // @ts-ignore
        this.allPosts[i].time = this.allPosts[i].dateAndTime.slice(11, 19);
        for (let j = 0; j < this.allPosts[i].comments.length; j++) {
          this.allPosts[i].comments[j].date = this.allPosts[i].comments[j].dateAndTime.split('T', 1);
          // @ts-ignore
          this.allPosts[i].comments[j].time = this.allPosts[i].comments[j].dateAndTime.slice(11, 19);
        }
      }
    });
  }


  editComment(comment) {
    this.postService.editComments(comment).subscribe(
      res => {
        this.toastr.success('Your comment is successfully edited', 'Success');
        comment.editable = false;
        this.onLoad();
      }, error => {
        this.toastr.error('Something went wrong', 'Error');
        this.onLoad();
      });


  }


  deleteComment(comment, post) {
      comment.postId = post;
      if (window.confirm('Are sure you want to delete this comment')) {
        this.postService.deleteComment(comment).subscribe(
          res => {
            this.onLoad();
            this.toastr.success('Your post is successfully deleted', 'Success');
            window.location.reload();
          }, error => {
            this.toastr.error('Something is not right', 'Error');
          });
      }
    }
}
