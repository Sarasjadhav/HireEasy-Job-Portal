import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
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

    /* Fetch real-time job count */
    useEffect(() => {
        const fetchJobCount = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:8000/api/v1/job/count'
                )

                if (res.data.success) {
                    animateCount(res.data.totalJobs)
                }
            } catch (error) {
                console.error('Failed to fetch job count', error)
            }
        }

        fetchJobCount()
    }, [])

    /* Smooth counter animation */
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

    return (
        <section className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#6A38C2]/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6 max-w-3xl"
                >
                    {/* Badge */}
                    <span className="w-fit px-5 py-2 rounded-full bg-[#F83002]/10 text-[#F83002] font-semibold text-sm">
                        🚀 India’s Fastest Growing Job Portal
                    </span>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        Search, Apply & <br />
                        Get Your{' '}
                        <span className="bg-gradient-to-r from-[#6A38C2] to-[#9b6dff] bg-clip-text text-transparent">
                            Dream Job
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 text-lg">
                        Find verified jobs from top companies, track your
                        applications, and get hired faster.
                    </p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 bg-white shadow-xl border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#6A38C2]"
                    >
                        <Search className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Job title, company, or skill"
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full outline-none text-gray-700"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] px-6 shadow-md"
                        >
                            Search
                        </Button>
                    </motion.div>

                    {/* Live Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-12 mt-6"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-[#6A38C2]">
                                {/* {jobCount.toLocaleString()}+ */}2k+
                            </h3>
                            <p className="text-sm text-gray-500">
                                Live Jobs
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-[#6A38C2]">
                                5K+
                            </h3>
                            <p className="text-sm text-gray-500">
                                Companies Hiring
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
