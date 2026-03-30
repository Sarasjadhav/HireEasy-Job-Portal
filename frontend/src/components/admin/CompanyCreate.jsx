import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { motion } from 'framer-motion'
import { Building2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                navigate(`/admin/companies/${res.data.company._id}`)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to register company')
        }
    }

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f5ff 0%, #fff 40%)' }}>
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

                {/* Back */}
                <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/companies')}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6A38C2] transition-colors mb-8 group">
                    <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Companies
                </motion.button>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
                    style={{ boxShadow: '0 8px 40px rgba(106,56,194,0.10)' }}>

                    {/* Header Banner */}
                    <div className="p-8 pb-6" style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #6A38C2 100%)' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <Building2 size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Register Company</h1>
                                <p className="text-white/60 text-xs">Set up your company profile on HireEasy</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-xl bg-white/10 border border-white/20 w-fit">
                            <Sparkles size={13} className="text-[#9b6dff]" />
                            <span className="text-white/70 text-xs">You can update your company details after creation</span>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-8">
                        <div className="mb-6">
                            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Company Name <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                type="text"
                                placeholder="e.g. Thomas Cook, VitalBloom Care..."
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 transition-all"
                            />
                            <p className="text-xs text-gray-400 mt-2">
                                Choose a clear, professional name — this is what candidates will see.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <Button type="button" variant="outline"
                                onClick={() => navigate('/admin/companies')}
                                className="rounded-xl h-11 border-gray-200 text-gray-600 hover:border-gray-300 font-medium">
                                Cancel
                            </Button>
                            <Button
                                onClick={registerNewCompany}
                                disabled={!companyName.trim()}
                                className="flex-1 h-11 rounded-xl font-semibold text-white flex items-center justify-center gap-2 btn-glow"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                                Continue
                                <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate