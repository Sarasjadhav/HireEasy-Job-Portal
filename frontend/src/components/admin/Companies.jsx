import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { motion } from 'framer-motion'
import { Plus, Search, Building2 } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f5ff 0%, #fff 30%)' }}>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

                {/* Page Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                            <Building2 size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900">My Companies</h1>
                            <p className="text-sm text-gray-500">Manage all your registered companies</p>
                        </div>
                    </div>
                </motion.div>

                {/* Toolbar */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="flex items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#6A38C2] focus:ring-2 focus:ring-[#6A38C2]/20"
                            placeholder="Search by company name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => navigate('/admin/companies/create')}
                        className="h-11 px-5 rounded-xl font-semibold text-white flex items-center gap-2 btn-glow"
                        style={{ background: 'linear-gradient(135deg, #6A38C2, #5b2fb0)' }}>
                        <Plus size={18} />
                        New Company
                    </Button>
                </motion.div>

                {/* Table Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
                    style={{ boxShadow: '0 4px 24px rgba(106,56,194,0.08)' }}>
                    <CompaniesTable />
                </motion.div>
            </div>
        </div>
    )
}

export default Companies