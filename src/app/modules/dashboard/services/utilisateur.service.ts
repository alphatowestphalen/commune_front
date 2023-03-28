import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

    
private baseURl = environment.baseUrl+'/users'

constructor(private http: HttpClient) { }

getAllUsers(size: number, page: number):Observable<any>{
    return this.http.get(`${this.baseURl}?page=${page}&size=${size}`)
}

addUser(user:Object): Observable<any>{
    return this.http.post(`${this.baseURl}`, user)
}


updateUser(user:Object, id:number):Observable<any>{
    return this.http.put(`${this.baseURl}/${id}`,user);
}

deleteUser(id:number){
    return this.http.delete(`${this.baseURl}/${id}`)
}
}