
import {
	useEffect,
	useState,
	type ChangeEvent,
	type FormEvent,
} from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

interface Product {
	id: number;
	name: string;
	slug: string;
}

interface Variant {
	id: number;
	variant_name: string;
	variant_type: string;
	variant_value: string;
}

interface ProductImage {
	id: number;
	product_id: number;
	variant_id: number | null;
	filename: string;
	size: string;
	upload_path: string;

	product: {
		id: number;
		name: string;
	};

	variant: {
		id: number;
		variant_name: string;
		variant_type: string;
		variant_value: string;
	} | null;
}

const EditProductImage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [imageData, setImageData] =
		useState<ProductImage | null>(null);

	const [products, setProducts] = useState<Product[]>([]);
	const [variants, setVariants] = useState<Variant[]>([]);

	const [search, setSearch] = useState("");
	const [selectedProduct, setSelectedProduct] =
		useState<Product | null>(null);

	const [productId, setProductId] = useState("");
	const [variantId, setVariantId] = useState("");

	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState("");

	const [loading, setLoading] = useState(true);
	const [loadingProducts, setLoadingProducts] = useState(false);
	const [loadingVariants, setLoadingVariants] = useState(false);
	const [updating, setUpdating] = useState(false);

	/*
		Fetch product image
	*/
	useEffect(() => {
		if (!id) {
			return;
		}
	
        const getProductImage = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `http://localhost:3000/product-images/${id}`
                );

                console.log("Product image API response:", response.data);

                const data = response.data.image;

                if (!data) {
                    throw new Error(
                        "Product image data was not found in API response"
                    );
                }

                setImageData(data);

                // -----------------------------
                // Product
                // -----------------------------

                setProductId(data.product_id.toString());

                if (data.product) {
                    setSelectedProduct({
                        id: Number(data.product.id),
                        name: data.product.name,
                        slug: data.product.slug ?? "",
                    });

                    setSearch(data.product.name);
                } else {
                    console.warn(
                        "Product information was not included in API response"
                    );

                    setSearch("");
                }

                // -----------------------------
                // Variant
                // -----------------------------

                if (data.variant_id) {
                    setVariantId(data.variant_id.toString());
                } else {
                    setVariantId("");
                }

                // -----------------------------
                // Existing image
                // -----------------------------

                if (data.upload_path) {
                    setPreview(
                        `http://localhost:3000/${data.upload_path.replace(
                            /\\/g,
                            "/"
                        )}`
                    );
                }

                // -----------------------------
                // Load variants
                // -----------------------------

                await getVariants(Number(data.product_id));

            } catch (error) {
                console.error(
                    "Failed to load product image:",
                    error
                );

                alert("Failed to load product image.");
            } finally {
                setLoading(false);
            }
        };

		getProductImage();
	}, [id]);

	/*
		Get variants for selected product
	*/
	const getVariants = async (productId: number) => {
		try {
			setLoadingVariants(true);

			const response = await axios.get(
				`http://localhost:3000/product-variants/product/${productId}`
			);

			const data =
				response.data.variants ?? response.data;

			setVariants(data);
		} catch (error) {
			console.error(
				"Failed to load variants:",
				error
			);

			setVariants([]);
		} finally {
			setLoadingVariants(false);
		}
	};

	/*
		Search products
	*/
	useEffect(() => {
		// Don't search when showing the existing selected product
		if (
			!search.trim() ||
			(selectedProduct &&
				search === selectedProduct.name)
		) {
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

			const data =
				response.data.products ?? response.data;

			setProducts(data);
		} catch (error) {
			console.error(
				"Failed to search products:",
				error
			);

			setProducts([]);
		} finally {
			setLoadingProducts(false);
		}
	};

	/*
		Select product
	*/
	const handleProductSelect = (product: Product) => {
		setSelectedProduct(product);
		setProductId(product.id.toString());

		setSearch(product.name);

		setProducts([]);

		// Reset variant
		setVariantId("");
		setVariants([]);

		getVariants(product.id);
	};

	/*
		Select new image
	*/
	const handleImageChange = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];

		if (!file) {
			return;
		}

		setImage(file);

		const imageUrl = URL.createObjectURL(file);

		setPreview(imageUrl);
	};

	/*
		Update product image
	*/
	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		if (!id) {
			return;
		}

		if (!productId) {
			alert("Please select a product.");
			return;
		}

		try {
			setUpdating(true);

			const formData = new FormData();

			formData.append("product_id", productId);

			// Variant is optional
			if (variantId) {
				formData.append(
					"variant_id",
					variantId
				);
			} else {
				// Send empty value so backend can set it to null
				formData.append("variant_id", "");
			}

			// Only send image if user selected a new one
			if (image) {
				formData.append("image", image);
			}

			await axios.put(
				`http://localhost:3000/product-images/${id}`,
				formData
			);

			alert(
				"Product image updated successfully."
			);

			navigate("/product-images");

		} catch (error) {
			console.error(
				"Failed to update product image:",
				error
			);

			alert(
				"Failed to update product image."
			);
		} finally {
			setUpdating(false);
		}
	};

	if (loading) {
		return (
			<div className="app-content">
				<div className="container-fluid">
					<div className="text-center p-5">
						Loading product image...
					</div>
				</div>
			</div>
		);
	}

	if (!imageData) {
		return (
			<div className="app-content">
				<div className="container-fluid">
					<div className="alert alert-danger">
						Product image not found.
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="app-content">
			<div className="container-fluid">

				{/* Header */}
				<div className="app-content-header">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-6">
								<h3 className="mb-0">
									Edit Product Image
								</h3>
							</div>

							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item">
										Home
									</li>

									<li className="breadcrumb-item">
										Product Images
									</li>

									<li className="breadcrumb-item active">
										Edit
									</li>
								</ol>
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
									Edit Product Image
								</h3>
							</div>

							<form onSubmit={handleSubmit}>

								<div className="card-body">

									{/* Product */}
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
												setSearch(
													e.target.value
												);

												if (
													selectedProduct &&
													e.target.value !==
														selectedProduct.name
												) {
													setSelectedProduct(
														null
													);

													setProductId("");

													setVariantId(
														""
													);

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
														maxHeight:
															"250px",
														overflowY:
															"auto",
													}}
												>
													{products.map(
														(product) => (
															<button
																type="button"
																key={
																	product.id
																}
																className="list-group-item list-group-item-action"
																onClick={() =>
																	handleProductSelect(
																		product
																	)
																}
															>
																<strong>
																	{
																		product.name
																	}
																</strong>

																<br />

																<small className="text-muted">
																	ID:{" "}
																	{
																		product.id
																	}
																</small>
															</button>
														)
													)}
												</div>
											)}

										{loadingProducts && (
											<small className="text-muted">
												Searching products...
											</small>
										)}

									</div>

									{/* Selected product */}
									{selectedProduct && (
										<div className="alert alert-info">
											<strong>
												Selected Product:
											</strong>{" "}
											{
												selectedProduct.name
											}

											<br />

											<small>
												Product ID:{" "}
												{
													selectedProduct.id
												}
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
												setVariantId(
													e.target.value
												)
											}
											disabled={
												!selectedProduct ||
												loadingVariants
											}
										>
											<option value="">
												No variant / General
												product image
											</option>

											{variants.map(
												(variant) => (
													<option
														key={
															variant.id
														}
														value={
															variant.id
														}
													>
														{
															variant.variant_name
														}

														{" - "}

														{
															variant.variant_type
														}

														{variant.variant_value
															? `: ${variant.variant_value}`
															: ""}
													</option>
												)
											)}
										</select>

										{loadingVariants && (
											<small className="text-muted">
												Loading variants...
											</small>
										)}

									</div>

									{/* Current / New Image */}
									<div className="form-group mb-3">

										<label htmlFor="image">
											Product Image
										</label>

										<input
											type="file"
											id="image"
											className="form-control"
											accept="image/*"
											onChange={
												handleImageChange
											}
										/>

										<small className="text-muted">
											Leave empty to keep
											the existing image.
										</small>

									</div>

									{/* Preview */}
									{preview && (
										<div className="mb-3">

											<label>
												Image Preview
											</label>

											<div>
												<img
													src={preview}
													alt={
														imageData.filename
													}
													style={{
														width: "220px",
														height: "220px",
														objectFit:
															"cover",
														borderRadius:
															"8px",
														border:
															"1px solid #ddd",
													}}
												/>
											</div>

											{image && (
												<small className="text-muted d-block mt-2">
													New image:{" "}
													{
														image.name
													}
												</small>
											)}

											{!image && (
												<small className="text-muted d-block mt-2">
													Current image:{" "}
													{
														imageData.filename
													}
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
										disabled={updating}
									>
										{updating
											? "Updating..."
											: "Update Product Image"}
									</button>

									<button
										type="button"
										className="btn btn-secondary ms-2"
										onClick={() =>
											navigate(
												"/product-images"
											)
										}
									>
										Cancel
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

export default EditProductImage;
