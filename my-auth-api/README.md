# My Auth API

This project is an authentication API built with Node.js and TypeScript. It provides endpoints for user login and handles authentication using JSON Web Tokens (JWT).

## Features

- User login with email and password
- JWT-based authentication
- Error handling middleware
- Unit tests for authentication functionality

## Project Structure

```
my-auth-api
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── controllers
│   │   └── authController.ts   # Handles authentication logic
│   ├── routes
│   │   └── authRoutes.ts       # Defines authentication routes
│   ├── services
│   │   └── authService.ts      # Contains authentication services
│   ├── middleware
│   │   └── errorHandler.ts      # Middleware for error handling
│   ├── models
│   │   └── userModel.ts        # User data model
│   ├── utils
│   │   └── jwt.ts              # JWT utility functions
│   └── config
│       └── index.ts            # Configuration settings
├── tests
│   └── auth.test.ts            # Unit tests for authentication
├── package.json                 # NPM package configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-auth-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

The API will be available at `http://localhost:3000`.

## Running Tests

To run the unit tests, use:
```
npm test
```

## License

This project is licensed under the MIT License.