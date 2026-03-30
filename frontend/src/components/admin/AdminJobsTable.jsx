import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Edit2, Eye, Calendar, Building2, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const jobTypeColor = {
    'Full Time':  { bg: '#6A38C215', color: '#6A38C2' },
    'Part Time':  { bg: '#0ea5e915', color: '#0ea5e9' },
    'Contract':   { bg: '#f59e0b15', color: '#d97706' },
    'Internship': { bg: '#10b98115', color: '#10b981' },
}

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = allAdminJobs.filter(job => {
            if (!searchJobByText) return true
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
                || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filtered)
    }, [allAdminJobs, searchJobByText])

    if (filterJobs.length === 0) {
        return (
            <div className="text-center py-20 px-6">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-lg font-semibold text-gray-600">No jobs posted yet</p>
                <p className="text-sm text-gray-400 mt-1">Click "Post New Job" to create your first listing</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-gray-100 bg-gray-50/60">
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 pl-6">Company</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Job Role</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Type</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Posted</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 text-right pr-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.map((job, i) => {
                        const typeStyle = jobTypeColor[job?.jobType] || jobTypeColor['Full Time']
                        return (
                            <motion.tr
                                key={job._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-gray-50 hover:bg-[#6A38C2]/3 transition-colors">

                                {/* Company */}
                                <TableCell className="py-4 pl-6">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(106,56,194,0.12)' }}>
                                            <Building2 size={14} className="text-[#6A38C2]" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800">{job?.company?.name}</span>
                                    </div>
                                </TableCell>

                                {/* Role */}
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={13} className="text-gray-400" />
                                        <span className="text-sm text-gray-700 font-medium">{job?.title}</span>
                                    </div>
                                </TableCell>

                                {/* Type Badge */}
                                <TableCell className="py-4">
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                                        style={typeStyle}>
                                        {job?.jobType || 'Full Time'}
                                    </span>
                                </TableCell>

                                {/* Date */}
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <Calendar size={13} className="text-gray-400" />
                                        {job?.createdAt.split('T')[0]}
                                    </div>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="py-4 pr-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200
                                                text-gray-600 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-all">
                                            <Edit2 size={12} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                                                text-white transition-all"
                                            style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                            <Eye size={12} />
                                            Applicants
                                        </button>
                                    </div>
                                </TableCell>
                            </motion.tr>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/40">
                <p className="text-xs text-gray-400">{filterJobs.length} job{filterJobs.length !== 1 ? 's' : ''} listed</p>
            </div>
        </div>
    )
}

export default AdminJobsTable