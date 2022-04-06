const express = require('express')

const router = express.Router()

// middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile")

// controller auth
const { 
    register,
    login,
    checkAuth
} = require("../controllers/auth")

// controller user
const { 
    getUsers,
    getUser,
    updateUser
} = require("../controllers/user")


// controller group link
const {
    addGroup,
    getGroups,
    getGroup,
    updateGroup,
    deleteGroup
} = require("../controllers/groupLink")

// controller link
const {
    addLink,
    getLinks,
    getLink,
    updateLink,
    deleteLink
} = require("../controllers/link")


// auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth)

// user
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/update/:id", updateUser);

// group link
router.post("/add-group", auth, uploadFile("imgBrand"), addGroup);
router.get("/groups", auth, getGroups);
router.get("/group/:id", auth, getGroup);
router.patch("/group/:id", auth, updateGroup);
router.delete("/group/:id", auth,  deleteGroup);

// link
router.post("/add-link", uploadFile("icon"), addLink);
router.get("/links", getLinks);
router.get("/link/:id", getLink);
router.patch("/link/:id", updateLink);
router.delete("/link/:id", deleteLink);

module.exports = router;