import { IBase } from './base';
import { IPost } from './post';

export interface IUser extends IBase{
    username:string;
    userInfo:string
    email: string;
    password: string; 
    posts: IPost[];
    friends: IUser[];
}