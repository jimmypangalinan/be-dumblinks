const express = require('express');

const router = express.Router()

// middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile")

// controller imgBrand
const {
    addImgBrand
} = require("../controllers/imgBrand")

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
    updateUser,
    deleteUser
} = require("../controllers/user")


// controller group link
const {
    addGroup,
    getGroups,
    getGroup,
    updateGroup,
    deleteGroup,
    getUniqueLink,
    addViewCount
} = require("../controllers/groupLink")

// controller link
const {
    addLink,
    getLinks,
    getLink,
    updateLink,
    deleteLink
} = require("../controllers/link");



// auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth)

// user
router.get("/users", getUsers);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// group link
// router.patch("/add-imgBrand/:id", auth, uploadFile("imgBrand"), addImgBrand);
router.post("/add-group", auth, uploadFile("imgBrand"), addGroup);
// router.post("/add-group", auth, addGroup);
router.get("/groups", auth, getGroups);
router.get("/group/:id", getGroup);
router.get("/url/:id", getUniqueLink);
router.patch("/group/:id", auth,uploadFile("imgBrand"), updateGroup);
router.delete("/group/:id", auth,  deleteGroup);
router.patch("/view/:id", auth,  addViewCount);

// link
// router.post("/add-link/:id", auth, addLink);
router.post("/add-link", auth,uploadFile("icon"), addLink);
router.get("/links/:id", getLinks);
router.get("/link/:id", getLink);
router.patch("/link", auth,uploadFile("icon"), updateLink);
router.delete("/link/:id", deleteLink);

module.exports = router;