export type CategoryForm = {
	title: string;
	slug: string;
	description: string;
};


// app models

export type Category = {
	id: number;
	title: string;
	slug: string;
	description: string;
	created_at?: string;
	updated_at?: string;
};

export type Product = {
	id: number;
	name: string;
	slug: string;
	description: string;
	category_id: number;
	created_at: string;
	updated_at: string;
};

export type  ProductForm = {
	name: string;
	slug: string;
	description: string;
	category_id: string;
}

export interface ProductReview {
	id: number;
	user_id: number;
	product_id: number;
	product_variant_id: number | null;
	review_title: string;
	description: string | null;
	created_at: string | null;
	updated_at: string | null;
}