// Unfortunately, this list needs to be manually synced with the API.

export const blockedExtensions = [
	".exe",
	".dll",
	".bat",
	".cmd",
	".ps1",
	".msi",
	".jar"
];

export const maxFileSizeBytes = 52_428_800; // ~50MB.

export function validateFile(file) {
	if (!file)
		return { valid: false, message: "No file selected." };

	const extension = file.name.split(".").pop()?.toLowerCase();
	if (!extension)
		return { valid: false, message: "File has no extension." };

	if (blockedExtensions.includes("." + extension))
		return { valid: false, message: `Files of type .${extension} are not allowed.` };

	if (file.size > maxFileSizeBytes) {
		return { valid: false, message: `File is too large. Max ${maxFileSizeBytes / (1024 * 1024)} MB.` };
	}

	return { valid: true };
}
