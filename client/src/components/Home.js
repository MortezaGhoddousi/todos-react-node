import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavHeader from "./NavHeader";
import TodoList from "./TodoList";

export default function Home(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .delete("http://localhost:8000/api/login/current")
            .then((result) => {
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <NavHeader
                loggedIn={props.loggedIn}
                user={props.username}
                handleLogout={handleLogout}
            />
            <h1>TODO lists</h1>
            <TodoList user={props.username} />
        </>
    );
}
