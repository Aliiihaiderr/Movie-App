import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from './atoms';
import './Login.css'
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    const [user, setUser] = useRecoilState(userAtom);

    const onSubmit = async (data) => {
        try {
            const userData = { ...data };
            setUser({
                isLoggedIn: true,
                username: userData.name,
                token: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className='login' >
                <h1>Login</h1>
                <form className='myform' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Name:
                        <input
                            type="text"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                            })}
                        />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;