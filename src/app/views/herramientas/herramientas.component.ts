import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TabsetComponent } from 'src/app/components/tabset/tabset.component';
import { FormControl, Validators } from '@angular/forms';
<<<<<<< HEAD
=======
import { AlertComponent } from 'src/app/components/alert/alert.component';
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})

export class HerramientasComponent implements OnInit {

  constructor(private _globalService: GlobalService){}

  public inputs:any[] = [];
  public tabset:string = 'FILTRAR';
  public data_modal:any = {};
  public list_users:any[] = [];
  public id_update:string = '';
  public loading:boolean = true;
  public state_edith:boolean = false;
  public inputs_prestamos:any[] = [];
  public closeLoading = {count_request: 0, total_request: 2};

  @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null;
<<<<<<< HEAD
=======
  @ViewChild('alert_herramientas') alert_herramientas:AlertComponent | null = null;
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
  @ViewChild('modal_herramientas') modal_herramientas:ModalComponent | null = null;
  @ViewChild('tabsetHerramientas') tabsetHerramientas:TabsetComponent | null = null;
  @ViewChild('datatablePrestamos') datatablePrestamos:DatatableComponent | null = null;
  @ViewChild('datatableHerramientas') datatableHerramientas:DatatableComponent | null = null;
  @ViewChild('form_dynamic_prestamos') form_dynamic_prestamos:FormDynamicComponent | null = null;

  public scrollTo(id:string){
    setTimeout(() => {
      document.querySelector('main')?.scroll({top: document.getElementById(id)?.offsetTop ?? 0 + 100, behavior: 'smooth'});
    }, 0);
  }

  public create_or_update($event:any):void{
    this.loading = true;
    
    this._globalService.post_service('/herramienta/insert_herramienta', {...$event, id: this.state_edith ? this.id_update : "" }).subscribe((response:any) => {
      if(response.successful){
        if(this.state_edith){
          this.datatableHerramientas?.renderData?.next(
            this.datatableHerramientas?.renderData?.getValue().map(element=> element.id == this.id_update ? response.data[0] : element)
          );
        }else this.datatableHerramientas?.renderData?.next([...response.data, ...this.datatableHerramientas?.renderData?.getValue() ?? []]);

        this.state_edith = false;
<<<<<<< HEAD
        this.form_dynamic?.form_group.reset();
      }
      this.loading = false;
=======
        this.alert_herramientas?.open_alert('¡Se ha realizado la operación con éxito!');
        this.form_dynamic?.form_group.reset();
      }else {
        console.log('¡Ingresa los valores correctamente!');
        
        this.alert_herramientas?.open_alert(response.error ?? '¡Ingresa los valores correctamente!');
      }
      
      this.loading = false;
      // this.state_edith = false;
      this.alert_herramientas?.close_alert(10000);
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
    });
  }

  public create_prestamo(data:any){
    this.loading = true;

    let body:any = {
      id: '',
      ...data,
      id_herramienta: this.data_modal?.id,
      id_user: this.list_users.find(item => item.nombre_completo.toUpperCase() == data.id_user)?.id
    }

    this._globalService.post_service('/herramienta/insert_prestamo', body).subscribe({
      next: (response:any)=>{
        if(response.successful){
          let formulario:any = this.form_dynamic_prestamos?.form_group.controls;
          if(formulario['id']){
            let new_data:any[] = this.datatablePrestamos?.renderData.getValue().map(item => response.data[0].id == item.id ?  response.data[0] : item) ?? [];
            this.datatablePrestamos?.renderData.next(new_data);
            this.datatableHerramientas?.renderData.next(
              this.datatableHerramientas?.renderData.getValue().map(item => {
                if(item.id == this.data_modal.id) item.prestamos = new_data;
                return item
              })
            );
          } else {
            this.data_modal.prestamos.unshift(response.data[0]);
            this.datatableHerramientas?.renderData.next(this.datatableHerramientas?.renderData.getValue().map(item =>item.id ==  this.data_modal.id ? this.data_modal : item));
          }
          
          this.tabsetHerramientas?.handler_change_tab('FILTRAR');
          this.form_dynamic_prestamos?.form_group.reset();
<<<<<<< HEAD
        }
=======
          this.alert_herramientas?.open_alert(response.message ?? '!');

        }else this.alert_herramientas?.open_alert(response.error ?? '!Error al realizar la acción!');

        this.alert_herramientas?.close_alert(10000);
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
        this.loading = false;
      }
    });
  }

  public load_update(data:any):void{
    Object.entries(this.form_dynamic?.form_group.controls ?? []).map(([key, value]:[string, any])=>{
      value.setValue(data[key])
    });

    this.scrollTo('toltipo-info');
    this.id_update = data.id;
    this.state_edith = true;
  }

  public delete():void{
    this._globalService.post_service('', {}).subscribe((response:any) =>{
      if(response.successful){
        
      }
    });
  }

  public open_modal(data:any){
    this.data_modal = data;
    this.state_edith = false;
    this.modal_herramientas?.open_modal();
    this.datatablePrestamos?.renderData.next(data.prestamos);
    this.form_dynamic?.form_group.reset();
  }

  public load_update_prestamo({data}:any):void{
    this.tabsetHerramientas?.handler_change_tab('CREAR');
    let formulario:any = this.form_dynamic_prestamos?.form_group.controls;
    Object.keys(formulario).map((key:string) => formulario[key].setValue(data[key]));
    this.form_dynamic_prestamos?.form_group.setControl('id', new FormControl(data.id, Validators.required));

    formulario['id_user'].setValue(this.list_users.find(item => item.id == data.id_user)?.nombre_completo.toUpperCase());
  }

  public close_modal(){
    this.modal_herramientas?.close_modal();
  }

  ngOnInit(): void {
    this.inputs = [
      {
        title: 'DATOS BÁSICOS',
        description: 'Información básica del activo a registrar',
        inputs: [
          {value: null, name: 'nombre_herramienta', icon: 'cil-baseball', label: 'Herramienta', attributes: {type: 'text'}},
          {value: null, name: 'referencia', icon: 'cil-barcode', label: 'Referencia', attributes: {type: 'text'}},
          {value: null, name: 'marca', icon: 'cil-barcode', label: 'Marca', attributes: {type: 'text'}},
          {value: null, name: 'estado', icon: 'cil-notes', label: 'Estado', attributes: {type: 'text', list: 'datalist_estados'}},
          {value: null, name: 'codigo', icon: 'cil-notes', label: 'Código', attributes: {type: 'text'}},
        ]
      },
    ];

    this.inputs_prestamos = [
      {
        title: 'PRESTAMOS',
        description: 'Datos básicos del prestamo',
        inputs: [
          {value: null, name: 'id_user', icon: 'cil-user', label: 'Colaborador (prestatario)', attributes: {type: 'text', list: 'datalist_user'}},
          {value: null, name: 'tipo_prestamo', icon: 'cil-color-border', label: 'Tipo', attributes: {type: 'text', list: 'datalist_tipo_prestamo'}},
          {value: null, name: 'observacion', icon: 'cil-notes', label: 'Observación', attributes: {type: 'text'}},
          {value: null, name: 'fec_prestamo', icon: 'cil-calendar', label: 'Fecha del prestamo', attributes: {type: 'date'}},
        ]
      },
    ];

    this._globalService.get_service('/herramienta/lista_herramientas').subscribe((response:any)=>{
      if(response.successful){
        this.datatableHerramientas?.renderData?.next(response.data);
      }
      this.loading = false;
    })

    this._globalService.get_service('/user/lista_users?id=').subscribe({
      next: (response:any)=>{
        if(response.successful) this.list_users = response.data;
<<<<<<< HEAD
        console.log(response);
=======
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
      }
    })

    // setTimeout(() => {
    // let response = {
    //   "successful": true,
    //   "data": [
    //       {
    //           "id": 1,
    //           "nombre_herramienta": "Martillo",
    //           "referencia": "prueba",
    //           "marca": "gato",
    //           "estado": "Nuevo",
    //           "codigo": "MA_001",
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "prestamos": [
    //               {
    //                   "id": 4,
    //                   "id_herramienta": 1,
    //                   "id_user": 2,
    //                   "tipo_prestamo": "Devolucion",
    //                   "observacion": "nada v3",
    //                   "fec_prestamo": "2023-01-03 00:00:00.000 +00:00",
    //                   "createdAt": "2023-04-22 17:08:32.205 +00:00",
    //                   "updatedAt": "2023-04-22 17:21:50.792 +00:00",
    //                   "nombre_completo": "adasfddgfadgf"
    //               },
    //               {
    //                   "id": 3,
    //                   "id_herramienta": 1,
    //                   "id_user": 2,
    //                   "tipo_prestamo": "Prestamo",
    //                   "observacion": "nada v2",
    //                   "fec_prestamo": "2023-01-03 00:00:00.000 +00:00",
    //                   "createdAt": "2023-04-17 17:57:03.805 +00:00",
    //                   "updatedAt": "2023-04-17 17:57:21.504 +00:00",
    //                   "nombre_completo": "adasfddgfadgf"
    //               },
    //               {
    //                   "id": 2,
    //                   "id_herramienta": 1,
    //                   "id_user": 2,
    //                   "tipo_prestamo": "Devolicion",
    //                   "observacion": "ninguna",
    //                   "fec_prestamo": "2023-03-03",
    //                   "createdAt": null,
    //                   "updatedAt": null,
    //                   "nombre_completo": "adasfddgfadgf"
    //               },
    //               {
    //                   "id": 1,
    //                   "id_herramienta": 1,
    //                   "id_user": 1,
    //                   "tipo_prestamo": "Prestamo",
    //                   "observacion": "ninguna",
    //                   "fec_prestamo": "2023-02-22",
    //                   "createdAt": null,
    //                   "updatedAt": null,
    //                   "nombre_completo": "adasfddgfadgf"
    //               }
    //           ]
    //       },
    //       {
    //           "id": 2,
    //           "nombre_herramienta": "taladro",
    //           "referencia": "",
    //           "marca": "",
    //           "estado": "Nuevo",
    //           "codigo": "CE_001",
    //           "createdAt": "2023-04-17 05:20:51.261 +00:00",
    //           "updatedAt": "2023-04-17 05:21:27.758 +00:00",
    //           "prestamos": []
    //       },
    //       {
    //           "id": 3,
    //           "nombre_herramienta": "taladro3",
    //           "referencia": "fer0002",
    //           "marca": "waller",
    //           "estado": "Nuevo",
    //           "codigo": "CE_003",
    //           "createdAt": "2023-04-22 16:21:01.454 +00:00",
    //           "updatedAt": "2023-04-22 16:27:48.023 +00:00",
    //           "prestamos": []
    //       }
    //   ]
    // };
    //   this.datatableHerramientas?.renderData?.next(response.data);
    //   this.loading = false;
    // }, 500);
  }
}
