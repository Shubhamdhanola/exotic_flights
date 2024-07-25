'use client'
import axios from 'axios';
import Questions from '../../../../../components/forms/Questions'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const Add = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [id, setId] = useState(null);
    console.log(id);
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
                    const response = await axios.get(`http://localhost:8080/api/chat/${id}`);
                    const allQues = response.data.nextChats;
                    console.log(allQues);
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
                <button className='black_btn' onClick={handleClick}>Go Back</button>
            </div>
            <Questions />
        </div>
    )
}

export default Add