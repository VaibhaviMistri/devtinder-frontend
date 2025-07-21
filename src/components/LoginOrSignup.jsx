import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const LoginOrSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isLoginForm = location.pathname === "/login";

    const handleLogin = async () => {
        setErrorMessage("");
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data));
            return navigate("/feed");
        } catch (error) {
            setErrorMessage(error?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {
        setErrorMessage("");
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data.data));
            navigate("/profile");
        } catch (error) {
            setErrorMessage(error?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>

                    {!isLoginForm && (
                        <>
                            <label className="form-control w-full max-w-xs my-2 mx-auto">
                                <div className="label">
                                    <span className="label-text">First Name:</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2 mx-auto">
                                <div className="label">
                                    <span className="label-text">Last Name:</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                        </>
                    )}

                    <label className="form-control w-full max-w-xs my-2 mx-auto">
                        <div className="label">
                            <span className="label-text">Email Id:</span>
                        </div>
                        <input
                            type="text"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mx-auto">
                        <div className="label">
                            <span className="label-text">Password:</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    {errorMessage && <p className="text-red-600 text-sm mx-auto">{errorMessage}</p>}

                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}>
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p
                        className='m-auto cursor-pointer text-stone-500 hover:text-slate-400'
                        onClick={() => navigate(isLoginForm ? "/signup" : "/login")}
                    >
                        {isLoginForm
                            ? "New User? Sign Up Here"
                            : "Existing User? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginOrSignup;
