import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const categories = [
    { label: 'Housekeeper',  emoji: '🏠', color: '#6A38C2', bg: '#6A38C2' },
    { label: 'Cook',          emoji: '👨‍🍳', color: '#F83002', bg: '#F83002' },
    { label: 'Electrician',   emoji: '⚡', color: '#f59e0b', bg: '#f59e0b' },
    { label: 'Nurse',         emoji: '🩺', color: '#10b981', bg: '#10b981' },
    { label: 'Tutor',         emoji: '📚', color: '#0ea5e9', bg: '#0ea5e9' },
    { label: 'Cabin Crew',    emoji: '✈️', color: '#7209b7', bg: '#7209b7' },
    { label: 'Beautician',    emoji: '💄', color: '#ec4899', bg: '#ec4899' },
    { label: 'Driver',        emoji: '🚗', color: '#64748b', bg: '#64748b' },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <section className="py-20 overflow-hidden" style={{ background: '#fff' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
                        style={{ background: 'rgba(106,56,194,0.08)', color: '#6A38C2' }}>
                        Job Categories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Explore Jobs by{' '}
                        <span className="gradient-text">Category</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
                        Find opportunities tailored to your skills — browse by role type
                    </p>
                    <div className="section-divider w-20 mt-4" />
                </motion.div>

                {/* Carousel */}
                <Carousel className="w-full max-w-5xl mx-auto px-8">
                    <CarouselContent className="-ml-4">
                        {categories.map((cat, index) => (
                            <CarouselItem key={index}
                                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.07, duration: 0.4 }}
                                    whileHover={{ y: -5 }}
                                    className="h-full">
                                    <button
                                        onClick={() => searchJobHandler(cat.label)}
                                        className="w-full h-28 rounded-2xl border flex flex-col items-center justify-center gap-2
                                            cursor-pointer transition-all duration-300 group relative overflow-hidden"
                                        style={{
                                            background: '#fff',
                                            borderColor: `${cat.bg}30`,
                                            boxShadow: `0 2px 12px ${cat.bg}10`,
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = `${cat.bg}08`
                                            e.currentTarget.style.borderColor = `${cat.bg}60`
                                            e.currentTarget.style.boxShadow = `0 8px 24px ${cat.bg}25`
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = '#fff'
                                            e.currentTarget.style.borderColor = `${cat.bg}30`
                                            e.currentTarget.style.boxShadow = `0 2px 12px ${cat.bg}10`
                                        }}>

                                        {/* Background circle accent */}
                                        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-5"
                                            style={{ background: cat.bg }} />

                                        <span className="text-3xl">{cat.emoji}</span>
                                        <span className="text-sm font-semibold text-gray-700 group-hover:font-bold transition-all"
                                            style={{ color: cat.color }}>
                                            {cat.label}
                                        </span>
                                    </button>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-0 bg-white border-gray-200 shadow-md hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all" />
                    <CarouselNext className="right-0 bg-white border-gray-200 shadow-md hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all" />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel
