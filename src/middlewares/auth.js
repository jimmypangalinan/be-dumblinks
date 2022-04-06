const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const authHeader = req.header("authorization");

    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).send({
            status: "Bad request",
            message: "Access deny",
        })
    }

    try {
        const SECRET_KEY =`SANGAT_RAHASIA`;
        const verified = jwt.verify(token, SECRET_KEY);

        req.user = verified;

        next();
    } catch (error) {
        res.status(400).send({
            status: "Bad request",
            message: "Invalid Token",
          });
    }
}