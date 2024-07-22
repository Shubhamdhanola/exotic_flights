'use client'
import axios from 'axios';
import UserTable from '../../../components/userTable/UserTable';
import { useState, useEffect } from 'react';


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
			<div className='flex flex-col p-2 gap-4'>
				<div className='bg-amber-100 p-2'>
					<h1 className='font-bold text-lg'>Here is the list of all users</h1>
				</div>
				<div className='chat-listing flex flex-col h-dvh'>
					<UserTable users={users} />
				</div>
			</div>
		</>
	);
};

export default Users;