In this project, Create a **Node.js** Application using Express Framework and MongoDB Database and Connect it to your Frontend Application (React js).

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm run dev`
</details>

### Detailed View of Project

<details>
<summary>Functionality has be added</summary>
<br/>

The application has five routes that perform different queries on the database:

- Q1: Find users whose income is less than $5 and drive a BMW or Mercedes-Benz car.
- Q2: Find male users whose phone price is greater than $10000.
- Q3: Find users whose last name starts with "M", whose quote is longer than 15 characters, and whose email contains the letter "M".
- Q4: Find users who drive a BMW, Mercedes, or Audi car and whose email does not contain any digits.
- Q5: Group users by city, calculate the count and average income, and return the top 10 cities with the highest count.

The application also defines routes to add a new user, get the last user, get all users, and get a specific user by ID. The application uses the `mongoose` library to define a schema for the users collection and perform CRUD operations on the collection. The application also uses the `cors` library to enable cross-origin resource sharing and the `path` library to serve static files.