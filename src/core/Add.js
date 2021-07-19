import React from 'react'
import Base from "../reusables/Base"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';
const Add = () => {
    const history = useHistory()
    const [userId, setUserId] = useState("")
    const [meetName, setMeetName] = useState("")
    const [link, setLink] = useState("")
    const checkAuth = () => {
        const id = Cookies.get("userId")
        if (id) {
            setUserId(id)
            console.log(userId);
        }
        else {
            history.push("/login")
        }
    }
    const handleSubmit = () => {
        if (meetName === "" || link === "") {
            window.alert("Invalid entries!!!")
        }
        var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regx = new RegExp(expression)
        if(meetName !== "" && link.match(regx)) {
            const data = { meetName, link }
            fetch(`https://meetingmanagerapi.pythonanywhere.com/api/add/${Cookies.get("userId")}`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.status === "ok") {
                        history.push("/")
                    }
                })
        }
        else{
            window.alert("Invalid entries!!!")
        }
        
    }
    useEffect(() => {
        checkAuth();
    }, []);
    return (
        <Base>
            <div className="container mt-3">
                <div className="card">
                    <div className="card-body">
                        <form className="form-group" id="new-meeting">
                            <input
                                type="text"
                                className="form-control m-2"
                                id="meetName"
                                name="meetName"
                                placeholder="Meeting Name"
                                onChange={(e) => setMeetName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="form-control m-2"
                                id="meetLink"
                                name="meetLink"
                                placeholder="Meeting Link"
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                            <div className="conatiner text-center mt-2">
                                <button className="btn btn-primary" type="button" onClick={handleSubmit}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default Add;