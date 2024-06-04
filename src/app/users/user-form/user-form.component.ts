import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserServiceService } from '../../services/user-service.service';
import User from '../../types/user';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserServiceService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  editUserId!: string;

  ngOnInit() {
    this.editUserId = this.route.snapshot.params['id'];
    if (this.editUserId) {
      this.userService.getUserById(this.editUserId).subscribe((result) => {
        this.userForm.patchValue(result);
      });
    }
  }

  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    profile: [''],
  });

  addUser() {
    if (this.userForm.invalid) {
      alert('Please provide all fileds valid data');
      return;
    }
    const model: User = this.userForm.value;
    console.log('Model', model);
    // let xyz = model.profile;
    // let output: string = xyz.slice(1);
    // console.log(output);
    let xyz = model['profile'].toString().replace('C:\\fakepath\\', '');
    console.log(xyz);
    model.profile = xyz;
    console.log('New Model', model);
    const formData = new FormData();
    formData.append('profile', model.profile);
    this.userService.addUser(model).subscribe((result) => {
      console.log('Result', result);
      alert('User Added Successfully.');
      this.router.navigateByUrl('/');
    });
  }

  updateUser() {
    if (this.userForm.invalid) {
      alert('Please provide all fileds valid data');
      return;
    }
    const model: User = this.userForm.value;
    this.userService.updateUser(this.editUserId, model).subscribe((result) => {
      alert('User Updated Successfully.');
      this.router.navigateByUrl('/');
    });
  }
}
