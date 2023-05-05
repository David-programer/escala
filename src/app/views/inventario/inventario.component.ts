import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';

@Component({
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit {

  constructor(private _globalService: GlobalService){}

  public inputs:any[] = [];
  public loading:boolean = true;
  public list_unidades:any[] = [];
  public state_edith:boolean = false;
  public closeLoading = {count_request: 0, total_request: 2};

  @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null;
  @ViewChild('datatableInventario') datatableInventario:DatatableComponent | null = null


  public createUpdateInventario(data:any):void{
    this._globalService.post_service('/inventario_material/insert_inventario_material', {...data, id: null}).subscribe((response:any)=>{
      if(response.successful){
        
      }
      console.log(response);
    })
  }

  public handlerEdith(data:any):void{
    this.state_edith = true;

    let {cantidad, nombre_material, valor_unidad, descripccion, id_unidad} = data;
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
      error: ()=>{}
    });

    this._globalService.get_service('/inventario_material/lista_inventario_material?id=').subscribe({
      next: (response:any)=>{
        if(response.successful){
          this.datatableInventario?.renderData.next(response.data);
        }
        this.close_loading();
      },
      error: ()=>{}
    });
  }
}
