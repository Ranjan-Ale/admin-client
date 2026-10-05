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

export type product = {
	id: number;
	name: string;
	slug: string;
	description: string;
	category_id: number;
	created_at: string;
	updated_at: string;
};