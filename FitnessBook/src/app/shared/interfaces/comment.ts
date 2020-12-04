import { IBase } from './base';
import { IUser } from './user';

export interface IComment extends IBase{
    content: string
    creator: IUser;
    likes: number;
}