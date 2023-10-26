import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const CheckOut = () => {

    const { user } = useContext(AuthContext)
    const service = useLoaderData();
    const { title, _id, price, img } = service;

    const handleBookService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email.value;
        const message = form.message.value;
        console.log(message, name, date, email);
        const booking = {
            customerName: name,
            email,
            img,
            service: title,
            service_id: _id,
            price
        }
        // console.log(order);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            <h2 className="text-center text-4xl font-bold">Book service: {title}</h2>
            <div className="my-12">
                <form onSubmit={handleBookService} className="card-body bg-[#F3F3F3] px-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input defaultValue={user?.displayName} name="name" type="text" placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input name="date" type="date" placeholder="Date" className="input input-bordered" required />
                            </div>
                        </div>

                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input defaultValue={user?.email} name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Due Amount</span>
                                </label>
                                <input name="dueAmount" type="text" placeholder="Due Amount" className="input input-bordered" required />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="Your Message" className="block mb-2 text-sm">
                            Your Message
                        </label>
                        <textarea name="message"
                            id="Your Message"
                            rows="4"
                            className="block p-2.5 w-full text-sm rounded-lg "
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#FF3811] btn-block text-white">Order Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;