import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Briefcase, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({ email: '', password: '', role: '' })
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
        <div className="min-h-screen flex flex-col" style={{ background: '#f8f5ff' }}>
            <Navbar />

            <div className="flex flex-1 items-stretch">

                {/* ── Left Brand Panel ── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #6A38C2 100%)' }}>

                    {/* Background Patterns */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
                            style={{ background: '#9b6dff' }} />
                        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-10 blur-3xl"
                            style={{ background: '#F83002' }} />
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute w-px bg-white/5"
                                style={{
                                    left: `${15 + i * 16}%`,
                                    top: 0,
                                    height: '100%',
                                    transform: `rotate(${-15 + i * 4}deg)`,
                                }} />
                        ))}
                    </div>

                    {/* Logo */}
                    <div className="relative flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                            <Briefcase size={18} className="text-white" />
                        </div>
                        <span className="text-white font-extrabold text-xl">
                            Hire<span style={{ color: '#ff6b4a' }}>Easy</span>
                        </span>
                    </div>

                    {/* Center Content */}
                    <div className="relative">
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                            Welcome<br />Back! 👋
                        </h2>
                        <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xs">
                            Log in and continue your journey to finding the perfect job or your next great hire.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Access thousands of verified jobs',
                                'Track your applications in real-time',
                                'Connect with top companies',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-[#9b6dff] flex-shrink-0" />
                                    <span className="text-white/70 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="relative">
                        <p className="text-white/40 text-xs">
                            Trusted by 50,000+ job seekers across India
                        </p>
                    </div>
                </motion.div>

                {/* ── Right: Form ── */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full max-w-md">

                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Sign In</h1>
                            <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-5">

                            {/* Email */}
                            <div>
                                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</Label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className="pl-10 h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 rounded-xl transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Password</Label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className="pl-10 h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 rounded-xl transition-all"
                                    />
                                </div>
                            </div>

                            {/* Role Toggle */}
                            <div>
                                <Label className="text-sm font-semibold text-gray-700 mb-2 block">I am a</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['student', 'recruiter'].map((role) => (
                                        <label key={role}
                                            className={`flex items-center justify-center gap-2 h-11 rounded-xl border-2 cursor-pointer transition-all font-medium text-sm capitalize
                                                ${input.role === role
                                                    ? 'border-[#6A38C2] bg-[#6A38C2]/8 text-[#6A38C2]'
                                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                                }`}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role}
                                                checked={input.role === role}
                                                onChange={changeEventHandler}
                                                className="hidden"
                                            />
                                            {role === 'student' ? '🎓' : '💼'} {role}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <Button type="submit" disabled={loading}
                                className="w-full h-12 rounded-xl font-bold text-white btn-glow mt-2"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                                {loading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...</>
                                ) : (
                                    <>Sign In <ArrowRight size={16} className="ml-2" /></>
                                )}
                            </Button>

                            <p className="text-sm text-center text-gray-500 pt-2">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-[#6A38C2] font-semibold hover:underline">
                                    Create one free →
                                </Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Login
