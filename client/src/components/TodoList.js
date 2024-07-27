import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TodoList(props) {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);

    const getData = async () => {
        await axios
            .get(`http://localhost:8000/api/note/${props.user}`)
            .then((result) => {
                setData(result.data);
                setCheck(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, [check]);

    return (
        <>
            <ListGroup>
                {check ? (
                    data.map((el) => {
                        return <Rows key={el.id} data={el} />;
                    })
                ) : (
                    <p>Nothing</p>
                )}
            </ListGroup>
            <AddNote user={props.user} />
        </>
    );
}

function Rows(props) {
    const handleClick = async (e) => {
        console.log(props.data);
        await axios
            .put("http://localhost:8000/api/note", props.data)
            .then((result) => {
                console.log(result);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <ListGroup.Item onClick={handleClick}>{props.data.text}</ListGroup.Item>
    );
}

function AddNote(props) {
    const [data, setData] = useState({
        task: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:8000/api/note", {
                ...data,
                user: props.user,
            })
            .then((result) => {
                setData({
                    task: "",
                });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <h1 className="task">Add Task</h1>
            <Form className="mb-push-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Task</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your task"
                        name="task"
                        value={data.task}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Task
                </Button>
            </Form>
        </>
    );
}

export default TodoList;
