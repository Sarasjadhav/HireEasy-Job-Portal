import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search, ArrowRight, Zap, Users, Building2, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState('')
    const [jobCount, setJobCount] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchJobHandler()
    }

    /* Fetch real-time job count */
    useEffect(() => {
        const fetchJobCount = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/job/count')
                if (res.data.success) animateCount(res.data.totalJobs)
            } catch (error) {
                console.error('Failed to fetch job count', error)
            }
        }
        fetchJobCount()
    }, [])

    const animateCount = (end) => {
        let start = 0
        const duration = 1500
        const increment = end / (duration / 16)
        const counter = setInterval(() => {
            start += increment
            if (start >= end) {
                setJobCount(end)
                clearInterval(counter)
            } else {
                setJobCount(Math.floor(start))
            }
        }, 16)
    }

    const popularSearches = ['Housekeeper', 'Cook', 'Nurse', 'Electrician', 'Driver']

    return (
        <section className="relative min-h-[88vh] flex items-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 40%, #fff7ed 100%)' }}>

            {/* ── Animated Background Orbs ── */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #6A38C2, transparent)' }} />
                <motion.div animate={{ y: [0, 25, 0], x: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #F83002, transparent)' }} />
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #9b6dff, transparent)' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* ── Left: Text Content ── */}
                    <div className="flex flex-col gap-6">

                        {/* Badge */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                                style={{ background: 'rgba(248,48,2,0.1)', color: '#F83002', border: '1px solid rgba(248,48,2,0.2)' }}>
                                <Zap size={14} className="fill-current" />
                                India's Fastest Growing Job Portal
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
                            Find Your
                            <span className="block gradient-text">Dream Job</span>
                            Today
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-500 text-lg leading-relaxed max-w-lg">
                            Browse thousands of verified jobs from top companies. Get hired faster
                            with smart search and real-time application tracking.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-xl border border-gray-100"
                            style={{ boxShadow: '0 8px 40px rgba(106,56,194,0.12)' }}>
                            <div className="flex items-center gap-2 flex-1 px-3">
                                <Search size={18} className="text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Job title, company, or skill..."
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full outline-none text-gray-700 text-sm bg-transparent placeholder:text-gray-400"
                                />
                            </div>
                            <Button onClick={searchJobHandler}
                                className="rounded-xl px-6 py-5 font-semibold text-white flex-shrink-0 btn-glow"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                                Search
                                <ArrowRight size={16} className="ml-1" />
                            </Button>
                        </motion.div>

                        {/* Popular Searches */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-400 font-medium">Popular:</span>
                            {popularSearches.map((term) => (
                                <button key={term}
                                    onClick={() => { dispatch(setSearchedQuery(term)); navigate('/browse') }}
                                    className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600
                                        hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-all">
                                    {term}
                                </button>
                            ))}
                        </motion.div>

                        {/* Stats */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="flex gap-8 pt-2">
                            {[
                                { icon: TrendingUp, value: '2K+', label: 'Live Jobs', color: '#6A38C2' },
                                { icon: Building2, value: '500+', label: 'Companies', color: '#F83002' },
                                { icon: Users, value: '50K+', label: 'Job Seekers', color: '#7209b7' },
                            ].map(({ icon: Icon, value, label, color }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ background: `${color}15` }}>
                                        <Icon size={16} style={{ color }} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: Visual Card ── */}
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                        className="hidden lg:flex flex-col gap-4 relative">

                        {/* Main Feature Card */}
                        <div className="glass-card rounded-3xl p-8 relative overflow-hidden"
                            style={{ boxShadow: '0 20px 60px rgba(106,56,194,0.15)' }}>
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
                                style={{ background: 'radial-gradient(circle, #6A38C2, transparent)' }} />
                            <h3 className="text-lg font-bold text-gray-800 mb-6">🔥 Top Hiring Sectors</h3>
                            {[
                                { role: 'Hospitality & Service', count: '120+ Jobs', pct: 82, color: '#6A38C2' },
                                { role: 'Healthcare & Nursing', count: '95+ Jobs', pct: 68, color: '#F83002' },
                                { role: 'Skilled Trades', count: '80+ Jobs', pct: 55, color: '#7209b7' },
                                { role: 'Education & Teaching', count: '60+ Jobs', pct: 42, color: '#0ea5e9' },
                            ].map(({ role, count, pct, color }) => (
                                <div key={role} className="mb-4 last:mb-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-medium text-gray-700">{role}</span>
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                            style={{ background: `${color}15`, color }}>
                                            {count}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Floating Mini Cards */}
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -bottom-4 -left-6 glass-card rounded-2xl p-4 flex items-center gap-3 w-52"
                            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.10)' }}>
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">✅</div>
                            <div>
                                <p className="text-xs font-semibold text-gray-800">Application Sent!</p>
                                <p className="text-[11px] text-gray-400">Thomas Cook • 2s ago</p>
                            </div>
                        </motion.div>

                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 flex items-center gap-3 w-48"
                            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.10)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                style={{ background: 'rgba(106,56,194,0.1)' }}>🎉</div>
                            <div>
                                <p className="text-xs font-semibold text-gray-800">New Match!</p>
                                <p className="text-[11px] text-gray-400">Cook • Pune</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection
