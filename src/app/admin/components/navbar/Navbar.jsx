import axios from 'axios';
import { useContext } from 'react';
import { deleteCookie, getCookies } from 'cookies-next';
import { AdminAuthContext } from "../../contexts/admin-context"  

const Navbar = ({ admin }) => {
  const cookie = getCookies('admin')
  const auth = useContext(AdminAuthContext)
 
  const handleLogout = async (e) => {
		e.preventDefault();
    
		axios.get('http://localhost:8080/api/admins/logout', {
			headers: {
				Authorization: 'Bearer ' + cookie.admin
			}
		}).then(res => {
			if (res.status === 200) {
				deleteCookie('admin');
				auth.logout()
			}
		}).catch( (err) =>  {
			console.error('Logout error:', err);
		})
	};

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Admin Panel</div>
      <div className="flex items-center">
        <span className="mr-4">{admin}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
