import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})

export class DatatableComponent implements OnInit{

  
  @Input() data:any[] = [];
  @Input() buttons:any[] = [];
  @Input() keys:any[string] = [];
  public search_input:string = '';
  @Input() titles:any[string] = [];
  @Output() clickEmit = new EventEmitter<any>();
  public renderData:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public output_click(event:any):void
  {
    this.clickEmit.emit(event);
  }

  public search():void{
    this.renderData?.next(
      this.data.filter((element:any) => {
        return Object.entries(element).map(([key, value]: [string, any]) => (value != null || value != undefined ) && value.toString().toLocaleLowerCase().trim().includes(this.search_input.toLocaleLowerCase().trim())).some(item => item)
      })
    )
  }

  ngOnInit(): void {
    // this.renderData.next(this.data);
    this.data = this.renderData.getValue();

    this.renderData.subscribe((value:any)=> {
      console.log(value);
      document.querySelectorAll('#datatable-body').forEach((value)=>{
        value?.classList.add('animation-datatable');
        setTimeout(() => {value?.classList.remove('animation-datatable')}, 2000);
      })
    })
  }
}
