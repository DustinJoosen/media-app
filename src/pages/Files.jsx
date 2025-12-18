import FileList from "../components/FileList.jsx";
import {useEffect, useState} from "react";
import {uploadFile, getItemsByToken} from "../services/apiService.js";


const Files = () => {
	const [token, setToken] = useState();
	const [error, setError] = useState(null);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) return alert("Please enter a token.");

		setIsLoading(true);
		setError(null)
		setItems([]);

		try {
			let result = await getItemsByToken(token);
			setItems(result["items"]);
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

	return (
		<div className="container my-4" style={{width: "50%"}}>
			<div className="card shadow-sm h-100">
				<div className="card-body">
					<h5 className="mb-4">Find Media Files</h5>
					<form onSubmit={handleSubmit} className="mb-3">
						<label htmlFor="token" className="form-label">Token</label>
						<input id="token" placeholder="H1Ai ... 464g==" type="text" className="form-control"
							   value={token} onChange={(e) => setToken(e.target.value)} />
						<button type="submit" className="btn text-white p-2 w-100 mt-3"
								disabled={token === "" || isLoading}
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
						<FileList files={items} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Files
