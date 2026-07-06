# CookSmart
> **Ingredient-Based Recipe Recommendation System built with React, Tailwind CSS, and a custom ingredient-matching engine.**

CookSmart is a modern web application that helps users discover recipes they can prepare using ingredients already available in their kitchen. Instead of manually searching through thousands of recipes, users simply select the ingredients they have, and CookSmart intelligently recommends the most relevant recipes based on ingredient matching, normalization, and ranking.

The application was built with a strong focus on **data preprocessing**, **ingredient normalization**, and **recommendation quality** rather than relying solely on third-party APIs. A custom preprocessing pipeline was developed to clean recipe data, normalize ingredient names, generate searchable tokens, and enrich the dataset with real recipe images.

---

##  Features

-  Search recipes using available kitchen ingredients
-  Smart ingredient normalization and token matching
-  Intelligent recipe ranking based on matched and missing ingredients
-  Detailed recipe pages with ingredients and preparation steps
-  Real recipe images collected from the Epicurious dataset
-  Fully responsive interface for desktop and mobile devices
-  Fast client-side recommendation engine with instant results

---

## Technologies Used

### Frontend

- **React.js** – Component-based UI development
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first styling
- **JavaScript (ES6+)** – Application logic
- **Vite** – Frontend build tool

### Data Processing

- **Node.js Scripts** – Recipe dataset preprocessing and image enrichment
- **Custom Tokenizer** – Ingredient token generation
- **Ingredient Normalization** – Alias mapping and data cleaning

### Dataset

- **Epicurious Recipe Dataset**
  - 13,500+ recipes
  - Real recipe images
  - Custom processed ingredient tokens

### Libraries

- Axios
- Cheerio
- Lucide React

---

## System Architecture

```text
                User Selects Ingredients
                         │
                         ▼
              Ingredient Normalization
                         │
                         ▼
               Token Generation
                         │
                         ▼
          Recommendation Engine
                         │
                         ▼
             Recipe Ranking & Sorting
                         │
                         ▼
            Recommended Recipes Display
                         │
                         ▼
                Recipe Details Page
```

### Workflow

1. Users select the ingredients available in their kitchen.
2. The selected ingredients are normalized to ensure consistent matching.
3. Each recipe contains preprocessed ingredient tokens generated during dataset preparation.
4. The recommendation engine compares user-selected ingredients with recipe tokens.
5. Recipes are ranked based on:
   - Number of matched ingredients
   - Number of missing ingredients
   - Overall recommendation score
6. The highest-ranked recipes are displayed along with the missing ingredients and complete cooking instructions.

---

## 🧠 Recommendation Engine

Unlike traditional recipe applications that rely solely on API search, CookSmart uses a custom ingredient-matching pipeline to recommend recipes based on the ingredients selected by the user.

### Ingredient Processing

Before being used by the application, the recipe dataset is preprocessed to improve matching accuracy.

The preprocessing pipeline performs the following operations:

- Removes quantities, measurements, and unnecessary descriptors
- Normalizes ingredient aliases (e.g., *mozzarella cheese* → *cheese*)
- Generates searchable ingredient tokens
- Eliminates duplicate tokens
- Preserves meaningful ingredients for accurate matching

### Recommendation Strategy

For every recipe, the application compares the user-selected ingredients against the preprocessed recipe tokens.

Recipes are then ranked using:

- Number of matched ingredients
- Number of missing ingredients
- Overall recommendation score

This approach prioritizes recipes that require fewer additional ingredients while still maintaining relevant search results.

### Why This Approach?

Performing ingredient normalization and token generation during dataset preprocessing significantly reduces computation during runtime, allowing recommendations to be generated instantly on the client side without additional API requests.

---

## Project Structure

```text
CookSmart/
│
├── public/                 # Static assets
├── src/
│   ├── Components/         # Reusable React components
│   ├── constants/          # Ingredient dictionary and constants
│   ├── data/               # Processed recipe datasets
│   ├── utils/              # Recommendation engine and tokenizer
│   ├── App.jsx
│   └── main.jsx
│
├── tools/                # Dataset preprocessing and image enrichment
│
├── package.json
└── vite.config.js
```

### Key Directories

- **Components/** – UI components responsible for rendering different parts of the application.
- **constants/** – Contains ingredient aliases and other reusable constants.
- **data/** – Stores the processed recipe dataset used by the recommendation engine.
- **utils/** – Includes the tokenizer, ingredient normalization logic, and recipe recommendation algorithm.
- **tools/** – Contains one-time preprocessing utilities used to clean the dataset, generate tokens, and enrich recipes with real images.
---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or above)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/ishika9859/CookSmart.git
```

Navigate to the project directory:

```bash
cd CookSmart
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## Dataset

CookSmart uses a custom processed version of the **Epicurious Recipe Dataset**.

### Dataset Highlights

- **13,500+ recipes**
- **Real recipe images**
- **Preprocessed ingredient tokens**
- **Normalized ingredient aliases**
- **Optimized for fast client-side recommendation**

The raw dataset is processed using custom preprocessing scripts before being consumed by the application.

---
## Screenshots

### Home Page

The landing page introduces CookSmart and allows users to begin searching recipes using the ingredients available in their kitchen.

<img width="1900" height="912" alt="image" src="https://github.com/user-attachments/assets/f084b9be-b4b1-46b5-be3a-cc9eb805fa18" />


---

### Ingredient Selection

Users can search and select multiple ingredients, which are then used by the recommendation engine to identify the most relevant recipes.

<img width="1377" height="587" alt="image" src="https://github.com/user-attachments/assets/5d1d697f-3dd0-40e0-9268-30ab8fdc8628" />


---

### Recipe Recommendations

Recipes are ranked based on ingredient matching, displaying both available and missing ingredients to help users decide what they can cook.

<img width="1867" height="897" alt="image" src="https://github.com/user-attachments/assets/93667f5e-c8ad-4640-8ad5-fdca8f73245f" />


---

### 📖 Recipe Details

Each recipe includes the complete ingredient list, cooking instructions, and a dedicated detail page for a better cooking experience.

<img width="1858" height="887" alt="image" src="https://github.com/user-attachments/assets/dba88b6d-1fd8-41c6-a44d-3a190b3996e7" />
<img width="1851" height="892" alt="image" src="https://github.com/user-attachments/assets/57ea8b29-7a70-455e-a039-eb87651680b4" />

---

## Future Improvements

Although the current version provides a complete ingredient-based recipe recommendation experience, several enhancements can further improve the application:

- Save favorite recipes
- User authentication and personalized profiles
- Nutritional information for recipes
- Advanced filtering (Cuisine, Diet, Cooking Time, Difficulty)
- AI-powered recipe suggestions and substitutions
- Spring Boot backend with PostgreSQL database
- Progressive Web App (PWA) support
- User ratings and reviews

---
## Author

**Ishika Gupta**

Computer Science and Engineering Student

Email: *ishikagupta9859@gmail.com*

GitHub: *[GitHub](https://github.com/ishika9859)*

LinkedIn: *[LinkedIn](https://www.linkedin.com/in/ishika-gupta-072a79320)*

---

If you found this project interesting, feel free to ⭐ the repository.
