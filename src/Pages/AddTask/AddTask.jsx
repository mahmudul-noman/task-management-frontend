
import { useForm } from "react-hook-form";
import Container from "../Shared/Container/Container";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const AddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    // Data Send to Server Function
    const onSubmit = (data) => {
        fetch('https://task-management-backend-ashy.vercel.app/addTask', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((result) => {
                if (result.insertedId) {
                    reset();
                    Swal.fire({
                        title: 'Task Added Successfully',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'OKAY !'
                    })
                }
                // console.log(result);
            })
        // console.log(data)
    };

    return (
        <Container>
            <div>
                <div className="container mx-auto">
                    <div className="py-20 text-center">
                        <h2 className="text-4xl text-purple-600 font-bold mb-6">Add Your Task</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {errors.exampleRequired && <span>This field is required</span>}
                            <div className="">


                                {/* Task Title */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">Task Title</span>
                                    </label>
                                    <input required className="input border-gray-500 border-[1px] focus:outline-none shadow" type="text" defaultValue="" {...register("taskTitle")} />
                                </div>



                                {/* Task Description */}
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text font-semibold text-lg">Task Description</span>
                                    </label>
                                    <textarea required className="input border-[1px] border-gray-500 focus:outline-none shadow" type="text" defaultValue="" {...register("taskDesc")} />
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
                                    <input className="text-lg btn btn-block border-0 bg-gradient-to-r from-purple-400 to-cyan-500 text-white mt-5 tracking-widest" type="submit" value="Add a Task" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AddTask;