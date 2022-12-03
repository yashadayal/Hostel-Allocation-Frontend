import {AfterViewInit, Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { HostelService } from 'src/app/_services/hostel.service';
import { UpdateFormComponent } from './update-form/update-form.component';
import { Hostel } from 'src/app/_Interface/Hostel';
import { Student } from 'src/app/_Interface/Student';
import { HostelWithStudentName } from 'src/app/_Interface/HostelWithStudentName';

@Component({
  selector: 'app-hostel-table',
  templateUrl: './hostel-table.component.html',
  styleUrls: ['./hostel-table.component.css']
})
export class HostelTableComponent {
  //Table column names
  hostelColumns: string[] = ['hostelId', 'floor', 'roomNumber', 'studentName', 'update', 'unallocate'];
  public dataSourceHostel = new MatTableDataSource<HostelWithStudentName>();
  constructor(public hostelService: HostelService, public dialog: MatDialog) {
    
  }
  //Loaded when page is loaded
  ngAfterViewInit() {
    this.getTableData();
  }

  public getTableData = () => {
        this.hostelService.getRooms()
          .subscribe(res => {
            // this.dataSourceHostel.data = res as Hostel[];
            var newDataSourceHostel = new Array((res as Hostel[]).length);
            for (var hostel of res as HostelWithStudentName[]) {
              var newHostel = ({} as any) as HostelWithStudentName;
              var student = ({} as any) as Student;
              newHostel.hostelId = hostel.hostelId;
              newHostel.floor = hostel.floor;
              newHostel.roomNo = hostel.roomNo;
              newHostel.name =  "Unallocated"
              if(hostel.student != null){
                student.rollNo = hostel.student.rollNo;
                newHostel.rollNo = hostel.student.rollNo;
                newHostel.name = hostel.student.firstName+" "+hostel.student.lastName;
              }
              newHostel.student = student;
              newDataSourceHostel.push(newHostel);
            }
            this.dataSourceHostel.data = newDataSourceHostel.filter(n => n) as HostelWithStudentName[]; 
            // console.log(this.dataSourceHostel.data);
          })
      }

  public applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHostel.filter = filterValue.trim().toLowerCase();
  }

  public openUpdateDialog = (element: any) => {
        const dialogRef = this.dialog.open(UpdateFormComponent, { data: { element: element, operation: "update"},
      });
        dialogRef.afterClosed().subscribe(result => {;
          this.getTableData();
          setTimeout(()=>this.refresh(), 2000);
        });
      }
      
    public openAllocateDialog = (element: any) => {
      const dialogRef = this.dialog.open(UpdateFormComponent, { data: { element: element, operation: "allocate"},  height: '400px',
      width: '600px' });
      dialogRef.afterClosed().subscribe(result => {;
        this.getTableData();
        setTimeout(()=>this.refresh(), 2000);
      });
    }

    public unallocateRoom = (element: HostelWithStudentName) => {
      element.student = ({} as any) as Student;
      var hostel = ({} as any) as Hostel;
      var student = ({} as any) as Student;
      hostel.floor = element.floor;
      hostel.hostelId = element.hostelId;
      hostel.roomNo = element.roomNo;
      hostel.student = student;
      this.hostelService.updateHostel(element.hostelId, hostel).subscribe({
        next: (response: any) => {
          alert("Room got unallocated!");
          this.refresh();
        },
        error: (error: any) => {
          console.log("Error: ", error);
          this.refresh();
        }
      })
    }

    refresh() {
      console.log("refresh");
      this.getTableData();
    }

    public addRoom()
    {
      alert("Please enter the floor and room number to add new room!");
      var floor = prompt("Enter floor: ", ""); 
      var roomNo = prompt("Enter room number: ", ""); 
      var hostel = ({} as any) as Hostel;
      var student = ({} as any) as Student;
      hostel.floor = Number(floor);
      hostel.roomNo = Number(roomNo);
      hostel.student = student;//with or without this student is set as NULL
      this.hostelService.addRoom(hostel).subscribe({
        next: (response: any)=> {
          this.refresh();
        },
        error: (error: any)=> {
          alert("Room added successfully!");
          this.refresh();
        }
      });
    }
}