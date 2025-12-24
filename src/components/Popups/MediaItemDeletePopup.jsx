import { Modal } from 'react-bootstrap';
import {API_URL} from "../../services/apiService.js";
import {deleteMediaItem} from "../../services/apiService.js";
import {useState} from "react";

const MediaItemDeletePopup = ({ show, togglePopup, onDelete, token, mediaId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const imageSrc = API_URL + "/media/" + mediaId + "/preview";

	const handleDelete = async () => {
		setIsLoading(true);

		if (await deleteMediaItem(token, mediaId)) {
			onDelete(mediaId);
			togglePopup();
		} else {
			console.error("Error deleting item. Please try again.");
		}

		setIsLoading(false);
	};

	return (
		<Modal show={show} onHide={togglePopup}>
			<Modal.Header closeButton>
				<Modal.Title>Delete this item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<img src={imageSrc} alt="Image preview" className="img-fluid mb-3"
					style={{ maxHeight: '300px', objectFit: 'contain' }} />
				<div className="d-flex justify-content-between">
					<button className="btn btn-danger" onClick={handleDelete} disabled={isLoading} style={{							background: "linear-gradient(to right, #ff7171, #F1AE4A)",
						boxShadow: "2px 1px 10px gray",
						border: "none",
						width: "100%",
						fontWeight: "bold"}}>
						{isLoading && (
							<div className="spinner-border mx-2" style={{ width: "20px", height: "20px" }}>
								<span className="visually-hidden">Loading...</span>
							</div>
						)}
						{isLoading ? "Deleting..." : "Delete"}</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default MediaItemDeletePopup;
