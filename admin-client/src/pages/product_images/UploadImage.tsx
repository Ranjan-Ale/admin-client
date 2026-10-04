const UploadImage = () => {
	return (
		<form action="/upload" method="post" encType="multipart/form-data" className="card card-body">
			<div className="mb-3">
				<label htmlFor="product" className="form-label">Product</label>
				<select id="product" name="productId" className="form-select" defaultValue="" required>
					<option value="" disabled>Select a product</option>
					<option value="1">Product 1</option>
					<option value="2">Product 2</option>
				</select>
			</div>
			<div className="mb-3">
				<label htmlFor="images" className="form-label">Choose images</label>
				<input type="file" id="images" name="images" className="form-control" accept="image/*" multiple required />
			</div>
			<button type="submit" className="btn btn-primary">Upload</button>
		</form>
	);
};

export { UploadImage };
export default UploadImage;
