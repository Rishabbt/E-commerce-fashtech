'use client'
import { addAddress } from "@/lib/features/address/addressSlice"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"

const AddressModal = ({ setShowAddressModal }) => {
     
    const { getToken } = useAuth()
    const dispatch = useDispatch()

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const token = await getToken()
            const {data} = await axios.post('/api/address', {address}, {headers:{
                Authorization: `Bearer ${token}`
            }})
            dispatch(addAddress(data.newAddress))
            toast.success(data.message)
            setShowAddressModal(false)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.message || error.message)
        }
    }

    return (
       <form
  onSubmit={(e) =>
    toast.promise(handleSubmit(e), {
      loading: "Adding Address...",
      success: "Address Added Successfully",
      error: "Failed to Add Address",
    })
  }
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
>
  <div className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
    
    {/* Close Button */}
    <button
      type="button"
      onClick={() => setShowAddressModal(false)}
      className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-black"
    >
      <XIcon size={24} />
    </button>

    {/* Heading */}
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900">
        Add New Address
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Fill in your delivery details below.
      </p>
    </div>

    {/* Form Fields */}
    <div className="grid gap-5">

      {/* Name */}
      <input
        name="name"
        onChange={handleAddressChange}
        value={address.name}
        type="text"
        placeholder="Full Name"
        required
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
      />

      {/* Email */}
      <input
        name="email"
        onChange={handleAddressChange}
        value={address.email}
        type="email"
        placeholder="Email Address"
        required
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
      />

      {/* Street */}
      <input
        name="street"
        onChange={handleAddressChange}
        value={address.street}
        type="text"
        placeholder="Street Address"
        required
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
      />

      {/* City + State */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          name="city"
          onChange={handleAddressChange}
          value={address.city}
          type="text"
          placeholder="City"
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
        />

        <input
          name="state"
          onChange={handleAddressChange}
          value={address.state}
          type="text"
          placeholder="State"
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      {/* Zip + Country */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          name="zip"
          onChange={handleAddressChange}
          value={address.zip}
          type="text"
          inputMode="numeric"
          placeholder="ZIP Code"
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
        />

        <input
          name="country"
          onChange={handleAddressChange}
          value={address.country}
          type="text"
          placeholder="Country"
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      {/* Phone */}
      <input
        name="phone"
        onChange={handleAddressChange}
        value={address.phone}
        type="text"
        placeholder="Phone Number"
        required
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-black focus:bg-white"
      />

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          onClick={() => setShowAddressModal(false)}
          className="w-full rounded-xl border border-slate-300 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-slate-800 active:scale-95"
        >
          Save Address
        </button>
      </div>
    </div>
  </div>
</form>
    )
}

export default AddressModal