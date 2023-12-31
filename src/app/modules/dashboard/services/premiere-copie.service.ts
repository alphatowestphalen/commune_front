import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PremiereCopieService {


  private baseUrl = environment.baseUrl+'/premierCopies';

  constructor(private http: HttpClient) { }


  getCertificates(size: number, page: number ): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }
  getSearchCertificates(size: number, page: number, query:string ): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}&q=${query}`);
  }

  getCelibataireWithSexe(size: number, page: number ,sexe:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/celibataires?page=${page}&size=${size}&sexeEnfant=${sexe}`);
  }

  getFirstCertificates( ): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  
  getAllPersonliving():Observable<any>{
    return this.http.get(`${this.baseUrl}/living`);
  }


  addFirstCertificates(premiereCopie: Object):Observable<any> {
    return this.http.post(`${this.baseUrl}`,premiereCopie);
  }

  getCertificateByID(idPremierCopie: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/${idPremierCopie}`)
  }

  updateCertificate(id:number, premierCopie: Object): Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`, premierCopie)
  }

  deleteCertificate(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

 
  getLastIdCerticate():Observable<any>{
    return this.http.get(`${this.baseUrl}/LastPremiereCopie`);
  }



}
