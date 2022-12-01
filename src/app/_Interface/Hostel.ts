import { Student } from "./Student";
export interface Hostel {
    hostelId: number;
    roomNo: number,
    floor: number,
    student: Student
}