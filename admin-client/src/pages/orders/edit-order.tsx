
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router";
import axios from "axios";

interface OrderForm {
	user_id: string;
	cart_id: string;
	amount: string;
	order_status: string;
	remarks: string;
	cancel_reason: string;
}

const EditOrder = () => {
	const { id } = useParams();

	const [formData, setFormData] = useState<OrderForm>({
		user_id: "",
		cart_id: "",
		amount: "",
		order_status: "pending",
		remarks: "",
		cancel_reason: "",
	});

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	// Fetch order by ID
	useEffect(() => {
		const fetchOrder = async () => {
			try {
				setLoading(true);
				setError("");

				const response = await axios.get(
					`http://localhost:3000/orders/${id}`
				);

				console.log("Order:", response.data);

				// Supports both:
				// { order: {...} }
				// and direct {...}
				const order =
					response.data.order ||
					response.data;

				setFormData({
					user_id: String(order.user_id ?? ""),
					cart_id: String(order.cart_id ?? ""),
					amount: String(order.amount ?? ""),
					order_status: order.order_status ?? "pending",
					remarks: order.remarks ?? "",
					cancel_reason: order.cancel_reason ?? "",
				});
			} catch (error) {
				console.error("Error fetching order:", error);

				setError(
					"Failed to load order. Please try again."
				);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchOrder();
		}
	}, [id]);

	// Handle form changes
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement |
			HTMLSelectElement |
			HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Update order
	const onFormSubmit = async (
		e: FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		setMessage("");
		setError("");

		try {
			setUpdating(true);

			const response = await axios.put(
				`http://localhost:3000/orders/${id}`,
				{
					user_id: Number(formData.user_id),
					cart_id: Number(formData.cart_id),
					amount: formData.amount,
					order_status: formData.order_status,
					remarks: formData.remarks || null,
					cancel_reason:
						formData.cancel_reason || null,
				}
			);

			console.log("Order updated:", response.data);

			setMessage(
				"Order updated successfully!"
			);
		} catch (error) {
			console.error(
				"Error updating order:",
				error
			);

			setError(
				"Failed to update order. Please try again."
			);
		} finally {
			setUpdating(false);
		}
	};

	// Show loading message while fetching
	if (loading) {
		return (
			<>
				<div className="app-content-header">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-6">
								<h1 className="mb-0 fs-3">
									Edit Order
								</h1>
							</div>
						</div>
					</div>
				</div>

				<div className="app-content">
					<div className="container-fluid">
						<div className="alert alert-info">
							Loading order...
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">
								Edit Order
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="app-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">

							<div className="card card-primary">

								<div className="card-header">
									<h3 className="card-title">
										Edit Order Information
									</h3>
								</div>

								<form onSubmit={onFormSubmit}>

									<div className="card-body">

										{/* Success message */}
										{message && (
											<div className="alert alert-success">
												{message}
											</div>
										)}

										{/* Error message */}
										{error && (
											<div className="alert alert-danger">
												{error}
											</div>
										)}

										{/* User ID */}
										<div className="mb-3">
											<label
												htmlFor="user_id"
												className="form-label"
											>
												User ID
											</label>

											<input
												type="number"
												className="form-control"
												id="user_id"
												name="user_id"
												value={formData.user_id}
												onChange={handleChange}
												placeholder="Enter user ID"
												required
											/>
										</div>

										{/* Cart ID */}
										<div className="mb-3">
											<label
												htmlFor="cart_id"
												className="form-label"
											>
												Cart ID
											</label>

											<input
												type="number"
												className="form-control"
												id="cart_id"
												name="cart_id"
												value={formData.cart_id}
												onChange={handleChange}
												placeholder="Enter cart ID"
												required
											/>
										</div>

										{/* Amount */}
										<div className="mb-3">
											<label
												htmlFor="amount"
												className="form-label"
											>
												Amount
											</label>

											<input
												type="number"
												step="0.01"
												min="0"
												className="form-control"
												id="amount"
												name="amount"
												value={formData.amount}
												onChange={handleChange}
												placeholder="Enter amount"
												required
											/>
										</div>

										{/* Order Status */}
										<div className="mb-3">
											<label
												htmlFor="order_status"
												className="form-label"
											>
												Order Status
											</label>

											<select
												className="form-select"
												id="order_status"
												name="order_status"
												value={formData.order_status}
												onChange={handleChange}
											>
												<option value="pending">
													Pending
												</option>

												<option value="processing">
													Processing
												</option>

												<option value="shipped">
													Shipped
												</option>

												<option value="delivered">
													Delivered
												</option>

												<option value="cancelled">
													Cancelled
												</option>
											</select>
										</div>

										{/* Remarks */}
										<div className="mb-3">
											<label
												htmlFor="remarks"
												className="form-label"
											>
												Remarks
											</label>

											<textarea
												className="form-control"
												id="remarks"
												name="remarks"
												value={formData.remarks}
												onChange={handleChange}
												placeholder="Enter remarks"
												rows={3}
											></textarea>
										</div>

										{/* Cancel Reason */}
										<div className="mb-3">
											<label
												htmlFor="cancel_reason"
												className="form-label"
											>
												Cancel Reason
											</label>

											<textarea
												className="form-control"
												id="cancel_reason"
												name="cancel_reason"
												value={
													formData.cancel_reason
												}
												onChange={handleChange}
												placeholder="Enter cancellation reason"
												rows={3}
											></textarea>
										</div>

									</div>

									<div className="card-footer">
										<button
											type="submit"
											className="btn btn-primary"
											disabled={updating}
										>
											{updating
												? "Updating..."
												: "Update Order"}
										</button>
									</div>

								</form>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditOrder;
