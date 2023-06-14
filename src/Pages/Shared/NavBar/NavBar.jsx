
import { Link } from 'react-router-dom';
import '../../../../src/App';
import ActiveLink from './ActiveLink';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Container from '../Container/Container';

// TODO- UI Change
const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);

    return (
        <Container>
            <div className="navbar bg-base-100 mx-auto py-6">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        {
                            user ? <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <ActiveLink className='text-base font-semibold text-[#666]' to="/addTask">Add Task</ActiveLink>
                                <ActiveLink className='text-base font-semibold text-[#666]' to="/myTask">My Task</ActiveLink>
                            </ul> : ''
                        }
                    </div>
                    <Link to='/addTask' className='flex items-center'>
                        <p className="lg:text-2xl text-sm font-bold bg-gradient-to-r from-purple-400 to-cyan-500 text-transparent bg-clip-text">TASK</p>
                    </Link>
                </div>

                {
                    user ?
                        <>
                            <div className="navbar-center hidden lg:flex">
                                <ul className="menu menu-horizontal px-1 space-x-7">
                                    <ActiveLink className='text-2xl tracking-widest uppercase font-bold text-[#666]' to="/addTask">Add Task</ActiveLink>
                                    <ActiveLink className='text-base tracking-widest uppercase font-semibold text-[#666]' to="/myTask">My Task</ActiveLink>
                                </ul>
                            </div>
                        </> :
                        <>
                            <div className='w-full text-sm text-end md:text-2xl tracking-wider font-bold'>
                                <h2 className='w-full text-center text-purple-500'>Please Login For Add Your Task</h2>
                            </div>
                        </>
                }
                <div className="navbar-end space-x-3">
                    <div className='flex items-center'>


                        {
                            user ?
                                <>
                                    <div className='flex items-center'>
                                        <div className='mr-3'>
                                            <img src={user?.photoURL} title={user?.displayName} className='w-14 h-14 border-2 border-pink-600 p-1 rounded-full object-cover' alt="" />
                                        </div>
                                        <Link onClick={logOut} className="btn btn-outline border-0 bg-gradient-to-r from-purple-400 to-cyan-500 text-white tracking-widest">Logout</Link>
                                    </div>
                                </> : ''
                        }

                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NavBar;