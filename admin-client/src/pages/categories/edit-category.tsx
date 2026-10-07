
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router";
import { type Category, type CategoryForm } from "../../types/app.types";
import { getById, updateCategory } from "../../services/category.services";



const EditCategory = () => {
	const [category, setCategory] = useState<Category | null>(null);
	const { id } = useParams();

	const [formData, setFormData] = useState<CategoryForm>({
		title: "",
		slug: "",
		description: "",
	});

	const [message, setMessage] = useState("");

	useEffect(() => {
		if (id) {
			getById(Number(id)).then((cat) => {
				setCategory(cat);
			});
		}
	}, [id]);

	useEffect(() => {
		if (category) {
			setFormData({
				title: category.title,
				slug: category.slug,
				description: category.description,
			});
		}
	}, [category]);

	const { title, slug, description } = formData;

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!id) {
			console.log("Category ID not found");
			return;
		}

		updateCategory(Number(id), formData)
			.then(({ message }) => {
				// Show success message
				setMessage(message || "Form submitted successfully");

				// Empty the form only after successful update
				setFormData({
					title: "",
					slug: "",
					description: "",
				});
			})
			.catch((err) => {
				console.log(err);

				// Do NOT empty the form if update fails
				setMessage("");
			});
	};

	const onInputChange = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<>
			<div className="app-content-header">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h1 className="mb-0 fs-3">Edit Category</h1>
						</div>

						<div className="col-sm-6">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb float-sm-end">
									<li className="breadcrumb-item">
										<a href="#">Home</a>
									</li>

									<li className="breadcrumb-item">
										<a href="#">Categories</a>
									</li>

									<li className="breadcrumb-item active">
										Edit
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
						<div className="card-body">

							{/* Success message */}
							{message && (
								<div className="alert alert-success">
									{message}
								</div>
							)}

							<form onSubmit={onFormSubmit}>

								<div className="mt-3">
									<label htmlFor="cat-title">
										Title
									</label>

									<input
										type="text"
										id="cat-title"
										className="form-control"
										placeholder="Title"
										value={title}
										onChange={(e) =>
											onInputChange(
												"title",
												e.target.value
											)
										}
									/>
								</div>

								<div className="mt-3">
									<label htmlFor="cat-slug">
										Slug
									</label>

									<input
										type="text"
										id="cat-slug"
										className="form-control"
										placeholder="Slug"
										value={slug}
										onChange={(e) =>
											onInputChange(
												"slug",
												e.target.value
											)
										}
									/>
								</div>

								<div className="mt-3">
									<label htmlFor="cat-description">
										Description
									</label>

									<textarea
										id="cat-description"
										className="form-control"
										placeholder="Description..."
										value={description}
										onChange={(e) =>
											onInputChange(
												"description",
												e.target.value
											)
										}
									></textarea>
								</div>

								<div className="mt-3">
									<button
										type="submit"
										className="btn btn-primary float-end"
									>
										Update Category
									</button>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditCategory;

