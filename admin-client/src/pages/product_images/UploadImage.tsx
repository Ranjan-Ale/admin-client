
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

interface Product {
	id: number;
	name: string;
	slug: string;
}

interface Variant {
	id: number;
	name?: string;
	sku?: string;
}

const AddProductImages = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [variants, setVariants] = useState<Variant[]>([]);

	const [search, setSearch] = useState("");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const [productId, setProductId] = useState("");
	const [variantId, setVariantId] = useState("");

	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState("");

	const [loadingProducts, setLoadingProducts] = useState(false);
	const [loadingVariants, setLoadingVariants] = useState(false);
	const [uploading, setUploading] = useState(false);

	// Search products
	useEffect(() => {
		if (!search.trim()) {
			setProducts([]);
			return;
		}

		const timer = setTimeout(() => {
			searchProducts();
		}, 400);

		return () => clearTimeout(timer);
	}, [search]);

	const searchProducts = async () => {
		try {
			setLoadingProducts(true);

			const response = await axios.get(
				"http://localhost:3000/products",
				{
					params: {
						search: search,
					},
				}
			);

			/*
				If your API returns:

				{
					products: [...]
				}

				use response.data.products

				If it directly returns an array, use response.data
			*/

			const data = response.data.products ?? response.data;

			setProducts(data);
		} catch (error) {
			console.error("Failed to search products:", error);
			setProducts([]);
		} finally {
			setLoadingProducts(false);
		}
	};

	// Select product
	const handleProductSelect = (product: Product) => {
		setSelectedProduct(product);
		setProductId(product.id.toString());

		// Clear previous variant
		setVariantId("");
		setVariants([]);

		// Load variants for this product
		getVariants(product.id);

		// Hide search results
		setSearch(product.name);
		setProducts([]);
	};

	// Get variants
	const getVariants = async (id: number) => {
		try {
			setLoadingVariants(true);

			const response = await axios.get(
				`http://localhost:3000/product-variants/product/${id}`
			);

			const data = response.data.variants ?? response.data;

			setVariants(data);
		} catch (error) {
			console.error("Failed to load variants:", error);
			setVariants([]);
		} finally {
			setLoadingVariants(false);
		}
	};

	// Image selection
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) {
			return;
		}

		setImage(file);

		// Create preview
		const imageUrl = URL.createObjectURL(file);
		setPreview(imageUrl);
	};

	// Submit form
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!productId) {
			alert("Please select a product.");
			return;
		}

		if (!image) {
			alert("Please select an image.");
			return;
		}

		try {
			setUploading(true);

			const formData = new FormData();

			formData.append("product_id", productId);

			// Variant is optional
			if (variantId) {
				formData.append("variant_id", variantId);
			}

			formData.append("image", image);

			await axios.post(
				"http://localhost:3000/product-images",
				formData
			);

			alert("Product image uploaded successfully.");

			// Reset form
			setSearch("");
			setSelectedProduct(null);
			setProductId("");
			setVariantId("");
			setVariants([]);
			setImage(null);
			setPreview("");

		} catch (error) {
			console.error("Failed to upload product image:", error);
			alert("Failed to upload product image.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="app-content">
			<div className="container-fluid">

				{/* Header */}
				<div className="row">
					<div className="col-12">
						<div className="app-content-header">
							<div className="container-fluid">
								<div className="row">
									<div className="col-sm-6">
										<h3 className="mb-0">
											Add Product Image
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="row">
					<div className="col-md-8">

						<div className="card card-primary">

							<div className="card-header">
								<h3 className="card-title">
									Product Image
								</h3>
							</div>

							<form onSubmit={handleSubmit}>

								<div className="card-body">

									{/* Product Search */}
									<div className="form-group mb-3">

										<label htmlFor="productSearch">
											Product
										</label>

										<input
											type="text"
											id="productSearch"
											className="form-control"
											placeholder="Search product..."
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);

												// If user changes the selected product,
												// clear the selected product.
												if (
													selectedProduct &&
													e.target.value !==
														selectedProduct.name
												) {
													setSelectedProduct(null);
													setProductId("");
													setVariantId("");
													setVariants([]);
												}
											}}
										/>

										{/* Search results */}
										{search.trim() !== "" &&
											products.length > 0 &&
											!selectedProduct && (
												<div
													className="list-group mt-1"
													style={{
														maxHeight: "250px",
														overflowY: "auto",
													}}
												>
													{products.map((product) => (
														<button
															type="button"
															key={product.id}
															className="list-group-item list-group-item-action"
															onClick={() =>
																handleProductSelect(
																	product
																)
															}
														>
															<div>
																<strong>
																	{product.name}
																</strong>
															</div>

															<small className="text-muted">
																ID: {product.id}
																{" | "}
																{product.slug}
															</small>
														</button>
													))}
												</div>
											)}

										{/* Loading */}
										{loadingProducts && (
											<small className="text-muted">
												Searching products...
											</small>
										)}

										{/* No products */}
										{!loadingProducts &&
											search.trim() !== "" &&
											products.length === 0 &&
											!selectedProduct && (
												<small className="text-muted">
													No products found.
												</small>
											)}

									</div>

									{/* Selected product */}
									{selectedProduct && (
										<div className="alert alert-info">
											<strong>Selected Product:</strong>{" "}
											{selectedProduct.name}

											<br />

											<small>
												Product ID:{" "}
												{selectedProduct.id}
											</small>
										</div>
									)}

									{/* Variant */}
									<div className="form-group mb-3">

										<label htmlFor="variant">
											Variant{" "}
											<span className="text-muted">
												(Optional)
											</span>
										</label>

										<select
											id="variant"
											className="form-control"
											value={variantId}
											onChange={(e) =>
												setVariantId(e.target.value)
											}
											disabled={
												!selectedProduct ||
												loadingVariants
											}
										>
											<option value="">
												No variant / General product image
											</option>

											{variants.map((variant) => (
												<option
													key={variant.id}
													value={variant.id}
												>
													{variant.name ??
														`Variant #${variant.id}`}
													{variant.sku
														? ` - ${variant.sku}`
														: ""}
												</option>
											))}
										</select>

										{loadingVariants && (
											<small className="text-muted">
												Loading variants...
											</small>
										)}

										{selectedProduct &&
											!loadingVariants &&
											variants.length === 0 && (
												<small className="text-muted">
													This product has no variants.
												</small>
											)}

									</div>

									{/* Image */}
									<div className="form-group mb-3">

										<label htmlFor="image">
											Product Image
										</label>

										<input
											type="file"
											id="image"
											className="form-control"
											accept="image/*"
											onChange={handleImageChange}
										/>

										<small className="text-muted">
											Select JPG, PNG, WEBP or another
											supported image.
										</small>

									</div>

									{/* Image Preview */}
									{preview && (
										<div className="mb-3">

											<label>
												Image Preview
											</label>

											<div>
												<img
													src={preview}
													alt="Preview"
													style={{
														width: "200px",
														height: "200px",
														objectFit: "cover",
														borderRadius: "8px",
														border:
															"1px solid #ddd",
													}}
												/>
											</div>

											{image && (
												<small className="text-muted d-block mt-2">
													{image.name}{" "}
													(
													{(
														image.size /
														1024 /
														1024
													).toFixed(2)}
													{" MB"})
												</small>
											)}

										</div>
									)}

								</div>

								{/* Footer */}
								<div className="card-footer">

									<button
										type="submit"
										className="btn btn-primary"
										disabled={uploading}
									>
										{uploading
											? "Uploading..."
											: "Upload Image"}
									</button>

								</div>

							</form>

						</div>

					</div>
				</div>

			</div>
		</div>
	);
};

export default AddProductImages;
