"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '../../schemas';
import "../forms/style.css";

const AuthForm = ({ mode }) => {
    const schema = mode === 'signUp' ? signUpSchema : signInSchema;

    // Initialize useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="authForm">
            <div className="formContainer">
                {mode == "signUp" && (
                    <>
                        <div className="formContent">
                            <label htmlFor="name">Your Name</label>
                            <div>
                                <input id="name" type="text" {...register('name')} />
                                {errors.name && <p className="error">*{errors.name.message}*</p>}
                            </div>
                        </div>
                        <div className="formContent">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <div>
                                <input id="phonenumber" type="number" {...register('phonenumber')} />
                                {errors.phonenumber && <p className="error">*{errors.phonenumber.message}*</p>}
                            </div>
                        </div>
                    </>
                )}
                <div className="formContent">
                    <label htmlFor="email">Email Address</label>
                    <div>
                        <input id="email" type="email" {...register('email')} />
                        {errors.email && <p className="error">*{errors.email.message}*</p>}
                    </div>
                </div>
                <div className="formContent">
                    <label htmlFor="password">Password</label>
                    <div>
                        <input id="password" type="password" {...register('password')} />
                        {errors.password && <p className="error">*{errors.password.message}*</p>}
                    </div>
                </div>
                {mode == "signUp" && (
                    <div className="formContent">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div>
                            <input id="confirmPassword" type="password" {...register('confirmPassword')} />
                            {errors.confirmPassword && <p className="error">*{errors.confirmPassword.message}*</p>}
                        </div>
                    </div>
                )}
                <button type="submit" className="submit_btn">{mode == "signUp" ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </form>
    );
};

export default AuthForm;
