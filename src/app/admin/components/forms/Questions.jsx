'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import "./style.css";
import { quesitonsSchema } from '../../../../schemas';

const AuthForm = ({ mode }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(quesitonsSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} id="" className="form">
                <h2 className="form-title">Add Questions</h2>
                <div className="form-group">
                    <label htmlFor="question" className="form-label">Question</label>
                    <input
                        type="text"
                        id="question"
                        {...register('question')}
                        className={`form-input ${errors.question ? 'form-input-error' : ''}`}
                    />
                    {errors.question && <p className="form-error">{errors.question.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="answer" className="form-label">Answer</label>
                    <input
                        type="text"
                        id="answer"
                        {...register('answer')}
                        className={`form-input ${errors.answer ? 'form-input-error' : ''}`}
                    />
                    {errors.answer && <p className="form-error">{errors.answer.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="parentQuestion" className="form-label">Parent Question</label>
                    <select
                        id="parentQuestion"
                        {...register('parentQuestion')}
                        className={`form-input ${errors.parentQuestion ? 'form-input-error' : ''}`}
                    >
                        <option value="Apple">Apple</option>
                        <option value="Orange">Orange</option>
                        <option value="Pine">Pine</option>
                    </select>
                    {errors.parentQuestion && <p className="form-error">{errors.parentQuestion.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="nextQuestion" className="form-label">Next Question</label>
                    <select
                        id="nextQuestion"
                        {...register('nextQuestion')}
                        className={`form-input ${errors.nextQuestion ? 'form-input-error' : ''}`}
                        multiple
                    >
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                    </select>
                    {errors.nextQuestion && <p className="form-error">{errors.nextQuestion.message}</p>}
                </div>
                <button type="submit" className="form-button">{mode === "signUp" ? 'Sign Up' : 'Sign In'}</button>
            </form>
        </div>
    );
};

export default AuthForm;
