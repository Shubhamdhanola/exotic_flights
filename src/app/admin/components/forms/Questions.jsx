'use client';

import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import "./style.css";
import { quesitonsSchema } from '../../../../schemas';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const QuestionForm = () => {
    const [parentQuestionData, setParentQuestionData] = useState([]);
    const [selectedParentQuestion, setSelectedParentQuestion] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(quesitonsSchema),
    });

    const onSubmit = async (data) => {
        const questionData = {
            type: 'question',
            level: null,
            text: data.question || '',
            answerText: data.message || '',
            nextChats: data.nextQuestion || [],
            parentChat: data.parentQuestion || null,
        };
        try {
            const add = await axios.post('http://localhost:8080/api/chatbot/chat/add', questionData);
            toast.success('Question Added Successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add question');
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
                    >
                        {parentQuestionData && parentQuestionData
                            .filter(item => item._id !== selectedParentQuestion)
                            .map((item, index) => (
                                <option value={item._id} key={index}>{item.text}</option>
                            ))}
                    </select>
                    {errors.nextQuestion && <p className="form-error">{errors.nextQuestion.message}</p>}
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default QuestionForm;
