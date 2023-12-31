import { useEffect, useState } from "react";
import { getAllUsers, getSearchUsers } from "./apihelper/adminCalls";
import { useSelector } from "react-redux";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

export const ManageUsers = () => {
  //user id
  const userId = useSelector((state) => state.user.userId);

  const navigate = useNavigate();

  //search bar
  const [searchStr, setSearchStr] = useState();
  const [userSearchList, setUserSearchList] = useState();
  const handleChange = async (e) => {
    setSearchStr(e.target.value);
    const data = await getSearchUsers(userId, e.target.value);
    if (data.err) {
    } else {
      setUserSearchList(data.msg);
    }
  };
  //console.log(userSearchList);


  //loading products
  const [error, setError] = useState("");
  //const [success,setSuccess]=useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    setLoading(true);
    const getInfo = async (userId) => {
      const data = await getAllUsers(userId);
      if (data.err) {
        setLoading(false);
        setError(data.err);
      } else {
        setLoading(false);
        // setSuccess('users loaded')
        setUsers(data.msg);
        // setTimeout(() => {
        //     setSuccess('');
        // }, 5000);
      }
    };
    getInfo(userId);
  }, [userId]);

  return (
    <div className="mt-2 w-100">
      <h1 className="font-bold text-xl text-center">Manage Users</h1>

      <div className="w-100 flex justify-center mt-2">
        {error && (
          <div className="bg-red-400 p-2 text-center text-white rounded w-fit ">
            <p>{error}</p>
          </div>
        )}
        {/* {success && 
                <div className="bg-green-400 p-2 text-center text-white rounded w-fit">
                <p>{success}</p>
                </div>
            } */}
        {loading && (
          <div className="bg-zinc-700 p-2 text-center text-white rounded flex">
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-5 w-5 mr-3 ..."
            >
              <path
                d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Loading...
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col justify-center items-center lg:w-3/4  sm:mx-auto mx-3">
        <div className="flex justify-between bg-base-100 w-full my-4 items-center">
          <div className="">
            <p className="normal-case text-xl font-semibold">Profiles</p>
          </div>
          <div className="">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-60 sm:w-24 md:w-auto"
                id="profileSearch"
                value={searchStr}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full space-x-3 flex px-3 py-2 bg-lime-200 font-semibold ">
          <p className="w-5">Sno</p>
          <p className="w-34 ">User</p>
          <p className="w-60 pl-2 hidden sm:inline">Username</p>
          <p className="w-60 pl-10">Email</p>
          <p className="w-20 text-center hidden sm:inline">Role</p>
        </div>

        {userSearchList &&
          userSearchList.length > 0 &&
          userSearchList.map((user, index) => {
            return (
              <div key={index} className="w-full">
                <div className="flex items-center space-x-3 border border-zinc-200 px-3 py-1 rounded">
                  <p className="w-5">{index + 1}</p>
                  <img
                    src={
                      user
                        ? `data:${user.dp.contentType};base64,${Buffer.from(
                            user.dp.data
                          ).toString("base64")}`
                        : ""
                    }
                    alt="user-dp"
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-full w-34"
                  />
                  <div className="flex  ms-5 w-60  hidden sm:inline-flex">
                    <p className="">{user.firstName}&nbsp;</p>
                    <p className=""> {user.lastName}</p>
                  </div>
                  <p className="w-40 sm:w-60">{user.email}</p>
                  <p className="w-20 text-center hidden sm:inline">
                    {user.role}
                  </p>
                  <div className="w-16 sm:w-60 flex sm:ps-20">
                    <button
                      className="border rounded  bg-zinc-700 px-2 py-1 text-white
                                hover:bg-zinc-800 flex"
                      onClick={() => {
                        navigate(`/user/${user._id}/profile`);
                      }}
                    >
                      ✏️ <span className="hidden sm:flex">&nbsp;Edit</span>
                    </button>
                    <button
                      className="ms-1 border rounded bg-red-600 px-2 py-1 text-white
                                hover:bg-red-700 flex"
                    >
                      🗑️<span className="hidden sm:flex">&nbsp;Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {userSearchList?<hr className="mb-10"/>:<></>}
        {users &&
          users.length > 0 &&
          users.map((user, index) => {
            return (
              <div key={index} className="w-full">
                <div className="flex items-center space-x-3 border border-zinc-200 px-3 py-1 rounded">
                  <p className="w-5">{index + 1}</p>
                  <img
                    src={
                      user
                        ? `data:${user.dp.contentType};base64,${Buffer.from(
                            user.dp.data
                          ).toString("base64")}`
                        : ""
                    }
                    alt="user-dp"
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-full w-34"
                  />
                  <div className="flex  ms-5 w-60  hidden sm:inline-flex">
                    <p className="">{user.firstName}&nbsp;</p>
                    <p className=""> {user.lastName}</p>
                  </div>
                  <p className="w-40 sm:w-60">{user.email}</p>
                  <p className="w-20 text-center hidden sm:inline">
                    {user.role}
                  </p>
                  <div className="w-16 sm:w-60 flex sm:ps-20">
                    <button
                      className="border rounded  bg-zinc-700 px-2 py-1 text-white
                                hover:bg-zinc-800 flex"
                      onClick={() => {
                        navigate(`/user/${user._id}/profile`);
                      }}
                    >
                      ✏️ <span className="hidden sm:flex">&nbsp;Edit</span>
                    </button>
                    <button
                      className="ms-1 border rounded bg-red-600 px-2 py-1 text-white
                                hover:bg-red-700 flex"
                    >
                      🗑️<span className="hidden sm:flex">&nbsp;Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
