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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    })

    const { loading, user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
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
                    <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
                    <p className="text-gray-500 mb-6">Login to continue</p>

                    <div className="space-y-4">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                            />
                        </div>

                        <RadioGroup className="flex gap-6 pt-2">
                            <label className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                Student
                            </label>

                            <label className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                Recruiter
                            </label>
                        </RadioGroup>

                        <Button
                            type="submit"
                            className="w-full mt-4 bg-gradient-to-r from-[#6A38C2] to-[#5b2fb0]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                            Don’t have an account?{' '}
                            <Link to="/signup" className="text-[#6A38C2] font-medium">
                                Signup
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
