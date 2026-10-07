import { useEffect, useState } from "react";
import type { Category } from "../../types/app.types";
import { deleteCategory, getCategories } from "../../services/category.services";


function ListCategories() {
	const [categories, setCategories] = useState<Category[]>([]);

	const loadCategories = () => {
		getCategories()
			.then((_cats: Category[]) => {
				setCategories(_cats);
			})
			.catch(() => {
				console.log("Get categories failed.");
			});
	}

	const onClickDelete = (id: number, idx: number) => {
		deleteCategory(id)
			.then(() => {
				// delete success
				setCategories([
					...categories.slice(0, idx),
					...categories.slice(idx + 1)
				])
			})
			.catch(err => {
				console.log(err);
			})
	}

	useEffect(function () {
		loadCategories();
	}, []);

	return (
		<>
		<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Data Tables</h1>
						</div>
						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="#">Tables</a></li>
									<li className="breadcrumb-item active" aria-current="page">Data</li>
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
							<h3 className="card-title">Users</h3>
							<div className="card-tools">
								<div className="input-group input-group-sm" style={{"width": "16rem"}}>
									<span className="input-group-text">
										<i className="bi bi-search" aria-hidden="true"></i>
									</span>
									<input id="table-filter" type="search" className="form-control"
										placeholder="Filter rows&hellip;" aria-label="Filter rows" />
								</div>
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
							<div className="tabulator-tableholder" tabIndex={0} style={{"height": "490px;"}}>
								<table className="table table-striped table-hover">
									<thead>
										<th>ID</th>
										<th>Title</th>
										<th>Slug</th>
										<th>Description</th>
										<th>CreatedAt</th>
										<th>UpdatedAt</th>
										<th>Action</th>
									</thead>
									<tbody>
										{
											categories.length > 0 ? categories.map((category: Category, idx: number) => (
												<tr>
													<td>{ category.id }</td>
													<td>{ category.title }</td>
													<td>{ category.slug }</td>
													<td>{ category.description }</td>
													<td>{ category.created_at ?? '' }</td>
													<td>{ category.updated_at ?? '' }</td>
													<td>
														<div className="dropdown">
															<button className="btn btn-primary btm-sm" data-bs-toggle="dropdown">Action</button>
															<ul className="dropdown-menu">
																<li className="dropdown-item">
																	<a href={`/categories/${category.id}`}>Edit</a>
																</li>
																<li className="dropdown-item">
																	<a href="#" onClick={(e) => {
																		e.preventDefault();
																		onClickDelete(category.id, idx);
																	}}>Delete</a>
																</li>
															</ul>
														</div>
													</td>
												</tr>	
											)) : null
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

export default ListCategories;