import {getFileDownload} from "../services/apiService.js";
import MediaItemPreviewPopup from "./Popups/MediaItemPreviewPopup.jsx";
import {useState} from "react";
import MediaItemDeletePopup from "./Popups/MediaItemDeletePopup.jsx";
import token from "../pages/Token.jsx";

const FileList = ({ files, setFiles, token }) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isDeletedOpen, setIsDeletedOpen] = useState(false);
	const [selectedMediaId, setSelectedMediaId] = useState(null);

	const togglePreviewPopup = (id) => {
		setIsPreviewOpen(!isPreviewOpen);
		setSelectedMediaId(id);
	};

	const toggleDeletePopup = (id) => {
		setIsDeletedOpen(!isDeletedOpen);
		setSelectedMediaId(id);
	};

	const handleDeleteSuccess = (id) => {
		setFiles((oldFiles) => oldFiles.filter((file) => file.id !== id));
	};

	const handleDownload = async (id) => {
		try {
			const response = await getFileDownload(id);
			const disposition = response.headers.get("Content-Disposition");

			let fileName = "download";
			if (disposition && disposition.includes("attachment")) {
				const regex = /filename="(.+)"/;
				const matches = regex.exec(disposition);

				if (matches != null && matches[1]) { fileName = matches[1]; }
				else {
					const fallbackMatches = /filename=(.+)/.exec(disposition);
					if (fallbackMatches != null && fallbackMatches[1]) {
						fileName = fallbackMatches[1];
					}
				}
			}

			const fileBlob = await response.blob();

			// Create a download link
			const link = document.createElement("a");
			const url = window.URL.createObjectURL(fileBlob);

			link.href = url;
			link.download = fileName;
			link.click();

			window.URL.revokeObjectURL(url);
		} catch (err) {
			alert("Could not download file. Please try again.")
		}
	};

	const actionButtonStyle = {
		padding: '2px 8px'
	}

	return (
		<div className="list-group shadow-sm">
			<div className="list-group-item list-group-item-action header-row">
				<div className="row">
					<div className="col-4"><strong>Name</strong></div>
					<div className="col-2"><strong>Created</strong></div>
					<div className="col-2"><strong>Updated</strong></div>
					<div className="col-3"><strong></strong></div>
				</div>
			</div>
			{files.map((item) => (
				<div key={item.id} className="list-group-item list-group-item-action">
					<div className="row">
						<div className="col-4"><span>{item.title || <i>File name not set</i>}</span></div>
						<div className="col-2"><small>{new Date(item.createdOn).toLocaleDateString()}</small></div>
						<div className="col-2"><small>{item.updatedOn ? new Date(item.updatedOn).toLocaleDateString() : 'N/A'}</small></div>
						<div className="col-3">
							<div className="btn-group">
								<button className="btn btn-primary btn-sm" style={actionButtonStyle}
									onClick={() => togglePreviewPopup(item.id)}>
									<i className="bi bi-eye"></i>
								</button>
								<button className="btn btn-success btn-sm" style={actionButtonStyle}
									onClick={() => handleDownload(item.id)}>
									<i className="bi bi-download"></i>
								</button>
								<button className="btn btn-warning btn-sm" style={actionButtonStyle}
									onClick={() => alert(`Modify ${item.id} clicked`)}>
									<i className="bi bi-pencil"></i>
								</button>
								<button className="btn btn-danger btn-sm" style={actionButtonStyle}
									onClick={() => toggleDeletePopup(item.id)}>
									<i className="bi bi-trash"></i>
								</button>
								<MediaItemPreviewPopup
									mediaId={selectedMediaId}
									show={isPreviewOpen}
									togglePopup={togglePreviewPopup}
								/>
								<MediaItemDeletePopup
									mediaId={selectedMediaId}
									token={token}
									show={isDeletedOpen}
									onDelete={handleDeleteSuccess}
									togglePopup={toggleDeletePopup}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FileList;
