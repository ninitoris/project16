import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Muser } from 'src/app/shared/models/muser.model';
import { MuserService } from 'src/app/shared/services/muser.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: number;
  user: Muser;
  mask = [];
  userForm: FormGroup;

  constructor(
    private activatedRouter: ActivatedRoute,
    private muserService: MuserService,
    private router: Router
  ) { 
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    let digitmask = /\d/;
    let emailmask = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phonemask = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/;
      
      this.userForm = new FormGroup({
  
        name: new FormControl(null,[Validators.required]),
        surname: new FormControl(null,[Validators.required]),
        lastname: new FormControl(null,[Validators.required]),
        age: new FormControl(null,[Validators.pattern(digitmask), Validators.required]),
        email: new FormControl(null,[Validators.pattern(emailmask), Validators.required]),
        phonenumber: new FormControl(null,[Validators.pattern(phonemask), Validators.required]),
        job: new FormControl(null,[Validators.required])

        
  
  
      });
      this.getData();
  }

  async getData() {
    if (!(this.id === null || this.id === undefined)) {
      try {
        let user = this.muserService.getOneById(this.id);
        this.user = await user;
      } catch (err) {
        console.error(err);
      }
      this.userForm.patchValue({
       name: this.user.name,
       surname: this.user.surname,
       lastname: this.user.lastname,
       age: this.user.age,
       email: this.user.email,
       phonenumber: this.user.phonenumber,
       job: this.user.job
       
      });
    }
  }
  async onSave() {
    if (!(this.id === null || this.id === undefined)) {
      try {
        await this.muserService.putOneById(this.id, this.userForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.muserService.postOne(this.userForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  async onDelete(item: { id: number; }) {
    try {
      console.log(this.user)
      await this.muserService.deleteOneById(item.id);

    } catch (err) {
      console.error(err);
    }finally{
      this.getData();
    }
  
  }





}
