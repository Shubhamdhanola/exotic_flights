'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ViewChat = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);
  const [userChats, setUserChats] = useState([]);

  const routeModule = useRouter()
  const handleClick = () => {
    routeModule.push('/admin/pages/user/')
  }

  useEffect(() => {
    const idFromPath = pathname.split('/').pop();
    const idFromSearch = searchParams.get('id');

    if (idFromPath) {
      setId(idFromPath);
    } else if (idFromSearch) {
      setId(idFromSearch);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const fetchChatData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users-chat/get/${id}`);
          const allQues = response.data.quesId;

          const chatResponses = await Promise.all(
            allQues.map(async (quesId) => {
              const resp = await axios.get(`http://localhost:8080/api/chatbot/chat/${quesId}`);
              return resp.data.text;
            })
          );
          setUserChats(chatResponses);
        } catch (err) {
          console.log('Failed to load chat data.');
        }
      }
    };

    fetchChatData();
  }, [id]);

  return (
    <div>
      {id ? (
        <>
          <div className='flex flex-col p-2 gap-4'>
            <div className='flex justify-between items-center bg-amber-100 p-2'>
              <h1 className='font-bold'>Here are the user's chats </h1>
              <button className='black_btn' onClick={handleClick}>Go Back</button>
            </div>
            {userChats.map((chat, index) => (
              <p key={index} className='customButton text-[15px] p-2 bg-sky-950 border-gray-950 text-white shadow-lg shadow-black'>{index + 1}. {chat}</p>
            ))}
          </div>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default ViewChat;
