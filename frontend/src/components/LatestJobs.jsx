import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job)

    return (
        <section className="py-20" style={{ background: 'linear-gradient(180deg, #fff 0%, #f8f5ff 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} className="text-[#6A38C2]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#6A38C2]">
                                Freshly Posted
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            Latest &amp; Top{' '}
                            <span className="gradient-text">Job Openings</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-base">
                            Hand-picked verified listings updated daily
                        </p>
                        <div className="section-divider w-20 mt-4" />
                    </div>

                    <Link to="/browse">
                        <Button variant="outline"
                            className="rounded-full px-6 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all font-semibold">
                            View All Jobs →
                        </Button>
                    </Link>
                </motion.div>

                {/* Grid */}
                {allJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 rounded-3xl border-2 border-dashed border-gray-200 bg-white">
                        <p className="text-5xl mb-4">😕</p>
                        <p className="text-lg font-semibold text-gray-600">No jobs available right now</p>
                        <p className="text-sm text-gray-400 mt-1">Check back later or explore categories above</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
                        }}
                        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {allJobs.slice(0, 6).map((job) => (
                            <motion.div key={job._id}
                                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Bottom CTA */}
                {allJobs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12">
                        <Link to="/browse">
                            <Button size="lg"
                                className="rounded-full px-10 py-6 font-semibold text-white btn-glow"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                                Explore All {allJobs.length}+ Jobs →
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs
