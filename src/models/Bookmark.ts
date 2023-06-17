import { BusinessModel } from "./BusinessModel";
import { PostModel } from "./PostModel";
import { UserModel } from "./User.Model";

export interface BookmarkModel {
    id: string;
    postId: string;
    userId: string;
    createdAt: string;
    post?: PostModel;
    user?: BusinessModel;
}