import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Loader2, Briefcase, FileText, ListChecks, DollarSign,
    MapPin, Clock, Award, Users, Building2, ArrowLeft, Send
} from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: '', description: '', requirements: '',
        salary: '', location: '', jobType: '',
        experience: '', position: 0, companyId: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const selectChangeHandler = (value) => {
        const company = companies.find(c => c.name.toLowerCase() === value)
        setInput({ ...input, companyId: company._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to post job')
        } finally {
            setLoading(false)
        }
    }

    const textFields = [
        { name: 'title',        label: 'Job Title',       Icon: Briefcase,   placeholder: 'e.g. Senior Cook',          type: 'text',   col: 1 },
        { name: 'description',  label: 'Description',     Icon: FileText,    placeholder: 'Describe the role...',       type: 'text',   col: 1 },
        { name: 'requirements', label: 'Requirements',    Icon: ListChecks,  placeholder: 'Skills, comma separated',    type: 'text',   col: 1 },
        { name: 'salary',       label: 'Salary (₹/mo)',   Icon: DollarSign,  placeholder: 'e.g. 25000',                 type: 'number', col: 2 },
        { name: 'location',     label: 'Location',        Icon: MapPin,      placeholder: 'e.g. Pune, Maharashtra',     type: 'text',   col: 2 },
        { name: 'jobType',      label: 'Job Type',        Icon: Clock,       placeholder: 'e.g. Full Time',             type: 'text',   col: 2 },
        { name: 'position',     label: 'No. of Positions', Icon: Users,      placeholder: 'e.g. 2',                    type: 'number', col: 2 },
    ]

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f5ff 0%, #fff 40%)' }}>
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

                {/* Back */}
                <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/admin/jobs')}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6A38C2] transition-colors mb-8 group">
                    <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </motion.button>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
                    style={{ boxShadow: '0 8px 40px rgba(106,56,194,0.10)' }}>

                    {/* Header Banner */}
                    <div className="p-8 pb-6" style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #6A38C2 100%)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <Send size={22} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Post a New Job</h1>
                                <p className="text-white/60 text-sm mt-0.5">Fill in the details to publish your listing</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={submitHandler} className="p-8">

                        {/* No company warning */}
                        {companies.length === 0 && (
                            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl border"
                                style={{ background: '#FEF2F2', borderColor: '#FECACA' }}>
                                <Building2 size={16} className="text-red-500 flex-shrink-0" />
                                <p className="text-sm text-red-600 font-medium">
                                    Please <button type="button" onClick={() => navigate('/admin/companies/create')}
                                        className="underline font-bold">register a company</button> first before posting a job.
                                </p>
                            </div>
                        )}

                        {/* Section: Basic Info */}
                        <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#6A38C2] mb-4">
                                Basic Information
                            </p>
                            <div className="space-y-4">
                                {textFields.filter(f => f.col === 1).map(({ name, label, Icon, placeholder, type }) => (
                                    <div key={name}>
                                        <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{label}</Label>
                                        <div className="relative">
                                            <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type={type} name={name} value={input[name]}
                                                onChange={changeEventHandler} placeholder={placeholder}
                                                className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px mb-6" style={{ background: 'linear-gradient(90deg, #6A38C2, transparent)' }} />

                        {/* Section: Job Details */}
                        <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#6A38C2] mb-4">
                                Job Details
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {textFields.filter(f => f.col === 2).map(({ name, label, Icon, placeholder, type }) => (
                                    <div key={name}>
                                        <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{label}</Label>
                                        <div className="relative">
                                            <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type={type} name={name} value={input[name]}
                                                onChange={changeEventHandler} placeholder={placeholder}
                                                className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Experience Select */}
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Experience Level</Label>
                                    <Select value={input.experience.toString()} onValueChange={(v) => setInput({ ...input, experience: v })}>
                                        <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20">
                                            <Award size={14} className="text-gray-400 mr-2" />
                                            <SelectValue placeholder="Select experience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="0">Entry Level (0 yrs)</SelectItem>
                                                <SelectItem value="1">1–2 years</SelectItem>
                                                <SelectItem value="3">Mid-Level (3+ yrs)</SelectItem>
                                                <SelectItem value="5">Senior (5+ yrs)</SelectItem>
                                                <SelectItem value="10">Lead (10+ yrs)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Company Select */}
                                {companies.length > 0 && (
                                    <div>
                                        <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Company</Label>
                                        <Select onValueChange={selectChangeHandler}>
                                            <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20">
                                                <Building2 size={14} className="text-gray-400 mr-2" />
                                                <SelectValue placeholder="Select company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {companies.map(c => (
                                                        <SelectItem key={c._id} value={c.name.toLowerCase()}>{c.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <Button type="submit" disabled={loading || companies.length === 0}
                            className="w-full h-12 rounded-xl font-bold text-white btn-glow"
                            style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                            {loading
                                ? <><Loader2 size={18} className="mr-2 animate-spin" /> Publishing...</>
                                : <><Send size={16} className="mr-2" /> Post Job</>
                            }
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default PostJob