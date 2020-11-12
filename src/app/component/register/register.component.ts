import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  repassword: string;
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.repassword = '';

  }
  register() {
    if (this.repassword === this.user.password) {
      this.userService.register(this.user).subscribe(value => {
        this.router.navigate(['home']);
        this.toastr.success('Success, you are registered', 'Succes');
      }, error => {
        this.toastr.error('Error, username already exists!', 'Error');
      });
    } else {
      this.toastr.error('Error, not the same password', 'Error');
    }
  }
}
