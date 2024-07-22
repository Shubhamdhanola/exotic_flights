'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import ChatListing from '../../../components/chatListing/ChatListing'

const Question = () => {
	const routeModule = useRouter()
	const handleClick = () => {
		routeModule.push('/admin/pages/chat/add')
	}
	return (
		<>
			<div className='flex flex-col p-2 gap-4'>
				<div className='flex justify-between items-center bg-amber-100 p-2'>
					<h1 className='font-bold text-lg'>Here is the list of all questions</h1>
					<button className='black_btn font-bold' onClick={handleClick}>Add Question</button>
				</div>
				<div className='chat-listing flex flex-col h-dvh'>
					<ChatListing />
				</div>
			</div>
		</>
	)
}

export default Question