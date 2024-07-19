import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div>
        <ul>
          <li className="mb-2">
            <Link href="/admin" className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/pages/user" className="block p-2 rounded hover:bg-gray-700">
              Users
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/pages/question" className="block p-2 rounded hover:bg-gray-700">
              Questions
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/settings" className="block p-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
