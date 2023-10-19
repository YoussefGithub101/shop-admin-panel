import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private title: Title, private _UserService: UserService, public _router: Router) {

  }
  ngOnInit() {
    this.title.setTitle('Register')
  }
  error: string = '';
  form: FormGroup = new FormGroup(
    {
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }
  )

  dub(form: FormGroup) {
    if (form.valid) {
      this._UserService.register(form.value).subscribe((response) => {
        if (response.message == "register successfully") {
          this._router.navigate(['login'])
          Swal.fire("Register successfully ", "Welcome to Our Store", "success");
        }
        else {
          this.error = "this Email is " + " " + response.message;
          Swal.fire({
            icon: "error",
            title: "Email Already Used",
          });

        }
      })
    }

  }
}
