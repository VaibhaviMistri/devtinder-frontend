import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {

    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections",
                { withCredentials: true }
            );
            dispatch(addConnection(res.data.data));
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    if (connections === null) return <p className="flex justify-center my-10 font-bold">Loading...</p>;
    if (connections.length === 0) return <h1 className="flex justify-center my-10 font-bold">No connections found</h1>;
    return (
        <>
            {
                connections.map((connection) => {

                    const { _id, firstName, lastName, photoUrl, age, about, gender, skills } = connection;

                    return (
                        <div key={_id} className='flex my-4 w-50 justify-between px-40'>

                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={photoUrl} alt="User photo" />
                                </div>
                            </div>

                            <div className="bg-base-200 p-2 collapse mx-5">
                                <input type="checkbox" className="peer" />
                                <div
                                    className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content h-20 py-7 font-bold">
                                    {firstName + " " + lastName}
                                </div>
                                <div
                                    className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                    <p>{about}</p>
                                    {age && gender && <p>{age + ", " + gender}</p>}
                                    {skills && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {skills.map((skill, index) => (
                                                <p key={index} className="badge badge-primary">{skill}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
};

export default Connections