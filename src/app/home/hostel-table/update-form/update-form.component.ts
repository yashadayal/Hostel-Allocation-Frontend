import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hostel } from 'src/app/_Interface/Hostel';
import { Student } from 'src/app/_Interface/Student';
import { HostelService } from 'src/app/_services/hostel.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {
  update: boolean = false;
  UpdateForm: FormGroup;
  hostelDetail: Hostel;
  hostel: Hostel = ({} as any) as Hostel;
  student: Student = ({} as any) as Student;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public hostelService: HostelService
  ) {

    this.hostelDetail = data.element;
    if(this.data.element.student == null){
      this.data.element.student = this.student;
    }
    console.log("Received data: ", data);
      this.UpdateForm = this.fb.group({
        roomNo: this.hostelDetail.roomNo,
        floor: this.hostelDetail.floor,
        rollNo: this.hostelDetail.student.rollNo
      });
  }


  ngOnInit(): void {

  }


  public updateHostel(hostelDetails: any) {
    this.hostel.roomNo = hostelDetails.value.roomNo;
    this.hostel.floor = hostelDetails.value.floor;
    this.student.rollNo = hostelDetails.value.rollNo;
    this.hostel.student = this.student;
    this.hostel.hostelId = this.hostelDetail.hostelId;
    console.log("updateHostel: ", this.hostel);
    this.hostelService.updateHostel(this.hostelDetail.hostelId, this.hostel).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}