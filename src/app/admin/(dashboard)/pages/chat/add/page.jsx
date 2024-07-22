'use client'
import React, { use } from 'react'
import Questions from '../../../../components/forms/Questions'
import { useRouter } from 'next/navigation'

const Add = () => {
    const routeModule = useRouter()
	const handleClick = () => {
		routeModule.push('/admin/pages/chat/')
	}
    return (
        <div className='flex flex-col p-2 gap-4'>
            <div className='flex justify-between items-center bg-amber-100 p-2'>
                <h1 className='font-bold'>Hey Admin! You can add new question here</h1>
                <button className='black_btn' onClick={handleClick}>Go Back</button>
            </div>
            <Questions />
        </div>
    )
}

export default Add