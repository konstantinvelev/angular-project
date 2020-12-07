import { IBase } from './base';
import { IComment } from './comment';
import { IUser } from './user';

export interface IPost extends IBase{
    title: string;
    imageUrl:string;
    description: string;
    creator: IUser;
    likes: string[];
    comments: IComment[];
}