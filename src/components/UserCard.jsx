import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, buttonEnabled, onAction }) => {
    const { _id, firstName, lastName, photoUrl, about, gender, age } = user;
    const dispatch = useDispatch();

    const handleFeedRequests = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(_id));
            if (onAction) onAction();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img
                        src={photoUrl}
                        alt="User photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{about}</p>
                    <p>{age && ("Age: " + age)}{gender && (" Gender: " + gender)}</p>
                    {buttonEnabled && (
                        <div className="card-actions justify-between">
                            <button className="btn btn-primary" onClick={() => handleFeedRequests("ignored", _id)}>Ignore</button>
                            <button className="btn btn-secondary" onClick={() => handleFeedRequests("interested", _id)}>Interested</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserCard