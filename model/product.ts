import { ReviewModel } from './review';

export interface ProductModel {
	name: string;
	price: number;
	discount?: number;
	description: string;
	images: string[];
	categoryId: number;
	sku: number;
	reviews: ReviewModel[]
}