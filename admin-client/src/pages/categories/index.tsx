
import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
    id: string;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
}

function ListCategories() {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/categories"
                );

                setCategories(response.data);

            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    return (
        <>
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">
                                Data Tables
                            </h1>
                        </div>

                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-sm-end">

                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item">
                                        <a href="#">Tables</a>
                                    </li>

                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        Data
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
                                Categories
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
                                        placeholder="Filter rows…"
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
                                            <th>Title</th>
                                            <th>Slug</th>
                                            <th>Description</th>
                                            <th>CreatedAt</th>
                                            <th>UpdatedAt</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>


                                    <tbody>

                                        {categories.map((category) => (

                                            <tr key={category.id}>

                                                <td>
                                                    {category.id}
                                                </td>

                                                <td>
                                                    {category.title}
                                                </td>

                                                <td>
                                                    {category.slug}
                                                </td>

                                                <td>
                                                    {category.description}
                                                </td>

                                                <td>
                                                    {new Date(
                                                        category.created_at
                                                    ).toLocaleString()}
                                                </td>

                                                <td>
                                                    {new Date(
                                                        category.updated_at
                                                    ).toLocaleString()}
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
                                                                <a href="#">
                                                                    Edit
                                                                </a>
                                                            </li>

                                                            <li className="dropdown-item">
                                                                <a href="#">
                                                                    Delete
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

export default ListCategories;
