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

    const getQuestions = async () => {
        try {
            const chats = await axios.get('http://localhost:8080/api/chatbot/chat/listing/first');
            setCurrentQuestionList(chats.data)
        } catch (err) {
            console.error('Failed to Get chat message', err);
        }
    }

    const handleChatClick = async (index) => {
        setSelectedQuestionList([...selectedQuestionList, currentQuestionList[index]])
        let selectedQuestion = currentQuestionList[index]
        setCurrentQuestionList([])

        // Add the new ID to the existing array
        try {
            setQuesIds(prevQuesIds => [...prevQuesIds, selectedQuestion._id]);

            const saveQues = {
                userId: userId,
                quesId: [...quesIds, selectedQuestion._id]
            };
            await axios.post('http://localhost:8080/api/users-chat/save', saveQues);
        }
        catch (err) {
            console.error('Failed to save user chat', err);
        }

        if (Array.isArray(selectedQuestion.nextChats) && selectedQuestion.nextChats.length > 0) {
            let nextChats = await axios.get(`http://localhost:8080/api/chatbot/chat/get-next-chats/${selectedQuestion._id}`);
            setCurrentQuestionList(nextChats.data)

        } else {
            setFinalMessage(true)
        }
    }

    useEffect(() => {
        if (getCookie('userId')) {
            setUserId(getCookie('userId'))
        }
        getQuestions();
    }, [])


    const handleChat = async (data) => {
        const userAnswer = { type: 'answer', text: data.chats };
        setChats(prevChats => [...prevChats, userAnswer]);

        if (currentQuestionIndex < questions.length - 1) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);

            // Save the user's answer to the database
            try {
                await fetch('http://localhost:8080/api/chatbot/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userAnswer)
                });

                const nextQuestion = { type: 'question', text: questions[nextQuestionIndex] };

                // Save the next question to the database
                await fetch('http://localhost:8080/api/chatbot/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nextQuestion)
                });
            } catch (err) {
                console.error('Failed to save chat message', err);
            }
        } else {
            // Save the user's answer if it's the last question
            try {
                await fetch('http://localhost:5000/api/chats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userAnswer)
                });
            } catch (err) {
                console.error('Failed to save chat message', err);
            }
        }
        reset();
    };

    return (
        <>
            <div className='h-[500px] w-10/12 mt-10 shadow-xl overflow-hidden flex flex-col bg-gray-100 '>
                <div className={`chatContainer p-2 flex-1 flex flex-col overflow-y-auto`}>

                    <div className={`chatMessage mb-4 p-2 font-bold bg-sky-200 text-center`}>
                        Thank you for choosing Exotic Flights. How may I assist you today?
                    </div>

                    <div className='flex flex-col gap-2'>
                        {
                            selectedQuestionList && selectedQuestionList.map((item, index) => {
                                return <div key={item._id} className={`chatMessage self-end p-2 font-semibold rounded-xl w-1/3 bg-gray-300`}>
                                    {item.text}
                                </div>
                            })
                        }
                    </div>

                    <div className={`flex flex-col gap-2`}>

                        {
                            currentQuestionList && currentQuestionList.map((item, index) => {
                                return <div key={item._id} onClick={() => { handleChatClick(index) }} className={`chatMessage w-1/3 p-2 font-semibold rounded-xl bg-gray-900 text-slate-50 cursor-pointer px-6`}>
                                    👉 {item.text}
                                </div>
                            })
                        }
                    </div>


                </div>
                <div className='flex flex-col gap-2 chatInput bottom-0 w-full p-2'>
                    {
                        finalMessage ?
                            <div className={`chatMessage self-center rounded-xl py-2 px-4 text-white font-bold text_gradient text-center bg-blue-900 w-fit`}>
                                Thank you for reaching out to us. Our agent will contact you shortly!
                            </div>
                            : ""
                    }
                    {/* <form onSubmit={handleSubmit(handleChat)} className='flex w-full justify-center items-center gap-5'>
                        <textarea
                            className='shadow-lg border-2 w-3/4 h-16 p-2'
                            name="chats"
                            {...register('chats', { required: true })}
                        ></textarea>
                        <button type="submit" className="submit_btn py-3 px-4">Submit</button>
                    </form> */}
                </div>
            </div>
        </>
    )
}
export default Page
