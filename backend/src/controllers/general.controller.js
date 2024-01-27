const { writeFileSync, rmSync } = require("fs");
const { password_secret, data_path, images_path } = require("../constants");
const path = require("path");
const {
  insertCard,
  getCards,
  deleteCard,
  getCard,
  updateCard,
} = require("../sqlite/cards");

module.exports.login = async (req, res) => {
  try {
    if (req.body.password === password_secret) {
      // return sucessfull response as logged in
      return res
        .status(200)
        .json({ msg: "Login sucessfull", status: "SUCESS" });
    } else
      return res.status(201).json({ msg: "Wrong password", status: "FAILED" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      msg: "Error fetching cards",
      status: "FAILED",
    });
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await getCards();

    // return sucessfull response with cards
    return res.status(200).json({ cards: cards, status: "SUCESS" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      msg: "Error fetching cards",
      status: "FAILED",
    });
  }
};

module.exports.addCard = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const imagePath = req.file.path;

    await insertCard(data.name, imagePath, data.date);

    return res.status(200).json({ status: "SUCESS" });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      msg: "Login failed",
      status: "FAILED",
    });
  }
};

module.exports.updateCard = async (req, res) => {
  try {
    let data = JSON.parse(req.body.data);
    if (req.file) {
      data = { ...data, image: req.file.path };
    }

    await updateCard(data.id, data.name, data.image, data.date);

    return res.status(200).json({ status: "SUCESS" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      msg: "Login failed",
      status: "FAILED",
    });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await getCard(req.query.id);
    console.log(card);
    await deleteCard(req.query.id);

    const imagePath = path.join(
      images_path.replace("/src/images", ""),
      card.image,
    );

    rmSync(imagePath);

    res.status(200).json({
      msg: "Card deleted sucessfully",
      status: "SUCESS",
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      msg: "Card deletion failed",
      status: "FAILED",
    });
  }
};
