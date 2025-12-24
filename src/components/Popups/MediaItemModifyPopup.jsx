import { Modal } from 'react-bootstrap';
import {modifyMediaItem, getItemInfo} from "../../services/apiService.js";
import {useEffect, useState} from "react";

const MediaItemModifyPopup = ({ show, togglePopup, onModify, token, mediaId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("")

	useEffect(() => {
		setTitle("");
		setDescription("");

		const fetchItemInfo = async () => {
			if (mediaId == null) return;

			try {
				const itemInfo = await getItemInfo(mediaId);
				setTitle(itemInfo.title);
				setDescription(itemInfo.description);
			} catch (error) {
				console.error("Failed to fetch item info:", error);
			}
		};
		fetchItemInfo();
	}, [mediaId]);

	const handleModify = async () => {
		setIsLoading(true);

		if (await modifyMediaItem(token, mediaId, title, description)) {
			onModify(mediaId, title, description);
			togglePopup();
		} else {
			console.error("Error modifying item. Please try again.");
		}

		setIsLoading(false);
	};

	return (
		<Modal show={show} onHide={togglePopup}>
			<Modal.Header closeButton>
				<Modal.Title>Modify this item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">File title (optional)</label>
					<input type="text" id="title" className="form-control" value={title}
						   placeholder="Food picture" onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">Description (optional)</label>
					<textarea className="form-control" id="description"
							  rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div className="d-flex justify-content-between">
					<button className="btn btn-danger" onClick={handleModify} disabled={isLoading} style={{							background: "linear-gradient(to right, #ff7171, #F1AE4A)",
						boxShadow: "2px 1px 10px gray",
						border: "none",
						width: "100%",
						fontWeight: "bold"}}>
						{isLoading && (
							<div className="spinner-border mx-2" style={{ width: "20px", height: "20px" }}>
								<span className="visually-hidden">Loading...</span>
							</div>
						)}
						{isLoading ? "Modifying..." : "Modify"}</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default MediaItemModifyPopup;
