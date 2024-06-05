"use client"

import React from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import "../forms/style.css";

// Define validation schemas for sign-in and sign-up
const signInSchema = z.object({
    email: z.string().min(1, "Email address is required").email('Invalid email address'),
    password: z.string().min(8, "Password should be at least 8 characters")
});

const signUpSchema = z.object({
    name: z.string().min(1, "Please enter your name"),
    phonenumber: z.string().min(10, "Phone number must be of 10 digits").max(14, "Phone number can't be more than 14 digits"),
    email: z.string().min(1, "Email address is required").email('Invalid email address'),
    password: z.string().min(8, "Password should contains at least 8 characters"),
    confirmPassword: z.string().min(1, "Enter the confirm password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

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
            <div class="formContainer">
                {mode == "signUp" && (
                    <>
                        <div class="formContent">
                            <label htmlFor="name">Your Name</label>
                            <div>
                                <input id="name" type="text" {...register('name')} />
                                {errors.name && <p class="error">*{errors.name.message}*</p>}
                            </div>
                        </div>
                        <div class="formContent">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <div>
                                <input id="phonenumber" type="number" {...register('phonenumber')} />
                                {errors.phonenumber && <p class="error">*{errors.phonenumber.message}*</p>}
                            </div>
                        </div>
                    </>
                )}
                <div class="formContent">
                    <label htmlFor="email">Email Address</label>
                    <div>
                        <input id="email" type="email" {...register('email')} />
                        {errors.email && <p class="error">*{errors.email.message}*</p>}
                    </div>
                </div>
                <div class="formContent">
                    <label htmlFor="password">Password</label>
                    <div>
                        <input id="password" type="password" {...register('password')} />
                        {errors.password && <p class="error">*{errors.password.message}*</p>}
                    </div>
                </div>
                {mode == "signUp" && (
                    <div class="formContent">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div>
                            <input id="confirmPassword" type="password" {...register('confirmPassword')} />
                            {errors.confirmPassword && <p class="error">*{errors.confirmPassword.message}*</p>}
                        </div>
                    </div>
                )}
                <button type="submit" class="formButton">{mode == "signUp" ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </form>
    );
};

export default AuthForm;
