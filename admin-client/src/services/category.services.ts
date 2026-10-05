import axios from "axios"
import type { Category, CategoryForm } from "../types/app.types"
import api from "../utils/api";

export const getCategories = async (): Promise<Category[]> => {
	const response = await axios.get(api.categories);
	return response.data;
}

export const saveCategory = async (data: CategoryForm): Promise<{ message: string, category: Category}> => {
	const response = await axios.post(api.categories, data);
	return response.data;
}

export const getById = async (id: number): Promise<Category> => {
	const response = await axios.get(`${api.categories}/${id}`);
	return response.data;
}

export const updateCategory = async (id: number, data: CategoryForm) => {
	const response = await axios.put(`${api.categories}/${id}`, data);
	return response.data;
}

export const deleteCategory = async (id: number) => {
	const response = await axios.delete(`${api.categories}/${id}`);
	return response.data;
}