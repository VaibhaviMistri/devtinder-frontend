import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import axios from 'axios';
import UserCard from "./UserCard";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const limit = 10
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async (currentPage) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/user/feed?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true
        });
      const newUsers = res?.data?.data || [];
      if (newUsers.length > 0) {
        dispatch(addFeed(res?.data?.data));
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed(page);
  }, [page]);

  const handleNext = () => {
    if (currentIndex < limit - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    else {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) return <h1 className="flex justify-center my-10 font-bold">Loading...</h1>;
  if (!feed || feed.length === 0) return <h1 className="flex justify-center my-10 font-bold">No new user found</h1>;

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} buttonEnabled={true} onAction={ handleNext } />
    </div>
  )
}

export default Feed;