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
import { setLoading } from '@/redux/authSlice'
import {
    Loader2, User, Mail, Lock, Phone, Image, Briefcase,
    CheckCircle, ArrowRight, Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '', email: '', phoneNumber: '',
        password: '', role: '', file: '',
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

    const fields = [
        { name: 'fullname',    label: 'Full Name',    Icon: User,   placeholder: 'Your full name',      type: 'text'     },
        { name: 'email',       label: 'Email Address', Icon: Mail,   placeholder: 'you@example.com',      type: 'email'    },
        { name: 'phoneNumber', label: 'Phone Number',  Icon: Phone,  placeholder: '+91 98765 43210',      type: 'text'     },
        { name: 'password',    label: 'Password',      Icon: Lock,   placeholder: '••••••••',             type: 'password' },
    ]

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#f8f5ff' }}>
            <Navbar />

            <div className="flex flex-1 items-stretch">

                {/* ── Left Brand Panel ── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex flex-col justify-between w-[42%] p-14 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #6A38C2 100%)' }}>

                    {/* Background Patterns */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
                            style={{ background: '#9b6dff' }} />
                        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-10 blur-3xl"
                            style={{ background: '#F83002' }} />
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute w-px bg-white/5"
                                style={{ left: `${15 + i * 16}%`, top: 0, height: '100%', transform: `rotate(${-15 + i * 4}deg)` }} />
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
                            Start Your<br />Journey 🚀
                        </h2>
                        <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xs">
                            Join thousands of professionals using HireEasy to find verified jobs and top talent.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Free to create an account',
                                'Get matched with top companies',
                                'Apply to jobs with one click',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-[#9b6dff] flex-shrink-0" />
                                    <span className="text-white/70 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social proof pill */}
                        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                            <Sparkles size={14} className="text-[#9b6dff]" />
                            <span className="text-white/80 text-xs font-medium">50K+ professionals on HireEasy</span>
                        </div>
                    </div>

                    {/* Bottom */}
                    <p className="relative text-white/40 text-xs">
                        Trusted by 50,000+ job seekers across India
                    </p>
                </motion.div>

                {/* ── Right: Form ── */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full max-w-lg">

                        <div className="mb-6">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Create Account</h1>
                            <p className="text-gray-500 text-sm">Fill in your details to get started</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-4">

                            {/* Dynamic Fields */}
                            {fields.map(({ name, label, Icon, placeholder, type }) => (
                                <div key={name}>
                                    <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{label}</Label>
                                    <div className="relative">
                                        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            name={name}
                                            type={type}
                                            placeholder={placeholder}
                                            onChange={changeEventHandler}
                                            className="pl-10 h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 rounded-xl transition-all"
                                        />
                                    </div>
                                </div>
                            ))}

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

                            {/* Profile Photo */}
                            <div>
                                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                                    Profile Photo <span className="text-gray-400 font-normal">(optional)</span>
                                </Label>
                                <div className="relative">
                                    <Image size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="pl-10 h-11 border-gray-200 rounded-xl file:mr-3 file:border-0 file:bg-[#6A38C2]/10 file:text-[#6A38C2] file:text-xs file:font-semibold file:rounded-lg file:px-2 file:py-1 cursor-pointer transition-all"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button type="submit" disabled={loading}
                                className="w-full h-12 rounded-xl font-bold text-white btn-glow mt-1"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                                {loading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
                                ) : (
                                    <>Create Account <ArrowRight size={16} className="ml-2" /></>
                                )}
                            </Button>

                            <p className="text-sm text-center text-gray-500 pt-1">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#6A38C2] font-semibold hover:underline">
                                    Sign In →
                                </Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Signup
