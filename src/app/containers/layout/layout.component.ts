import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent {
  public navItems:any[] = [
    {icon: 'cil-home', title: 'Inicio', notifications: false},
    {icon: 'cil-people', title: 'Usuarios', notifications: false},
    {icon: 'cil-laptop', title: 'Proyectos', notifications: 5},
    {icon: 'cil-book', title: 'Inventario', notifications: 0},
    {icon: 'cil-baseball', title: 'Herramientas', notifications: 0},
  ]
}
