import jwt from "jsonwebtoken";
import {
    addUser,
    getUser,
    addNote,
    getAllNotes,
    deleteNote,
    getNotesByUser,
} from "../db.mjs";

const apiRouts = (app) => {
    app.get("/api/note", (req, res) => {
        getAllNotes()
            .then((row) => {
                res.send(JSON.stringify(row));
            })
            .catch((err) => {
                res.status(500).send("SERVER ISSUE");
            });
    });

    app.get("/api/note/:user", (req, res) => {
        getNotesByUser(req.params.user)
            .then((row) => {
                res.send(JSON.stringify(row));
            })
            .catch((err) => {
                res.status(500).send("SERVER ISSUE");
            });
    });

    app.post("/api/note", (req, res) => {
        console.log(req.body);
        addNote(req.body.task, req.body.user)
            .then(() => {
                res.status(200).json({ STATUS: "succeed" });
            })
            .catch((err) => res.status(500).json({ ERROR: err }));
    });

    app.put("/api/note", (req, res) => {
        console.log(req.body);
        deleteNote(req.body.id)
            .then(() => {
                res.json({ STATUS: "succeed" });
            })
            .catch((err) => {
                res.json({ Error: err });
            });
    });

    app.post("/api/register", (req, res) => {
        addUser(req.body.username, req.body.password, req.body.email)
            .then(() => {
                res.status(200).json({ STATUS: "succeed" });
            })
            .catch((err) => res.status(500).send({ ERROR: err }));
    });

    app.post("/api/login", (req, res) => {
        getUser(req.body.username, req.body.password)
            .then((result) => {
                if (result) {
                    const token = jwt.sign(
                        { username: req.body.username },
                        "secret Key",
                        { expiresIn: "1d" }
                    );
                    res.cookie("token", token);
                    res.status(200).send({ STATUS: "succeed" });
                } else {
                    res.status(404).send({ ERROR: "user not found" });
                }
            })
            .catch((err) => res.status(500).send({ ERROR: err }));
    });

    const verifyUser = (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ Error: "You are not authenticated" });
        } else {
            jwt.verify(token, "secret Key", (err, decoded) => {
                if (err) return res.json({ Error: "Token is not okey" });
                else {
                    req.username = decoded.username;
                    next();
                }
            });
        }
    };

    app.get("/api/login/current", verifyUser, (req, res) => {
        res.json({ STATUS: "succeed", username: req.username });
    });

    app.delete("/api/login/current", (req, res) => {
        res.clearCookie("token");
        res.json({ STATUS: "succeed" });
    });
};

export { apiRouts };
