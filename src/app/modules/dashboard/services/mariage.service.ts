import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MariageService {

    private baseUrl = environment.baseUrl + '/mariages'

    constructor(private http :HttpClient){}

    addMariage(mariage : Object, homme: String , femme: String):Observable<any>{
      return this.http.post(`${this.baseUrl}/${homme}-${femme}`, mariage);
    }
 
    getAllMariage(size: number, page: number):Observable<any>{
      return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
    }

    getMariageById(idMariage: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${idMariage}`);
    }
    Search(search:string):Observable<any>{
      return this.http.get(`${this.baseUrl}/?q=${search}`);
    }

}