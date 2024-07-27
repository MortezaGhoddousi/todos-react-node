import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:8000/api/login/current").then((result) => {
            if (result.data.STATUS === "succeed") {
                setLoggedIn(true);
                setUser(result.data.username);
            } else {
                setLoggedIn(false);
                setUser("");
            }
        });
    }, [user]);

    const handleLogin = (u) => {
        setUser(u);
    };

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        index
                        element={
                            loggedIn ? (
                                <Home username={user} loggedIn={loggedIn} />
                            ) : (
                                <Login handleLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login handleLogin={handleLogin} />}
                    />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
