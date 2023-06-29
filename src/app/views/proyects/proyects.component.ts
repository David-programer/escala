<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { FormDynamicComponent } from 'src/app/components/form-dynamic/form-dynamic.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { GlobalService } from 'src/app/services/global.service';
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa

@Component({
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
<<<<<<< HEAD
export class ProyectsComponent {

=======
export class ProyectsComponent implements OnInit{

  constructor(private _globalService: GlobalService){}

  public data_modal:any = {};
  public color:any = {'': ''};
  private copy_data:any[] = [];
  public loading:boolean = true;
  public data_estados:any[] = [];
  public data_ciudades:any[] = [];
  public inputs_proyectos:any[] = [];
  public update_state:boolean = false;
  public data_departamentos:any[] = [];
  public close_loading = {count:0, request: 3}
  public data = new BehaviorSubject<any[]>([]);

  @ViewChild('modal_form') modal_form:ModalComponent | null = null;
  @ViewChild('modal_info') modal_info:ModalComponent | null = null;
  @ViewChild('alert_proyectos') alert_proyectos:AlertComponent | null = null;
  @ViewChild('form_dynamic_proyecos') form_dynamic_proyecos:FormDynamicComponent | null = null;

  public open_modal(){
    this.data_modal = {};
    this.form_dynamic_proyecos?.form_group.reset();
    this.modal_form?.open_modal();
  }

  public close_modal():void{
    this.update_state = false;
    this.modal_form?.close_modal();
    this.form_dynamic_proyecos?.form_group.reset();
  }

  public search_by({value}:any){
    this.data.next(
      this.copy_data.filter(item =>{
        return Object.values(item).some((item:any)=> typeof item == 'string' ? item.toUpperCase()?.includes(value.toUpperCase()) : false)
      })
    )
  }

  public open_info(proyect:any):void{
    this.data_modal = proyect;
    this.modal_info?.open_modal();
  }

  public handler_update_proyecto(data:any):void{
    this.data_modal = data;
    data.fec_inicio = data.fec_inicio.split(' ')[0];
    data.fec_fin_real = data.fec_fin_real.split(' ')[0];
    data.fec_fin_estimado = data.fec_fin_estimado.split(' ')[0];

    let formGrup:any = this.form_dynamic_proyecos?.form_group;
    data.id_estado = this.data_estados.find(item => item.id == data.id_estado)?.nombre_estado;
    
    Object.keys(formGrup.controls ?? {}).map((key:any) =>{
      formGrup.controls[key].setValue(data[key]);
    });
    
    this.modal_form?.open_modal();
    this.update_state = true;
  }

  public create_proyectos(datos:any):void{
    this.loading = true;

    let data = {
      ...datos,
      id_user: 7,
      id: this.data_modal?.id ?? '',
      id_estado: this.data_estados.find(item => item.nombre_estado == datos.id_estado)?.id
    }

    this._globalService.post_service('/proyecto/insert_proyecto', data).subscribe({
      next: (response:any)=>{
        if(response.successful){
          if(this.update_state){
            this.data.next(
              this.data.getValue().map(item => item.id == response.data[0].id ? this.transform_data(response.data[0]) : item)
            )
          }else this.data.next([this.transform_data(response.data[0]), ...this.data.getValue()]);
          
          this.alert_proyectos?.open_alert('¡Se ha realizado la acción con éxito!');
          this.close_modal();
        }
        else this.alert_proyectos?.open_alert(response.error ?? '!Error al realizar la acción!')

        this.loading = false;
        this.alert_proyectos?.close_alert(10000);
      }
    })
  }

  public transform_data(item:any):any{
    let fecha = new Date(item.fec_fin_estimado).getTime(),
    now_fecha = new Date().getTime();
    item.dias_restantes = Math.floor((fecha - now_fecha) / (1000 * 60 * 60 * 24));
    item.color = item.dias_restantes <= 8 ? 'red' : item.dias_restantes <= 15 ? 'orange': 'green';
    item.total = Number(item.pres_mano_obra) + Number(item.pres_materiales) + Number(item.pres_otros)

    return item
  }

  public closeLoading(){
    this.close_loading.count++;
    if(this.close_loading.count == this.close_loading.request) this.loading = false;
  }

  ngOnInit(): void {
    this.inputs_proyectos = [
      {
        title: 'DATOS BÁSICOS',
        inputs: [
          {value: null, name: 'nombre_proyecto', icon: 'cil-notes', label: 'Nombre', attributes: {type: 'text'}, validators: ['required'],},
          {value: null, name: 'codigo_proyecto', icon: 'cil-barcode', label: 'Código', attributes: {type: 'text'}, validators: ['required'],},
          {value: null, name: 'id_estado', icon: 'cil-barcode', label: 'Estado', attributes: {type: 'text', list: 'datalist-estados'}, validators: ['required'],},
          {value: null, name: 'nombre_cliente', icon: 'cil-user', label: 'Cliente', attributes: {type: 'text'},validators: ['required'],},
          {value: null, name: 'telefono_cliente', icon: 'cil-phone', label: 'Teléfono', attributes: {type: 'text'}, validators: ['required'],},
          {value: null, name: 'pres_mano_obra', icon: 'cil-money', label: '$ Mano de obra', attributes: {type: 'number'}, validators: ['required'],},
          {value: null, name: 'pres_materiales', icon: 'cil-money', label: '$ Materiales', attributes: {type: 'number'}, validators: ['required'],},
          {value: null, name: 'pres_otros', icon: 'cil-money', label: '$ otros', attributes: {type: 'number'}, validators: ['required'],},
          {value: null, name: 'observacion', icon: 'cil-notes', label: 'Observacion', attributes: {type: 'text'}},
        ]
      },
      {
        title: 'DATOS GEOGRÁFICOS',
        inputs: [
          {value: null, name: 'departamento', icon: 'cil-location-pin', label: 'Departamento', attributes: {type: 'text', list: 'datalist-departamentos'}, validators: ['required'],},
          {value: null, name: 'ciudad', icon: 'cil-factory', label: 'Ciudad', attributes: {type: 'text', list: 'datalist-ciudades'}, validators: ['required'],},
          {value: null, name: 'direccion', icon: 'cil-notes', label: 'Dirección', attributes: {type: 'text'}, validators: ['required'],},
        ]
      },
      {
        title: 'FECHAS',
        inputs: [
          {value: null, name: 'fec_inicio', icon: 'cil-calendar', label: 'Fecha Inicio', attributes: {type: 'date'}, validators: ['required'],},
          {value: null, name: 'fec_fin_estimado', icon: 'cil-calendar', label: 'Fecha Estimada', attributes: {type: 'date'}, validators: ['required'],},
          {value: null, name: 'fec_fin_real', icon: 'cil-calendar', label: 'Fecha Real', attributes: {type: 'date'}, validators: ['required'],},
        ]
      },
    ];

    this._globalService.get_service('/proyecto/lista_proyectos?id').subscribe({
      next: (response:any)=>{
        if(response.successful){
          this.copy_data = response.data.map((item:any) => this.transform_data(item)).sort((a:any, b:any) => a.dias_restantes - b.dias_restantes);
          this.data.next(this.copy_data);  
        }
        this.closeLoading();
      }
    });

    this._globalService.get_service('/proyecto/lista_dpt_y_ciudades').subscribe({
      next: (response:any)=>{
        this.data_departamentos = response;
        this.data_ciudades = this.data_departamentos.map(item => item.ciudades).flat();
        this.closeLoading();
      }
    });

    this._globalService.get_service('/proyecto/lista_estados?id=').subscribe({
      next:(response:any)=>{
        this.data_estados = response.data;
        this.closeLoading();
      }
    });
  }
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
}
