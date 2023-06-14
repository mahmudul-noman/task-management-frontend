
import { Link } from 'react-router-dom';
import Container from '../Shared/Container/Container';
import { FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const MyTask = () => {

    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    // Load Data in UI 
    useEffect(() => {
        fetch(`https://task-management-backend-ashy.vercel.app/myTask/${user?.email}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [user])


    // Delete Data
    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`https://task-management-backend-ashy.vercel.app/allTask/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Task has been deleted.',
                                'success'
                            );
                            const remaining = tasks.filter(task => task._id !== _id);
                            setTasks(remaining);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Task:', error);
                    });
            }
        });
    };


    // Status Handle
    const handleStatus = (_id) => {
        fetch(`https://task-management-backend-ashy.vercel.app/allTask/${_id}`, {
            method: 'PATCH',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: `Task Completed`,
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        fetch(`https://task-management-backend-ashy.vercel.app/myTask/${user?.email}`)
                            .then((res) => res.json())
                            .then((data) => setTasks(data));
                    });
                }
            });
    };


    return (
        <Container>
            <div className="py-20">
                <div className="container mx-auto">
                    <h2 className="text-center text-4xl font-bold text-purple-600 stl2-font tracking-widest mb-6">My Task</h2>
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th className="text-base">Task Title</th>
                                    <th className="text-base">Task Description</th>
                                    <th className="text-base">Status</th>
                                    <th className="text-base">Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    tasks.map((task, index) => <tr key={task._id}>
                                        <th>{index + 1}</th>
                                        <td className='text-xl font-bold'>{task.taskTitle}</td>
                                        <td className='text-lg font-semibold'>{task.taskDesc}</td>
                                        <td>{
                                            task.status === 'completed' ?
                                                <><div className='flex items-center space-x-2 text-base font-bold text-green-600'><FaCheckCircle></FaCheckCircle> <h2>Completed</h2></div></> :
                                                <>
                                                    <button onClick={() => handleStatus(task._id)} className='btn bg-purple-300 font-semibold'>Mark as Complete</button>
                                                </>
                                        }</td>
                                        <td>
                                            <Link to={`updateTask/${task._id}`}><FaEdit className="mb-2 text-3xl text-black"></FaEdit></Link>
                                            <button onClick={() => handleDelete(task._id)}><FaTrashAlt className=" text-3xl text-red-500"></FaTrashAlt></button>
                                        </td>
                                    </tr>)
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </Container>
    );
};

export default MyTask;