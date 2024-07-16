import { getCookie, deleteCookie, getCookies } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AdminAuthContext } from "../../../../contexts/auth-context"  
import { useState, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter()
  const cookie = getCookies('user')
  const auth = useContext(AdminAuthContext)
  const [admin, setAdmin] = useState(()=>{
		return getCookie('admin') ? true : false;
	});
  useEffect(() => {
		const hasAdmin = getCookie('admin');
		if (hasAdmin) {
			setAdmin(true);
		}
	}, []);

  const handleLogout = async (e) => {
		e.preventDefault();
    
		axios.get('http://localhost:8080/api/admins/logout', {
			headers: {
				Authorization: 'Bearer ' + cookie.admin
			}
		}).then(res => {
			if (res.status === 200) {
				deleteCookie('admin');
				setAdmin(false);
				auth.logout()
				router.push("/admin")
			}
		}).catch( (err) =>  {
			console.error('Logout error:', err);
		})
	};

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Admin Panel</div>
      <div className="flex items-center">
        <span className="mr-4">Admin Name</span>
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
