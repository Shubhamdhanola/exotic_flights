"use client"
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import "./style.css";
import axios from 'axios';
import { getCookie } from "cookies-next";

const Page = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { register, handleSubmit, reset } = useForm();
    const [currentQuestionList, setCurrentQuestionList] = useState([]);
    const [selectedQuestionList, setSelectedQuestionList] = useState([]);
    const [finalMessage, setFinalMessage] = useState(false);
    const [quesIds, setQuesIds] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({});
    
    // Fetch user data when userId changes
    useEffect(() => {
        if (userId) {
            const getUserData = async () => {
                try {
                    const user = await axios.get(`http://localhost:8080/api/users/${userId}`);
                    setUserData(user.data);
                } catch (err) {
                    console.error('Failed to get user data', err);
                }
            };
            getUserData();
        }
    }, [userId]);

    // Fetch initial questions
    const getQuestions = async () => {
        try {
            const chats = await axios.get('http://localhost:8080/api/chatbot/chat/listing/first');
            setCurrentQuestionList(chats.data);
        } catch (err) {
            console.error('Failed to Get chat message', err);
        }
    };

    const handleChatClick = async (index) => {
        setSelectedQuestionList([...selectedQuestionList, currentQuestionList[index]]);
        let selectedQuestion = currentQuestionList[index];
        setCurrentQuestionList([]);
    
        try {
            const updatedQuesIds = [...quesIds, selectedQuestion._id];
            setQuesIds(updatedQuesIds);
    
            const saveQues = {
                userId: userId,
                quesId: updatedQuesIds,
            };
            await axios.post('http://localhost:8080/api/users-chat/save', saveQues);
        } catch (err) {
            console.error('Failed to save user chat', err);
        }
    
        if (Array.isArray(selectedQuestion.nextChats) && selectedQuestion.nextChats.length > 0) {
            try {
                let nextChats = await axios.get(`http://localhost:8080/api/chatbot/chat/get-next-chats/${selectedQuestion._id}`);
                setCurrentQuestionList(nextChats.data);
            } catch (err) {
                console.error('Failed to get next chats', err);
            }
        } else {
            setFinalMessage(true);
    
            const emailData = {
                service_id: 'service_qgpa8nc',
                template_id: 'template_s4db0ra',
                user_id: 'JsRZsgowf3MPC3r1t',
                template_params: {
                    email_to: userData?.user.email || 'user@example.com',
                    to_name: userData?.user.name || 'User',
                    from_name: 'Exotic Flights',
                    message: 'Thank you for reaching out to us. Our agent will contact you shortly!',
                }
            };
    
            try {
                await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Email sent successfully!');
            } catch (err) {
                console.error('Failed to send email', err);
            }
        }
    };
    

    // Set userId and fetch initial questions on component mount
    useEffect(() => {
        const cookieUserId = getCookie('userId');
        if (cookieUserId) {
            setUserId(cookieUserId);
        }
        getQuestions();
    }, []);

    const handleChat = async (data) => {
        const userAnswer = { type: 'answer', text: data.chats };
        setSelectedQuestionList(prevChats => [...prevChats, userAnswer]);

        // Save the user's answer and fetch the next question
        try {
            await axios.post('http://localhost:8080/api/chatbot/chat', userAnswer);
            if (currentQuestionIndex < currentQuestionList.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                const nextQuestion = { type: 'question', text: currentQuestionList[currentQuestionIndex + 1] };
                await axios.post('http://localhost:8080/api/chatbot/chat', nextQuestion);
            }
        } catch (err) {
            console.error('Failed to save chat message', err);
        }
        reset();
    };

    return (
        <>
            <div className='h-[500px] w-10/12 mt-10 shadow-xl overflow-hidden flex flex-col bg-gray-100'>
                <div className={`chatContainer p-2 flex-1 flex flex-col overflow-y-auto`}>
                    <div className={`chatMessage mb-4 p-2 font-bold bg-sky-200 text-center`}>
                        Thank you for choosing Exotic Flights. How may I assist you today?
                    </div>
                    <div className='flex flex-col gap-2'>
                        {selectedQuestionList && selectedQuestionList.map((item, index) => (
                            <div key={item._id} className={`chatMessage self-end p-2 font-semibold rounded-xl w-1/3 bg-gray-300`}>
                                {item.text}
                            </div>
                        ))}
                    </div>
                    <div className={`flex flex-col gap-2`}>
                        {currentQuestionList && currentQuestionList.map((item, index) => (
                            <div key={item._id} onClick={() => handleChatClick(index)} className={`chatMessage w-1/3 p-2 font-semibold rounded-xl bg-gray-900 text-slate-50 cursor-pointer px-6`}>
                                👉 {item.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-2 chatInput bottom-0 w-full p-2'>
                    {finalMessage && (
                        <div className={`chatMessage self-center rounded-xl py-2 px-4 text-white font-bold text_gradient text-center bg-blue-900 w-fit`}>
                            Thank you for reaching out to us. Our agent will contact you shortly!
                        </div>
                    )}
                    <form onSubmit={handleSubmit(handleChat)} className='flex w-full justify-center items-center gap-5'>
                        <textarea
                            className='shadow-lg border-2 w-3/4 h-16 p-2'
                            name="chats"
                            {...register('chats', { required: true })}
                        ></textarea>
                        <button type="submit" className="submit_btn py-3 px-4">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;
