# File Upload Service with Node.js, MongoDB, and Cloudinary

This project demonstrates a backend service for uploading files to Cloudinary and storing their metadata in MongoDB. It uses **Express.js** for routing, **Multer** for file handling, and **Cloudinary** for cloud storage.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)

---

## Overview

The service allows users to upload files (such as PDFs) through an API endpoint. The uploaded file is stored on **Cloudinary**, and its metadata (file name, URL, upload timestamp) is saved in **MongoDB** for later reference.

---

## Features

- Upload files to **Cloudinary** via an API endpoint.
- Store metadata (file name, URL, and timestamp) in **MongoDB**.
- Remove temporary files from the server after successful upload.
- Easily configurable with environment variables for MongoDB and Cloudinary.

---

## Setup and Installation

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/darth-divyansh/pdfFileUploadCloudinary.git
cd pdfFileUploadCloudinary
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Configure Environment Variables**

Create a .env file in the root directory and add the following variables:
```bash
MONGO_URI = 
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET =

```

### **Step 4: Start the Server**
Run the server using:

```bash
node server.js
```

The server will start at http://localhost:3000.

### **Step 5: Upload a File**

**Using Postman:**
 1. Open Postman and create a new POST request.

 2. Set the URL to http://localhost:3000/upload.

 3. Go to the Body tab, select form-data, and add:

 - **Key**: file

 - **Value**: Select a file from your system (it will automatically detect the file type).

 4. Hit Send to upload the file.




**Using cURL:**

Run the following command in your terminal:
```bash
curl -X POST -F "file=@/path/to/your/file.pdf" http://localhost:3000/upload
```

