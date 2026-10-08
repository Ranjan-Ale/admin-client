import axios from "axios"
import type { Product, ProductForm } from "../types/app.types"
import api from "../utils/api";

export const getProduct = async (): Promise<Product[]> => {
	const response = await axios.get(api.products);
	return response.data;
}

export const saveProduct = async (data: ProductForm): Promise<{ message: string, product: Product}> => {
	const response = await axios.post(api.products, data);
	return response.data;
}

export const getProductById = async (id: number): Promise<Product> => {
	const response = await axios.get(`${api.products}/${id}`);
	return response.data;
}

export const updateProduct = async (id: number, data: ProductForm) => {
	const response = await axios.put(`${api.products}/${id}`, data);
	return response.data;
}

export const deleteProduct = async (id: number) => {
	const response = await axios.delete(`${api.products}/${id}`);
	return response.data;
}