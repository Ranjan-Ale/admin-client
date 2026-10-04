import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
	id: number;
	user_id: number;
	product_id: number;
	variant_id: number | null;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
}

function ListReviews() {
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/product-reviews")
			.then((response) => {
				console.log(response.data);
				setReviews(response.data);
			})
			.catch((error) => {
				console.error("error fetching reviews:", error);
			});
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
							<h3 className="card-title">Reviews</h3>

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
									id="export-csv"
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
									id="export-json"
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
									id="print-table"
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
											<th>User</th>
											<th>Product</th>
											<th>Variant</th>
											<th>Title</th>
											<th>Description</th>
											<th>CreatedAt</th>
											<th>UpdatedAt</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>

										{reviews.map((review) => (
											<tr key={review.id}>

												<td>{review.id}</td>

												<td>{review.user_id}</td>

												<td>{review.product_id}</td>

												<td>
													{review.variant_id ?? "-"}
												</td>

												<td>{review.title}</td>

												<td>{review.description}</td>

												<td>{review.created_at}</td>

												<td>{review.updated_at}</td>

												<td>
													<div className="dropdown">

														<button
															className="btn btn-primary btn-sm"
															data-bs-toggle="dropdown"
														>
															Action
														</button>

														<ul className="dropdown-menu">

															<li>
																<a
																	className="dropdown-item"
																	href={`/reviews/edit/${review.id}`}
																>
																	Edit
																</a>
															</li>

															<li>
																<button
																	className="dropdown-item"
																	type="button"
																>
																	Delete
																</button>
															</li>

														</ul>

													</div>
												</td>

											</tr>
										))}

									</tbody>

								</table>
							</div>
						</div>

						<div className="card-footer text-secondary small">
							Powered by{" "}
							<a
								href="https://tabulator.info/"
								target="_blank"
								rel="noopener"
							>
								Tabulator
							</a>
							&mdash; vanilla JS, no jQuery required.
						</div>

					</div>
				</div>
			</div>
		</>
	);
}

export default ListReviews;

