'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Page = () => {
  const [users, setUsers] = useState([]);

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
    <div className='dashboard-container'>
      <div className='dashboard-header'>
        <h1>All User's Listing</h1>
      </div>
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
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
