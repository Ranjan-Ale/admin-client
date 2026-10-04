import { useState, type FormEvent } from "react";

interface Category {
	id: string;
	title: string;
}

// Replace with categories fetched from your API (GET /api/categories)
const categories: Category[] = [
	{ id: "1", title: "Outerwear" },
	{ id: "2", title: "Footwear" },
	{ id: "3", title: "Accessories" },
	{ id: "4", title: "Home Goods" },
];

interface ProductFormState {
	name: string;
	slug: string;
	description: string;
	category_id: string;
	image: File | null;
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "");
}

function AddProduct() {
	const [form, setForm] = useState<ProductFormState>({
		name: "",
		slug: "",
		description: "",
		category_id: categories[0]?.id ?? "",
		image: null,
	});
	const [slugTouched, setSlugTouched] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleNameChange(value: string) {
		setForm((prev) => ({
			...prev,
			name: value,
			slug: slugTouched ? prev.slug : slugify(value),
		}));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (!form.name.trim() || !form.slug.trim() || !form.category_id) {
			setError("Name, slug, and category are required.");
			return;
		}

		setSubmitting(true);
		try {
			const body = new FormData();
			body.append("name", form.name);
			body.append("slug", form.slug);
			body.append("description", form.description);
			body.append("category_id", form.category_id);
			if (form.image) body.append("image", form.image);

			// Wire this up to your real endpoint:
			// const res = await fetch("/api/products", { method: "POST", body });
			// if (!res.ok) throw new Error("Failed to create product");

			console.log("Submitting product:", Object.fromEntries(body));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setSubmitting(false);
		}
	}

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
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="/products/list">Products</a></li>
									<li className="breadcrumb-item active" aria-current="page">Add</li>
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
									<div className="alert alert-danger py-2" role="alert">
										{error}
									</div>
								)}

								<div className="mb-3">
									<label htmlFor="name" className="form-label">Name</label>
									<input
										id="name"
										type="text"
										className="form-control"
										value={form.name}
										onChange={(e) => handleNameChange(e.target.value)}
										placeholder="e.g. Fielder Wool Coat"
										required
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="slug" className="form-label">Slug</label>
									<input
										id="slug"
										type="text"
										className="form-control"
										value={form.slug}
										onChange={(e) => {
											setSlugTouched(true);
											setForm((prev) => ({ ...prev, slug: e.target.value }));
										}}
										placeholder="fielder-wool-coat"
										required
									/>
									<div className="form-text">Auto-filled from the name — edit if you need something different.</div>
								</div>

								<div className="mb-3">
									<label htmlFor="category_id" className="form-label">Category</label>
									<select
										id="category_id"
										className="form-select"
										value={form.category_id}
										onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
										required
									>
										{categories.map((c) => (
											<option key={c.id} value={c.id}>{c.title}</option>
										))}
									</select>
								</div>

								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<textarea
										id="description"
										className="form-control"
										rows={4}
										value={form.description}
										onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
										placeholder="Optional details shown on the product page"
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="image" className="form-label">Product Image</label>
									<input
										id="image"
										type="file"
										accept="image/*"
										className="form-control"
										onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.files?.[0] ?? null }))}
									/>
									<div className="form-text">Stored via the product_images table — swap for your upload flow.</div>
								</div>
							</div>
							<div className="card-footer d-flex gap-2">
								<button type="submit" className="btn btn-primary" disabled={submitting}>
									{submitting ? "Saving…" : "Save Product"}
								</button>
								<a href="/products/list" className="btn btn-outline-secondary">Cancel</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddProduct;
