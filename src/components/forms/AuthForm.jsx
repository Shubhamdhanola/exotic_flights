"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '../../schemas';
import "../forms/style.css";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AuthForm = ({ mode }) => {
    const schema = mode === 'signUp' ? signUpSchema : signInSchema;
    // Initialize useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });


    const onSubmit = (data) => {
        if (mode == 'signUp') {
            axios({
                url: "http://localhost:8080/api/users/signup",
                method: "POST",
                data: data,
            })
                .then((res) => {
                    if (res.status == 200) {
                        toast.success('Your account has been successfully created');
                    } else {
                        toast.error("Failed to signup");
                    }
                })
                .catch((err) => {
                    let error = err.response != undefined ? err.response.data.message : "Something went wrong";
                    toast.error(error);
                });
        } else {
            axios({
                url: "http://localhost:8080/api/users/login",
                method: "POST",
                data: data,
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        toast.success('Login Successful!');
                    } else {
                        toast.error("Login Failed!");
                    }
                })
                .catch((err) => {
                    let error = err.response != undefined ? err.response.data.message : "Something went wrong";
                    toast.error(error);
                });
        }
    };

    return (
        <>
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
                                <label htmlFor="phone">Phone Number</label>
                                <div>
                                    <input id="phone" type="number" {...register('phone')} />
                                    {errors.phone && <p className="error">*{errors.phone.message}*</p>}
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
            <Toaster />
        </>
    );
};

export default AuthForm;
