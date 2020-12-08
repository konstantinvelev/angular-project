import { IBase } from './base';
import { IUser } from './user';

export interface IComment<T = string>  extends IBase{
    content: string
    creator: IUser;
    likes: number;
}