# Recipe Book

Recipe Book is a full-stack responsive web application built using MongoDB, Node.js, React.js, Express.js, JWT, and TheMealDB API. It allows users to find, add, modify, and favorite recipes. Users can also browse recipes by country and ingredient, and search or filter recipes by main ingredient, cuisine, name, or category. Additionally, users can get random recipes. The application ensures that certain features, such as adding or modifying recipes and favoriting recipes, are accessible only after logging in.

## Features

- User Authentication
- Add Your Own Recipes
- Modify Your Own Recipes
- Favorite Recipes
- Browse Recipes by Country
- Browse Recipes by Ingredient
- Search and Filter by Main Ingredient, Cuisine, Name, or Category
- Random Recipe Generator
- Responsive Design
- Ingredient Search

## Technologies Used

- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Management**: Cloudinary
- **External API**: TheMealDB API

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/recipe-book.git
   cd recipe-book

2. **Install frontend dependencies:**

    ```sh
    cd client
    npm install

3. **Install backend dependencies:**

    ```sh
    cd ../server
    npm install

4. **Set up environment variables:**
Create a .env file in the server directory and add the following:

    ```sh
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
5. **Run the application:**
Open two terminals. In the first terminal, run:

      ```sh
      cd server
      nodemon app.js
6. **In the second terminal, run:**

    ```sh
    cd client
    npm start
## Usage
  ### Authentication
  - Sign Up: Create an account to access all features.
  - Login: Log in to add, modify, or favorite recipes.
  ### Recipe Management
  - Add Recipe: After logging in, add your own recipes with details like name, ingredients, and steps.
  - Modify Recipe: Edit your previously added recipes.
  - Favorite Recipe: Add any recipe to your favorites for easy access.
  ### Browsing and Searching
  - Browse by Country: Discover recipes from different countries.
  - Browse by Ingredient: Find recipes based on a specific ingredient.
  - Search and Filter: Use the search bar to filter recipes by main ingredient, cuisine, name, or category.
  - Random Recipe: Get a random recipe suggestion.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements.
