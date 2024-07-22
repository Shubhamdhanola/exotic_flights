import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const ChatListing = () => {
    const [chats, setChats] = useState([]);

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
                                        <button className='customButton' >Update</button>
                                        <button className='customButton bg-rose-700'>Delete</button>
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