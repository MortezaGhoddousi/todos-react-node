import sqlite from "sqlite3";
import { v4 as uuidv4 } from "uuid";

const db = new sqlite.Database("./database.db", () => {
    console.log("connected to database successfully!");
});

const addUser = (username, password, email) => {
    return new Promise((resolve, reject) => {
        const sql =
            "INSERT INTO user (id, username, password, email) VALUES (?, ?, ?, ?)";
        db.run(sql, [uuidv4(), username, password, email], (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });
};

const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
        db.get(sql, [username, password], (err, row) => {
            if (err) reject(err);
            if (row === undefined) {
                resolve(false);
            }
            resolve(row);
        });
    });
};

const addNote = (note, user) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO note (id, text, user) VALUES (?, ?, ?)";
        db.run(sql, [uuidv4(), note, user], (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });
};

const getAllNotes = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from note";
        db.all(sql, (err, row) => {
            if (err) reject(err);
            if (row === undefined) resolve(false);
            resolve(row);
        });
    });
};

const getNotesByUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from note WHERE user=?";
        db.all(sql, [user], (err, row) => {
            if (err) reject(err);
            if (row === undefined) resolve(false);
            resolve(row);
        });
    });
};

const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM note WHERE id=?";
        db.run(sql, [id], (err) => {
            if (err) reject(err);
            resolve("row deleted");
        });
    });
};

export { addUser, getUser, addNote, getAllNotes, deleteNote, getNotesByUser };
