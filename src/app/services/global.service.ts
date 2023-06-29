import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
    
    private url:string;

    constructor(public _http: HttpClient){
        this.url = environment.url;
    }

    public post_service(url:string, settings:any, resType?:any){        
<<<<<<< HEAD
        // let token  = localStorage.getItem('token'); 
=======
        let token  = localStorage.getItem('token'); 
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
        return this._http.post(
            `${this.url}${url}`, {...settings}, 
            {
                responseType: resType, 
<<<<<<< HEAD
                // headers: {Authorization: 'Bearer '  + token}
=======
                headers: {Authorization: 'Bearer '  + token}
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
            }
        )
    }

<<<<<<< HEAD
    public get_service(url:string){        
        return this._http.get(`${this.url}${url}`, 
        // {
        //     headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        //     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        //     }
        // }
=======
    public get_service(url:string){  
        let token  = localStorage.getItem('token'); 
        return this._http.get(`${this.url}${url}`, {
            headers: {Authorization: 'Bearer '  + token}
        }
>>>>>>> dbb364b1fecdf211d4f02f3e3074bc0c813894fa
        )
    }
}