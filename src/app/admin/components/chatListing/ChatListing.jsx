import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ChatListing = () => {
    const [chats, setChats] = useState([]);

    const deleteChat = async (id) => {
        try {
            await axios.post(`http://localhost:8080/api/chatbot/chat/delete/${id}`);
            const res = await axios.get('http://localhost:8080/api/chatbot/chats/');
            setChats(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const fetchParentQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/chatbot/chats/');
                setChats(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchParentQuestions();
    }, []);

    return (
        <div>
            <div className='dashboard-content'>
                <table className='dashboard-table'>
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>Question</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chats.map((chat, index) => (
                            <tr key={chat._id}>
                                <td>{index + 1}</td>
                                <td>{chat.text}</td>
                                <td>{chat.type}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <Link className='customButton bg-green-400' href={`/admin/pages/chat/update/${chat._id}`}>Update Chat</Link>
                                        <button className='customButton bg-rose-700' onClick={() => deleteChat(chat._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChatListing