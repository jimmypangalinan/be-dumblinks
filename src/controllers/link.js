const { link } = require("../../models");

// Add new link
exports.addLink = async (req, res) => {
    const linkExist = await link.findOne({
        where: {
            title: req.body.title,
        }
    });

    if(linkExist) {
        return res.status(200).send({
            Status: "failed",
            message: "Title allready exist",
            data: {
                linkExist,
            }
        });
    }

    try {
        
        let dataLink = req.body;

        let createLink = await link.create({
            ...dataLink,
            icon: req.file.filename,
        });

        let newLink = JSON.parse(JSON.stringify(createLink));

        res.status(201).send({
            status: "Success",
            message: "Success create link",
            data: {
                newLink,
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

// get links
exports.getLinks = async (req, res) => {
    try {
        const links = await link.findAll({
            where: {
                idGroup: req.body.idGroup
            }
        });

        if(!links){
            res.status(201).send({
                status: "Success",
                message: "Links not found",
            });
        }else{
            res.status(200).send({
                status: "Success",
                message: "Get links success",
                data: {
                    links
                }
            })
        }

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
        console.log(error);
    }
}

// get link by id
exports.getLink = async (req, res) => {
    try {
        let linkExist = await link.findOne({
            where:{
                id: req.params.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        linkExist = JSON.parse(JSON.stringify(linkExist));

        if(!linkExist) {
            res.status(200).send({
                status: "Success",
                message: "Link not found",
            });
        }else{
            res.status(201).send({
                status: "Success",
                message: "Get link success",
                data: {
                    linkExist
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

// update link by id
exports.updateLink = async (req, res) => {
    try {
        const newData = req.body;
        const updateLink = await link.update(newData, {
            where: {
                id: req.params.id
            }
        });
        
        const linkDetail = await link.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(201).send({
            status: "Success",
            message: "Success update link",
            data: {
                linkDetail,
            }
        });

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
        console.log(error);
    }
}

// delete link by id
exports.deleteLink = async (req, res) => {
    try {
        const linkDelete = await link.destroy({
            where: {
                id:  req.params.id
            },
        });

        res.status(201).send({
            status: "Success",
            message: "Success delete link"
        })

    } catch (error) {
        
    }
}