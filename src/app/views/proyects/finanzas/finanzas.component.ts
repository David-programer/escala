import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { TabsetComponent } from 'src/app/components/tabset/tabset.component';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})

export class FinanzasComponent {
  constructor(private _globalService: GlobalService){};

  public loading:boolean = false;
  public data_cotizacion:any = {};
  public update_state:boolean = false;
  public proyecto:any = {material:[]};
  @Input() datalist_proyects:any[] = [];
  public datalist_inventario:any[] = [];
  @Output() closeModal = new EventEmitter<any>();
  public closeLoading = {count_request: 0, total_request: 2};
  @ViewChild('alert_finanzas') alert_finanzas:AlertComponent | null = null;
  @ViewChild('tabset_finanzas') tabset_finanzas:TabsetComponent | null = null;
  @ViewChild('datatable_finanzas') datatable_finanzas:DatatableComponent | null = null;
  @ViewChild('form_dynamic_finanzas') form_dynamic_finanzas:FormDynamicComponent | null = null;

  public inputs_finanzas = [
    {
      title: 'CREAR COTIZACIÓN',
      inputs: [
        {value: null, name: 'tipo', icon: 'cil-puzzle', label: 'Tipo', attributes: {type: 'text', list: 'datalist_tipo_finanzas'}, validators: ['required']},
        {value: null, name: 'concepto', icon: 'cil-notes', label: 'Concepto', attributes: {type: 'text'}, validators: ['required'],},
        {value: null, name: 'valor', icon: 'cil-money', label: 'Valor', attributes: {type: 'number'}},
      ]
    },
  ];

  public inputs_cotizaciones = [
    {
      title: 'CREAR COTIZACIÓN',
      description: 'Ingresa un cotización a un proyecto seleccionado',
      inputs: [
        {value: null, name: 'id_inventario', icon: 'cil-notes', label: 'Inventario', attributes: {type: 'text', list: 'datalist_inventario'}, validators: ['required'],},
        {value: null, name: 'id_proyecto', icon: 'cil-factory', label: 'Proyecto', attributes: {type: 'text',  list: 'datalist_proyects'}, validators: ['required']},
        {value: null, name: 'cantidad', icon: 'cil-money', label: 'Cantidad', attributes: {type: 'number'}, validators: ['required'],},
        {value: null, name: 'valor_unidad', icon: 'cil-money', label: 'Valor (und)', attributes: {type: 'number'}, validators: ['required'],},
      ]
    }
  ]

  public open_proyecto(proyecto:any):any{
    this.proyecto = proyecto;    
    this.datatable_finanzas?.renderData.next(proyecto?.finanzas?.map((item:any)=> this.format_element(item)));

    console.log(this.datalist_proyects);
    this.get_services();
  };

  public get_services():void{
    //INVENTARIO
    this._globalService.get_service('/inventario_material/lista_inventario_material?id=').subscribe({
      next: (response:any)=>{
        if(response.successful) this.datalist_inventario = response.data.map((item:any) => {return {value: item.id, title: item.nombre_material}});
        this.close_loading();
      },
      error: ()=>{}
    });

    //COTIZACIONES
    this._globalService.get_service('/cotizacion/comparativo_cotixentregas?id=').subscribe({
      next: (response:any)=>{
        console.log(response);
      }
    });
  }

  public close_loading():void{
    this.closeLoading.count_request++;
    if(this.closeLoading.total_request == this.closeLoading.count_request) this.loading = false;
  }

  public format_element(item:any):any{
    item.createdAt = item?.createdAt?.split('T')[0];
    return item
  };

  public handler_delete_cotizacion(cotizacion:any):void{
    this.loading = true;
    this._globalService.delete_service(`/finanzas/delete_finanza?id=${cotizacion.id}`).subscribe({
      next:(response:any)=>{
        if(response.successful){
          this.datatable_finanzas?.renderData.next(
            this.datatable_finanzas?.renderData.getValue().filter(item =>{
              return item.id != cotizacion.id
            })
          );

          this.alert_finanzas?.open_alert('¡Se ha realizado la acción con éxito!');
        }else this.alert_finanzas?.open_alert(response.error ?? '¡Error al realizar la acción!');

        this.alert_finanzas?.close_alert(10000);
        this.loading = false;
      }
    })
  }

  public handler_update_cotizacion(cotizacion:any):void{
    this.update_state = true;
    this.data_cotizacion = cotizacion;
    let {concepto, tipo, valor} = cotizacion;

    this.tabset_finanzas?.handler_change_tab('CREAR INGRESO | EGRESO');
    this.form_dynamic_finanzas?.form_group.setValue({concepto, tipo, valor});
  }

  public create_update_cotizacion(values:any):any{
    this.loading = true;   

    let body= {
      ...values,
      id_proyecto: this.proyecto.id,
      id: this.data_cotizacion.id ?? '',
    };
  
    this._globalService.post_service('/finanzas/insert_finanza', body).subscribe({
      next: (response:any)=>{        
        if(response.successful){
          if(this.update_state){
            this.datatable_finanzas?.renderData.next(
              this.datatable_finanzas?.renderData.getValue().map(item => item.id == response.data[0].id ? this.format_element(response.data[0]) : item)
            );
          }else{
            this.datatable_finanzas?.renderData.next([
              this.format_element(response.data[0]),
              ...this.datatable_finanzas?.renderData.getValue()
            ]);
          }

          this.update_state = false;
          this.form_dynamic_finanzas?.form_group.reset();
          this.tabset_finanzas?.handler_change_tab('FILTRAR INGRESO | EGRESO');
          this.alert_finanzas?.open_alert('¡Se ha realizado la acción con éxito!');
        }else this.alert_finanzas?.open_alert(response.error ?? '¡Error al realizar la acción!');

        this.loading = false;
        this.alert_finanzas?.close_alert(10000);
      }
    });
  }

  public close_modal():void{
    this.update_state = false;
    this.closeModal.emit();
  }
}
