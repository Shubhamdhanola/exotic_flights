'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ChatHistory = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);
  const [userChats, setUserChats] = useState([]);

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
          <div className='h-[500px] w-[800px] flex flex-col p-4 gap-4 shadow-xl shadow-gray-800 bg-white mt-10 bg-opacity-70'>
            <div className='p-2'>
              <h1 className='font-bold text-center'>🌟 Here are Your Recent Responses: 🌟 </h1>
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

export default ChatHistory;
