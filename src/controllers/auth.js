const { user } = require("../../models");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// add new user
exports.register = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(5).required(),
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(5).required(),
    })

    const {error} = schema.validate(req.body);

    if (error) {
        return res.status(400).send({
            status: "Bad request",
            message: error.details[0].message,
        });
    }

    const userExist = await user.findOne({
        where: {
            email: req.body.email,
        },
    });
    
    if (userExist) {
        return res.status(200).send({
            Status: "Failed",
            message: "Email allready exist",
            data: {
                userExist,
            }
        });
      }

    try {
        const salt = await bcrypt.genSalt(10);    
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = await user.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword,
        });

        const dataToken = {
            id: newUser.id
        }

        const path = process.env.FILE_PATH; 
        const SECRET_KEY = process.env.TOKEN_KEY;
        const token = jwt.sign(dataToken, SECRET_KEY);

        res.status(201).send({
            status: "Success",
            message: "Success create new user",
            data: {
                email: newUser.email,
                token,
                path
            }
        })

        
     } catch (error) {
        res.status(400).send({
            status: "Bad Request",
            message: "Server error",
            error
          });
        console.log(error);
     } 

}

// get user login
exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);

    if(error) {
        return res.status(400).send({
            status: "Bad Request",
            message: error.details[0].message,
        });
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email,
            },
        });

        const isValid = await bcrypt.compare(req.body.password, userExist.password);
        
        if(!isValid) {
            return res.status(201).send({
                status: "Failed",
                message: "Email or password wrong",
            });
        }

        const dataToken = {
            id: userExist.id,
        };
      
        const path = process.env.FILE_PATH; 
        const SECRET_KEY = process.env.TOKEN_KEY;
        const token = jwt.sign(dataToken, SECRET_KEY);

        res.status(200).send({
            status: "Success",
            message: "Email and password match",
            data: {
                userExist,
                token,
                path
            }
        });

    } catch (error) {
        res.status(400).send({
            status: "Bad Request",
            message: "Server error",
            error
          });
    }
}

// check auth
exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });

        if (!dataUser) {
            return res.status(404).send({
              status: "Failed",
              message: "User not found"
            });
        }

        res.status(200).send({
            status: "Success",
            message: "Find successfully",
            data: {
              user: {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
              },
            },
          });
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "Server Error",
            error
          });
    }
}