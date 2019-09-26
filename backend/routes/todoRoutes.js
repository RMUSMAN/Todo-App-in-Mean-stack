const Todos = require('../models/todoModel');
const Lists = require('../models/listModel');
const router = require("express").Router();
//const {todoValidation} = require('./validation/validation');





router.post("/:listId", async (req, res) => {

  //  const {error} =todoValidation(req.body);
  //  if(error) return res.status(400).send(error.details[0].message);

    let List = await Lists.findOne({ _id: req.params.listId });

    const Todo = new Todos({
        title: req.body.title,
        marked: req.body.marked,
        dueDate: new Date(req.body.dueDate),
        list: List._id
    });

    try {

        const todo = await Todo.save();
        List.todos.push(todo._id);
        const list = await List.save();
        res.send(list);

    }
    catch (error) {
        res.status(500)
    }

})

router.get("/:listId", async (req, res) => {
    try {
        const todos = await Todos.find({ list: req.params.listId });

        res.send(todos);
    }
    catch (error) {
        res.status(500);
    }

})
// UPDATE TODO
router.patch('/:todoId', async (req, res) => {
 //   const {error} =todoValidation(req.body);
  //  if(error) return res.status(400).send(error.details[0].message);

    try {
        const todo = await Todos.updateOne(
            { _id: req.params.todoId },
            {
                $set: {
                    title: req.body.title,
                }
            }

        );
        res.send(todo);
    }
    catch (err) {
        res.json({ messsage: err });
    }
})



//DELETE TODO

router.delete("/:todoId", async (req, res) => {
    try {
        const todos = await Todos.findByIdAndDelete({ _id: req.params.todoId });
        res.send(todos);
    }
    catch (error) {
        res.status(500);
    }

})

router.patch('/mark/:todoId', async (req, res) => {
    //   const {error} =todoValidation(req.body);
     //  if(error) return res.status(400).send(error.details[0].message);
   //console.log("return data is",req.body.marked);
       try {
           const todo = await Todos.updateOne(
               { _id: req.params.todoId },
               {
                   $set: {
                       marked: req.body.marked,
                   }
               }
   
           );
           res.send(todo);
       }
       catch (err) {
           res.json({ messsage: err });
       }
   })
   



module.exports = router;
