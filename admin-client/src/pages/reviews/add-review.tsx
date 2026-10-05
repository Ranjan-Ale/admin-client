import { useEffect, useState, type FormEvent } from "react";
import axios, { AxiosError } from "axios";

interface User {
    id: string;
    username: string;
}

interface Product {
    id: string;
    name: string;
}

interface ProductVariant {
    id: string;
    product_id: string;
    name?: string;
    title?: string;
    sku?: string;
}

interface ReviewForm {
    user_id: string;
    product_id: string;
    product_variant_id: string;
    review_title: string;
    description: string;
}

function AddReview() {
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);

    const [formData, setFormData] = useState<ReviewForm>({
        user_id: "",
        product_id: "",
        product_variant_id: "",
        review_title: "",
        description: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch users, products and variants
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    usersResponse,
                    productsResponse,
                    variantsResponse
                ] = await Promise.all([
                    axios.get("http://localhost:3000/users"),
                    axios.get("http://localhost:3000/products"),
                    axios.get("http://localhost:3000/product-variants")
                ]);

                const usersData = Array.isArray(usersResponse.data)
                    ? usersResponse.data
                    : usersResponse.data.users || [];

                const productsData = Array.isArray(productsResponse.data)
                    ? productsResponse.data
                    : productsResponse.data.products || [];

                const variantsData = Array.isArray(variantsResponse.data)
                    ? variantsResponse.data
                    : variantsResponse.data.variants || [];

                setUsers(usersData);
                setProducts(productsData);
                setVariants(variantsData);

            } catch (error) {
                console.error("Failed to fetch data:", error);

                setMessage(
                    "Failed to load users, products or variants"
                );
            }
        };

        fetchData();
    }, []);

    // Handle form changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        // When product changes, reset variant
        if (name === "product_id") {
            setFormData({
                ...formData,
                product_id: value,
                product_variant_id: ""
            });

            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Show only variants belonging to selected product
    const filteredVariants = variants.filter(
        (variant) =>
            String(variant.product_id) ===
            String(formData.product_id)
    );

    // Submit form
    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setMessage("");

        // Validate user
        if (!formData.user_id) {
            setMessage("Please select a user");
            return;
        }

        // Validate product
        if (!formData.product_id) {
            setMessage("Please select a product");
            return;
        }

        // Variant is OPTIONAL
        // So we don't validate product_variant_id

        // Validate review title
        if (!formData.review_title.trim()) {
            setMessage("Please enter a review title");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:3000/product-reviews",
                {
                    user_id: formData.user_id,
                    product_id: formData.product_id,

                    // Send null when no variant is selected
                    product_variant_id:
                        formData.product_variant_id || null,

                    review_title:
                        formData.review_title,

                    description:
                        formData.description
                }
            );

            setMessage("Review added successfully!");

            // Reset form
            setFormData({
                user_id: "",
                product_id: "",
                product_variant_id: "",
                review_title: "",
                description: ""
            });

        } catch (error: unknown) {
            console.error(error);

            const axiosError =
                error as AxiosError<{ message: string }>;

            setMessage(
                axiosError.response?.data?.message ||
                "Failed to add review"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Page Header */}
            <div className="app-content-header">
                <div className="container-fluid">

                    <div className="row">

                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">
                                Add Review
                            </h1>
                        </div>

                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-sm-end">

                                    <li className="breadcrumb-item">
                                        Home
                                    </li>

                                    <li className="breadcrumb-item">
                                        Reviews
                                    </li>

                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        Add Review
                                    </li>

                                </ol>
                            </nav>
                        </div>

                    </div>

                </div>
            </div>

            {/* Content */}
            <div className="app-content">

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-md-8">

                            <div className="card">

                                <div className="card-header">
                                    <h3 className="card-title">
                                        Add Product Review
                                    </h3>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="card-body">

                                        {/* User */}
                                        <div className="mb-3">

                                            <label
                                                htmlFor="user_id"
                                                className="form-label"
                                            >
                                                User
                                            </label>

                                            <select
                                                id="user_id"
                                                name="user_id"
                                                className="form-select"
                                                value={
                                                    formData.user_id
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            >

                                                <option value="">
                                                    Select User
                                                </option>

                                                {users.map((user) => (
                                                    <option
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        {user.username}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>

                                        {/* Product */}
                                        <div className="mb-3">

                                            <label
                                                htmlFor="product_id"
                                                className="form-label"
                                            >
                                                Product
                                            </label>

                                            <select
                                                id="product_id"
                                                name="product_id"
                                                className="form-select"
                                                value={
                                                    formData.product_id
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            >

                                                <option value="">
                                                    Select Product
                                                </option>

                                                {products.map(
                                                    (product) => (
                                                        <option
                                                            key={
                                                                product.id
                                                            }
                                                            value={
                                                                product.id
                                                            }
                                                        >
                                                            {
                                                                product.name
                                                            }
                                                        </option>
                                                    )
                                                )}

                                            </select>

                                        </div>

                                        {/* Variant */}
                                        <div className="mb-3">

                                            <label
                                                htmlFor="product_variant_id"
                                                className="form-label"
                                            >
                                                Product Variant
                                                <span className="text-muted">
                                                    {" "}
                                                    (Optional)
                                                </span>
                                            </label>

                                            <select
                                                id="product_variant_id"
                                                name="product_variant_id"
                                                className="form-select"
                                                value={
                                                    formData.product_variant_id
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                disabled={
                                                    !formData.product_id
                                                }
                                            >

                                                <option value="">
                                                    {!formData.product_id
                                                        ? "Select product first"
                                                        : "No specific variant"}
                                                </option>

                                                {filteredVariants.map(
                                                    (variant) => (
                                                        <option
                                                            key={
                                                                variant.id
                                                            }
                                                            value={
                                                                variant.id
                                                            }
                                                        >
                                                            {
                                                                variant.name ||
                                                                variant.title ||
                                                                variant.sku ||
                                                                `Variant ${variant.id}`
                                                            }
                                                        </option>
                                                    )
                                                )}

                                            </select>

                                            {formData.product_id &&
                                                filteredVariants.length ===
                                                    0 && (
                                                    <small className="text-muted">
                                                        No variants available
                                                        for this product.
                                                    </small>
                                                )}

                                        </div>

                                        {/* Review Title */}
                                        <div className="mb-3">

                                            <label
                                                htmlFor="review_title"
                                                className="form-label"
                                            >
                                                Review Title
                                            </label>

                                            <input
                                                type="text"
                                                id="review_title"
                                                name="review_title"
                                                className="form-control"
                                                value={
                                                    formData.review_title
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="Enter review title"
                                                required
                                            />

                                        </div>

                                        {/* Description */}
                                        <div className="mb-3">

                                            <label
                                                htmlFor="description"
                                                className="form-label"
                                            >
                                                Description
                                            </label>

                                            <textarea
                                                id="description"
                                                name="description"
                                                className="form-control"
                                                rows={5}
                                                value={
                                                    formData.description
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="Write the review..."
                                            />

                                        </div>

                                    </div>

                                    {/* Submit */}
                                    <div className="card-footer">

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Adding..."
                                                : "Add Review"}
                                        </button>

                                    </div>

                                </form>

                                {/* Message */}
                                {message && (
                                    <div className="card-footer">

                                        <div className="alert alert-info mb-0">
                                            {message}
                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AddReview;