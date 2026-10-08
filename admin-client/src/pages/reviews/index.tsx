import { useEffect, useState } from "react";
import type { ProductReview } from "../../types/app.types";
import {
	getReviews,
	deleteReview
} from "../../services/review.services";

function ListReviews() {
	const [reviews, setReviews] = useState<ProductReview[]>([]);

	const loadReviews = () => {
		getReviews()
			.then((_reviews: ProductReview[]) => {
				setReviews(_reviews);
			})
			.catch((err) => {
				console.log("Get reviews failed.", err);
			});
	};

	const onClickDelete = (id: number, idx: number) => {
		deleteReview(id)
			.then(() => {
				setReviews([
					...reviews.slice(0, idx),
					...reviews.slice(idx + 1)
				]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		loadReviews();
	}, []);

	return (
		<>
			<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Reviews</h1>
						</div>

						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item">
										<a href="#">Home</a>
									</li>

									<li className="breadcrumb-item">
										<a href="#">Reviews</a>
									</li>

									<li
										className="breadcrumb-item active"
										aria-current="page"
									>
										List
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
							<h3 className="card-title">
								Product Reviews
							</h3>

							<div className="card-tools">
								<div
									className="input-group input-group-sm"
									style={{ width: "16rem" }}
								>
									<span className="input-group-text">
										<i
											className="bi bi-search"
											aria-hidden="true"
										></i>
									</span>

									<input
										id="table-filter"
										type="search"
										className="form-control"
										placeholder="Filter rows..."
										aria-label="Filter rows"
									/>
								</div>
							</div>
						</div>

						<div className="card-body">

							<div className="d-flex gap-2 mb-3">

								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									<i
										className="bi bi-filetype-csv me-1"
										aria-hidden="true"
									></i>
									Export CSV
								</button>

								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									<i
										className="bi bi-filetype-json me-1"
										aria-hidden="true"
									></i>
									Export JSON
								</button>

								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									<i
										className="bi bi-printer me-1"
										aria-hidden="true"
									></i>
									Print
								</button>

							</div>

							<div
								className="tabulator-tableholder"
								tabIndex={0}
								style={{ height: "490px" }}
							>

								<table className="table table-striped table-hover">

									<thead>
										<tr>
											<th>ID</th>
											<th>User ID</th>
											<th>Product ID</th>
											<th>Variant ID</th>
											<th>Review Title</th>
											<th>Description</th>
											<th>Created At</th>
											<th>Updated At</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>

										{reviews.length > 0 ? (
											reviews.map(
												(
													review: ProductReview,
													idx: number
												) => (
													<tr key={review.id}>

														<td>
															{review.id}
														</td>

														<td>
															{review.user_id}
														</td>

														<td>
															{review.product_id}
														</td>

														<td>
															{review.product_variant_id ??
																"No variant"}
														</td>

														<td>
															{review.review_title}
														</td>

														<td>
															{review.description ?? ""}
														</td>

														<td>
															{review.created_at ?? ""}
														</td>

														<td>
															{review.updated_at ?? ""}
														</td>

														<td>
															<div className="dropdown">

																<button
																	className="btn btn-primary btn-sm"
																	data-bs-toggle="dropdown"
																>
																	Action
																</button>

																<ul className="dropdown-menu">

																	<li className="dropdown-item">
																		<a href={`/products-reviews/${review.id}`}>
																			Edit
																		</a>
																	</li>

																	<li className="dropdown-item">

																		<a
																			href="#"
																			onClick={(e) => {
																				e.preventDefault();

																				onClickDelete(
																					review.id,
																					idx
																				);
																			}}
																		>
																			Delete
																		</a>

																	</li>

																</ul>

															</div>
														</td>

													</tr>
												)
											)
										) : (
											<tr>
												<td
													colSpan={9}
													className="text-center"
												>
													No reviews found
												</td>
											</tr>
										)}

									</tbody>

								</table>

							</div>
						</div>

						<div className="card-footer text-secondary small">
							Showing {reviews.length} review
							{reviews.length !== 1 ? "s" : ""}
						</div>

					</div>

				</div>
			</div>
		</>
	);
}

export default ListReviews;