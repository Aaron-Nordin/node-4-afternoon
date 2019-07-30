require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkSession = require("./middleware/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");
const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`Server ${SERVER_PORT} is aware`);
});

//-----------------------TOP-LEVEL MIDDLEWARE--------------------------
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkSession);

//---------------------------ENDPOINTS-----------------------------------
// SWAG
app.get("/api/swag", swagController.read);

//AUTHORIZATION
app.get("/api/user", authController.getUser);
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);

//CART
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);

//SEARCH
app.get("/api/search", searchController.search); //add ?category=hats etc
