import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-dynamic',
  templateUrl: './form-dynamic.component.html',
  styleUrls: ['./form-dynamic.component.css']
})
export class FormDynamicComponent implements OnInit {
  constructor(){}
  
  @Input() inputs:any[] = [];
  public form_group = new FormGroup({});
  @Output() submitEvent = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

  public submit():void{
    this.submitEvent.emit(this.form_group.value);
  }

  public reset_values():void{
    let values:any = {};
    Object.keys(this.form_group.controls).map(key => values[key] = null);

    this.form_group.setValue(values);
    this.reset.emit();
  }

  ngOnInit(): void {
    this.inputs?.forEach(section => {

      section.inputs.forEach((item:any) => {
        this.form_group.setControl(item.name, new FormControl(item.value))
        
        setTimeout(() => {
          Object.entries(item.attributes).map(([key, value]: [string, any])=> {
            document.getElementById(item.name)?.setAttribute(key, value);
          });
        }, 200);
      });
      
    })
  }
}
