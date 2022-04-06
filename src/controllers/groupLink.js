const { groupLink } = require("../../models");

// Add new group link
exports.addGroup = async (req, res) => {

    console.log(req.file.filename);
    const groupExist = await groupLink.findOne({
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
        // console.log(req.body);
        // let newGroup = req.body;
        // console.log(req.body.file);
        const createGroup = await groupLink.create({
            title: req.body.title,
            description: req.body.description,
            imgBrand: req.file.filename,
            uniqueLink: "q2wq2w",
            viewCount: 10,
            idUser: req.user.id
        })

        let newGroupLink = JSON.parse(JSON.stringify(createGroup));

        res.status(201).send({
            status: "Success",
            message: "Success create group link",
            data: {
                newGroupLink,
            }
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
        const groups = await groupLink.findAll({
            where: {
                idUser: req.user.id
            },
        });

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
        let group = await groupLink.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        group = JSON.parse(JSON.stringify(group));

        if (!group) {
            res.status(200).send({
                status: "Success",
                message: "Group not foound"
            });
        } else {
            res.status(201).send({
                status: "Success",
                message: "Get group success",
                data: {
                    group,
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
        const newData = req.body;
        const updateGroup = await groupLink.update(newData, {
            where: {
                id: req.params.id,
            },
        });

        const groupDetail = await groupLink.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });


        res.status(201).send({
            status: "Success",
            message: "Succes update group",
            data: {
                groupDetail,
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
        const groupDelete = await groupLink.destroy({
            where: {
                id: req.params.id,
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