const { link } = require("../../models");

// Add new link
// exports.addLink = async (req, res) => {

//     const { links } = req.body;
//     console.log("data" + links);
//     console.log(req.body);
//     try {

//         let idBrand = req.params.id;

//         let linkToJson = JSON.parse(JSON.stringify(req.body));

//         console.log(linkToJson);
//         const newLinks = linkToJson.map((item, index) => ({
//             titleLink: item.titleLink,
//             url: item.url,
//             icon: item.image,
//             idBrand: idBrand
//           }));

//         await link.bulkCreate(newLinks);

//         // let newLink = JSON.parse(JSON.stringify(createLink));

//         res.status(201).send({
//             status: "Success",
//             message: "Success create link",

//         })

//     } catch (error) {
//         res.status(400).send({
//             status: "Failed",
//             message: 'Sever error',
//             error
//         });
//         console.log(error);
//     }

// }

exports.addLink = async (req, res) => {

    const links = req.body;
    try {

        const addLinks = await link.create({
            ...links,
            icon: req.file.filename,
        });

        const dataLinks = await link.findOne({
            where: {
                id: addLinks.id
            }, attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(201).send({
            status: "Success",
            message: "Success create link",
            dataLinks,
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



// get links by id brand
exports.getLinks = async (req, res) => {
    // console.log(rre.params.id);
    try {
        const links = await link.findAll({
            where: {
                // idBrand: req.body.idBrand
                idBrand: req.params.id
            }
        });

        // link = JSON.parse(JSON.stringify(links));
        // console.log(link);
        const path = process.env.FILE_PATH; 

        if (!links) {
            res.status(201).send({
                status: "Success",
                message: "Links not found",
            });
        } else {   
            

            res.status(200).send({
                status: "Success",
                message: "Get links success",
                links,
                path: path
                
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
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        linkExist = JSON.parse(JSON.stringify(linkExist));

        if (!linkExist) {
            res.status(200).send({
                status: "Success",
                message: "Link not found",
            });
        } else {
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

    const links = req.body;

    try {

        await link.update({
            ...links,
            icon: req.file.filename,
        },
            {
                where: {
                    idBrand: req.body.idBrand
                }
            });

            const dataLinks = await link.findOne({
                where: {
                    id: addLinks.id
                }, attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });

        res.status(201).send({
            status: "Success",
            message: "Success update link",
            data: {
                dataLinks,
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
                id: req.params.id
            },
        });

        res.status(201).send({
            status: "Success",
            message: "Success delete link"
        })

    } catch (error) {

    }
}