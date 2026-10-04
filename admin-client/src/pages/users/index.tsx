import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
    created_at: string | null;
}

function ListUsers() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

        axios.get("http://localhost:3000/users")
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("error fetching users:", error);
            });

    }, []);

    return (
        <>
            <div className="app-content-header">
                <div className="container-fluid">

                    <div className="row">

                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">
                                Users
                            </h1>
                        </div>

                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">

                                <ol className="breadcrumb float-sm-end">

                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item">
                                        <a href="#">Users</a>
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

                        {/* CARD HEADER */}

                        <div className="card-header">

                            <h3 className="card-title">
                                Users
                            </h3>

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
                                        placeholder="Filter rows…"
                                        aria-label="Filter rows"
                                    />

                                </div>


                                <a
                                    href="/users/add"
                                    className="btn btn-sm btn-primary"
                                >

                                    <i
                                        className="bi bi-plus-lg me-1"
                                        aria-hidden="true"
                                    ></i>

                                    Add User

                                </a>

                            </div>

                        </div>


                        {/* CARD BODY */}

                        <div className="card-body">

                            {/* BUTTONS */}

                            <div className="d-flex gap-2 mb-3">

                                <button
                                    id="export-csv"
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >

                                    <i className="bi bi-filetype-csv me-1"></i>

                                    Export CSV

                                </button>


                                <button
                                    id="export-json"
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >

                                    <i className="bi bi-filetype-json me-1"></i>

                                    Export JSON

                                </button>


                                <button
                                    id="print-table"
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >

                                    <i className="bi bi-printer me-1"></i>

                                    Print

                                </button>

                            </div>


                            {/* TABLE */}

                            <div
                                className="tabulator-tableholder"
                                tabIndex={0}
                                style={{ height: "490px" }}
                            >

                                <table className="table table-striped table-hover">

                                    <thead>

                                        <tr>

                                            <th>ID</th>

                                            <th>Name</th>

                                            <th>Username</th>

                                            <th>Email</th>

                                            <th>Phone</th>

                                            <th>Address</th>

                                            <th>CreatedAt</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {users.map((user) => (

                                            <tr key={user.id}>

                                                <td>
                                                    {user.id}
                                                </td>

                                                <td>
                                                    {user.name}
                                                </td>

                                                <td>
                                                    {user.username}
                                                </td>

                                                <td>
                                                    {user.email}
                                                </td>

                                                <td>
                                                    {user.phone || "—"}
                                                </td>

                                                <td>
                                                    {user.address || "—"}
                                                </td>

                                                <td>
                                                    {user.created_at || "—"}
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

                                                            <li>

                                                                <a
                                                                    className="dropdown-item"
                                                                    href={`/users/edit/${user.id}`}
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


                        {/* CARD FOOTER */}

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

export default ListUsers;