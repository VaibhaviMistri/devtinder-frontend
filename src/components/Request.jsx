import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeUpdatedRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUpdatedRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received",
        {
          withCredentials: true
        }
      );
      dispatch(addRequests(res.data.pendingRequest));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests === null) return <p className="flex justify-center my-10 font-bold">Loading...</p>
  if (requests.length === 0) return <h1 className="flex justify-center my-10 font-bold">No Pending request found</h1>;

  return (
    <>
      {
        requests.map((request) => {

          const { _id, firstName, lastName, photoUrl, age, about, gender, skills } = request.fromUserId;

          return (
            // <div key={_id} className='flex my-4 w-50 px-40'>

            //   <div className="avatar">
            //     <div className="w-24 rounded-full">
            //       <img src={photoUrl} alt="User photo" />
            //     </div>
            //   </div>

            //   <div className="bg-base-200 p-2 collapse ml-5">
            //     <input type="checkbox" className="peer" />

            //     <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content h-20 font-bold py-6">
            //       {firstName + " " + lastName}
            //     </div>
            //     <div
            //       className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            //       <p>{about}</p>
            //       {age && gender && <p>{age + ", " + gender}</p>}
            //       {skills && (
            //         <div className="flex flex-wrap gap-2 mt-2">
            //           {skills.map((skill, index) => (
            //             <p key={index} className="badge badge-primary">{skill}</p>
            //           ))}
            //         </div>
            //       )}
            //       </div>


            //   </div>


            //   < div className="py-1 flex bg-base-200 pt-6">
            //     <button
            //       className="btn btn-warning"
            //       onClick={(e) => {
            //         e.stopPropagation();
            //         reviewRequest("rejected", request._id);
            //       }}>
            //       Reject
            //     </button>
            //     <button
            //       className="btn btn-success"
            //       onClick={(e) => {
            //         e.stopPropagation();
            //         reviewRequest("accepted", request._id)
            //       }}>
            //       Accept
            //     </button>
            //   </div >
            // </div>
            <div key={_id} className='flex my-4 w-full justify-center'>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={photoUrl} alt="User photo" />
                </div>
              </div>

              <div className="collapse bg-base-200 mx-5 w-2/3 p-2">
                <input type="checkbox" className="peer" />

                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content h-20 font-bold py-6">
                  {firstName + " " + lastName}
                </div>

                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content space-y-2">
                  <p>{about}</p>
                  {age && gender && <p>{age + ", " + gender}</p>}

                  {skills && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={index} className="badge badge-accent">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buttons inside collapse-content */}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.stopPropagation(); // Important to prevent toggling
                        reviewRequest("rejected", request._id);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={(e) => {
                        e.stopPropagation(); // Important to prevent toggling
                        reviewRequest("accepted", request._id);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>

          )
        })
      }
    </>
  )
}

export default Request

