"use client"
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import "./style.css";
import axios from 'axios';
import { getCookie } from "cookies-next";

const Page = () => {

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const [currentQuestionList, setCurrentQuestionList] = useState([]);
  const [selectedQuestionList, setSelectedQuestionList] = useState([]);
  const [finalMessage, setFinalMessage] = useState(false);
  const [quesIds, setQuesIds] = useState([]);
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   if (currentQuestionIndex > 0 && currentQuestionIndex < questions.length) {
  //     const nextQuestion = { type: 'question', text: questions[currentQuestionIndex] };
  //     setChats(prevChats => [...prevChats, nextQuestion]);
  //   }
  // }, [currentQuestionIndex]);

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
      console.log(saveQues);
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
      <div className='h-[550px] w-10/12 mt-10 shadow-xl overflow-hidden flex flex-col bg-gray-900 bg-opacity-80'>
        <div className={`chatContainer p-4 flex-1 flex flex-col`}>
          {/* {chats.map((chat, index) => (
            <div key={index} className={`chatMessage mb-2 p-2 font-semibold rounded-xl ${chat.type === 'question' ? 'bg-gray-200' : 'bg-sky-200 bg-opacity-80 text-right'}`}>
              {chat.text}
            </div>
          ))} */}

          <div className={`chatMessage mb-2 p-2 font-semibold rounded-xl bg-gray-200`}>
            Thanks for Choosing Exotic Flights How Can i Help You?
          </div>

          <div>
            {
              selectedQuestionList && selectedQuestionList.map((item, index) => {
                return <div key={item._id} className={`chatMessage mb-2 p-2 font-semibold rounded-xl w-fit bg-gray-200`}>
                  {item.text}
                </div>
              })
            }
          </div>

          <div className={``}>

            {
              currentQuestionList && currentQuestionList.map((item, index) => {
                return <div key={item._id} onClick={() => { handleChatClick(index) }} className={`chatMessage w-fit mb-2 p-2 font-semibold rounded-xl bg-gray-900 text-slate-50 cursor-pointer px-6`}>
                  👉 {item.text} 👈
                </div>
              })
            }
          </div>


        </div>
        <div className='chatInput bottom-0 w-full p-4'>
          {
            finalMessage ?
              <div className={`chatMessage mb-2 p-2 font-semibold rounded-xl bg-gray-200`}>
                Thanks for Reaching Us. Our Agent will Contact you soon!
              </div>
              : ""
          }
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
