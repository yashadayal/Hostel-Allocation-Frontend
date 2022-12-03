import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environments'
import { Hostel } from '../_Interface/Hostel';
import { Student } from '../_Interface/Student';


@Injectable({
  providedIn: 'root'
})
export class HostelService {

  constructor(public httpClient: HttpClient) { }

  public getRooms(){
    return this.httpClient.get(`${baseUrl}/api/hostel/rooms`);
  }

  public updateHostel(hostelId: number, hostelDetails: Hostel){
    console.log(hostelId, hostelDetails);
    return this.httpClient.put(`${baseUrl}/api/hostel/update/${hostelId}`, hostelDetails);
  }

  public addRoom(hostelDetails: Hostel){
    return this.httpClient.post(`${baseUrl}/api/hostel/add`, hostelDetails);
  }
}
