import Link from 'next/link';

const Navbar = () => {
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Admin Panel</div>
      <div className="flex items-center">
        <span className="mr-4">Admin Name</span>
        <button
        //   onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
