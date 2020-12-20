import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Muser } from 'src/app/shared/models/muser.model';
import { MuserService } from 'src/app/shared/services/muser.service';
import { Tablesort } from 'src/app/shared/scripts//Tablesort'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  users: Muser[] = [];

  searchCat = "";

  constructor(private muserService: MuserService, private router: Router) { 

  }

  ngOnInit(): void {
    this.getData();
    new Tablesort(document.getElementById('table'));
  }

  
  async getData(){
    
    try{
      let users = this.muserService.getAll();
      
      this.users = (await users === null || await users === undefined) ? [] : await users;
      
      }catch(err){
        console.error(err);
      }
  }

 
  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'edit', id]);
  }
  
  onAddProfile() {
    this.router.navigate([this.router.url, 'edit']);
  }

  async onDelete(item: { id: number; }) {
    try {
      await this.muserService.deleteOneById(item.id);
  
    } catch (err) {
      console.error(err);
    } finally {
      
      this.getData();
  
    }
  }

}
