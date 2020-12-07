import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AwsResponse } from '../models/aws-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { KennethCootaucoInfoResponse } from '../models/kenneth-cootauco-info-response';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  private url = environment.infoUrl;

  constructor(protected http: HttpClient) { }

  getSiteInformation(): Observable<KennethCootaucoInfoResponse> {

    const headers = {
      "Content-Type": "application/json"
    }

    return this.http.get<KennethCootaucoInfoResponse>(this.url, { headers: headers });
  }

}
