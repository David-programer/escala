import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})

export class HerramientasComponent implements OnInit {

  constructor(private _globalService: GlobalService){}

  public inputs:any[] = [];
  public id_update:string = '';
  public loading:boolean = true;
  public state_edith:boolean = false;
  public closeLoading = {count_request: 0, total_request: 2};

  @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null;
  @ViewChild('datatableHerramientas') datatableHerramientas:DatatableComponent | null = null;

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
        this.form_dynamic?.form_group.reset();
      }
      this.loading = false;
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

    this._globalService.get_service('/herramienta/lista_herramientas').subscribe((response:any)=>{
      if(response.successful){
        this.datatableHerramientas?.renderData?.next(response.data);
      }
      this.loading = false;
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
