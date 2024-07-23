import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const UserTable = () => {

  const [users, setUsers] = useState([]);

  const deleteChat = async (id) => {
    try {
      await axios.get(`http://localhost:8080/api/users/delete/${id}`);
      const res = await axios.get('http://localhost:8080/api/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    axios({
      url: "http://localhost:8080/api/users",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.users);
        } else {
          console.log("No users found");
        }
      })
      .catch((err) => {
        let error = err.response ? err.response.data.message : "Something went wrong";
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className='dashboard-content'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className='flex gap-2'>
                    <Link className='customButton bg-blue-400'  href={`/admin/pages/user/view-chat/${user._id}`}>View Chat</Link>
                    <button className='customButton bg-rose-700' onClick={() => deleteChat(user._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
