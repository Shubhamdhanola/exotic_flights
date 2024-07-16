'use client'
import axios from 'axios';
import UserTable from '../../components/userTable/UserTable';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';


const Users = () => {
	// const router = useRouter();
	const [users, setUsers] = useState([]);
	// const { isLoggedIn } = useContext(AdminAuthContext);
	// if (isLoggedIn) {

	// }
	// else {
	// 	router.push('/admin/auth/sign-in');
	// }

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

export default ProtectedRoute(Users);