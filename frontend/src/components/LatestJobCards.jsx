import React from 'react'
import { Badge } from './ui/badge'
import { MapPin, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const jobTypeColor = {
    'Full Time':  { bg: '#6A38C2', text: '#fff' },
    'Part Time':  { bg: '#0ea5e9', text: '#fff' },
    'Contract':   { bg: '#f59e0b', text: '#fff' },
    'Internship': { bg: '#10b981', text: '#fff' },
}

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()

    const daysAgo = (mongodbTime) => {
        const diff = new Date() - new Date(mongodbTime)
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        return days === 0 ? 'Today' : `${days}d ago`
    }

    const typeStyle = jobTypeColor[job?.jobType] || { bg: '#6A38C2', text: '#fff' }

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigate(`/description/${job._id}`)}
            className="relative bg-white rounded-2xl border border-gray-100 cursor-pointer overflow-hidden group"
            style={{
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(106,56,194,0.14)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'}>

            {/* Top accent strip */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${typeStyle.bg}, ${typeStyle.bg}88)` }} />

            <div className="p-5">
                {/* Header: Company + Posted */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                        {/* Company Logo / Initials */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${typeStyle.bg}, ${typeStyle.bg}bb)` }}>
                            {job?.company?.logo
                                ? <img src={job.company.logo} alt={job.company.name}
                                    className="w-10 h-10 rounded-xl object-cover" />
                                : job?.company?.name?.charAt(0)?.toUpperCase() || '?'
                            }
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-sm leading-tight">{job?.company?.name}</p>
                            <div className="flex items-center gap-1 mt-0.5 text-gray-400">
                                <MapPin size={11} />
                                <span className="text-[11px]">India</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={11} />
                        <span className="text-[11px] font-medium whitespace-nowrap">{daysAgo(job?.createdAt)}</span>
                    </div>
                </div>

                {/* Job Title */}
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5
                    group-hover:text-[#6A38C2] transition-colors">
                    {job?.title}
                </h3>

                {/* Description preview */}
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {job?.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: '#6A38C215', color: '#6A38C2' }}>
                        {job?.position} Position{job?.position > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: `${typeStyle.bg}15`, color: typeStyle.bg }}>
                        {job?.jobType}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: '#f59e0b15', color: '#d97706' }}>
                        ₹{job?.salary?.toLocaleString()}/mo
                    </span>
                </div>

                {/* View details link */}
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-[#6A38C2] font-semibold group-hover:underline">
                        View Details →
                    </span>
                    <span className="text-[11px] text-gray-400">
                        {job?.experienceLevel === 0 ? 'Entry Level' : `${job?.experienceLevel} yrs exp`}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export default LatestJobCards