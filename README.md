# media-web

**media-web** is a small **React** frontend for the media-api.  
It provides a simple web interface for interacting with the API without needing to call it manually.

The application focuses on basic file management and token handling through a clean UI.

---

## Pages

- **Home**  
  Displays health and runtime information from the API.

- **Files**  
  Allows you to enter an ownership token and browse all media items linked to it.  
  The list is paginated, and files can be previewed, modified, downloaded, or deleted.

- **Upload**  
  Upload new media by providing an ownership token, a name, a description, and a file.

- **Tokens**  
  Create new ownership tokens or view information about existing ones.

---

## Hosting

The web app is available at [app.media.syter6.nl](https://app.media.syter6.nl), and requires the api to be online and running at [api.media.syter6.nl](https://api.media.syter6.nl/swagger)
