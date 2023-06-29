import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit {

  constructor(private _globalService: GlobalService){}

  public inputs:any[] = [];
  public loading:boolean = true;
  public id_update:string = '';
  public list_unidades:any[] = [];
  public state_edith:boolean = false;
  public closeLoading = {count_request: 0, total_request: 2};

  @ViewChild('alert_inventario') alert_inventario:AlertComponent | null = null;
  @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null;
  @ViewChild('datatableInventario') datatableInventario:DatatableComponent | null = null

  public createUpdateInventario(data:any):void{
    this.loading = true;
    data.id_unidad = this.list_unidades.find(item => item.unidades == data.id_unidad)?.id;

    this._globalService.post_service('/inventario_material/insert_inventario_material', {...data, id: this.id_update}).subscribe((response:any)=>{
      if(response.successful){
        if(this.state_edith){
          this.datatableInventario?.renderData.next(
            this.datatableInventario?.renderData.getValue().map(item => item.id == this.id_update ? response.data[0] : item)
          )
        }else this.datatableInventario?.renderData?.next([...this.datatableInventario?.renderData.getValue(),response.data[0]]);

        this.form_dynamic?.form_group.reset();
        this.alert_inventario?.open_alert('¡Se ha realizado la operación con éxito!');
      }else this.alert_inventario?.open_alert(response.error ?? '¡Ingresa los valores correctamente!');
      this.id_update = '';
      this.loading = false;
      this.state_edith = false;
      this.alert_inventario?.close_alert(10000);
    })
  }

  public handlerEdith(data:any):void{
    this.state_edith = true;

    let {id, cantidad, nombre_material, valor_unidad, descripccion, id_unidad} = data;
    id_unidad = this.list_unidades.find(item => item.id == data.id_unidad)?.unidades;

    this.id_update = id;

    this.form_dynamic?.form_group.setValue({cantidad, nombre_material, valor_unidad, descripccion, id_unidad})
   
    this.scrollTo();
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

  public close_loading():void{
    this.closeLoading.count_request++;
    if(this.closeLoading.total_request == this.closeLoading.count_request) this.loading = false
  }

  ngOnInit(): void {

    this.inputs = [
      {
        title: 'DATOS BÁSICOS',
        description: 'Información básica del activo a registrar',
        inputs: [
          {value: null, name: 'nombre_material', icon: 'cil-user', label: 'Material', attributes: {type: 'text'}},
          {value: null, name: 'id_unidad', icon: 'cil-barcode', label: 'Tipo', attributes: {type: 'text', list:"datalist_unidades"}},
          {value: null, name: 'cantidad', icon: 'cil-barcode', label: 'Cantidad', attributes: {type: 'number'}},
          {value: null, name: 'valor_unidad', icon: 'cil-money', label: 'Valor por unidad', attributes: {type: 'number'}},
          {value: null, name: 'descripccion', icon: 'cil-notes', label: 'Descripción', attributes: {type: 'text'}},
        ]
      },
    ];

    this._globalService.get_service('/inventario_material/lista_inventario_unidades?id=').subscribe({
      next: (response:any)=>{
        if(response.successful) this.list_unidades = response.data;
        this.close_loading();
      },
      error: ()=> this.close_loading()
    });

    this._globalService.get_service('/inventario_material/lista_inventario_material?id=').subscribe({
      next: (response:any)=>{
        if(response.successful){
          this.datatableInventario?.renderData?.next(response.data);
        }
        this.close_loading();
      },
      error: ()=>{}
    });

    // setTimeout(() => {
    //   let response = {
    //     "successful": true,
    //     "data": [
    //         {
    //             "id": 1,
    //             "nombre_material": "puntillas 1 pulgada",
    //             "cantidad": 94,
    //             "valor_unidad": 110,
    //             "descripccion": "nada",
    //             "id_unidad": 1,
    //             "createdAt": null,
    //             "updatedAt": "2023-04-24 02:39:49.085 +00:00",
    //             "unidades": "Unidades"
    //         },
    //         {
    //             "id": 2,
    //             "nombre_material": "cable",
    //             "cantidad": 1,
    //             "valor_unidad": 200000.5,
    //             "descripccion": "nada 2",
    //             "id_unidad": "2",
    //             "createdAt": "2023-04-08 03:08:29.780 +00:00",
    //             "updatedAt": "2023-04-08 03:08:47.753 +00:00",
    //             "unidades": "Metros"
    //         },
    //         {
    //             "id": 3,
    //             "nombre_material": "cemente",
    //             "cantidad": 89,
    //             "valor_unidad": 50000,
    //             "descripccion": "nada 3",
    //             "id_unidad": 1,
    //             "createdAt": null,
    //             "updatedAt": "2023-04-24 02:39:49.096 +00:00",
    //             "unidades": "Unidades"
    //         },
    //         {
    //             "id": 4,
    //             "nombre_material": "cable 2 pulgada",
    //             "cantidad": 1,
    //             "valor_unidad": 200000.5,
    //             "descripccion": "",
    //             "id_unidad": "2",
    //             "createdAt": "2023-04-22 17:41:21.191 +00:00",
    //             "updatedAt": "2023-04-22 17:43:55.100 +00:00",
    //             "unidades": "Metros"
    //         },
    //         {
    //             "id": 5,
    //             "nombre_material": "empanadas ",
    //             "cantidad": 50,
    //             "valor_unidad": 5000,
    //             "descripccion": "mucha hambre",
    //             "id_unidad": "1",
    //             "createdAt": "2023-05-07 01:02:46.822 +00:00",
    //             "updatedAt": "2023-05-07 01:02:46.822 +00:00",
    //             "unidades": "Unidades"
    //         }
    //     ]
    //   }

    //   this.datatableInventario?.renderData?.next(response.data);
    //   this.close_loading();
    //   this.close_loading();
    // }, 1000);
  }
}
