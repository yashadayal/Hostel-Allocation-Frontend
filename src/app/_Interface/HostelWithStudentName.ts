import { Student } from "./Student";
export interface HostelWithStudentName {
    hostelId: number;
    roomNo: number,
    floor: number,
    student: Student,
    name: string;
    rollNo: number;
}