import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const category = [
    'Housekeeper',
    'Cook',
    'Electrician',
    'Nurse',
    'Tutor',
    'Cabin Crew',
    'Beautician',
    'Driver',
]

const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <section className="py-20 bg-white">
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">
                    Explore Jobs by{' '}
                    <span className="text-[#6A38C2]">Category</span>
                </h2>
                <p className="text-gray-500 mt-2">
                    Find opportunities tailored to your skills
                </p>
            </div>

            <Carousel className="w-full max-w-5xl mx-auto px-6">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-full"
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    className="w-full h-20 rounded-2xl bg-gradient-to-br from-[#f5f3ff] to-white border border-[#6A38C2]/20 text-gray-800 font-semibold shadow-sm hover:shadow-lg hover:border-[#6A38C2] transition-all"
                                    variant="outline"
                                >
                                    {cat}
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows */}
                <CarouselPrevious className="left-0 bg-white shadow-md hover:bg-gray-100" />
                <CarouselNext className="right-0 bg-white shadow-md hover:bg-gray-100" />
            </Carousel>
        </section>
    )
}

export default CategoryCarousel
