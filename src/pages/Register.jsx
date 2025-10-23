import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/authProvider';

const Register = () => {
    const navigate = useNavigate();
    const [nameError,setNameError] = useState("");

    const { createUser, setUser, updateUser } = use(AuthContext);
    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        if(name.length<5){
            setNameError("name should be more then 5 che..");
            return;
        }else{
            setNameError("");
        }
        const photo = e.target.photo.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log({ name, photo, email, password });

        createUser(email, password)
            .then(result=>{
                const user = result.user

                updateUser({ displayName: name, photoURL : photo})
                .then(()=>{
                    setUser({ ...user, displayName: name, photoURL: photo })
                    navigate('/');
                })
                .catch((error)=>{
                    console.log(error)
                    setUser(user);
                })
            })
            .catch(err=> console.log(err))
    }
    return (
        <div className='flex justify-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-12">
                <h1 className='text-2xl text-center font-semibold'>Register your account</h1>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input name='name' type="text" className="input" placeholder="Enter your name" required />
                        {
                            nameError && <p className='text-red-300 text-sm'>{nameError}</p>
                        }

                        {/* Photo Url */}
                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input" placeholder="Photo URL" required />

                        {/* email */}
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input" placeholder="Email" required />

                        {/* password */}
                        <label className="label">Password</label>
                        <input name='password' type="password" className="input" placeholder="Password" required />

                        <button type='submit' className="btn btn-neutral mt-2">Register</button>
                    </fieldset>
                </form>
                <h1 className='text-sm text-center'>You Have An Account ? <Link className='text-secondary' to={'/auth/login'}>Login</Link></h1>
            </div>
        </div>
    );
};

export default Register;