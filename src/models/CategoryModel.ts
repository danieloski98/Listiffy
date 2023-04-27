export interface CategoryModel {
    id: string;
    category: string;
    createdAt: string;
}

export interface ServiceModel {
    id: string;
    service: string;
    createdAt: string;
    categoryId: string;
}