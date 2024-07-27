import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login(props) {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login", data)
            .then((result) => {
                props.handleLogin(data.username);
                navigate("/");
            })
            .catch((err) => {
                alert(err);
                setData({
                    username: "",
                    password: "",
                });
            });
    };

    return (
        <>
            <h1>LOGIN PAGE</h1>
            <Form className="mb-push-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
}
