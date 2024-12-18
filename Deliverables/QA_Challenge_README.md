# QA Challenge - Backend and Frontend Testing
This repository contains the tests performed for both the backend and frontend of the application. Below are details of the tests performed and how to access the Postman collection used.
## Backend tests

For the backend tests, the Postman collection available at the following link was used:

[Access the Postman collection](https://www.postman.com/winter-shuttle-593463/workspace/qa-challenge/collection/29666802-b142bbf2-5d2d-4814-9d19-9b2d90145887?action=share&creator=29666802&active-environment=29666802-757ac05a-7ded-4651-9c66-022a85e344c8)

Access the link to view and run the API tests related to **user**, **orders** and **products**. This set of tests focused on verifying API endpoints to ensure that CRUD operations work correctly.

## Frontend testing with Cypress

In addition to backend testing, frontend testing was performed using **Cypress** to verify user interface functionality. Testing included use cases such as interacting with forms, validating inputs and ensuring that the UI worked correctly in different scenarios.

### API testing (Orders and Products)
The testing process also included small tests on the **orders** and **products** API, run in a controlled environment to verify the correct integration of the data from the backend to the frontend.

## Instructions for running the tests

1. **Backend (Postman):**
   - Click on the Postman collection link to access the tests.
   - Make sure you have an appropriate environment configured in Postman for API testing.

2. **Frontend (Cypress):**
   - Make sure you have Cypress installed in your project.
   - Run `npx cypress open` to open the Cypress panel and run the frontend tests.

## Requirements

- Node.js
- Postman (optional, only for backend testing)
- Cypress (for frontend testing)
