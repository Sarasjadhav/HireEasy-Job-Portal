import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, FileText, CheckCircle2 } from 'lucide-react'

/* ── How It Works Section ── */
const HowItWorks = () => {
    const steps = [
        {
            step: '01',
            Icon: Search,
            title: 'Search Jobs',
            desc: 'Browse thousands of verified listings by role, location, or category.',
            color: '#6A38C2',
        },
        {
            step: '02',
            Icon: FileText,
            title: 'Apply Easily',
            desc: 'One-click applications. Your profile is instantly shared with employers.',
            color: '#F83002',
        },
        {
            step: '03',
            Icon: CheckCircle2,
            title: 'Get Hired',
            desc: 'Track your application status in real-time and land your dream job.',
            color: '#10b981',
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
                        style={{ background: 'rgba(106,56,194,0.08)', color: '#6A38C2' }}>
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        How <span className="gradient-text">HireEasy</span> Works
                    </h2>
                    <p className="text-gray-500 mt-3 text-base">Three simple steps to your next great opportunity</p>
                    <div className="section-divider w-20 mt-4" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-px"
                        style={{ background: 'linear-gradient(90deg, #6A38C2, #F83002, #10b981)' }} />

                    {steps.map(({ step, Icon, title, desc, color }, i) => (
                        <motion.div key={step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl relative"
                            style={{ background: `${color}05`, border: `1px solid ${color}20` }}>

                            {/* Step Circle */}
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 relative z-10 bg-white border-4"
                                style={{ borderColor: color, boxShadow: `0 4px 20px ${color}25` }}>
                                <Icon size={24} style={{ color }} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-wider mb-2"
                                style={{ color: `${color}99` }}>
                                Step {step}
                            </span>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Home = () => {
    useGetAllJobs()
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate('/admin/companies')
        }
    }, [user, navigate])

    return (
        <div className="relative overflow-hidden">
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <HowItWorks />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home
