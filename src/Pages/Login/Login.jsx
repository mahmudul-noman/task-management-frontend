import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

// TODO- UI Change
const Login = () => {



    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/addTask';



    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire('Login Successfully')
                navigate(from, { replace: true });
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
        <div className="hero min-h-screen mx-auto">
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 py-3 bg-gradient-to-r from-purple-100 via-purple-100 to-purple-100">
                    <h1 className='text-center text-4xl text-purple-600 font-bold'>Login</h1>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <input {...register("password", { required: true })} type="password" name='password' placeholder="Your Password" className="input border-0 focus:outline-none" />
                                {errors.password && <span className="text-red-600">Password is required *</span>}
                            </div>
                            {/* <p className='text-sm font-extrabold text-green-600'>{success}</p>
                            <p className='text-sm font-extrabold text-red-600'>{error}</p> */}
                            <div className="form-control mt-6">
                                <button className="text-md font-bold tracking-widest btn border-0 bg-gradient-to-r from-purple-400 to-sky-200">Login</button>
                            </div>
                        </form>
                        <div>
                            <button onClick={handleGoogleSignIn} className='btn border-0 btn-block flex items-center bg-gray-400 tracking-widest'>Login With Google <span className='ml-4 text-2xl'><FaGoogle></FaGoogle></span></button>
                        </div>
                        <p className='font-semibold mt-5'>Don't have an account? <Link to='/register' className='text-rose-600'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;