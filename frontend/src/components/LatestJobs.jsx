import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job)

    return (
        <section className="max-w-7xl mx-auto px-4 my-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold">
                        Latest & Top{' '}
                        <span className="text-[#6A38C2]">
                            Job Openings
                        </span>
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Hand-picked jobs from verified companies
                    </p>
                </div>

                {/* CTA */}
                <Link to="/browse">
                    <Button
                        variant="outline"
                        className="rounded-full px-6 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition"
                    >
                        View All Jobs →
                    </Button>
                </Link>
            </div>

            {/* Jobs Grid */}
            {allJobs.length <= 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <p className="text-lg text-gray-500">
                        😕 No jobs available right now
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Please check back later or try browsing categories
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {allJobs
                        ?.slice(0, 6)
                        .map((job) => (
                            <motion.div
                                key={job._id}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0 },
                                }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                </motion.div>
            )}
        </section>
    )
}

export default LatestJobs
