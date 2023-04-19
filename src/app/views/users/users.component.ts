import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{

  constructor(private _globalService: GlobalService){}

  public data = [
    {name: "Apple MacBook Pro 17'", color: 'Sliver', category: 'Laptop', precio: '$ 2999'},
    {name: "Apple MacBook Pro 18'", color: 'Sliver', category: 'Laptop', precio: '$ 2999'},
    {name: "Apple MacBook Pro 19'", color: 'Sliver', category: 'Laptop', precio: '$ 2999'},
  ]

  ngOnInit(): void {
    this._globalService.get_service('/user/lista_users').subscribe((response)=>{
      console.log(response);
    })
  }
}
