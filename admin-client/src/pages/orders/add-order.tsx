import { useState, type FormEvent } from "react";

interface UserOption {
	id: string;
	label: string;
}

// Replace with users/carts fetched from your API
const users: UserOption[] = [
	{ id: "1", label: "john_doe" },
	{ id: "2", label: "jane_smith" },
	{ id: "3", label: "alex_lee" },
];

const ORDER_STATUSES = ["pending", "processing", "completed", "cancelled"] as const;
type OrderStatus = (typeof ORDER_STATUSES)[number];

interface OrderFormState {
	user_id: string;
	cart_id: string;
	amount: string;
	order_status: OrderStatus;
	remarks: string;
	cancel_reason: string;
}

function AddOrder() {
	const [form, setForm] = useState<OrderFormState>({
		user_id: users[0]?.id ?? "",
		cart_id: "",
		amount: "",
		order_status: "pending",
		remarks: "",
		cancel_reason: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (!form.user_id || !form.cart_id.trim() || !form.amount.trim()) {
			setError("User, cart, and amount are required.");
			return;
		}
		if (form.order_status === "cancelled" && !form.cancel_reason.trim()) {
			setError("Cancel reason is required when status is cancelled.");
			return;
		}

		setSubmitting(true);
		try {
			const payload = {
				user_id: form.user_id,
				cart_id: form.cart_id,
				amount: Number(form.amount),
				order_status: form.order_status,
				remarks: form.remarks || null,
				cancel_reason: form.order_status === "cancelled" ? form.cancel_reason : null,
			};

			// Wire this up to your real endpoint:
			// const res = await fetch("/api/orders", {
			//   method: "POST",
			//   headers: { "Content-Type": "application/json" },
			//   body: JSON.stringify(payload),
			// });
			// if (!res.ok) throw new Error("Failed to create order");

			console.log("Submitting order:", payload);
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
							<h1 className="mb-0 fs-3">Add Order</h1>
						</div>
						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="/orders/list">Orders</a></li>
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
							<h3 className="card-title">New Order</h3>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="card-body">
								{error && (
									<div className="alert alert-danger py-2" role="alert">
										{error}
									</div>
								)}

								<div className="row">
									<div className="col-md-6 mb-3">
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

									<div className="col-md-6 mb-3">
										<label htmlFor="cart_id" className="form-label">Cart ID</label>
										<input
											id="cart_id"
											type="number"
											className="form-control"
											value={form.cart_id}
											onChange={(e) => setForm((prev) => ({ ...prev, cart_id: e.target.value }))}
											placeholder="e.g. 42"
											required
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6 mb-3">
										<label htmlFor="amount" className="form-label">Amount</label>
										<div className="input-group">
											<span className="input-group-text">$</span>
											<input
												id="amount"
												type="number"
												step="0.01"
												min="0"
												className="form-control"
												value={form.amount}
												onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
												placeholder="0.00"
												required
											/>
										</div>
									</div>

									<div className="col-md-6 mb-3">
										<label htmlFor="order_status" className="form-label">Status</label>
										<select
											id="order_status"
											className="form-select"
											value={form.order_status}
											onChange={(e) =>
												setForm((prev) => ({ ...prev, order_status: e.target.value as OrderStatus }))
											}
										>
											{ORDER_STATUSES.map((status) => (
												<option key={status} value={status}>{status}</option>
											))}
										</select>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="remarks" className="form-label">Remarks</label>
									<textarea
										id="remarks"
										className="form-control"
										rows={3}
										value={form.remarks}
										onChange={(e) => setForm((prev) => ({ ...prev, remarks: e.target.value }))}
										placeholder="Optional internal note"
									/>
								</div>

								{form.order_status === "cancelled" && (
									<div className="mb-3">
										<label htmlFor="cancel_reason" className="form-label">Cancel Reason</label>
										<input
											id="cancel_reason"
											type="text"
											className="form-control"
											value={form.cancel_reason}
											onChange={(e) => setForm((prev) => ({ ...prev, cancel_reason: e.target.value }))}
											placeholder="Why was this order cancelled?"
											required
										/>
									</div>
								)}
							</div>
							<div className="card-footer d-flex gap-2">
								<button type="submit" className="btn btn-primary" disabled={submitting}>
									{submitting ? "Saving…" : "Save Order"}
								</button>
								<a href="/orders/list" className="btn btn-outline-secondary">Cancel</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddOrder;
