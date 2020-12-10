import { IBase } from './base';
import { IPost } from './post';
import { IUser } from './user';

export interface IComment<T = string>  extends IBase{
    content: string
    userId: IUser;
    postId: IPost;
    likes: IUser[];
}