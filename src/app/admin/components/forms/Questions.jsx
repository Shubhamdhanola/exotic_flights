'use client';

import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import "./style.css";
import { quesitonsSchema } from '../../../../schemas';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const QuestionForm = ({ editMode = false, data }) => {
    const [parentQuestionData, setParentQuestionData] = useState([]);
    const [selectedParentQuestion, setSelectedParentQuestion] = useState(data?.parentChat || '');
    const [selectedNextQuestion, setSelectedNextQuestion] = useState(data?.nextChats || [] );
    const router = useRouter();
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(quesitonsSchema),
        defaultValues: {
            question: data?.text || '',
            message: data?.answerText || '',
            parentQuestion: data?.parentChat || '',
            nextQuestion: data?.nextChats || []
        }
    });
    

    const onSubmit = async (formData) => {
        const questionData = {
            type: 'question',
            level: null,
            text: formData.question || '',
            answerText: formData.message || '',
            nextChats: formData.nextQuestion || [],
            parentChat: formData.parentQuestion || null,
        };

        try {
            if (editMode && data._id) {
                // Update existing question
                await axios.post(`http://localhost:8080/api/chatbot/chat/update/${data._id}`, questionData);
                toast.success('Question Updated Successfully');
            } else {
                // Add new question
                await axios.post('http://localhost:8080/api/chatbot/chat/add', questionData);
                toast.success('Question Added Successfully');
            }
            router.push("/admin/pages/chat")
            reset();
        } catch (err) {
            console.error(err);
            toast.error('Failed to save question');
        }
    };

    useEffect(() => {
        const fetchParentQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/chatbot/chat/listing');
                setParentQuestionData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchParentQuestions();
    }, []);

    const handleParentChange = (event) => {
        setSelectedParentQuestion(event.target.value);
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} id="questionForm" className="form">
                <div className="form-group">
                    <label htmlFor="question" className="form-label">Question</label>
                    <input
                        type="text"
                        id="question"
                        {...register('question')}
                        className='form-input'
                        // value={}
                    />
                    {errors.question && <p className="form-error">{errors.question.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="answer" className="form-label">Message</label>
                    <input
                        type="text"
                        id="message"
                        {...register('message')}
                        className='form-input'
                    />
                    {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="parentQuestion" className="form-label">Parent Question</label>
                    <select
                        id="parentQuestion"
                        {...register('parentQuestion')}
                        onChange={handleParentChange}
                        className='form-input'
                        value={selectedParentQuestion}
                    >
                        <option value="">Select Parent Question</option>
                        {parentQuestionData && parentQuestionData.map((item, index) => (
                            <option value={item._id} key={index}>{item.text}</option>
                        ))}
                    </select>
                    {errors.parentQuestion && <p className="form-error">{errors.parentQuestion.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="nextQuestion" className="form-label">Next Question</label>
                    <select
                        id="nextQuestion"
                        {...register('nextQuestion')}
                        className='form-input'
                        multiple
                        value={selectedNextQuestion}
                        onChange={(e)=>{
                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedNextQuestion(selectedOptions)
                        }}
                    >
                        {parentQuestionData && parentQuestionData
                            .filter(item => item._id !== selectedParentQuestion)
                            .map((item, index) => (
                                <option value={item._id} key={index}>{item.text}</option>
                            ))}
                    </select>
                    {errors.nextQuestion && <p className="form-error">{errors.nextQuestion.message}</p>}
                </div>
                <button type="submit" className="form-button">{editMode ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default QuestionForm;
