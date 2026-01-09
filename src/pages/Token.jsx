import TokenCreation from "../components/TokenCreation.jsx";
import TokenInfo from "../components/TokenInfo.jsx";
import "../css/token.css";

const Token = () => {
    return (
        <div className="container my-4">
            <div className="d-flex justify-content-center">
                <div className="text-center token-text">
                    <p className="mb-1">
                        Manage your API authentication tokens here. You can create new tokens or retrieve information about existing ones.
                    </p>
                    <p className="mb-4">
                        An API token serves as a proof of ownership for your files. While it does not restrict access to files, it is required to perform actions such as deleting files or retrieving a list of your own files.
                    </p>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <TokenCreation />
                </div>
                <div className="col-12 col-md-6">
                    <TokenInfo />
                </div>
            </div>
        </div>

    )
}

export default Token;