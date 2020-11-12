import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private  token: TokenStorageService) { }

  ngOnInit() {
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
