import { IBase } from './base';
import { IPost } from './post';

export interface IUser<T = string>  extends IBase{
    username:string;
    userInfo:string
    email: string;
    password: string; 
    posts: IPost[];
}