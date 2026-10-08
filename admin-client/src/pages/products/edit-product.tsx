import { useEffect, useState, type FormEvent } from "react";
import { getProductById, updateProduct } from "../../services/products.services.ts";
import type { Category } from "../../types/app.types";
import { getCategories } from "../../services/category.services";

interface ProductForm {
	name: string;
	slug: string;
	description: string;
	category_id: string;
}

const EditProduct = () => {
	const [formData, setFormData] = useState<ProductForm>({
		name: "",
		slug: "",
		description: "",
		category_id: "",
	});

	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch product ID 1
	useEffect(() => {
		getProductById(1)
			.then((product) => {
				setFormData({
					name: product.name || "",
					slug: product.slug || "",
					description: product.description || "",
					category_id: String(product.category_id || ""),
				});
			})
			.catch((error) => {
				console.error("Failed to fetch product:", error);
			})
			.finally(() => {
				setLoading(false);
			});

		getCategories()
			.then((data) => {
				setCategories(data);
			})
			.catch((error) => {
				console.error("Failed to fetch categories:", error);
			});
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await updateProduct(1, formData);

			alert("Product updated successfully!");
		} catch (error) {
			console.error("Failed to update product:", error);
			alert("Failed to update product");
		}
	};

	if (loading) {
		return <p>Loading product...</p>;
	}

	return (
		<div className="app-content">
			<div className="container-fluid">

				<div className="app-content-header">
					<h3>Edit Product</h3>
				</div>

				<div className="card">
					<div className="card-body">

						<form onSubmit={handleSubmit}>

							{/* Product Name */}
							<div className="mb-3">
								<label className="form-label">
									Product Name
								</label>

								<input
									type="text"
									name="name"
									className="form-control"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Slug */}
							<div className="mb-3">
								<label className="form-label">
									Slug
								</label>

								<input
									type="text"
									name="slug"
									className="form-control"
									value={formData.slug}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Description */}
							<div className="mb-3">
								<label className="form-label">
									Description
								</label>

								<textarea
									name="description"
									className="form-control"
									rows={4}
									value={formData.description}
									onChange={handleChange}
								/>
							</div>

							{/* Category */}
							<div className="mb-3">
								<label className="form-label">
									Category
								</label>

								<select
									name="category_id"
									className="form-select"
									value={formData.category_id}
									onChange={handleChange}
									required
								>
									<option value="">
										Select Category
									</option>

									{categories.map((category) => (
										<option
											key={category.id}
											value={category.id}
										>
											{category.title}
										</option>
									))}
								</select>
							</div>

							<button
								type="submit"
								className="btn btn-primary"
							>
								Update Product
							</button>

						</form>

					</div>
				</div>

			</div>
		</div>
	);
};

export default EditProduct;