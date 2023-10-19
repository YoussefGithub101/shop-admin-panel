import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';



@Component({
      selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.scss']
})
export class LoginComponent {



      error: string = '';
      errors: string = '';

      constructor(private title: Title, private _UserService: UserService, public _router: Router) {

      }
      ngOnInit() {
            this.title.setTitle('Login')
      }
      forms: FormGroup = new FormGroup(
            {
                  email: new FormControl(null, [Validators.required, Validators.email]),
                  password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            })

      login(forms: FormGroup) {


            if (forms.valid) {
                  this._UserService.loginn(forms.value).subscribe((response) => {
                        if (response.message == "success") {
                              localStorage.setItem("data", response.data)
                              this._UserService.saveUserData()
                              this._router.navigate([''])
                              // Swal.fire("Login successfully ", "Welcome to Our Store", "success");
                              let timerInterval: any
                              Swal.fire({
                                    title: 'Login successfully',
                                    html: 'Welcome to our Store .',
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: () => {
                                          Swal.showLoading()
                                          const b: any = Swal.getHtmlContainer()?.querySelector('b')
                                          timerInterval = setInterval(() => {
                                               /*  b.textContent = Swal.getTimerLeft() */
                                          }, 100)
                                    },
                                    willClose: () => {
                                          clearInterval(timerInterval)
                                    }
                              }).then((result) => {
                                    /* Read more about handling dismissals below */
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                          console.log('I was closed by the timer')
                                    }
                              })

                        }
                        else if (response.message == "please signup") {
                              this.error = response.message;
                              Swal.fire({
                                    icon: "error",
                                    title: "Email Not Found please <br> Sign up",
                              });
                        }
                        else if (response.message == "wrong password") {
                              this.errors = response.message;
                              Swal.fire({
                                    icon: "error",
                                    title: "Email OR Password Wrong",
                              });
                        }
                  })
            }
      }

}
