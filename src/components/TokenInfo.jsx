import {useState} from "react";
import {findTokenInfo} from "../services/apiService.js";

const PERMISSIONS_MAP = {
    1: { name: "Read", color: "success" },
    2: { name: "Create", color: "primary" },
    4: { name: "Delete", color: "danger" },
};

const TokenInfo = () => {
    const [token, setToken] = useState("");
    const [tokenInfo, setTokenInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        setIsLoading(true);
        setError(null);
        setTokenInfo(null);

        try {
            const result = await findTokenInfo(token);
            setTokenInfo(result);
        } catch (err) {
            if (err.statusCode === 404 || err.statusCode === 401) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    const formatExpiracy = (date) => {
        if (!date) {
            return "Never";
        }

        const expiresAt = new Date(date);
        const today = new Date();

        // Reset time to 00:00 to compare only the date
        today.setHours(0, 0, 0, 0);
        expiresAt.setHours(0, 0, 0, 0);

        const diffDays = Math.round((expiresAt - today) / (1000 * 60 * 60 * 24));

        let suffix;
        if (diffDays === 0) {
            suffix = "today";
        } else if (diffDays > 0) {
            suffix = `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
        } else {
            suffix = `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
        }

        return `${expiresAt.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} (${suffix})`;
    };

    const renderPermissions = (value) => {
        return Object.entries(PERMISSIONS_MAP)
            .filter(([num]) => (value & num) !== 0)
            .map(([_, perm]) => (
                <span
                    key={perm.name}
                    className={`badge bg-${perm.color} me-1`}
                >
                {perm.name}
            </span>
            ));
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <h5 className="card-title mb-3">Token Info</h5>
                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="token" className="form-label">Token</label>
                        <input id="token" placeholder="H1Ai ... 464g==" type="text" className="form-control"
                            value={token} onChange={(e) => setToken(e.target.value)} />
                    </div>
                    <button type="submit" className="btn text-white p-3"
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
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </form>

                {tokenInfo && (
                    <table className="mt-4">
                        <tr>
                            <td><strong>Name</strong>{" "}</td>
                            <td className="px-2"></td>
                            <td>{tokenInfo.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Expires At</strong>{" "}</td>
                            <td className="px-2"></td>
                            <td>{formatExpiracy(tokenInfo.expiresAt)}</td>
                        </tr>
                        <tr>
                            <td><strong>Active</strong>{" "}</td>
                            <td className="px-2"></td>
                            <td><input type="checkbox" checked={tokenInfo.isActive} disabled /></td>
                        </tr>
                        <tr>
                            <td><strong>Permissions</strong>{" "}</td>
                            <td className="px-2"></td>
                            <td>{renderPermissions(tokenInfo.permissions)}</td>
                        </tr>
                    </table>
                )}
            </div>
        </div>
    );

}

export default TokenInfo;