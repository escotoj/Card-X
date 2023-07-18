import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
// change depending on file name
import { ADD_USER } from '../utils/mutations';
// change depending on file name
import Auth from '../utils/auth';
import '../css/style.css';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.toke);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card signupMain">
                    <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ): (
                            <div id="signupColumn">
                            <form onSubmit={handleFormSubmit}>
                                <input
                                className="form-input signupField"
                                placeholder="Your username"
                                name="username"
                                type="text"
                                value={formState.name}
                                onChange={handleChange}
                                /><br></br>
                                <input 
                                className="form-input signupField"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                /><br></br>
                                <input
                                className="form-input signupField"
                                placeholder="******"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                                /><br></br>
                                <button
                                className="btn btn-block btn-primary signupBtnX"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                            </div>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;