import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  info: any;
  constructor(private  token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
  }

  logout() {
    this.token.signOut();
  }

}
