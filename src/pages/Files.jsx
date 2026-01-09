import FileList from "../components/FileList.jsx";
import React, {useEffect, useState} from "react";
import {uploadFile, getItemsByToken} from "../services/apiService.js";
import Pagination from "../components/Pagination.jsx";
import "../css/files.css";


const Files = () => {
	const [token, setToken] = useState("");
	const [usedToken, setUsedToken] = useState();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [pagination, setPagination] = useState({
		pageNumber: 1,
		pageSize: 10,
		totalItems: 0,
		totalPages: 0
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) return alert("Please enter a token.");

		setItems([]);
		setUsedToken(token);

		await fetchItems();
	}

	const fetchItems = async (page = 1) => {
		setIsLoading(true);
		setError(null)

		try {
			let result = await getItemsByToken(token, page);
			setItems(result["items"]);
			setPagination(result["pagination"]);
		} catch (err) {
			setItems([]);
			if (err.statusCode === 404 || err.statusCode === 401) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}

	}

	const handlePageChange = async (page) => {
		await fetchItems(page);
	}

	return (
		<div className="container my-4 files-container">
			<div className="card shadow-sm h-100">
				<div className="card-body">
					<h5 className="mb-4">Find Media Files</h5>
					<form onSubmit={handleSubmit} className="mb-3">
						<label htmlFor="token" className="form-label">Token</label>
						<input id="token" placeholder="H1Ai ... 464g==" type="text" className="form-control"
							   value={token} onChange={(e) => setToken(e.target.value)} />
						<button type="submit" className="btn text-white p-2 w-100 mt-3"
								disabled={token?.trim() === "" || isLoading}
								style={{
									background: "linear-gradient(to right, #ff7171, #F1AE4A)",
									boxShadow: "2px 1px 10px gray",
									border: "none",
									fontWeight: "bold",
								}}>
							{isLoading && (
								<div className="spinner-border mx-2" style={{
									width: "20px",
									height: "20px",
								}}>
									<span className="visually-hidden">Loading...</span>
								</div>
							)}
							{isLoading ? "Searching..." : "Submit"}
						</button>
					</form>

					{error && (
						<div className="alert alert-danger mt-3" role="alert" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
							{error}
						</div>
					)}
					{(items.length > 0) && (
						<>
							<FileList files={items} setFiles={setItems} token={usedToken} />
							<Pagination currentPage={pagination.pageNumber} totalPages={pagination.totalPages}
										onPageChange={handlePageChange} />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Files
