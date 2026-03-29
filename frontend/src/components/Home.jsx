import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
        <div className="relative bg-[#F9FAFB] overflow-hidden">
            <Navbar />

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f5f3ff] via-[#fdf2f8] to-[#fff7ed]">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#6A38C2]/25 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#F83002]/20 rounded-full blur-3xl" />
                </div>

                <HeroSection />
            </section>

            {/* ================= CATEGORY SECTION ================= */}
            <section className="relative py-20">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[#6A38C2]/10 rounded-full blur-3xl" />
                </div>

                <CategoryCarousel />
            </section>

            {/* ================= LATEST JOBS SECTION ================= */}
            <section className="relative py-20">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute bottom-0 right-20 w-[350px] h-[350px] bg-[#F83002]/10 rounded-full blur-3xl" />
                </div>

                <LatestJobs />
            </section>

            {/* ================= FOOTER ================= */}
            <Footer />
        </div>
    )
}

export default Home
