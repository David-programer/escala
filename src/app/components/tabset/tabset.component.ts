import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.css']
})

export class TabsetComponent implements OnInit {
  @Input() tabs:any[] = [];
  public tab:string|null = null;
  @Input() default:string|null = null;

  public handler_change_tab(tab:string):void{
    document.getElementById(this.tab ?? '')?.classList.add('hidden');    
    document.getElementById(tab)?.classList.remove('hidden');
  
    this.tab = tab;
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById('content-tabset')?.childNodes.forEach((item:any, index:number)=>{

        if(this.default == null && index == 0){ this.tab = item.id; return }
        else if(item.id == this.default){this.tab = item.id; return};
        
        item.classList.add('hidden');
      })
    }, 0);
  }
}
