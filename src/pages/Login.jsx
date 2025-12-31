import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/authProvider';

const Login = () => {
    const [error, setError] = useState("");

    const { login } = use(AuthContext);

    const location = useLocation();
    // console.log(location);
    const navigate = useNavigate();



    const handleLogin = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const email = e.target.email.value;
        // console.log({ password, email });
        login(email, password)
            .then(result => {
                console.log(result.user)
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(err => setError(err.message));
    }
    return (
        <div className='flex justify-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-12">
                <h1 className='text-2xl text-center font-semibold'>Login your account</h1>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input name='password' type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>

                        {error && <p className='text-red-300 text-xs'>{error}</p>}
                        <button type='submit' className="btn btn-neutral mt-2">Login</button>
                    </fieldset>
                </form>
                <h1 className='text-sm text-center'>Don't Have An Account ? <Link className='text-secondary' to={'/auth/register'}>Register</Link></h1>
            </div>
        </div>
    );
};

export default Login;