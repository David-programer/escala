  // public state_edith:boolean = false;

  // @ViewChild('form_dynamic') form_dynamic:FormDynamicComponent | null = null;
  // @ViewChild('alert_cotizaciones') alert_cotizaciones:AlertComponent | null = null;
  // @ViewChild('datatable_cotizaciones') datatable_cotizaciones:DatatableComponent | null = null;

  // public handler_reset():void{
  //   this.state_edith = false;
  //   this.form_dynamic?.form_group.reset();
  // }

  // public create_or_update($event:any):void{
  //   let id_inventario = this.datalist_inventario.find(item => item.title.toLowerCase().trim() == $event.id_inventario.toLowerCase().trim())?.value,
  //   codigo_proyecto = $event.id_proyecto.split('-')[0].trim(),
  //   id_proyecto = this.datalist_proyects.find(proyect => proyect.codigo == codigo_proyecto)?.value;

  //   if(!id_inventario || !id_proyecto){
  //     this.alert_cotizaciones?.open_alert('¡Digita los valores correctamente!');
  //     return
  //   };

  //   let body = {...$event, id: '', id_proyecto, id_inventario}

  //   this._globalService.post_service('/cotizacion/insert_cotizacion', body).subscribe({
  //     next: (response:any)=>{
  //       console.log(response);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.get_services();

  //   this.inputs = [
  //     {
  //       title: 'CREAR COTIZACIÓN',
  //       description: 'Ingresa un cotización a un proyecto seleccionado',
  //       inputs: [
  //         {value: null, name: 'id_inventario', icon: 'cil-notes', label: 'Inventario', attributes: {type: 'text', list: 'datalist_inventario'}, validators: ['required'],},
  //         {value: null, name: 'id_proyecto', icon: 'cil-factory', label: 'Proyecto', attributes: {type: 'text',  list: 'datalist_proyects'}, validators: ['required']},
  //         {value: null, name: 'cantidad', icon: 'cil-money', label: 'Cantidad', attributes: {type: 'number'}, validators: ['required'],},
  //         {value: null, name: 'valor_unidad', icon: 'cil-money', label: 'Valor (und)', attributes: {type: 'number'}, validators: ['required'],},
  //       ]
  //     },
  //   ];
  // }
