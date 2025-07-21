import { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
                         
    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true
            });
            dispatch(addUser(res.data));
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            }
            console.error(error);
        }
    }

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, []);

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Body