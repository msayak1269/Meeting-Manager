import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const history = useHistory()
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userImgUrl, setUserImgUrl] = useState("")
    const checkAuth = () => {
        var id = Cookies.get("userId")
        if (id) {
            setUserId(id)
        }
        else {
            history.push("/login")
        }
    }
    const fetchUserDetail = () => {
        fetch(`https://meetingmanagerapi.pythonanywhere.com/api/userdetail/${Cookies.get("userId")}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                var name = data.name
                var email = data.email
                var img = data.image
                setUserEmail(email)
                setUserImgUrl(img)
                setUserName(name)
            })

    }
    const logoutUser = () => {
        var r = window.confirm("You want to Logout?");
        if (r === true) {
            Cookies.remove("userId");
            history.push("/login");
        }
    }
    useEffect(() => {
        checkAuth();
        fetchUserDetail();
        // logoutUser();
    }, []);
    return (
        <div>
            <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>
                <div>
                    <div className="card text-center"
                        style={{
                            borderRadius: "20px",
                            boxShadow: "0px 0px 15px -5px slategray",
                            borderTopColor: "blue",
                            borderBottomColor: "blue",
                            borderTopWidth: "5px",
                            borderBottomWidth: "5px"
                        }}
                    >
                        <img className="m-4" src={`${userImgUrl}`} alt=""
                            style={{
                                borderRadius: "50%"
                            }}
                        />
                        <hr />
                        <div className="card-body">
                            <div className="card-title">{userName}</div>
                            <div className="card-title">{userEmail}</div>
                        </div>
                    </div>

                    <div className="m-2">
                        <Link to="/">
                            <div className="btn btn-outline-success"
                                style={{
                                    borderRadius: "20%",
                                }}
                                ><i className="fa fa-arrow-left"
                                    style={{
                                        fontSize: "30px"
                                    }}
                                ></i>
                            </div>
                        </Link>
                    </div>
                    <div className="btn btn-outline-danger"
                        style={{
                            borderRadius: "20%",
                        }}
                        onClick={logoutUser}><i className="fa fa-sign-out-alt"
                            style={{
                                fontSize: "30px"
                            }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

{/* <h3>{userId}</h3>
                    <h3>{userName}</h3>
                    <h3>{userEmail}</h3>
                    <h3>{userImgUrl}</h3> */}
