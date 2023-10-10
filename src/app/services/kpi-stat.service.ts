import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiStatService {
  url:string="http://127.0.0.1:8080/stat";
  constructor(private http: HttpClient) { }

  getKPI():Observable<any>{
    return this.http.get(this.url);
  }
}
