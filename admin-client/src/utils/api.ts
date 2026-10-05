import env from "../environments/env"

const api: Record<string, string> = {
	categories: `${env.baseUrl}/categories`,
	products: `${env.baseUrl}/products`,
	product_reviews: `${env.baseUrl}/product-reviews`,
    orders: `${env.baseUrl}/orders`
}

export default api;