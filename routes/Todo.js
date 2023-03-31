/** @format */

const router = require("express").Router();
const todo = require("../model/todomodel");

router.post("/add-todo", async (req, res) => {
  try {
    const newTodo = new todo({
      userid: req.body.userid,

      task: req.body.task,
    });

    const todos = await newTodo.save();

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
});

router.get("/get-todo/:id", async (req, res) => {
  try {
    const allTodos = await todo.find({
      userid: req.params.id,
    });

    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
