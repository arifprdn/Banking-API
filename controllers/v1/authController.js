const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({
                    status: false,
                    message: `fields can not empty`,
                    data: null
                });
            }
            let exist = await prisma.user.findUnique({ where: { email } })
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: `user already exist`,
                    data: null
                })
            }

            let user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            })

            return res.status(201).json({
                status: true,
                message: `account created`,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
        catch (err) {
            next(err)
        }

    },
    login: async (req, res, next) => {
        try {
            let { email, password } = req.body
            let user = await prisma.user.findUnique({ where: { email } })
            if (!user) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: `invalid email or password`,
                    data: null
                })
            }

            if (password != user.password) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: `invalid email or password`,
                    data: null
                })
            }

            let token = jwt.sign(user, JWT_SECRET_KEY)
            return res.status(200).json({
                status: true,
                message: `created`,
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email

                    }, token
                }
            });
        }
        catch (err) {
            next(err)
        }

    },
    authenticate: async (req, res) => {
        return res.status(200).json({
            status: true,
            message: "OK",
            data: { user: req.user }
        })

    }
}
