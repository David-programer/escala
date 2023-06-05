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

  public output_click(event:any){
    this.clickEmit.emit(event);
  }

  public search(){
    this.renderData?.next(
      this.renderData.getValue().map((element:any) => {
        Object.entries(element).filter(([key, item]: [string, any]) => {
          return (item != null || item != undefined ) && item.toString().toLocaleLowerCase().trim().includes(this.search_input.toLocaleLowerCase().trim())
        });
      })
    )
  }

  ngOnInit(): void {
    // this.renderData.next(this.data);
    this.renderData.subscribe(()=> {
      document.querySelectorAll('#datatable-body').forEach((value)=>{
        value?.classList.add('animation-datatable');
        setTimeout(() => {value?.classList.remove('animation-datatable')}, 2000);
      })
    })
  }
}
