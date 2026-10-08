import axios from "axios";
import type { ProductReview } from "../types/app.types";
import api from "../utils/api";

export const getReviews = (): Promise<ProductReview[]> => {
	return axios
		.get(`${api.product_reviews}`)
		.then((response) => {
			return response.data.reviews ?? response.data;
		});
};

export const deleteReview = (id: number) => {
	return axios.delete(`${api.product_reviews}/${id}`);
};

