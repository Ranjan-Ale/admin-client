
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductImage {
    id: string;
    product_id: string;
    variant_id: string | null;
    filename: string;
    size: string;
    upload_path: string;
}

function ListProductImages() {
    const [productImages, setProductImages] = useState<ProductImage[]>([]);

    useEffect(() => {
        const fetchProductImages = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/product-images"
                );

                setProductImages(response.data.images);
            } catch (error) {
                console.error("Error fetching product images:", error);
            }
        };

        fetchProductImages();
    }, []);

    return (
        <>
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">Product Images Tables</h1>
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
                                    <li className="breadcrumb-item active">
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
                            <h3 className="card-title">Product Images</h3>

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
                                <a
                                    className="btn btn-sm btn-outline-secondary"
                                    href="/product-images/add"
                                >
                                    <i
                                        className="bi bi-plus-circle me-1"
                                        aria-hidden="true"
                                    ></i>
                                    Add Product Images
                                </a>
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
                                            <th>Product ID</th>
                                            <th>Image</th>
                                            <th>Filename</th>
                                            <th>Size</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {productImages.map((image) => (
                                            <tr key={image.id}>

                                                <td>{image.id}</td>

                                                <td>{image.product_id}</td>

                                                <td>
                                                    <img
                                                         src={`http://localhost:3000/${
                                                            image.upload_path.startsWith("/")
                                                                ? image.upload_path.slice(1)
                                                                : image.upload_path
                                                        }`}
                                                        alt={image.filename}
                                                        style={{
                                                            width: "80px",
                                                            height: "60px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
        
                                                </td>

                                                <td>
                                                    {image.filename}
                                                </td>

                                                <td>
                                                    {image.size} bytes
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

export default ListProductImages;
