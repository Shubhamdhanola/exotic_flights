import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  let pathName = usePathname();
  pathName = pathName.split('/').pop();
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div>
        <ul >
          <li className="my-2 border-b-2 border-gray-700" {...(pathName === 'admin' && {className: 'bg-red-500 my-2'})}>
            <Link href="/admin" className="block p-2  hover:bg-gray-700" >
              Dashboard
            </Link>
          </li>
          <li className="my-2 border-b-2  border-gray-700" {...(pathName === 'user' && {className: 'bg-red-500 my-2'})}>
            <Link href="/admin/pages/user" className="block p-2  hover:bg-gray-700">
              Users
            </Link>
          </li>
          <li className="my-2 border-b-2  border-gray-700" {...(pathName === 'chat' && {className: 'bg-red-500 my-2'})}>
            <Link href="/admin/pages/chat" className="block p-2  hover:bg-gray-700">
              Chat
            </Link>
          </li>
          <li className="my-2 border-b-2  border-gray-700" {...(pathName === 'settings' && {className: 'bg-red-500 my-2'})}>
            <Link href="/settings" className="block p-2  hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
