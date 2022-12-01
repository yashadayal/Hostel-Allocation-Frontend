import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environments'
import { Employee } from '../_Interface/Employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpClient: HttpClient) { }


  public authenticate(employeeDetails: Employee){
    return this.httpClient.post(`${baseUrl}/api/login/auth`, employeeDetails);
  }
}
