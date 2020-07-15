import { Course } from './course';

export interface User{
    sub?:number;

    id?: number;

    fullName:string;

    lastName:string;

    email:string;

    password:string;

    admin:boolean
    
    courses?: Course[];
    
    coursesAdmin?:Course[];
}