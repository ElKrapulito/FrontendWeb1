import { Course } from './course';

export interface User{
    id: number;

    fullName:string;

    lastName:string;

    email:string;

    password:string;

    admin:boolean
    
    courses: Course[];
    
    coursesAdmin:Course[];
}