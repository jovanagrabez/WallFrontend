import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  private serverUrl = 'http://localhost:8080/socket'
  public stompClient;
  user: User = new User();
  constructor(private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private toastr: ToastrService) {
    this.initializeWebSocketConnection(this.toastr);

  }

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login() {
    console.log(this.user);
    this.authService.attemptAuth(this.user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.toastr.success('You are logged in', 'Success');
        this.router.navigate(['home']);
      },
      error => {
        this.toastr.error('Your useraname or password is incorect', 'Error' );
        this.isLoginFailed = true;
        this.router.navigate(['login']);
      }
    );
  }


  initializeWebSocketConnection(toastr){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', (message:any) => {
        if (message.body) {
            toastr.success(message.body, 'Success');
        }
      });
    });
  }


  sendMessage() {
    this.stompClient.send('/app/send/message' , {}, 'Have some new post, check it');
  }


}
