import { useState, type FormEvent } from "react";
import type { CategoryForm } from "../../types/app.types";
import { saveCategory } from "../../services/category.services";

const AddCategory = () => {
	const [formData, setFormData] = useState<CategoryForm>({
		title: "",
		slug: "",
		description: ""
	});

	const { title, slug, description } = formData;

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		saveCategory(formData)
			.then(({message}) => {
				console.log(message);
				setFormData({
					title: "",
					slug: "",
					description: ""
				})
			})
			.catch((err) => {
				console.log(err);
			})
	}


	/**
	 *	setFormData({
	 slug: 'asdf",
	 description: 'asdfgsdfg',
	 title: 'asdfadsf',
	 
	 })
	 */
	const onInputChange = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		})
	}

	return (
		<>
		<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Add Category</h1>
						</div>
						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="#">Categories</a></li>
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
						<div className="card-body">
							<form action="" onSubmit={onFormSubmit}>
								<div className="mt-3">
									<label htmlFor="cat-title">Title</label>
									<input type="text"
									 id="cat-title"
									  className="form-control"
									   placeholder="Title"
									   value={title}
									   onChange={(e) => {
										onInputChange("title", e.target.value)
									   }}
									 />
								</div>
								<div className="mt-3">
									<label htmlFor="cat-slug">Slug</label>
									<input type="text"
									 id="cat-slug"
									  className="form-control"
									   placeholder="Slug"
									   value={slug}
									   onChange={(e) => {
										onInputChange("slug", e.target.value)
									   }}
									 />
								</div>
								<div className="mt-3">
									<label htmlFor="cat-desciption">Description</label>
									<textarea id="cat-description" className="form-control" placeholder="Description..."
									value={description}
									onChange={(e) => {
										onInputChange("description", e.target.value)
									   }}
									></textarea>
								</div>
								<div className="mt-3">
									<button type="submit" className="btn btn-primary float-end">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddCategory;