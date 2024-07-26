'use client'
import axios from 'axios';
import Questions from '../../../../../components/forms/Questions'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Add = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [id, setId] = useState(null);
    const [chatData, setChatData] = useState(null);

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
                    const response = await axios.get(`http://localhost:8080/api/chatbot/chat/${id}`);
                    setChatData(response.data);
                } catch (err) {
                    console.log('Failed to load chat data.');
                }
            }
        };

        fetchChatData();
    }, [id]);

    return (
        <div className='flex flex-col p-2 gap-4'>
            <div className='flex justify-between items-center bg-amber-100 p-2'>
                <h1 className='font-bold'>Hey Admin! You can edit your question here</h1>
                <Link className='black_btn' href='/admin/pages/chat/'>Go Back</Link>
            </div>
            {
                chatData &&
                <Questions editMode={true} data={chatData} />
            }
        </div>
    )
}

export default Add