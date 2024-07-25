'use client'
import UserTable from '../../../components/userTable/UserTable';

const Users = () => {
	
	return (
		<>
			<div className='flex flex-col p-2 gap-4'>
				<div className='bg-amber-100 p-2'>
					<h1 className='font-bold text-lg'>Here is the list of all users</h1>
				</div>
				<div className='chat-listing flex flex-col h-dvh'>
					<UserTable />
				</div>
			</div>
		</>
	);
};

export default Users;