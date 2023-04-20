import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{

  constructor(private _globalService: GlobalService){}

  public loading:boolean = true;
  public data = [
    {name: "Apple MacBook Pro 17'", color: 'Sliver', category: 'Laptop', precio: '$ 2999'},
    {name: "Apple MacBook Pro 18'", color: 'Sliver', category: 'Laptop', precio: '$ 2999'},
    {name: "Apple MacBook Pro 19'", color: 'Sliver', category: 'Laptop', precio: '$ 2999'},
  ]

  ngOnInit(): void {
    this._globalService.get_service('/user/lista_users').subscribe({
      next: (response)=>{
        console.log(response);
        this.loading = false;
      },
      error: (error)=>{
        this.loading = false;
      }
    })
  }
}
