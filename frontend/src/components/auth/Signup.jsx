import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: '',
    })

    const { loading, user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.entries(input).forEach(([key, value]) => {
            if (value) formData.append(key, value)
        })

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed')
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-[#fdf2f8] to-[#fff7ed]">
            <Navbar />

            <div className="flex items-center justify-center px-4 py-20">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl p-8 shadow-xl"
                >
                    <h1 className="text-3xl font-bold mb-2">Create Account 🚀</h1>
                    <p className="text-gray-500 mb-6">Join and find your dream job</p>

                    <div className="space-y-4">
                        <Input name="fullname" placeholder="Full Name" onChange={changeEventHandler} />
                        <Input name="email" type="email" placeholder="Email" onChange={changeEventHandler} />
                        <Input name="phoneNumber" placeholder="Phone Number" onChange={changeEventHandler} />
                        <Input name="password" type="password" placeholder="Password" onChange={changeEventHandler} />

                        <RadioGroup className="flex gap-6 pt-2">
                            <label className="flex items-center gap-2">
                                <Input type="radio" name="role" value="student" onChange={changeEventHandler} />
                                Student
                            </label>
                            <label className="flex items-center gap-2">
                                <Input type="radio" name="role" value="recruiter" onChange={changeEventHandler} />
                                Recruiter
                            </label>
                        </RadioGroup>

                        <Input type="file" accept="image/*" onChange={changeFileHandler} />

                        <Button className="w-full mt-4 bg-gradient-to-r from-[#6A38C2] to-[#5b2fb0]">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Signup'
                            )}
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#6A38C2] font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
