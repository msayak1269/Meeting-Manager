import React from 'react'
import Base from "../reusables/Base"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory()
    const [userId, setUserId] = useState("")
    const [meetingsOfUser, setMeetingsOfUser] = useState([])
    const[loading,setLoading]=useState(true)
    const checkAuth = () => {
        var id = Cookies.get("userId")
        if (id) {
            setUserId(id)
        }
        else {
            history.push("/login")
        }
    }
        const getMeetings = () => {
            fetch(`https://meetingmanagerapi.pythonanywhere.com/api/getmeetings/${Cookies.get("userId")}`, {
                method: "GET",
                mode: "cors",
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setMeetingsOfUser(data.meetings)
                    setLoading(false)
                })
            }
    const handleDelete = (id) => {
        var r = window.confirm("You want to Delete the meeting info?")
        if(r==true){
            fetch(`https://meetingmanagerapi.pythonanywhere.com/api/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status === "ok") {
                    window.location.reload();
                }
            })
        }
    }
    useEffect(() => {
        checkAuth();
        getMeetings();
    }, []);
    return (
        <Base>
            <div>
                <div className="container text-center mt-3">
                    {loading && <h2>Loading...</h2>}
                    {
                        meetingsOfUser.length > 0 && 
                            (
                                <table className="table table-hover table-dark"
                                    style={{
                                        borderRadius: "20px"
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">About</th>
                                            <th scope="col">Join</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    {meetingsOfUser.map((meeting) => {
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td>{meeting.meetName}</td>
                                                    {/* <td>{meeting.meetLink}</td> */}
                                                    <td>
                                                        <a href={meeting.meetLink} target="_blank">
                                                            <div className="btn btn-info"
                                                            ><i className="fa fa-video"
                                                                style={{
                                                                    fontSize: "30px"
                                                                }}
                                                            ></i>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <div className="btn btn-danger"
                                                            onClick={() => {
                                                                handleDelete(meeting.id);
                                                            }}
                                                        ><i className="fa fa-trash"
                                                            style={{
                                                                fontSize: "30px"
                                                            }}
                                                        ></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            )
                            // :
                            // (
                            //     
                            // )
                    }
                    { !loading && meetingsOfUser.length==0 && (
                        <h2 className="text-center">No Meetings</h2>
                    )}
                    <div className="text-center m-3 pull-left">
                        <Link to="/add">
                            <div className="btn btn-outline-success"
                                style={{
                                    borderRadius: "50px",
                                }}
                            ><i className="fa fa-plus"
                                style={{
                                    fontSize: "30px"
                                }}
                            ></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default Home;