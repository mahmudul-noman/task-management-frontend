import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Container from "../Shared/Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const UpdateTask = () => {

    const { user } = useContext(AuthContext);
    const tasks = useLoaderData();
    // console.log(tasks);
    const { _id, taskTitle, taskDesc, name, email } = tasks

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/myTask';
    
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();


    // Data Update Function
    const handleUpdate = (data) => {
        fetch(`https://task-management-backend-ashy.vercel.app/allTask/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        title: 'Task Update Successfully',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Okay !'
                    })
                    navigate(from, { replace: true });

                }
            })
    }

    return (
        <Container>
            <div>
                <div className="container mx-auto">
                    <div className="py-20 text-center">
                        <h2 className="text-4xl text-purple-600 font-bold mb-6">Update Your Task</h2>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            {errors.exampleRequired && <span>This field is required</span>}
                            <div className="">


                                {/* Task Title */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">Task Title</span>
                                    </label>
                                    <input required className="input border-gray-500 border-[1px] focus:outline-none shadow" type="text" defaultValue={taskTitle} {...register("taskTitle")} />
                                </div>



                                {/* Task Description */}
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">Task Description</span>
                                    </label>
                                    <textarea required className="input border-[1px] border-gray-500 focus:outline-none shadow" type="text" defaultValue={taskDesc} {...register("taskDesc")} />
                                </div>


                                {/* User Name */}
                                <div className="form-control hidden">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">Name</span>
                                    </label>
                                    <input className="input border-0 focus:outline-none shadow" type="text" value={user?.displayName} {...register("name")} />
                                </div>

                                {/* User Email */}
                                <div className="form-control hidden">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">Email</span>
                                    </label>
                                    <input className="input border-0 focus:outline-none shadow" type="email" value={user?.email} {...register("email")} />
                                </div>


                                <div className="form-control mt-6">
                                    <input className="text-lg btn btn-block border-0 bg-gradient-to-r from-purple-400 to-cyan-500 text-white mt-5 tracking-widest" type="submit" value="Update a Task" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UpdateTask;