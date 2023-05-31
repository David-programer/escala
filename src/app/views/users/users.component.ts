import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{

  constructor(private _globalService: GlobalService){}

  public inputs:any[] = [];
  public state_edith = false;
  public id_update:string = '';
  public loading:boolean = true;

  @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null
  @ViewChild('datatableUsers') datatableUsers:DatatableComponent | null = null

  public handlerEdith({data}:any):void{
    this.state_edith = true;
    let {correo,cedula,rol_name,telefono,direccion,nombre_completo} = data;

    this.form_dynamic?.form_group.setValue({
      pass: null, correo, cedula, rol: rol_name, telefono, direccion, nombre_completo, activo: data.activo == 'Sí' ? true : false
    });

    this.scrollTo();
    document.getElementById('nombre_completo')?.focus();
  }

  public createUpdateUser($event:any):void{
    this._globalService.post_service('/user/insert_user', $event).subscribe({
      next: (response)=>{
        console.log(response)
      },
      error: (error)=>{}
    });
  }

  public scrollTo(id:string = 'top'):void{
    const scrollTo = id != 'top' ? document.getElementById(id)?.offsetTop : 0
    const scroll = document.getElementById('main');

    setTimeout(() => {
      scroll?.scroll({
        top: scrollTo,
        behavior: 'smooth',
      })
    }, 0);
  }

  ngOnInit(): void {

    this.inputs = [
      {
        title: 'DATOS BÁSICOS',
        description: 'Información personal del usuario',
        inputs: [
          {value: null, name: 'nombre_completo', icon: 'cil-user', label: 'Nombre', attributes: {type: 'text'}},
          {value: null, name: 'cedula', icon: 'cil-barcode', label: 'Cédula', attributes: {type: 'text'}},
          {value: null, name: 'telefono', icon: 'cil-phone', label: 'Teléfono', attributes: {type: 'text'}},
          {value: null, name: 'direccion', icon: 'cil-location-pin', label: 'Dirección', attributes: {type: 'text'}},
        ]
      },
      {
        title: 'CREDENCIALES',
        description: 'Datos de acceso a la plataforma',
        inputs: [
          {value: null, name: 'correo',   icon: 'cil-envelope-open', label: 'Correo', attributes: {type: 'text'}},
          {value: null, name: 'pass', icon: 'cil-lock-locked', label: 'Contraseña', attributes: {type: 'text'}},
          {value: null, name: 'rol', icon: 'cil-user', label: 'Rol', attributes: {type: 'text'}},
          {value: null, name: 'activo', icon: 'cil-user', label: 'activo', attributes: {type: 'checkbox'}},
        ]
      }
    ];

    // this._globalService.get_service('/user/lista_users?id=').subscribe({
    //   next: (response:any)=>{
    //     if(response.successful){
    //       this.datatableUsers?.renderData?.next(
    //         response.data.map((item:any) => {
    //           item.activo = Boolean(item.activo) ? 'Sí' : 'No';
    //           return item
    //         })
    //       );
    //     }
    //     this.loading = false;
    //   },
    //   error: (error)=>{
    //     this.datatableUsers?.renderData?.next([])
    //     this.loading = false;
    //   }
    // })

    setTimeout(() => {
      let response = {
        "successful": true,
        "data": []
      }

      if(response.successful){
        this.datatableUsers?.renderData?.next(
          response.data.map((item:any) => {
            item.activo = Boolean(item.activo) ? 'Sí' : 'No';
            return item
          })
        );
      }
      
      this.loading = false;
    }, 500);
  }
}
