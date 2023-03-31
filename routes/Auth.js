/** @format */

const router = require("express").Router();
const user = require("../model/usermodel");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      name: req.body.name,

      email: req.body.email,
      password: hashedPassword,
    });
    const userEmail = await user.findOne({ email: req.body.email });
    userEmail && res.status(404).json("Email already  Exist!!!");

    if (!userEmail) {
      const users = await newUser.save();

      res.status(201).json(users);
    }
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const users = await user.findOne({ email: req.body.email });
    !users && res.status(404).json("User not found");

  

    if (users) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        users.password
      );
      !validPassword && res.status(400).json("wrong password");
      if (validPassword) {
        const { password, ...others } = users._doc;

        res.status(200).json(others);
      }
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router;