const Todos = require('../models/todoModel');
const Lists = require('../models/listModel');
const router = require("express").Router();
//const {listValidation} = require('./validation/validation');
// GET ALL
router.get('/', async (req, res) => {
    try {
        const lists = await Lists.find().populate("todos");
        res.send(lists);
    }
    catch (error) {
        res.status(500);
    }
})
// GET ONE
router.get('/:listId', async (req, res) => {
    try {
        const list = await Lists.findOne({ _id: req.params.listId }).populate("todos");
        if (!list) return res.send("no list");
        res.send(list);
    }
    catch (error) {
        res.status(500);
    }
})
// update one
router.patch('/:listId', async (req, res) => {
  //  const {error} = listValidation(req.body);
  //  if(error) return res.status(400).send(error.details[0].message);

    try {
        const list = await Lists.updateOne(
            { _id: req.params.listId },
            {
                $set: {
                    name: req.body.name,
                }
            }

        );
        res.send(list);
    }
    catch (err) {
        res.json({ messsage: err });
    }
})

//ADDING NEW LIST
router.post("/", async (req, res) => {
  //  const {error} = listValidation(req.body);
  //  if(error) return res.status(400).send(error.details[0].message);
 
    const List = new Lists({
        name: req.body.name
    });
    try {
        const list = await List.save();
        res.send(list)
    }
    catch (error) {
        res.status(500)
    }

})
//delete list
router.delete("/:listId", async (req, res) => {
    try {

        const todos = await Todos.remove({ list: req.params.listId });
        const list = await Lists.remove({ _id: req.params.listId });
        res.send(list);
    }
    catch (error) {
        res.status(500);
    }

})

module.exports = router;