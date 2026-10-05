import { useEffect, useState } from "react";
import type { Product } from "../../types/app.types";
import { deleteProduct, getProduct } from "../../services/products.servcies";
// import axios from "axios"

// interface Product {
//     id: number;
//     name: string;
//     slug: string;
//     category: string;
//     description: string;
//     created_at: string;
//     updated_at: string;
// }

// function ListProducts() {
// 	const [products, setProducts] = useState<Product[]>([]);

// 	useEffect(() => {
// 		axios.get("http://localhost:3000/products")
// 		.then((response)=>{
// 			console.log(response.data);
// 			setProducts(response.data);
// 		})
// 		.catch((error)=>{
// 			console.error("error fetching products:", error);
// 		});
// 	}, []);

function ListProducts(){
	const [products, setProducts] = useState<Product[]>([])

	const loadProducts = () => {
		getProduct()
			.then((_prods: Product[])=>{
				setProducts(_prods);
			})
			.catch(()=>{
				console.log("get products failed.")
			});
	}
	const onClickDelete = (id: number, idx: number) => {
			deleteProduct(id)
				.then(() => {
					// delete success
					setProducts([
						...products.slice(0, idx),
						...products.slice(idx + 1)
					])
				})
				.catch(err => {
					console.log(err);
				})
		}
	
		useEffect(function () {
			loadProducts();
		}, []);

	return (
		<>
			<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Products</h1>
						</div>
						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="#">Products</a></li>
									<li className="breadcrumb-item active" aria-current="page">List</li>
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
							<h3 className="card-title">Products</h3>
							<div className="card-tools d-flex gap-2 align-items-center">
								<div className="input-group input-group-sm" style={{ width: "16rem" }}>
									<span className="input-group-text">
										<i className="bi bi-search" aria-hidden="true"></i>
									</span>
									<input id="table-filter" type="search" className="form-control"
										placeholder="Filter rows&hellip;" aria-label="Filter rows" />
								</div>
								<a href="/products/add" className="btn btn-sm btn-primary">
									<i className="bi bi-plus-lg me-1" aria-hidden="true"></i>
									Add Product
								</a>
							</div>
						</div>
						<div className="card-body">
							<div className="d-flex gap-2 mb-3">
								<button id="export-csv" type="button" className="btn btn-sm btn-outline-secondary">
									<i className="bi bi-filetype-csv me-1" aria-hidden="true"></i>
									Export CSV
								</button>
								<button id="export-json" type="button" className="btn btn-sm btn-outline-secondary">
									<i className="bi bi-filetype-json me-1" aria-hidden="true"></i>
									Export JSON
								</button>
								<button id="print-table" type="button" className="btn btn-sm btn-outline-secondary">
									<i className="bi bi-printer me-1" aria-hidden="true"></i>
									Print
								</button>
							</div>
							<div className="tabulator-tableholder" tabIndex={0} style={{ height: "490px" }}>
								<table className="table table-striped table-hover">
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Slug</th>
											<th>Description</th>
											<th>CreatedAt</th>
											<th>UpdatedAt</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										
										{ products.length > 0? products.map((product: Product, idx: number) => (
											<tr key={product.id}>
												<td>{product.id}</td>
												<td>{product.name}</td>
												<td>{product.slug}</td>
												<td>{product.description}</td>
												<td>{product.created_at}</td>
												<td>{product.updated_at}</td>
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
																	href={`/products/edit/${product.id}`}
																>
																	Edit
																</a>
															</li>

															<li>
																<button
																	className="dropdown-item"
																	type="button"
																>
																	<a href="#" onClick={(e)=>{
																		e.preventDefault();
																		onClickDelete(product.id, idx);
																	}}>Delete</a>
																</button>
															</li>

															<li>
																<a
																	className="dropdown-item"
																	type="button" href="/product-images"
																>
																	Product Images
																</a>
															</li>
														</ul>
													</div>
												</td>
											</tr>
										)): null
									}
									</tbody>
								</table>
							</div>
						</div>
						<div className="card-footer text-secondary small">
							Powered by
							<a href="https://tabulator.info/" target="_blank" rel="noopener">Tabulator</a>
							&mdash; vanilla JS, no jQuery required.
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ListProducts;
