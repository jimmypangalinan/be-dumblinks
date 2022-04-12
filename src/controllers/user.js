const { user } = require("../../models");

// get users
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll()

    if (!users) {
      res.status(201).send({
        status: "Success",
        message: "Users Empty",
      })
    } else {
      res.status(200).send({
        status: "Success",
        message: "Get Users Success",
        users
      })
    }
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: "Bed Request",
    })
    console.log(error);
  }
}

// get user
exports.getUser = async (req, res) => {
  try {
    const userExist = await user.findOne({
      where: {
        id: req.user.id,
      },

      attributes: {
        exclude: ["createdAd", "updatedAt"]
      }
    })

    if (!userExist) {
      res.status(201).send({
        status: "Success",
        message: "User not found",
      })
    } else {
      res.status(200).send({
        status: "Success",
        message: "Get user success",
        userExist
      })
    }

  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: "Bed Request",
    })
    console.log(error);
  }
}

//update user by id
exports.updateUser = async (req, res) => {
  try {

    const dataUpdate = req.body;

    const newUpdate = await user.update(dataUpdate, {
      where: {
        id: req.params.id,
      },
    })

    const updateUser = await user.findOne({
      where: {
        id: req.params.id,
      }, 
    })

    res.status(200).send({
      status: "Success",
      message: "Update data success",
      details: updateUser,
    });

  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: "Bed Request",
    })
    console.log(error);
  }
}

// get user
exports.deleteUser = async (req, res) => {
  try {
    const userExist = await user.destroy({
      where: {
        id: req.params.id,
      }
    })


    res.status(200).send({
      status: "Success",
      message: "Success delete user",
      userExist
    })


  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: "Bed Request",
    })
    console.log(error);
  }
}
