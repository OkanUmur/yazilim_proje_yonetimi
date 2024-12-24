# Web Cash App Project

This is the version 1.0.0 of Web Cash.

## Description

This project is a web application built with React, specifically designed for cashiers to use during the checkout process. The application features a user-friendly interface that allows cashiers to efficiently handle customer orders, manage a customizable product catalog, and process payments. It supports multiple payment methods and provides real-time campaign discounts to ensure a smooth and efficient checkout experience.


## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/BeeSoftwareMahmut/webcashapp.git
   cd my-react-project

2. Install the dependencies:   

   ```bash
   npm install

3. Start the JSON Server:

   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3001

 ## API Endpoints
The project uses JSON Server for the backend, which runs on port 3001. Here are the available endpoints:

GET /version: Fetch the version of The App
GET /cashiers: Fetch all  cashiers who were auhthorized 
GET /categories: Fetch all  categories 
GET /producst: Fetch all  products
GET /campaigns: Fetch avaliable  campaigns
POST /returnOrders: Add the product to database which was returned
POST /eReciept: Add the cart to database which was paid with user email
  

4. Run the project:

  ```bash
   npm start
   

## Project Structure

webcash/
│
├── public/
│   ├── index.html
│   ├── Images
│   └── Sounds  
│    
│
├── src/
│   ├── Components/
│   │   ├── Keyboard
│   │   ├── MyButton.js
│   │   ├── MyInput.js
│   │   └── MyAlertify
│   ├── Context/
│   │   ├── CartContext.js
│   │   ├── LoginContext.js
│   │   ├── ProductsContext.js  
│   │   ├── ReturnContext.js
│   │   └── Context.js
│   ├── locales/
│   │   ├── ar
│   │   ├── en
│   │   ├── fr
│   │   ├── jp
│   │   └── tr
│   ├── Pages/
│   │   ├── LoginPage
│   │   ├── MainScreen
│   │   ├── PaymentScreen
│   │   ├── RecieptPage
│   │   ├── ReturnOrderPage
│   │   ├── SalesScreen
│   │   ├── SetingsPage
│   │   └── ShowPricePage
│   ├── Server/
│   │   └── Data/
│   │       └──db.json
│   ├── Styles/
│   │   ├── Alert.css
│   │   ├── Cart.css
│   │   ├── Category.css
│   │   ├── DropDownMenu.css
│   │   ├── Keyboard.css
│   │   ├── LoginPage.css
│   │   ├── MainScreen.css
│   │   ├── MyInput.css
│   │   ├── Payment.css
│   │   ├── Product.css
│   │   ├── Reciept.css
│   │   ├── ReturnOrderPage.css
│   │   ├── Setings.css
│   │   └── ShowPricePage.css
│   ├── App.css
│   ├── App.js
│   ├── i18n.js
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md


## Usage
 1-Open your browser and go to http://localhost:3000
 2-Login with your credentials
 3-Browse and add products to the cart
 4-Proceed to checkout and complete the payment

## Known Issues and Limitations

 Limited product filtering options
 Payment system only simulates transaction


## Features

 User authentication and authorization
 Dynamic product catalog with search and filter functionality
 Shopping cart with real-time updates and quantity adjustments
 Campaign and discount management
 Multiple payment options (cash, credit card)
 Real-time currency conversion
 Responsive design for tablet and desktop views


 ## Technologies Used
React
React Router
Context API for state management
Axios for API requests
JSON Server for backend (running on port 3001)
FontAwesome for icons
i18n for multilanguage
CSS for styling