const EditCustomerForm = () => {
    return (
        <div className="bg-white p-6 shadow-md rounded-xl border w-[50%] mr-2">
            <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">First Name</label>
                    <input className="border rounded-lg p-2 w-full" placeholder="First Name" />
                </div>

                <div>
                    <label className="block font-medium">Last Name</label>
                    <input className="border rounded-lg p-2 w-full" placeholder="Last Name" />
                </div>

                <div>
                    <label className="block font-medium">Phone Number</label>
                    <input className="border rounded-lg p-2 w-full" placeholder="Phone Number" />
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input className="border rounded-lg p-2 w-full" placeholder="Email" />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium">Address</label>
                    <input className="border rounded-lg p-2 w-full" placeholder="Address" />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditCustomerForm;
