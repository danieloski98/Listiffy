import { BusinessModel } from "./BusinessModel";
import { CommentModel } from "./CommentModel";
import { LikeModel } from "./LikeModel";

export interface PostModel {
    id: string;
    user: BusinessModel
    isDraft: boolean
    description: string;
    businessId: string;
    comments: Array<CommentModel>
    images: Array<string>
    likes: Array<LikeModel>
    createdAt: string
    lga: string
    state: string
}