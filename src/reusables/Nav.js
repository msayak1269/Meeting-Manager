import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
const Nav = () => {
    const history = useHistory()
    const [userId, setUserId] = useState("")
    const checkAuth = () => {
        const id = Cookies.get("userId")
        if (id) {
            setUserId(userId)
            console.log(userId);
        }
        else {
            history.push("/login")
        }
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
        // logoutUser();
    }, []);
    return (
        <div className="container-fluid">
            <div className="bg-dark p-3 text-white">
                <div className="row d-flex justify-content-center text-center">
                    <Link to="/profile">
                        <div className="btn btn-outline-warning"
                            style={{
                                borderRadius: "20%",
                            }}
                            ><i className="fa fa-user"
                                style={{
                                    fontSize: "30px"
                                }}
                            ></i>
                        </div>
                    </Link>
                    <div className="col-4">Meeting Manager</div>
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

export default Nav;