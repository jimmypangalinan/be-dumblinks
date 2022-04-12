const { brand, link } = require("../../models");

// add new imgBrand
exports.addImgBrand = async (req, res) => {

    // console.log(req.file.filename);
    const groupExist = await brand.findOne({
        where: {
            title: req.params.id,
        }
    });

    try {
        const createGroup = await brand.update(
            {
                imgBrand: req.file.filename,
            }, {
            where: {
                id: req.params.id
            }
        })

        res.status(201).send({
            status: "Success",
            message: "Succes addImgBrand",
            data: {
                createGroup,
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