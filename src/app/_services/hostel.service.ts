import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environments'
import { Hostel } from '../_Interface/Hostel';


@Injectable({
  providedIn: 'root'
})
export class HostelService {

  constructor(public httpClient: HttpClient) { }

  public getRooms(){
    return this.httpClient.get(`${baseUrl}/api/hostel/rooms`);
  }

  public updateHostel(roomNo: number, hostelDetails: Hostel){
    return this.httpClient.put(`${baseUrl}/api/hostel/update/${roomNo}`, hostelDetails);
  }

  public addRoom(hostelDetails: Hostel){
    return this.httpClient.post(`${baseUrl}/api/hostel/add`, hostelDetails);
  }
}
