import { formatCurrency } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
  @Output() closeModal = new EventEmitter<any>();
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

  public open_proyecto(proyecto:any):any{
    this.proyecto = proyecto;    
    this.datatable_finanzas?.renderData.next(proyecto?.finanzas?.map((item:any)=> this.format_element(item)));
  };

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

    this.tabset_finanzas?.handler_change_tab('CREAR COTIZACIONES');
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
          this.tabset_finanzas?.handler_change_tab('FILTRAR COTIZACIONES');
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
