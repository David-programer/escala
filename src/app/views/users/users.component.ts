import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{

  constructor(private _globalService: GlobalService){}

  public inputs:any[] = [];
  public state_edith = false;
  public loading:boolean = true;
  public alert:string|null = null;
  public datalistRoles:any[] = [];
  public message_server:string = '';
  public id_update:string|null = '';
  
  @ViewChild('modalUsers') modalUsers:ModalComponent | null = null;
  @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null
  @ViewChild('datatableUsers') datatableUsers:DatatableComponent | null = null

  public handlerEdith({data}:any):void{
    this.state_edith = true;
    let {correo,cedula,rol_name,telefono,direccion,nombre_completo} = data;

    this.form_dynamic?.form_group.setValue({
      pass: null, correo, cedula, id_rol: rol_name, telefono, direccion, nombre_completo, activo: data.activo == 'Sí' ? true : false
    });

    this.id_update = data.id;
    this.scrollTo();
    document.getElementById('nombre_completo')?.focus();
  }

  public open_modal_error(response:any){
    this.message_server = response.error ? response.error : response.errors.map((element:any) => element.msg).join(', ');
    this.modalUsers?.open_modal();
  }

  public createUpdateUser($event:any):void{    
    this.loading = true;
    let activo:any = document.getElementById('activo');

    this._globalService.post_service('/user/insert_user', {...$event, id: this.id_update, id_rol: this.datalistRoles.find(item => item.rol_name.toUpperCase() == $event.id_rol.toUpperCase())?.id, activo: Number(activo.checked)}).subscribe({
      next: (response:any)=>{
        if(response.successful){
          this.id_update = '';
          this.form_dynamic?.form_group.reset();

          if(this.state_edith){
            this.datatableUsers?.renderData.next(
              this.datatableUsers?.renderData.getValue().map((item:any)=>{
                if(item.id == response.data[0].id){
                  let result =  {...response.data[0], activo: response.data.activo ? 'Sí' : 'No'};
                  return result;
                }else return item
              })
            );
          }else{
            response.data[0].activo = response.data[0].activo ? 'Sí' : 'No';
            this.datatableUsers?.renderData.next([response.data[0], ...this.datatableUsers?.renderData.getValue()]);
          } 
          
          this.alert = '!Se realizó la acción correctamente!'
          setTimeout(() => {this.alert = null}, 10000);
          this.state_edith = false;
        }else this.open_modal_error(response);

        this.loading = false;
      },
      error: (error)=>{
        this.modalUsers?.open_modal();
        this.message_server = error.error;
      }
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
          {value: null, name: 'nombre_completo', icon: 'cil-user', label: 'Nombre', validators: ['required'], attributes: {type: 'text'}},
          {value: null, name: 'cedula', icon: 'cil-barcode', label: 'Cédula', validators: ['required'], attributes: {type: 'number'}},
          {value: null, name: 'telefono', icon: 'cil-phone', label: 'Teléfono', validators: ['required'], attributes: {type: 'number'}},
          {value: null, name: 'direccion', icon: 'cil-location-pin', label: 'Dirección', validators: ['required'], attributes: {type: 'text'}},
        ]
      },
      {
        title: 'CREDENCIALES',
        description: 'Datos de acceso a la plataforma',
        inputs: [
          {value: null, name: 'correo',   icon: 'cil-envelope-open', label: 'Correo', validators: ['required', 'email'], attributes: {type: 'text', required: true}},
          {value: null, name: 'pass', icon: 'cil-lock-locked', label: 'Contraseña', attributes: {type: 'password'}},
          {value: null, name: 'id_rol', icon: 'cil-user', label: 'Rol', attributes: {type: 'text', list: 'datalistRoles'}, validators: ['required']},
          {value: null, name: 'activo', icon: 'cil-user', label: 'activo', attributes: {type: 'checkbox'}},
        ]
      }
    ];

    this._globalService.get_service('/user/lista_roles?id=').subscribe({
      next: (response:any)=>{
        if(response.successful)this.datalistRoles = response.data;
      }
    });

    this._globalService.get_service('/user/lista_users?id=').subscribe({
      next: (response:any)=>{
        if(response.successful){
          this.datatableUsers?.renderData?.next(
            response.data.map((item:any) => {
              item.activo = Boolean(item.activo) ? 'Sí' : 'No';
              return item
            })
          );
        }
        this.loading = false;
      },
      error: (error)=>{
        this.datatableUsers?.renderData?.next([])
        this.loading = false;
      }
    });

    // setTimeout(() => {
      
    //   let response = {
    //     "successful": true,
    //     "data": [
    //         {
    //             "id": 1,
    //             "nombre_completo": "adasfddgfadgf",
    //             "correo": "asdasda@asdsdd.com",
    //             "cedula": "132456789",
    //             "telefono": "1235465879",
    //             "direccion": "aDFAS6DG46SG",
    //             "id_rol": 2,
    //             "activo": 1,
    //             "createdAt": null,
    //             "updatedAt": "2023-03-27 05:34:05.571 +00:00",
    //             "rol_name": "Usuario"
    //         },
    //         {
    //             "id": 2,
    //             "nombre_completo": "adasfddgfadgf",
    //             "correo": "qqqqqqqqqqqqasdasda@asdsdd.com",
    //             "cedula": "132456789",
    //             "telefono": "1234658759",
    //             "direccion": "aDFAS6DG46SG",
    //             "id_rol": 1,
    //             "activo": 1,
    //             "createdAt": "2023-03-27 02:23:57.106 +00:00",
    //             "updatedAt": "2023-03-27 05:41:41.901 +00:00",
    //             "rol_name": "Administrador"
    //         },
    //         {
    //             "id": 3,
    //             "nombre_completo": "adasfddgfadgf",
    //             "correo": "zzzz@asdsdd.com",
    //             "cedula": "44141414",
    //             "telefono": "141414",
    //             "direccion": "cccccccccczzzzzzzzzzzz",
    //             "id_rol": 1,
    //             "activo": 1,
    //             "createdAt": "2023-04-22 02:33:52.076 +00:00",
    //             "updatedAt": "2023-04-22 02:39:02.007 +00:00",
    //             "rol_name": "Administrador"
    //         },
    //         {
    //             "id": 4,
    //             "nombre_completo": "rune afdafsd",
    //             "correo": "zzzeez@asdsdd.coms",
    //             "cedula": "4414141444545",
    //             "telefono": "1414144444",
    //             "direccion": "dfghdh",
    //             "id_rol": 1,
    //             "activo": 1,
    //             "createdAt": "2023-04-22 04:12:24.692 +00:00",
    //             "updatedAt": "2023-04-22 04:56:54.535 +00:00",
    //             "rol_name": "Administrador"
    //         },
    //         {
    //             "id": 5,
    //             "nombre_completo": "rune qssssssssss",
    //             "correo": "fffffffffffff@asdsdd.coms",
    //             "cedula": "5555555555555",
    //             "telefono": "99999999999",
    //             "direccion": "dfghdh",
    //             "id_rol": 1,
    //             "activo": 1,
    //             "createdAt": "2023-04-22 05:09:39.441 +00:00",
    //             "updatedAt": "2023-04-22 05:09:39.441 +00:00",
    //             "rol_name": "Administrador"
    //         }
    //     ]
    //   }

    //   if(response.successful){
    //     this.datatableUsers?.renderData?.next(
    //       response.data.map((item:any) => {
    //         item.activo = Boolean(item.activo) ? 'Sí' : 'No';
    //         return item
    //       })
    //     );
    //   }
      
    //   this.loading = false;
    // }, 500);
  }
}
