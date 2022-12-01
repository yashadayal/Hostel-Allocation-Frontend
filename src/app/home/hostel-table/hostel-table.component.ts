import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { HostelService } from 'src/app/_services/hostel.service';
import { UpdateFormComponent } from './update-form/update-form.component';
import swal from 'sweetalert2'; 
import { Hostel } from 'src/app/_Interface/Hostel';
import { elementAt } from 'rxjs';
import { Student } from 'src/app/_Interface/Student';

@Component({
  selector: 'app-hostel-table',
  templateUrl: './hostel-table.component.html',
  styleUrls: ['./hostel-table.component.css']
})
export class HostelTableComponent {
  hostelColumns: string[] = ['floor', 'roomNumber', 'studentName', 'update', 'unallocate'];
  public dataSourceHostel = new MatTableDataSource<Hostel>();

  constructor(public hostelService: HostelService, public dialog: MatDialog) {
    
  }

  ngAfterViewInit() {
    this.getTableData();
  }

  public getTableData = () => {
        this.hostelService.getRooms()
          .subscribe(res => {
            console.log("res", res);
            this.dataSourceHostel.data = res as Hostel[];
          })
      }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHostel.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHostel.paginator) {
      this.dataSourceHostel.paginator.firstPage();
    }
  }

  public openUpdateDialog = (element: any) => {
        const dialogRef = this.dialog.open(UpdateFormComponent, { data: { element: element, operation: "update"},
        // height: '400px',
        // width: '600px' 
      });
        dialogRef.afterClosed().subscribe(result => {;
          this.getTableData();
        });
      }
      
    public openAllocateDialog = (element: any) => {
      const dialogRef = this.dialog.open(UpdateFormComponent, { data: { element: element, operation: "allocate"},  height: '400px',
      width: '600px' });
      dialogRef.afterClosed().subscribe(result => {;

        this.refresh();
      });
    }

    public unallocateRoom = (element: Hostel) => {
      element.student = ({} as any) as Student;
      this.hostelService.updateHostel(element.hostelId, element).subscribe({
        next: (response: any) => {
          alert("Room got unallocated!");
        },
        error: (error: any) => {
          console.log("Error: ", error);
        }
      })
    }

    refresh() {
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
      hostel.student = student;
      this.hostelService.addRoom(hostel).subscribe({
        next: (response: any)=> {
          alert("Room added successfully!");
          this.refresh();
        },
        error: (error: any)=> {
          console.log("Error:" , error);
        }
      });
    }
}