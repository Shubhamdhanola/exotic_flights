'use client'
import { useState, useEffect } from 'react';
import UserTable from '../../components/userTable/UserTable';
import axios from 'axios';

const Users = () => {
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
		<>
			<UserTable users={users} />
		</>
	);
};

export default Users;