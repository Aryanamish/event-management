function Info(): JSX.Element {
  return (
    <>
      <div className='flex w-full h-full justify-center items-center overflow-hidden'>
        <img
          className='h-32 w-32 mx-auto rounded-full md:rounded-xl border border-gray-300'
          src='/Profile.png'
          alt=''
        />
      </div>
      <h1 className='text-gray-900 text-center font-bold text-3xl leading-8 my-1'>
        Bandepalli Surya Anjani Kumar
      </h1>
    </>
  )
}
function Student(): JSX.Element {
  return (
    <div className='w-full md:w-4/12 md:mx-2'>
      <div className='bg-white p-3 border-y-4 border-blue-400 border-x-blue-100 border-x-2 shadow-lg'>
        <Info></Info>
        <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Role</span>
            <span className='ml-auto'>
              <span className='bg-green-500 py-1 px-2 rounded text-white text-lg'>
                Student
              </span>
            </span>
          </li>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Register Number</span>
            <span className='text-lg font-semibold ml-auto'>40110156</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Teacher() {
  return (
    <div className='w-full md:w-4/12 md:mx-2'>
      <div className='bg-white p-3 border-y-4 border-blue-400 border-x-blue-100 border-x-2 shadow-lg'>
        <Info></Info>
        <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Role</span>
            <span className='ml-auto'>
              <span className='bg-green-500 py-1 px-2 rounded text-white text-lg'>
                Teacher
              </span>
            </span>
          </li>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Employee ID</span>
            <span className='text-lg font-semibold ml-auto'>4011015678</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function HOD() {
  return (
    <div className='w-full md:w-4/12 md:mx-2'>
      <div className='bg-white p-3 border-y-4 border-blue-400 border-x-blue-100 border-x-2 shadow-lg'>
        <Info></Info>
        <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Role</span>
            <span className='ml-auto'>
              <span className='bg-green-500 py-1 px-2 rounded text-white text-lg'>
                HOD
              </span>
            </span>
          </li>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Employee ID</span>
            <span className='text-lg font-semibold ml-auto'>4011015678</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function VC() {
  return (
    <div className='w-full md:w-4/12 md:mx-2'>
      <div className='bg-white p-3 border-y-4 border-blue-400 border-x-blue-100 border-x-2 shadow-lg'>
        <Info></Info>
        <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Role</span>
            <span className='ml-auto'>
              <span className='bg-green-500 py-1 px-2 rounded text-white text-lg'>
              Vice-Chancellor
              </span>
            </span>
          </li>
          <li className='flex items-center py-3'>
            <span className='text-lg'>Employee ID</span>
            <span className='text-lg font-semibold ml-auto'>4011015678</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const profile = {
  Student: Student,
  Teacher: Teacher,
  HOD: HOD,
  VC: VC,
}

export default profile