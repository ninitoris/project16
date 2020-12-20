import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(users:any[], searchCat:string): any {
    let filterCat = searchCat;
    let filteredValues = [];


    if((filterCat != "" || filterCat != null)) {
      return filteredValues ? users.filter(user => (user.id+" "+user.name+" "+user.surname+" "+user.job+" "+user.age+" "+user.phonenumber).toLowerCase().indexOf(filterCat.toLowerCase()) !== -1) : users;
    };
  }

}
