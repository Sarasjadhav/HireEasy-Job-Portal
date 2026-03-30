import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, MapPin, Briefcase, Star } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const badgeColors = [
    { bg: '#6A38C215', color: '#6A38C2' },
    { bg: '#F8300215', color: '#F83002' },
    { bg: '#7209b715', color: '#7209b7' },
    { bg: '#0ea5e915', color: '#0ea5e9' },
    { bg: '#10b98115', color: '#10b981' },
    { bg: '#f59e0b15', color: '#d97706' },
]

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f5ff 0%, #fff 30%)' }}>
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

                {/* ── Profile Hero Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl overflow-hidden border border-gray-100 bg-white mb-6"
                    style={{ boxShadow: '0 4px 32px rgba(106,56,194,0.10)' }}>

                    {/* Gradient Banner */}
                    <div className="h-32 relative"
                        style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #6A38C2 100%)' }}>
                        {/* Edit Button */}
                        <button onClick={() => setOpen(true)}
                            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-medium transition-all">
                            <Pen size={12} />
                            Edit Profile
                        </button>

                        {/* Decorative orb - pointer-events-none so it doesn't block the Edit button */}
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
                            style={{ background: '#9b6dff' }} />
                    </div>

                    <div className="px-6 pb-6">
                        {/* Avatar only overlaps the banner — name/role are BELOW it */}
                        <div className="-mt-10 mb-3">
                            <div className="relative inline-block">
                                <Avatar className="h-20 w-20 border-4 border-white rounded-2xl"
                                    style={{ boxShadow: '0 4px 16px rgba(106,56,194,0.2)' }}>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" className="object-cover" />
                                    <AvatarFallback className="rounded-2xl text-white text-2xl font-bold"
                                        style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                        {user?.fullname?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                {/* Online indicator */}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
                            </div>
                        </div>
                        {/* Name & role — clearly below the banner, no overlap */}
                        <div className="mb-4">
                            <h1 className="text-xl font-bold text-gray-900">{user?.fullname}</h1>
                            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full capitalize mt-1"
                                style={{ background: 'rgba(106,56,194,0.1)', color: '#6A38C2' }}>
                                {user?.role}
                            </span>
                        </div>

                        {/* Bio */}
                        {user?.profile?.bio && (
                            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xl">{user.profile.bio}</p>
                        )}

                        {/* Contact Info */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-5">
                            <div className="flex items-center gap-2.5 p-3 rounded-xl"
                                style={{ background: 'rgba(106,56,194,0.04)' }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: 'rgba(106,56,194,0.12)' }}>
                                    <Mail size={14} className="text-[#6A38C2]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Email</p>
                                    <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 p-3 rounded-xl"
                                style={{ background: 'rgba(248,48,2,0.04)' }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: 'rgba(248,48,2,0.12)' }}>
                                    <Contact size={14} className="text-[#F83002]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Phone</p>
                                    <p className="text-sm font-semibold text-gray-800">{user?.phoneNumber || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Star size={14} className="text-[#6A38C2]" />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Skills</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.skills?.length > 0
                                    ? user.profile.skills.map((skill, i) => (
                                        <span key={i}
                                            className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                                            style={badgeColors[i % badgeColors.length]}>
                                            {skill}
                                        </span>
                                    ))
                                    : <span className="text-sm text-gray-400">No skills added yet. Edit profile to add.</span>
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Applied Jobs Section ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-3xl p-6 border border-gray-100"
                    style={{ boxShadow: '0 4px 24px rgba(106,56,194,0.08)' }}>
                    <div className="flex items-center gap-2 mb-6">
                        <Briefcase size={18} className="text-[#6A38C2]" />
                        <h2 className="text-lg font-bold text-gray-900">Applied Jobs</h2>
                    </div>
                    <div className="h-px mb-5"
                        style={{ background: 'linear-gradient(90deg, #6A38C2, transparent)' }} />
                    <AppliedJobTable />
                </motion.div>

            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile