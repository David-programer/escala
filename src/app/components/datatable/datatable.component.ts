import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})

export class DatatableComponent implements OnInit{

  public renderData = new BehaviorSubject<any>([]);

  @Input() data:any[] = [];
  @Input() buttons:any[] = [];
  @Input() keys:any[string] = [];
  @Input() titles:any[string] = [];

  ngOnInit(): void {
    this.renderData.next(this.data);
  }
}
