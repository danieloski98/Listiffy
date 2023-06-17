import { UserModel } from "./User.Model";

export interface ReviewModel {
  businessId: string
  createdAt: string
  id: string;
  images: string[];
  rating: number;
  review: string;
  status: 1;
  user: UserModel;
  userId: string;
}
