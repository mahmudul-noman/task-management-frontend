import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

// TODO- UI Change
const Register = () => {

    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/addTask';

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        reset();
                        Swal.fire('User Created Successfully')
                        navigate(from, { replace: true });
                    })
                    .catch(error => console.log(error))
            })
    };


    // Google Sign In
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                Swal.fire('Login Successfully')
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div className="hero min-h-screen">
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 py-3 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100">
                    <h1 className='text-center text-4xl text-purple-600 font-bold'>Register</h1>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" name='name' placeholder="Your Name" className="input border-0 focus:outline-none" />
                                {errors.name && <span className="text-red-600">Name is required *</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name='email' placeholder="Your Email" className="input border-0 focus:outline-none" />
                                {errors.email && <span className="text-red-600">Email is required *</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Password</span>
                                </label>
                                <input
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}[\]|\\:;,<.>/?]).*$/,
                                    })}
                                    type="password" name='password' placeholder="Your Password" className="input border-0 focus:outline-none" />
                                {errors.password?.type === "required" && (
                                    <span className="text-red-600">Password is required *</span>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <span className="text-red-600">Password is less than 6 characters *</span>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <span className="text-red-600">Password requires at least one capital letter and one special character *</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base">Photo URL</span>
                                </label>
                                <input defaultValue="" {...register("photoURL", { required: true })} type="text" name='photoURL' placeholder="Your Photo URL" className="input border-0 focus:outline-none" />
                                {errors.photoURL && <span className="text-red-600">Photo is required *</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="text-md tracking-widest btn border-0 bg-gradient-to-r from-purple-400 to-sky-500">Register</button>
                            </div>
                        </form>
                        <div>
                            <button onClick={handleGoogleSignIn} className='btn border-0 btn-block flex items-center bg-gray-400 tracking-widest'>Login With Google <span className='ml-4 text-2xl'><FaGoogle></FaGoogle></span></button>
                        </div>
                        <p className='font-semibold mt-5'>Already have an account? <Link to='/login' className='text-green-600'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;