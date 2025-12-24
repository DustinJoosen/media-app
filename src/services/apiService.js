
export const API_URL = import.meta.env.VITE_API_URL;

export const uploadFile = async (file, title, description, token) => {
    const formData = new FormData();

    formData.append("FormFile", file);

    if (title !== "") formData.append("Title", title);
    if (description) formData.append("Description", description);

    const response = await fetch(`${API_URL}/media/upload`, {
        method: "POST",
        headers: {
            Authorization: token
        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};


export const createToken = async (name, expiration) => {
    const response = await fetch(`${API_URL}/tokens/create-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            expiresAt: expiration || null,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};

export const findTokenInfo = async (token) => {
    const response = await fetch(`${API_URL}/tokens/info`, {
        method: "GET",
        headers: {
            Authorization: token ?? ""
        },
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
}

export const getHealthInfo = async () => {
    const response = await fetch(`${API_URL}/health`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};

export const getItemsByToken = async (token, page) => {
    const response = await fetch(`${API_URL}/media/items-by-tokens?PageNumber=${page}`, {
        method: "GET",
        headers: {
            Authorization: token ?? ""
        },
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};

export const deleteMediaItem = async (token, itemId) => {
    const response = await fetch(`${API_URL}/media/${itemId}/delete`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    });

    return response.ok;
};

export const modifyMediaItem = async (token, itemId, title, description) => {
    const response = await fetch(`${API_URL}/media/${itemId}/modify`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description: description.trim() === "" ? null : description
        }),
    });

    return response.ok;
};


export const getFileDownload = async (id) => {
    const response = await fetch(`${API_URL}/media/${id}/download`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response;
}

export const getItemInfo = async (id) => {
    const response = await fetch(`${API_URL}/media/${id}/info`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};