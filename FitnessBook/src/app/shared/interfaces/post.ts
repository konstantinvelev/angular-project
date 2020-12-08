import { IBase } from './base';
import { IComment } from './comment';
import { IUser } from './user';

export interface IPost<T = string>  extends IBase{
    title: string;
    imageUrl:string;
    description: string;
    userId: IUser;
    likes: string[];
    comments: IComment[];
}   