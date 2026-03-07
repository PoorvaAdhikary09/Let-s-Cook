# 🍽️ Let's Cook App

A modern, responsive food discovery application built with **Angular + Ionic**, powered by **TheMealDB API**.  
Explore meals by **category, ingredient, region, alphabet, or name**, and dive into beautifully designed meal details with a smooth, skeleton-loaded UX across **mobile, tablet, and web**.

---

## 🚀 Features

### 🔐 Authentication Integration (Supabase)

**This project now includes full authentication powered by Supabase.**

- User Sign Up (Email & Password)
- User Login
- Secure Session Handling
- Logout Functionality
- Persistent Authentication State

### 🔍 Smart Browsing
- Browse meals by:
  - Categories
  - Ingredients
  - Food type (Area)
  - First letter (A–Z)
  - Meal name search
- Dynamic routing using query parameters

### 🧩 Unified Catalog
- Single reusable catalog component handles:
  - Category list
  - Ingredient list
  - Meal list
- Context-aware rendering based on URL params

### 🍛 Meal Details Page
- Split responsive layout (image + info | ingredients + recipe)
- Large hero meal image
- Category & food type chips
- Ingredient grid with:
  - Image
  - Name
  - Measurement
- Toggleable **“How to Cook”** recipe section
- Styled YouTube tutorial link

### 🔗 Share Functionality

- Global Share button available across pages
- Opens a dedicated Share Modal
- Users can:
  - Copy the deployed application URL
  - Share the link via supported platforms
- Implemented using Ionic Modal architecture
- Designed to be lightweight and non-intrusive

### 🦴 Skeleton Loading
- Skeleton placeholders shown until data loads
- Smooth perceived performance
- No layout shifts

### 📱 Fully Responsive
- Mobile-first design
- Optimized for:
  - Mobile
  - Tablet
  - Desktop

 ### 🌗 Light & Dark Mode Support

The application now fully supports both Light Mode and Dark Mode.

- Automatically adapts to system theme preference
- Maintains UI consistency across devices
- Optimized color variables for readability
- Seamless switching without layout break

The theme is handled using CSS variables and ```prefers-color-scheme``` media queries to ensure cross-platform compatibility.

---

## 🛠️ Tech Stack

- Angular (Standalone Components)
- Ionic Framework
- TypeScript
- SCSS
- Angular Router
- RxJS
- TheMealDB API
- Supabase (Backend as a Service)
- Supabase Auth (Email/Password based authentication)
Authentication is handled securely using Supabase's ```anon public key```, with proper environment configuration for development and production builds.

---

## 🗂️ Project Structure

```css
src/
│
├── app/
│   ├── components/
|   │   ├──app-menu/
|   │   ├──Auth
|   |        ├──login-form/
|   |        └──signup-form/
│   │   ├── catalog-component/
│   │   ├── meal-details/
│   │   ├── header/
│   │   ├── footer/
|   |   ├── explore-meals/
|   |   ├── share-modal/
|   |   └── home/
│   │
│   ├── services/
│   ├── ├──Supabase-Service
│   |     └──supabase.ts
│   │   └── main-service.ts
│   │
│   └── app.component.ts
│
├── assets/
│   ├── enum/
│   │   └── browse.enum.ts
│   └── images/
│
└── styles/
```



## 🧭 Routing Strategy

Navigation is driven via **query parameters**, allowing a single catalog component to dynamically adapt:
```ts
?pageName=categories
?pageName=ingredients
?pageName=category&categoryName=Seafood
?pageName=ingredient&ingredientName=Chicken
?pageName=letter&letter=A
?pageName=meal&mealName=Arrabiata
```

This keeps routing **clean, scalable, and declarative**.

---

## 📦 Enum-Driven Navigation

```ts
export enum BrowseType {
  CATEGORIES = 'categories',
  INGREDIENTS = 'ingredients',
  CATEGORY = 'category',
  INGREDIENT = 'ingredient',
  LETTER = 'letter',
  FOODTYPE = 'foodType',
  MEAL = 'meal'
}
```

## ▶️ Getting Started
1. Clone the repository
```bash
git clone <your-repo-url>
cd Let-s-Cook
```
2. Install dependencies
``` bash
npm install
```
4. Run the application
```bash
ionic serve
```

## 🌐 API Reference

TheMealDB
https://www.themealdb.com/api.php

## 🧠 Learning Outcomes

- Advanced Angular routing patterns with authenticated route handling
- Standalone component architecture for modular and scalable development
- Supabase integration for authentication and backend connectivity
- Secure session management and environment configuration
- Responsive UI design using Ionic components
- Light & Dark mode implementation using CSS variables and system theme detection
- Skeleton loading and conditional rendering using modern Angular control flow
- Production deployment workflow using Vercel
- Clean state handling without overengineering

## 👩‍💻 Author

Poorva Adhikary
Frontend Developer | Angular | Ionic
