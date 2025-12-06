
# CodeAlpha_Simplee-commerceStore

A simple, production-minded full-stack e-commerce demo built during an internship at CodeAlpha. This project demonstrates a typical shopping application flow with user authentication (OTP-based signup), product listing, cart management, address storage, order creation, and a protected Orders page.

---

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Setup (PowerShell)](#installation--setup-powershell)
- [Run Locally](#run-locally)
- [Seeding Products (dev helper)](#seeding-products-dev-helper)
- [API Summary](#api-summary)
- [Frontend Usage](#frontend-usage)
- [UI / UX Design Notes](#ui--ux-design-notes)
- [Testing & Development Tips](#testing--development-tips)
- [Security & Production Checklist](#security--production-checklist)
- [Future Roadmap](#future-roadmap)
- [Flowchart](#flowchart)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
---

## About

\`CodeAlpha_Simplee-commerceStore\` is a learning-oriented full-stack application that models real-world e-commerce responsibilities: secure authentication, persistent cart, address storage, order management, and protected user pages. It was built as part of an internship assignment to showcase practical knowledge of backend and frontend integration.

---

## Key Features

- OTP-based signup via email (one-time password)
- Secure login using bcrypt + JWT
- Browse products and view product details
- Add to cart, update quantity, remove from cart
- Save and update shipping address
- Create orders from the cart
- Protected Orders page: only logged-in users can view their orders
- Lightweight admin/product seeding endpoint (for dev)

---

## Tech Stack & Libraries

- Backend:
  - Node.js + Express
  - MongoDB with Mongoose
  - Authentication: \`jsonwebtoken\` (JWT)
  - Password hashing: \`bcryptjs\`
  - Email: \`nodemailer\`
- Frontend:
  - React (Vite)
  - React Router
  - Axios for HTTP requests
- Dev / build:
  - npm
  - (Optional) nodemon for development

---

## Folder Structure (high-level)

- \`backend/\` — Express API, controllers, routes, models, middlewares
- \`frontend/\` — React app (Vite), pages, components, API helpers
- \`README.md\` — project documentation

Important backend files:
- \`backend/controllers/getcontroller.js\`
- \`backend/controllers/postcontroller.js\`
- \`backend/models/userModel.js\`
- \`backend/routes/getroute.js\`
- \`backend/routes/postroute.js\`
- \`backend/middlewares/jwtMilddleware.js\`

Important frontend files:
- \`frontend/src/api/index.js\` — axios helper & API functions
- \`frontend/src/pages/Orders.jsx\` — protected orders UI
- \`frontend/src/components/Navbar.jsx\` — navigation

---

## Prerequisites

- Node.js v14+ (LTS recommended)
- npm (or yarn)
- MongoDB running locally or access to MongoDB Atlas
- SMTP credentials (for OTP emails) or a mock email setup for development

---

## Environment Variables

Create a \`.env\` file inside \`backend/\` (do not commit). Example:

\`\`\`
MONGOURL=mongodb://localhost:27017/EcommerceStore
PORT=5000
JWTKEY=your_jwt_secret_here
EMAIL=your_smtp_email@example.com
PASS=your_smtp_app_password_here
EMAIL_USER=your_smtp_email@example.com
EMAIL_FROM="ShopSmart <no-reply@example.com>"  # optional
\`\`\`

Security note: Never commit \`.env\`. Add it to \`.gitignore\` and rotate credentials if accidentally published.

---

## Installation & Setup (PowerShell)

Open two PowerShell terminals (one for backend, one for frontend).

1. From repo root:
\`\`\`powershell
cd 'c:\Users\wel\mynewproject\CodeAlpha_Simplee-commerceStore'
\`\`\`

2. Backend:
\`\`\`powershell
cd .\backend
npm install
# create .env and fill values as above
# start backend (use the script your package.json provides)
npm run dev   # or `npm start` / `node index.js`
\`\`\`

3. Frontend:
\`\`\`powershell
cd ..\frontend
npm install
npm run dev   # or `npm start` if configured
\`\`\`

Frontend default expects backend at \`http://localhost:5000/\`. Update \`frontend/src/api/index.js\` baseURL if different.

---

## Run Locally

- Start MongoDB.
- Start backend server (port 5000 by default).
- Start frontend dev server (Vite).
- Open the frontend URL displayed by Vite (commonly \`http://localhost:5173\`).

Use the app to:
- Sign up (OTP flow) -> login -> browse products -> add to cart -> create order -> view \`/orders\`.

---

## Seeding Products (dev helper)

There is a \`productadd\` controller included for inserting sample products (used during development). Use the endpoint carefully and restrict/remove it in production.

---

## API Summary

GET
- \`/api/get/products\` — public list of products
- \`/api/get/cart\` — protected, user's cart
- \`/api/get/user-address\` — protected, user's address
- \`/api/get/user-orders\` — protected, user's orders

POST
- \`/api/send-otp\` — send signup OTP (body: \`{ email }\`)
- \`/api/verify-signup\` — verify OTP & create user (body: \`{ fullName, email, password, otp }\`)
- \`/api/login\` — login (body: \`{ email, password }\`)
- \`/api/add-to-cart\`, \`/api/remove-from-cart\`, \`/api/update-cart-quantity\` — cart operations (protected)
- \`/api/update-address\` — update user address (protected)
- \`/api/create-order\` — create order (protected)

Protected routes require \`Authorization: Bearer <token>\`.

---

## Frontend Usage

- Login stores JWT in \`localStorage\` and \`AuthContext\`.
- \`Navbar\` provides navigation to Home, Products, Orders, Cart.
- Orders page fetches orders via \`GET /api/get/user-orders\` and is protected (redirects to \`/login\` if not authenticated).
- \`frontend/src/api/index.js\` contains helper functions for API calls; \`getUserOrdersApi\` uses the stored token.

---

## UI / UX Design Notes

- Clean, card-based layout to highlight products and orders.
- Desktop-first responsive layout with mobile-friendly breakpoints.
- Orders page: summarized view with expandable details to keep the interface concise.
- Visual focus on clarity for CTAs (primary color for actions).

---

## Testing & Development Tips

- Use Postman to verify API endpoints. Add \`Authorization\` header for protected endpoints.
- Use browser DevTools and React DevTools to debug components and \`AuthContext\`.
- Consider adding Jest + Supertest for backend tests and React Testing Library for frontend components.

---

## Security & Production Checklist

- Move credentials to secret manager in production and use environment variables securely.
- Use HTTPS in production and secure cookies if using cookie-based auth.
- Add rate limiting for OTP and auth endpoints.
- Sanitize & validate all inputs on the server.
- Remove dev helpers (like product seeding endpoints) before publishing.
- Rotate keys if any secret is exposed.

---

## Future Roadmap

- Payment gateway integration (Stripe/PayPal)
- Admin dashboard for product & order management
- Order tracking & shipment notifications
- Save payment methods and order history export
- Wishlist, product filters, search & sort improvements
- Mobile app (React Native) or PWA
- Unit/integration tests and CI/CD pipeline

---

## Flowchart

Here is the figma link of flowchart: https://www.figma.com/board/ZIQFGhx6emeFLgZp3r9psn/e-commerce-structure?node-id=0-1&t=4VqDMmhOeV1CWoFk-1

## Contributing

1. Fork the repo
2. Create a feature branch: \`git checkout -b feature/your-feature\`
3. Commit changes: \`git commit -m "Add feature"\`
4. Push and open a PR

Please include tests and keep changes focused.

---

## Acknowledgements

Built as part of an internship with CodeAlpha. Thank you to mentors and reviewers.

