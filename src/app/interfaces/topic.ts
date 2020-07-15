import { Course } from './course';
import { User } from './user';

export interface Topic{
    id?:number;

    topicTitle:string;

    description:string;

    type:string;

    content:string;

    course?:Course;
    
    users?:User[];
}