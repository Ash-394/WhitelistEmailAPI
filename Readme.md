# User Whitelist API

This is a basic user API built with TypeScript, Express, and MongoDB, designed to manage user data. 
The API includes a middleware for whitelisting emails, providing an additional layer of security. The `whitelistMiddleware` ensures that only requests with email addresses from the predefined whitelist are permitted.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or a locally running MongoDB instance)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
2. Install dependencies:
    ```bash
    npm install
3. Create .env file
    ```bash
    DB_CONN_STRING="your-mongodb-connection-string"
    DB_NAME="your-database-name"
    USER_COLLECTION_NAME="user"