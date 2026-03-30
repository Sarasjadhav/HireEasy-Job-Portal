import React from 'react'
import { Button } from './ui/button'
import { MapPin, Clock, Bookmark, ArrowRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const jobTypeColor = {
    'Full Time':  '#6A38C2',
    'Part Time':  '#0ea5e9',
    'Contract':   '#f59e0b',
    'Internship': '#10b981',
}

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgo = (mongodbTime) => {
        const days = Math.floor((new Date() - new Date(mongodbTime)) / (1000 * 60 * 60 * 24))
        return days === 0 ? 'Today' : `${days}d ago`
    }

    const accentColor = jobTypeColor[job?.jobType] || '#6A38C2'

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden group relative cursor-default"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(106,56,194,0.14)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'}>

            {/* Gradient top strip */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}66)` }} />

            <div className="p-5">
                {/* Row 1: Time + Bookmark */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock size={12} />
                        <span className="text-xs font-medium">{daysAgo(job?.createdAt)}</span>
                    </div>
                    <button title="Save job"
                        className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center
                            hover:bg-[#6A38C2]/8 hover:border-[#6A38C2]/30 transition-all group/bm">
                        <Bookmark size={14} className="text-gray-400 group-hover/bm:text-[#6A38C2] transition-colors" />
                    </button>
                </div>

                {/* Row 2: Company */}
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 rounded-xl border border-gray-100">
                        <AvatarImage src={job?.company?.logo} className="object-cover rounded-xl" />
                        <AvatarFallback className="rounded-xl text-white text-sm font-bold"
                            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>
                            {job?.company?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-800">{job?.company?.name}</h2>
                        <div className="flex items-center gap-1 text-gray-400">
                            <MapPin size={10} />
                            <span className="text-[11px]">{job?.location || 'India'}</span>
                        </div>
                    </div>
                </div>

                {/* Job Title */}
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-[#6A38C2] transition-colors">
                    {job?.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">{job?.description}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: '#6A38C215', color: '#6A38C2' }}>
                        {job?.position} Pos.
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: `${accentColor}15`, color: accentColor }}>
                        {job?.jobType}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: '#f59e0b15', color: '#d97706' }}>
                        ₹{job?.salary?.toLocaleString()}/mo
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        className="flex-1 rounded-xl text-xs font-semibold text-white py-2 btn-glow"
                        style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
                        View Details
                        <ArrowRight size={13} className="ml-1" />
                    </Button>
                    <button
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200
                            text-gray-600 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-all">
                        <Bookmark size={13} />
                        Save
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default Job