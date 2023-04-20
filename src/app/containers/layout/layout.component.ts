import { filter } from 'rxjs/operators';
import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit{

  constructor(private router: Router){}

  public currentPage:string = '';
  public navItems:any[] = [
    {icon: 'cil-home', title: 'Inicio', notifications: false, url: '/home'},
    {icon: 'cil-people', title: 'Usuarios', notifications: false, url: '/users'},
    {icon: 'cil-laptop', title: 'Proyectos', notifications: 5, url: '/proyects'},
    {icon: 'cil-book', title: 'Inventario', notifications: 0, url: '/inventario'},
    {icon: 'cil-baseball', title: 'Herramientas', notifications: 0, url: '/herramientas'},
  ];

  ngOnInit(): void {
    const url = window.location.href.split('/');
    this.currentPage = `/${url[url.length - 1]}`;

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event:any) => {
      this.currentPage = event['url']
    });
  }
}
