const express = require("express");
const {
  getCards,
  addCard,
  updateCard,
  login,
  deleteCard,
} = require("../controllers/general.controller");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/login", login);

// get card info
router.get("/getCards", getCards);

// add card
router.post("/addCard", upload.single("file"), addCard);

// update card
router.put("/updateCard", upload.single("file"), updateCard);

// delete card
router.delete("/deleteCard", deleteCard);

module.exports = router;
