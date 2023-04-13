import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../store/users/usersSlice";


const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  },[]);

  const {users, isLoading, error} = useSelector((store) => store.users);
  console.log(users, isLoading, error)
  if(isLoading) return <p>isLoading</p>;
  if(error) return <p>Something went wrong</p>;
  return (
    <ul>
      {users.map((user) => <li key={user.cell}>
        <span>{user.name.title + ' '}</span>
        <span>{ user.name.last + ' '}</span>
        <span>{ user.name.first }</span>
      </li>)}
    </ul>
  );
};

export default Users;