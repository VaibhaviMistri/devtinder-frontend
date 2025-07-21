import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from 'axios';
import UserCard from "./UserCard";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error);      
    }
  };

  useEffect(() => {
    getFeed();
  },[]);

  if (feed === null) return <h1 className="flex justify-center my-10 font-bold">Loading...</h1>;
  if (feed.length <= 0) return <h1 className="flex justify-center my-10 font-bold">No new user found</h1>;

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} buttonDisabled={true} />
      </div>
    )
  )
}

export default Feed;