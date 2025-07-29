import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [about, setAbout] = useState(user.about || "");
    const [gender, setGender] = useState(user.gender || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const handleUpdateProfile = async () => {
        setErrorMessage("");
        try {
            const userData = {
                firstName,
                lastName,
                photoUrl,
                age,
                about,
                gender,
            };
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                userData,
                {
                    withCredentials: true,
                },
            );

            dispatch(addUser(res?.data?.data));

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);

        } catch (error) {
            setErrorMessage(error?.response?.data || "Something went wrong");
        }
    }

    return (
        <>
            <div className="div flex justify-around">
                <div className='flex justify-center my-10'>
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Login</h2>
                            <div className='flex justify-center'>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label my-2">
                                        <span className="label-text">First Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label my-2">
                                        <span className="label-text">Last Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label my-2">
                                        <span className="label-text">Photo URL:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label my-2">
                                        <span className="label-text">Age:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label my-2">
                                        <span className="label-text">About:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label my-2">
                                        <span className="label-text">Gender:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </div>
                            {errorMessage && <p className="text-red-600 mx-2">{errorMessage}</p>}
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={handleUpdateProfile}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-10'>
                    <UserCard user={{ firstName, lastName, photoUrl, age, about, gender }} buttonEnabled={false} />
                </div>
            </div>
            {showToast && <div className="toast toast-center toast-middle">
                <div className="alert alert-success">
                    <span>Profile updated successfully</span>
                </div>
            </div>
            }
        </>
    )
}

export default EditProfile