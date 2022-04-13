const { brand, link } = require("../../models");
const Joi = require("joi");

const cloudinary = require('../utils/cloudinary');


// Add new group link
exports.addGroup = async (req, res) => {

    const groupExist = await brand.findOne({
        where: {
            title: req.body.title,
        }
    });

    if (groupExist) {
        return res.status(200).send({
            Status: "failed",
            message: "Title allready exist",
            data: {
                groupExist,
            }
        });
    }

    try {
        const { title, description } = req.body;
        const schema = Joi.object({
            title: Joi.string().max(35).required(),
            description: Joi.string().max(70).required(),
        });

        const { error } = schema.validate({ title, description });
        if (error) {
            return res.status(400).json({
                status: "Failed",
                message: "error validation",
                error: {
                    message: error.details[0].message,
                },
            });
        }


        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false,
        });


        const createGroup = await brand.create({
            title: req.body.title,
            description: req.body.description,
            imgBrand: req.file.filename,
            uniqueLink: req.body.uniqueLink,
            viewCount: 0,
            idUser: req.user.id
        })

        let newGroupLink = JSON.parse(JSON.stringify(createGroup));
        const groups = await brand.findOne({
            where: {
                id: newGroupLink.id,
            },
            attributes: ["id", "title", "description", "uniqueLink", "viewCount"],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });



        res.status(201).send({
            status: "Success",
            message: "Success create group link",
            // groups
        })

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
        console.log(error);
    }
}

// get group links
exports.getGroups = async (req, res) => {
    try {
        const groups = await brand.findAll({
            where: {
                idUser: req.user.id
            },
            order: [["createdAt", "DESC"]],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: {
                model: link,
                as: "link",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        const path = process.env.FILE_PATH;

        if (!groups) {
            res.status(201).send({
                status: "Success",
                message: "Groups not found",
            });

        } else {
            res.status(200).send({
                status: "Success",
                message: "Get group links success",
                data: {
                    groups,
                    path: path,
                }
            })
        }

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
    }
}

// get group by id
exports.getGroup = async (req, res) => {
    try {
        let group = await brand.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: {
                model: link,
                as: "link",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        group = JSON.parse(JSON.stringify(group));

        const path = process.env.FILE_PATH;

        if (!group) {
            res.status(200).send({
                status: "Success",
                message: "Group not foound",
                data: {
                    group,
                }
            });
        } else {


            res.status(201).send({
                status: "Success",
                message: "Get group success",

                data: {
                    ...group,
                    imgBrand: path + group.imgBrand,
                    path: path,
                    // link :{
                    //     ...link,
                    //     icon: path + link.icon
                    // }
                }
            });
        }

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
    }
}

// get group by uniqueLlink
exports.getUniqueLink = async (req, res) => {
    try {
        let group = await brand.findOne({
            where: {
                uniqueLink: req.params.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: {
                model: link,
                as: "link",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        const path = process.env.FILE_PATH;
        group = JSON.parse(JSON.stringify(group));

        if (!group) {
            res.status(200).send({
                status: "Success",
                message: "Group not foound",
                data: {
                    group,
                }
            });
        } else {
            res.status(201).send({
                status: "Success",
                message: "Get group success",
                data: {
                    group,
                    path: path
                }
            });
        }

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
    }
}

// update group by id
exports.updateGroup = async (req, res) => {
    try {

        const updateData = req.body;
        console.log(req.body);
        console.log(req.params.id);

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false,
        });


        const createGroup = await brand.update({
            ...updateData,
            imgBrand: req.file.filename
        }, {
            where: {
                id: req.params.id,
            },
        })

        const update = await brand.findOne({
            where: {
                id: req.params.id
            }
        })

        res.status(201).send({
            status: "Success",
            message: "Succes update group",
            data: {
                update,
            }
        });

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
    }
}

// delete group by id
exports.deleteGroup = async (req, res) => {
    try {
        const groupDelete = await brand.destroy({
            where: {
                id: req.params.id,
            },
            include: {
                model: link,
                as: "link",
            },
        });

        res.status(201).send({
            status: "Success",
            message: "Success delete group",

        })

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
    }
}


// viewCount
exports.addViewCount = async (req, res) => {
    try {
        const findData = await brand.findOne({
            where: {
                id: req.params.id,
            }
        });

        console.log(findData.viewCount);

        const addView = {
            viewCount: findData.viewCount + 1
        }

        const data = await brand.update(addView, {
            where: {
                id: req.params.id,
            }
        });

        res.status(201).send({
            status: "Success",
            message: "Success delete group",

        })

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
    }
}
