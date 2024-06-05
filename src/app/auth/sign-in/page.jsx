import AuthForm from "/src/components/forms/AuthForm"

const Page = () => {
  return (
    <div>
      <div className='mt-5'>
        <div className='heading py-2 mb-6 text-center'>
          <h2 className='textGradient text-6xl'>Sign In</h2>
        </div>
        <div className=''>
          <AuthForm mode="signIn" />
        </div>
      </div>
    </div>
  )
}

export default Page