
const Sidebar = () => {
	return (
		<>
			<aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
				{/* <!--begin::Sidebar Brand--> */}
				<div className="sidebar-brand">
					{/* <!--begin::Brand Link--> */}
					<a href="/" className="brand-link">
						{/* <!--begin::Brand Text--> */}
						<span className="brand-text fw-light">Admin Panel</span>
						{/* <!--end::Brand Text--> */}
					</a>
					{/* <!--end::Brand Link--> */}
				</div>
				{/* <!--end::Sidebar Brand--> */}
				{/* <!--begin::Sidebar Search--> */}
				<div className="sidebar-search" role="search">
					<label  className="visually-hidden">Filter menu</label>
					<input
						type="search"
						id="sidebar-search-input"
						className="form-control form-control-sm"
						placeholder="Filter menu…"
						data-lte-toggle="sidebar-search"
						data-lte-target="#navigation"
					/>
					<p className="fs-7 text-secondary mt-2 mb-0" data-lte-search-empty role="status" hidden>
						No matching pages.
					</p>
				</div>
				{/* <!--end::Sidebar Search--> */}
				{/* <!--begin::Sidebar Wrapper--> */}
				<div className="sidebar-wrapper">
					<nav className="mt-2" aria-label="Main navigation">
						{/* <!--begin::Sidebar Menu--> */}
						<ul
							className="nav sidebar-menu flex-column"
							data-lte-toggle="treeview"
							data-accordion="false"
							id="navigation"
						>
							<li className="nav-item">
								<a href="/" className="nav-link active">
									<i className="nav-icon bi bi-speedometer"></i>
									<p>Dashboard</p>
								</a>
							</li>

							<li className="nav-item">
								<a href="#" className="nav-link">
									<i className="nav-icon bi bi-envelope"></i>
									<p>
										Category
										<i className="nav-arrow bi bi-chevron-right"></i>
									</p>
								</a>
								<ul className="nav nav-treeview">
									<li className="nav-item">
										<a href="/categories" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>List Category</p>
										</a>
									</li>
									<li className="nav-item">
										<a href="/categories/add" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>Add Category</p>
										</a>
									</li>
								</ul>
							</li>

							<li className="nav-item">
								<a href="#" className="nav-link">
									<i className="nav-icon bi bi-envelope"></i>
									<p>
										Products
										<i className="nav-arrow bi bi-chevron-right"></i>
									</p>
								</a>
								<ul className="nav nav-treeview">
									<li className="nav-item">
										<a href="/products" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>List Product</p>
										</a>
									</li>
									<li className="nav-item">
										<a href="/products/add" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>Add Product</p>
										</a>
									</li>
								</ul>
							</li>

							<li className="nav-item">
								<a href="#" className="nav-link">
									<i className="nav-icon bi bi-envelope"></i>
									<p>
										Reviews
										<i className="nav-arrow bi bi-chevron-right"></i>
									</p>
								</a>
								<ul className="nav nav-treeview">
									<li className="nav-item">
										<a href="/product-reviews" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>List Reviews</p>
										</a>
									</li>
									<li className="nav-item">
										<a href="/products-reviews/add" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>Add Review</p>
										</a>
									</li>
								</ul>
							</li>

							<li className="nav-item">
								<a href="#" className="nav-link">
									<i className="nav-icon bi bi-envelope"></i>
									<p>
										Orders
										<i className="nav-arrow bi bi-chevron-right"></i>
									</p>
								</a>
								<ul className="nav nav-treeview">
									<li className="nav-item">
										<a href="/orders" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>List Orders</p>
										</a>
									</li>
									<li className="nav-item">
										<a href="/orders/add" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>Add Order</p>
										</a>
									</li>
								</ul>
							</li>

							<li className="nav-item">
								<a href="#" className="nav-link">
									<i className="nav-icon bi bi-people"></i>
									<p>
										Product Images
										<i className="nav-arrow bi bi-chevron-right"></i>
									</p>
								</a>
								<ul className="nav nav-treeview">
									<li className="nav-item">
										<a href="/product-images" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>List Product Images</p>
										</a>
									</li>
									<li className="nav-item">
										<a href="/product-images/add" className="nav-link">
											<i className="nav-icon bi bi-circle"></i>
											<p>Add Product Images</p>
										</a>
									</li>
								</ul>
							</li>

							{/* <li className="nav-item">
								<a href="/product-images" className="nav-link">
									<i className="nav-icon bi bi-people"></i>
									<p>Product Images</p>
								</a>
							</li> */}

							<li className="nav-item">
								<a href="/users" className="nav-link">
									<i className="nav-icon bi bi-people"></i>
									<p>Users</p>
								</a>
							</li>

						</ul>
					</nav>
				</div>
			</aside>
		</>
	)
}

export default Sidebar;