import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, MapPin, FileText, Image, CheckCircle2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({ name: '', description: '', location: '', file: null })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('location', input.location)
        if (input.file) formData.append('file', input.file)
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/companies')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',
            location: singleCompany.location || '',
            file: singleCompany.file || null
        })
    }, [singleCompany])

    const fields = [
        { name: 'name',        label: 'Company Name',  Icon: Building2, placeholder: 'e.g. Thomas Cook',          type: 'text' },
        { name: 'description', label: 'Description',   Icon: FileText,  placeholder: 'Describe your company...',  type: 'text' },
        { name: 'location',    label: 'Location',      Icon: MapPin,    placeholder: 'e.g. Pune, Maharashtra',    type: 'text' },
    ]

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
                        <div className="flex items-center gap-3">
                            {singleCompany?.logo
                                ? <img src={singleCompany.logo} alt={singleCompany.name}
                                    className="w-12 h-12 rounded-xl object-cover border-2 border-white/30" />
                                : <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Building2 size={22} className="text-white" />
                                  </div>
                            }
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    {singleCompany?.name || 'Company Setup'}
                                </h1>
                                <p className="text-white/60 text-xs mt-0.5">Update your company profile</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className="p-8 space-y-5">
                        {fields.map(({ name, label, Icon, placeholder, type }) => (
                            <div key={name}>
                                <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">{label}</Label>
                                <div className="relative">
                                    <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20 transition-all"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Logo Upload */}
                        <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                                Company Logo <span className="text-gray-400 font-normal">(optional)</span>
                            </Label>
                            <div className="relative">
                                <Image size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="pl-10 h-11 rounded-xl border-gray-200 file:mr-3 file:border-0 file:bg-[#6A38C2]/10 file:text-[#6A38C2] file:text-xs file:font-semibold file:rounded-lg file:px-2 file:py-1 cursor-pointer transition-all"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                            <Button type="button" variant="outline"
                                onClick={() => navigate('/admin/companies')}
                                className="rounded-xl h-11 border-gray-200 text-gray-600 hover:border-gray-300 font-medium">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}
                                className="flex-1 h-11 rounded-xl font-semibold text-white btn-glow"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                                {loading
                                    ? <><Loader2 size={16} className="mr-2 animate-spin" /> Saving...</>
                                    : <><CheckCircle2 size={16} className="mr-2" /> Save Changes</>
                                }
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanySetup