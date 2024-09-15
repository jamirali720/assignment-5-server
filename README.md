# assignment-5

# Introduction of this project:

- This project is for rental bike services
  - Any one can rent / booking a bike for his desired time.
  - after that he can pay for payment for his used time
- What I have utilize in this project:
  - Express js, Typescript, Node js, Mongoose, Mongodb.
  - Dependencies: bcrypt, nodemon, cors, Dotenv, Json Web Token.
  - For Validation: Zod validation, Mongoose validation, Custom validation.
- To use this project:
  - You have to install dependencies by
  ```javascript
  npm install
  ```

# Project Links: 
* [Live Deployment Link of vercel (Server)](https://assignment-3-rho-nine.vercel.app/)

* [GitHub Repository Links (Server)](https://github.com/jamirali720/assignment-3)


## Technology Stack:

- As Programming Language: TypeScript
- AS Web Framework: Express.js
- As Object Dada Model & Validation Library: Zod, Mongoose for MongoDB

# There are three models in this project

1. User Model
2. Bike Model
3. Booking Model

# API Endpoints:

- User Routes:

1. Sign Up : - Route: /api/auth/signup (POST): A user / admin can register by providing her/his information:

```javascript
{
"name": "user",
"email": "user@gmail.com",
"password": "password123",
"phone": "01814245427",
"address": "123 Main St, Anytown",
"role" : "admin"
}

```


2. User Login: Route: /api/auth/login (POST): A user can login by his email id and password.
```javascript
{
"email": "user@gmail.com",
"password": "password123"
}
````

3. Get Profile: Route: /api/users/me (GET)

- A user can get his profile by his authorization bearer jwt token;

3. Update Profile: Route: /api/users/me (PUT)

- A user can update his profile by his authorization bearer jwt token;
  - he can update only name, phone, address fields.
  - user can not update email, role fields

# Bike Routes:

1. Create Bike (Admin Only):

- Route: /api/bikes (POST): Only an admin can create bike.
- Admin will be identified by authorization bearer jwt token.

```javascript
{
  "name": "Mountain Air Bike",
  "description": "A durable mountain bike for rough terrains.",
  "pricePerHour": 25,
  "cc": 250,
 "pricePerHour",
  "year": 2022,
  "model": "XYTb",
  "brand": "Yamaha"
}

```

2. Get All Bikes:

- Route: /api/bikes (GET): Everybody can show / get all available bikes

3. Update Bike (Admin Only)

- Route: /api/bikes/:id (PUT): Only Admin can update bike following fields.

```javascript
{
    "name": "Mountain Bike",
    "description": "A durable mountain bike for rough terrains.",
    "pricePerHour": 20,
    "isAvailable": true,
    "cc": 250,
    "year": 2022,
    "model": "X1",
    "brand": "Yamaha"
  }
```

4. Delete Bike (Admin Only):

- Route: /api/bikes/:id (DELETE): Only Admin can delete bike by updating `isAvailable: false` .

```javascript
  {
        "isAvailable": false,
  }
```

# Rental Routes:

1. Create Rental

- Route: /api/rentals (POST): Only a authorized user can rent a bike that means he can do booking for a bike.

  - Need to choice bike and provide bike Id.
  - user will be identified automatically by his authorization bearer token.
  - have to give start time.

  ```javascript
  {
  "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
  "startTime": "2024-06-10T09:00:00Z"
  }

  ```


  2. Return Bike (Admin Only)

* Route: /api/rentals/:id/return (PUT): Only admin can return bike.
- automatically made the duration time from start time to return time. 
- automatically made total cost by duration time * per Hour price 
- automatically bike's available updated to true



 2. Get All Rentals for User (My rentals)

* Route: /api/rentals (GET): Every user will get his rented bikes with his authorization bearer jwt token;




### 1. Middleware and Error Handling:
* when finding bike or other information, "No Data Found" error message will be show , if no data available.

### 2. Error Handling:
* ErrorMessage will provide following as error message.
```javascript
[
  {
    "path": "",
    "message": "Error message"
  }
]

```
* and Sample Error Response:

```javascript
{
  "success": false,
  "message": "E11000 duplicate key error collection:: email_1 dup key: { email: \\"user@gmail.com\\" }",
  "errorMessages": [
    {
      "path": "",
      "message": "E11000 duplicate key error index: email_1 dup key: { email: \\"user@gmail.com\\" }"
    }
  ],
  "stack": "error stack"
}


```


### 3. Not Found Route:
* a global "Not Found" handler for unmatched routes   has been handled. When a route is not found, respond with a generic message: "Not Found."
```javascript
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found"
}


```

### 4. Authentication Middleware: 
* only user and admin can access their own accessible routes. if not so, error message will display;
```javascript
{
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route",
}
```

### 5. Zod Validation:
* Zod validation has been utilized. When validation fails, a 400 Bad Request status code is returned,# assignment-5-server
