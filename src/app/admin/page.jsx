'use client'

const Page = () => {
  return (
    <>
      <div className='h-[100vh] w-10/12 mt-10 shadow-xl overflow-hidden flex flex-col bg-gray-900 bg-opacity-80'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <table className='table-auto border-collapse w-full mt-5'>
            <tr className='border-b-2 border-gray-800'>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            <tr className='border-b-2 border-gray-800'>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
              <td>Edit</td>
            </tr>
            <tr className='border-b-2 border-gray-800'>
              <td>Jane Doe</td>
              <td>jane@example.com</td>
              <td>User</td>
              <td>Edit</td>
            </tr>
          </table>
        </div>

      </div>
    </>
  )
}

export default Page