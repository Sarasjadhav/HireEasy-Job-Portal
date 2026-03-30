import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar'
import {
    MapPin, Clock, Briefcase, DollarSign, Users, Calendar,
    CheckCircle2, Star, ArrowLeft, Building2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(
        application => application.applicant === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Application failed');
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(
                        application => application.applicant === user?._id
                    ));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const details = [
        { Icon: Building2, label: 'Role', value: singleJob?.title },
        { Icon: MapPin,     label: 'Location', value: singleJob?.location || 'India' },
        {
            Icon: Briefcase,
            label: 'Experience',
            value: singleJob?.experienceLevel === 0
                ? 'Entry Level'
                : `${singleJob?.experienceLevel} yrs`
        },
        {
            Icon: DollarSign,
            label: 'Salary',
            value: singleJob?.salary ? `₹${singleJob.salary.toLocaleString()} / month` : 'Not disclosed'
        },
        { Icon: Users,    label: 'Total Applicants', value: singleJob?.applications?.length },
        { Icon: Calendar, label: 'Posted On', value: singleJob?.createdAt?.split('T')[0] },
    ]

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f5ff 0%, #fff 40%)' }}>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6A38C2] transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </motion.button>

                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* ── Left: Job Details ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-6 border border-gray-100"
                            style={{ boxShadow: '0 4px 24px rgba(106,56,194,0.08)' }}>

                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-4">
                                    {/* Company Logo */}
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                                        style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                        {singleJob?.company?.logo
                                            ? <img src={singleJob.company.logo} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                                            : singleJob?.company?.name?.charAt(0)?.toUpperCase()
                                        }
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-xl text-gray-900">{singleJob?.title}</h1>
                                        <p className="text-sm text-gray-500 mt-0.5">{singleJob?.company?.name}</p>
                                        <div className="flex items-center gap-1 mt-1 text-gray-400">
                                            <MapPin size={12} />
                                            <span className="text-xs">{singleJob?.location || 'India'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                                        style={{ background: 'rgba(106,56,194,0.1)', color: '#6A38C2' }}>
                                        {singleJob?.position} Positions
                                    </span>
                                    <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                                        style={{ background: 'rgba(248,48,2,0.1)', color: '#F83002' }}>
                                        {singleJob?.jobType}
                                    </span>
                                    <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                                        style={{ background: 'rgba(114,9,183,0.1)', color: '#7209b7' }}>
                                        ₹{singleJob?.salary?.toLocaleString()}/mo
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 border border-gray-100"
                            style={{ boxShadow: '0 4px 24px rgba(106,56,194,0.08)' }}>
                            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <Star size={18} className="text-[#6A38C2] fill-[#6A38C2]/20" />
                                Job Description
                            </h2>
                            <div className="h-px mb-5"
                                style={{ background: 'linear-gradient(90deg, #6A38C2, transparent)' }} />
                            <p className="text-gray-600 leading-relaxed">{singleJob?.description}</p>

                            {/* Requirements */}
                            {singleJob?.requirements && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-800 mb-3">Requirements</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(singleJob.requirements)
                                            ? singleJob.requirements
                                            : singleJob.requirements.split(',')
                                        ).map((req, i) => (
                                            <span key={i} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl"
                                                style={{ background: 'rgba(106,56,194,0.06)', color: '#6A38C2' }}>
                                                <CheckCircle2 size={13} />
                                                {req.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Details Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-6 border border-gray-100"
                            style={{ boxShadow: '0 4px 24px rgba(106,56,194,0.08)' }}>
                            <h2 className="font-bold text-lg text-gray-900 mb-5">Job Overview</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {details.map(({ Icon, label, value }) => (
                                    <div key={label} className="flex items-center gap-3 p-3 rounded-xl"
                                        style={{ background: 'rgba(106,56,194,0.04)' }}>
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(106,56,194,0.12)' }}>
                                            <Icon size={16} className="text-[#6A38C2]" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                                            <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: Apply Card (Sticky) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="lg:sticky lg:top-24">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100"
                            style={{ boxShadow: '0 8px 40px rgba(106,56,194,0.12)' }}>

                            {/* Gradient Banner */}
                            <div className="rounded-2xl p-5 mb-5 text-center"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">
                                    {singleJob?.applications?.length} people applied
                                </p>
                                <p className="text-white font-bold text-xl">
                                    ₹{singleJob?.salary?.toLocaleString()}
                                    <span className="text-sm font-normal">/month</span>
                                </p>
                                <p className="text-white/70 text-xs mt-1">
                                    {singleJob?.experienceLevel === 0 ? 'Entry Level' : `${singleJob?.experienceLevel} yrs experience`}
                                </p>
                            </div>

                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className="w-full rounded-xl py-6 font-bold text-base"
                                style={isApplied
                                    ? { background: '#d1d5db', color: '#6b7280', cursor: 'not-allowed' }
                                    : { background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)', color: '#fff', boxShadow: '0 4px 15px rgba(106,56,194,0.4)' }
                                }>
                                {isApplied
                                    ? <><CheckCircle2 size={18} className="mr-2" /> Already Applied</>
                                    : '🚀 Apply Now'
                                }
                            </Button>

                            {!isApplied && (
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    Your profile will be shared with the employer
                                </p>
                            )}

                            {/* Quick Facts */}
                            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                                {[
                                    { label: 'Job Type', value: singleJob?.jobType },
                                    { label: 'Positions', value: `${singleJob?.position} open` },
                                    { label: 'Posted', value: singleJob?.createdAt?.split('T')[0] },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">{label}</span>
                                        <span className="font-semibold text-gray-700">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription