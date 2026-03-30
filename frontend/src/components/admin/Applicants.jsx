import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { motion } from 'framer-motion'
import { Users, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants()
    }, [])

    const count = applicants?.applications?.length || 0

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f5ff 0%, #fff 30%)' }}>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

                {/* Back */}
                <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/jobs')}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6A38C2] transition-colors mb-6 group">
                    <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </motion.button>

                {/* Page Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #7209b7, #9b6dff)' }}>
                            <Users size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900">Applicants</h1>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-[#6A38C2]">{count}</span> candidate{count !== 1 ? 's' : ''} applied for this role
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Table Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
                    style={{ boxShadow: '0 4px 24px rgba(106,56,194,0.08)' }}>
                    <ApplicantsTable />
                </motion.div>
            </div>
        </div>
    )
}

export default Applicants