
import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
	id: number;
	user_id: number;
	cart_id: number;
	amount: string;
	order_status: string;
	remarks: string | null;
	cancel_reason: string | null;
	created_at: string;
	updated_at: string;
}

function ListOrders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/orders")
			.then((response) => {
				console.log(response.data.orders);
				setOrders(response.data.orders);
			})
			.catch((error) => {
				console.error("error fetching orders:", error);
			});
	}, []);

	const handleDelete = async (id: number) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this order?"
		);

		if (!confirmDelete) {
			return;
		}

		try {
			await axios.delete(`http://localhost:3000/orders/${id}`);

			// Remove deleted order from the table
			setOrders((currentOrders) =>
				currentOrders.filter((order) => order.id !== id)
			);

			alert("Order deleted successfully");
		} catch (error) {
			console.error("Error deleting order:", error);
			alert("Failed to delete order");
		}
	};

	return (
		<>
			<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Orders</h1>
						</div>

						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item">
										<a href="#">Home</a>
									</li>

									<li className="breadcrumb-item">
										<a href="#">Orders</a>
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
							<h3 className="card-title">Orders</h3>

							<div className="card-tools d-flex gap-2 align-items-center">
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

								<a
									href="/orders/add"
									className="btn btn-sm btn-primary"
								>
									<i
										className="bi bi-plus-lg me-1"
										aria-hidden="true"
									></i>
									Add Order
								</a>
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
											<th>User ID</th>
											<th>Cart ID</th>
											<th>Amount</th>
											<th>Status</th>
											<th>Remarks</th>
											<th>Cancel Reason</th>
											<th>Created At</th>
											<th>Updated At</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>

										{orders.map((order) => (
											<tr key={order.id}>

												<td>{order.id}</td>

												<td>{order.user_id}</td>

												<td>{order.cart_id}</td>

												<td>{order.amount}</td>

												<td>{order.order_status}</td>

												<td>
													{order.remarks ?? "-"}
												</td>

												<td>
													{order.cancel_reason ?? "-"}
												</td>

												<td>{order.created_at}</td>

												<td>{order.updated_at}</td>

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
																	href={`/orders/${order.id}`}
																>
																	Edit
																</a>
															</li>

															<li>
																<button
																	className="dropdown-item"
																	type="button"
																	onClick={() =>
																		handleDelete(order.id)
																	}
																>
																	Delete
																</button>
															</li>

															<li>
																<a
																	className="dropdown-item"
																	href={`/orders/${order.id}`}
																>
																	View Order
																</a>
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

export default ListOrders;

