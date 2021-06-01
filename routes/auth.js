const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get("/", auth, async (req, res) => {
    // Если успешно залогинились, то у нас есть req.user
    try {
        const user = await User.findById(req.user.id).select(
            "-password"
        ); /* пароль не включаем  */
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public

router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user)
                return res.status(400).json({ msg: "Invalid Credentials" });

            // Проверяем совпадет ли пароль из req.body и юзера из базы данных
            const isMatchPasswords = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatchPasswords) {
                return res.status(400).json({
                    msg: "Invalid Credentials: Password doesn't match",
                });
            }

            // возращаем обьект с айди пользователя и временем истечения jwt токена
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 3600000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token }); // возращаем обьект с айди пользователя и временем истечения jwt токена
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
