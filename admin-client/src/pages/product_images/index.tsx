
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductImage {
	id: number;
	product_id: number;
	variant_id: number | null;
	filename: string;
	size: string;
	upload_path: string;
}

const ListProductImages = () => {
	const [images, setImages] = useState<ProductImage[]>([]);
	const [loading, setLoading] = useState(true);

	const loadImages = async () => {
		try {
			setLoading(true);

			const response = await axios.get(
				"http://localhost:3000/product-images"
			);

			const data = response.data.images ?? response.data;

			setImages(data);
		} catch (error) {
			console.error("Failed to load product images:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadImages();
	}, []);

	const handleDelete = async (id: number) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this product image?"
		);

		if (!confirmed) {
			return;
		}

		try {
			await axios.delete(
				`http://localhost:3000/product-images/${id}`
			);

			setImages((prevImages) =>
				prevImages.filter((image) => image.id !== id)
			);

			alert("Product image deleted successfully.");
		} catch (error) {
			console.error("Failed to delete product image:", error);
			alert("Failed to delete product image.");
		}
	};

	const formatSize = (size: string) => {
		const bytes = Number(size);

		if (isNaN(bytes)) {
			return size;
		}

		if (bytes < 1024) {
			return `${bytes} B`;
		}

		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(2)} KB`;
		}

		return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
	};

	return (
		<div className="app-content">
			<div className="container-fluid">

				{/* Page Header */}
				<div className="app-content-header">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-6">
								<h3 className="mb-0">
									Product Images
								</h3>
							</div>

							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item">
										Home
									</li>
									<li className="breadcrumb-item active">
										Product Images
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">

							<div className="card">

								<div className="card-header">
									<div className="card-title">
										All Product Images
									</div>

									<a
										href="/product-images/add"
										className="btn btn-primary float-end"
									>
										<i className="bi bi-plus-lg me-1"></i>
										Add Product Image
									</a>
								</div>

								<div className="card-body p-0">

									{loading ? (
										<div className="text-center p-4">
											Loading product images...
										</div>
									) : images.length === 0 ? (
										<div className="text-center p-4">
											No product images found.
										</div>
									) : (
										<div className="table-responsive">

											<table className="table table-bordered table-hover mb-0">

												<thead>
													<tr>
														<th>#</th>
														<th>Image</th>
														<th>Product ID</th>
														<th>Variant ID</th>
														<th>Filename</th>
														<th>Size</th>
														<th>Actions</th>
													</tr>
												</thead>

												<tbody>
													{images.map(
														(image, index) => (
															<tr key={image.id}>

																<td>
																	{index + 1}
																</td>

																<td>
																	<img
																		src={`http://localhost:3000/${image.upload_path.replace(
																			/\\/g,
																			"/"
																		)}`}
																		alt={
																			image.filename
																		}
																		style={{
																			width: "80px",
																			height: "80px",
																			objectFit:
																				"cover",
																			borderRadius:
																				"6px",
																		}}
																		onError={(
																			e
																		) => {
																			e.currentTarget.src =
																				"/images/no-image.png";
																		}}
																	/>
																</td>

																<td>
																	{
																		image.product_id
																	}
																</td>

																<td>
																	{image.variant_id ??
																		"—"}
																</td>

																<td>
																	{
																		image.filename
																	}
																</td>

																<td>
																	{formatSize(
																		image.size
																	)}
																</td>

																<td>
																	<div className="d-flex gap-2">

																		<a
																			href={`/product-images/${image.id}`}
																			className="btn btn-sm btn-warning"
																		>
																			<i className="bi bi-pencil"></i>
																		</a>

																		<button
																			type="button"
																			className="btn btn-sm btn-danger"
																			onClick={() =>
																				handleDelete(
																					image.id
																				)
																			}
																		>
																			<i className="bi bi-trash"></i>
																		</button>

																	</div>
																</td>

															</tr>
														)
													)}
												</tbody>

											</table>

										</div>
									)}

								</div>

								{!loading && images.length > 0 && (
									<div className="card-footer">
										Showing{" "}
										<strong>{images.length}</strong>{" "}
										product images
									</div>
								)}

							</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default ListProductImages;

