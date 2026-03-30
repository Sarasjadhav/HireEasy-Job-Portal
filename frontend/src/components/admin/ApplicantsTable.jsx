import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { motion } from 'framer-motion'
import { User, Mail, Phone, FileText, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'

const shortlistingStatus = ['Accepted', 'Rejected']

const statusStyle = {
    Accepted: { bg: '#10b98115', color: '#10b981', Icon: CheckCircle2 },
    Rejected: { bg: '#ef444415', color: '#ef4444', Icon: XCircle },
}

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
            if (res.data.success) toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status')
        }
    }

    const applications = applicants?.applications || []

    if (applications.length === 0) {
        return (
            <div className="text-center py-20 px-6">
                <div className="text-5xl mb-4">👥</div>
                <p className="text-lg font-semibold text-gray-600">No applicants yet</p>
                <p className="text-sm text-gray-400 mt-1">Applicants will appear here after they apply</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-gray-100 bg-gray-50/60">
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 pl-6">Applicant</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Contact</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Resume</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Applied On</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 text-right pr-6">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((item, i) => (
                        <motion.tr
                            key={item._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-gray-50 hover:bg-[#6A38C2]/3 transition-colors">

                            {/* Applicant */}
                            <TableCell className="py-4 pl-6">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 rounded-xl">
                                        <AvatarFallback className="rounded-xl text-white text-sm font-bold"
                                            style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                            {item?.applicant?.fullname?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{item?.applicant?.fullname}</p>
                                        <div className="flex items-center gap-1 text-gray-400 mt-0.5">
                                            <Mail size={11} />
                                            <span className="text-[11px]">{item?.applicant?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Contact */}
                            <TableCell className="py-4">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <Phone size={13} className="text-gray-400" />
                                    {item?.applicant?.phoneNumber || 'N/A'}
                                </div>
                            </TableCell>

                            {/* Resume */}
                            <TableCell className="py-4">
                                {item.applicant?.profile?.resume ? (
                                    <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                                        style={{ background: 'rgba(106,56,194,0.08)', color: '#6A38C2' }}>
                                        <FileText size={12} />
                                        {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                                    </a>
                                ) : (
                                    <span className="text-xs text-gray-400">No resume</span>
                                )}
                            </TableCell>

                            {/* Date */}
                            <TableCell className="py-4">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <Calendar size={13} className="text-gray-400" />
                                    {item?.applicant?.createdAt?.split('T')[0]}
                                </div>
                            </TableCell>

                            {/* Action */}
                            <TableCell className="py-4 pr-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {shortlistingStatus.map((status) => {
                                        const style = statusStyle[status]
                                        return (
                                            <button key={status}
                                                onClick={() => statusHandler(status, item?._id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:opacity-80"
                                                style={{ background: style.bg, color: style.color, borderColor: `${style.color}30` }}>
                                                <style.Icon size={12} />
                                                {status}
                                            </button>
                                        )
                                    })}
                                </div>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
            <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/40">
                <p className="text-xs text-gray-400">{applications.length} applicant{applications.length !== 1 ? 's' : ''} total</p>
            </div>
        </div>
    )
}

export default ApplicantsTable