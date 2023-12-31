import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PremiereCopieService } from '../../dashboard/services/premiere-copie.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private baseUrl = environment.baseUrl+'/premierCopies';
  private Url = environment.baseUrl;

  constructor( private http:HttpClient) { }

  SearchCertificateByIdPremierCopie(idPremierCopie: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/?idPremierCopie=${idPremierCopie}`)
   
  }

  getAllCertificates():Observable<any>{
    return this.http.get(`${this.baseUrl}`)
  }

   SearchCertificateByNomEnfant(nomEnfant: any, PrenomsEnfant: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/nomEnfant?NomEnfant=${nomEnfant}&PrenomsEnfant=${PrenomsEnfant}`)
 
  }
   SearchCertificate(serach:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/?q=${serach}`)
  }

  getAllHistoriques(): Observable<any>{
    return this.http.get(`${this.baseUrl}/historiques`)
  }

  addDemandeCertificates(demande : any): Observable<any>{
    return this.http.post(`${this.Url}/DemandeEtatCivil`, demande);
  }
}
