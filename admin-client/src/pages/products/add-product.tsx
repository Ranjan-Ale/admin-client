
import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "../../types/app.types";
import { getCategories } from "../../services/category.services";
import axios from "axios";

interface ProductForm {
	name: string;
	slug: string;
	description: string;
	category_id: string;
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function AddProduct() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [form, setForm] = useState<ProductForm>({
		name: "",
		slug: "",
		description: "",
		category_id: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		getCategories()
			.then((data) => {
				setCategories(data);

				if (data.length > 0) {
					setForm((prev) => ({
						...prev,
						category_id: String(data[0].id),
					}));
				}
			})
			.catch(() => {
				setError("Failed to load categories.");
			});
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleNameChange = (value: string) => {
		setForm((prev) => ({
			...prev,
			name: value,
			slug: slugify(value),
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await axios.post("http://localhost:3000/products", form);

			alert("Product saved successfully.");

			setForm({
				name: "",
				slug: "",
				description: "",
				category_id: categories.length > 0 ? String(categories[0].id) : "",
			});
		} catch (err) {
			console.log(err);
			setError("Failed to save product.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Add Product</h1>
						</div>

						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item">
										<a href="#">Home</a>
									</li>
									<li className="breadcrumb-item">
										<a href="/products/list">Products</a>
									</li>
									<li className="breadcrumb-item active">
										Add
									</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
			</div>

			<div className="app-content">
				<div className="container-fluid">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">New Product</h3>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="card-body">

								{error && (
									<div className="alert alert-danger">
										{error}
									</div>
								)}

								<div className="mb-3">
									<label className="form-label">Name</label>
									<input
										type="text"
										name="name"
										className="form-control"
										value={form.name}
										onChange={(e) => handleNameChange(e.target.value)}
										required
									/>
								</div>

								<div className="mb-3">
									<label className="form-label">Slug</label>
									<input
										type="text"
										name="slug"
										className="form-control"
										value={form.slug}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="mb-3">
									<label className="form-label">Category</label>
									<select
										name="category_id"
										className="form-select"
										value={form.category_id}
										onChange={handleChange}
										required
									>
										<option value="">Select Category</option>

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

								<div className="mb-3">
									<label className="form-label">Description</label>
									<textarea
										name="description"
										className="form-control"
										rows={4}
										value={form.description}
										onChange={handleChange}
									/>
								</div>

							</div>

							<div className="card-footer">
								<button
									type="submit"
									className="btn btn-primary"
									disabled={loading}
								>
									{loading ? "Saving..." : "Save Product"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddProduct;

