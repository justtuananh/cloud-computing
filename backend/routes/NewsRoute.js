const express = require("express");
const {
    createNews,
    getAdminNews,
    getAllNews,
    updateNews,
    deleteNews,
    getSingleNews

 
} = require("../controller/NewsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/news").get(getAllNews);

router
  .route("/admin/news")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminNews);

router
  .route("/news/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createNews);

  router
  .route("/news/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateNews)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteNews)
  .get(getSingleNews);

  module.exports = router;