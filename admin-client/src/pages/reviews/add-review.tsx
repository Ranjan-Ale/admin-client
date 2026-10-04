import { useState, type FormEvent } from "react";

interface Option {
	id: string;
	label: string;
}

// Replace with data fetched from your API
const users: Option[] = [
	{ id: "1", label: "john_doe" },
	{ id: "2", label: "jane_smith" },
	{ id: "3", label: "alex_lee" },
];

const products: Option[] = [
	{ id: "1", label: "Fielder Wool Coat" },
	{ id: "2", label: "Ridge Low Sneaker" },
	{ id: "3", label: "Canvas Tote, Waxed" },
];

const variants: Option[] = [
	{ id: "1", label: "Size L" },
	{ id: "2", label: "Size 8" },
	{ id: "3", label: "Natural" },
];

interface ReviewFormState {
	user_id: string;
	product_id: string;
	product_variant_id: string;
	review_title: string;
	description: string;
}

function AddReview() {
	const [form, setForm] = useState<ReviewFormState>({
		user_id: users[0]?.id ?? "",
		product_id: products[0]?.id ?? "",
		product_variant_id: variants[0]?.id ?? "",
		review_title: "",
		description: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (!form.user_id || !form.product_id || !form.product_variant_id || !form.review_title.trim()) {
			setError("User, product, variant, and title are required.");
			return;
		}

		setSubmitting(true);
		try {
			const payload = {
				user_id: form.user_id,
				product_id: form.product_id,
				product_variant_id: form.product_variant_id,
				review_title: form.review_title,
				description: form.description || null,
			};

			// Wire this up to your real endpoint:
			// const res = await fetch("/api/reviews", {
			//   method: "POST",
			//   headers: { "Content-Type": "application/json" },
			//   body: JSON.stringify(payload),
			// });
			// if (!res.ok) throw new Error("Failed to create review");

			console.log("Submitting review:", payload);
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
							<h1 className="mb-0 fs-3">Add Review</h1>
						</div>
						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="/reviews/list">Reviews</a></li>
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
							<h3 className="card-title">New Review</h3>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="card-body">
								{error && (
									<div className="alert alert-danger py-2" role="alert">
										{error}
									</div>
								)}

								<div className="row">
									<div className="col-md-4 mb-3">
										<label htmlFor="user_id" className="form-label">User</label>
										<select
											id="user_id"
											className="form-select"
											value={form.user_id}
											onChange={(e) => setForm((prev) => ({ ...prev, user_id: e.target.value }))}
											required
										>
											{users.map((u) => (
												<option key={u.id} value={u.id}>{u.label}</option>
											))}
										</select>
									</div>

									<div className="col-md-4 mb-3">
										<label htmlFor="product_id" className="form-label">Product</label>
										<select
											id="product_id"
											className="form-select"
											value={form.product_id}
											onChange={(e) => setForm((prev) => ({ ...prev, product_id: e.target.value }))}
											required
										>
											{products.map((p) => (
												<option key={p.id} value={p.id}>{p.label}</option>
											))}
										</select>
									</div>

									<div className="col-md-4 mb-3">
										<label htmlFor="product_variant_id" className="form-label">Variant</label>
										<select
											id="product_variant_id"
											className="form-select"
											value={form.product_variant_id}
											onChange={(e) => setForm((prev) => ({ ...prev, product_variant_id: e.target.value }))}
											required
										>
											{variants.map((v) => (
												<option key={v.id} value={v.id}>{v.label}</option>
											))}
										</select>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="review_title" className="form-label">Review Title</label>
									<input
										id="review_title"
										type="text"
										className="form-control"
										value={form.review_title}
										onChange={(e) => setForm((prev) => ({ ...prev, review_title: e.target.value }))}
										placeholder="e.g. Runs true to size"
										required
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<textarea
										id="description"
										className="form-control"
										rows={4}
										value={form.description}
										onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
										placeholder="Optional full review text"
									/>
								</div>
							</div>
							<div className="card-footer d-flex gap-2">
								<button type="submit" className="btn btn-primary" disabled={submitting}>
									{submitting ? "Saving…" : "Save Review"}
								</button>
								<a href="/reviews/list" className="btn btn-outline-secondary">Cancel</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddReview;
