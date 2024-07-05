"use client"
import { useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import "./style.css";

const questions = [
  "What is your preferred travel destination?",
  "Would you prefer a direct flight or a flight with one stop?",
  "On which date would you like to travel?",
  "How many pieces of luggage will you be carrying?",
];

const Page = () => {
  const [chats, setChats] = useState([{ type: 'question', text: questions[0] }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (currentQuestionIndex > 0 && currentQuestionIndex < questions.length) {
      const nextQuestion = { type: 'question', text: questions[currentQuestionIndex] };
      setChats(prevChats => [...prevChats, nextQuestion]);
    }
  }, [currentQuestionIndex]);

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
      <div className='h-[550px] w-10/12 mt-10 shadow-xl overflow-hidden flex flex-col bg-gray-900 bg-opacity-80'>
        <div className={`chatContainer p-4 flex-1 flex flex-col`}>
          {chats.map((chat, index) => (
            <div key={index} className={`chatMessage mb-2 p-2 font-semibold rounded-xl ${chat.type === 'question' ? 'bg-gray-200' : 'bg-sky-200 bg-opacity-80 text-right'}`}>
              {chat.text}
            </div>
          ))}
        </div>
        <div className='chatInput bottom-0 w-full p-4'>
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
  )
}
export default Page
