import { User } from './user';
import { Topic } from './topic';
import { Category } from './category';

export interface Course{
    
    id?:number;

    courseTitle:String;

    description:string;

    level:string;

    imgUrl?:string;

    mimetype?:string;
    
    hourLength:number;

    users?: User[];
    
    category?: Category;

    //subcategories:SubCategory[];

    topics?: Topic[];

    userAdmin?:User

    url?: string
}