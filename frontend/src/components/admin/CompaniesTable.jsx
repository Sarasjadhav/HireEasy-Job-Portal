import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Edit2, Building2, Calendar, MoreVertical } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = companies.filter(company => {
            if (!searchCompanyByText) return true
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filtered)
    }, [companies, searchCompanyByText])

    if (filterCompany.length === 0) {
        return (
            <div className="text-center py-20 px-6">
                <div className="text-5xl mb-4">🏢</div>
                <p className="text-lg font-semibold text-gray-600">No companies found</p>
                <p className="text-sm text-gray-400 mt-1">Register your first company to get started</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-gray-100 bg-gray-50/60">
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 pl-6">Company</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">Registered On</TableHead>
                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 text-right pr-6">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((company, i) => (
                        <motion.tr
                            key={company._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-gray-50 hover:bg-[#6A38C2]/3 transition-colors group">

                            {/* Company Cell */}
                            <TableCell className="py-4 pl-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #6A38C215, #9b6dff15)' }}>
                                        {company.logo
                                            ? <img src={company.logo} alt={company.name} className="w-10 h-10 object-cover" />
                                            : <Building2 size={18} className="text-[#6A38C2]" />
                                        }
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{company.name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{company.description || 'No description'}</p>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Date Cell */}
                            <TableCell className="py-4">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <Calendar size={13} className="text-gray-400" />
                                    {company.createdAt.split('T')[0]}
                                </div>
                            </TableCell>

                            {/* Action Cell */}
                            <TableCell className="py-4 pr-6 text-right">
                                <button
                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200
                                        text-gray-600 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-all">
                                    <Edit2 size={12} />
                                    Edit
                                </button>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>

            {/* Footer count */}
            <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/40">
                <p className="text-xs text-gray-400">{filterCompany.length} company{filterCompany.length !== 1 ? 'ies' : 'y'} found</p>
            </div>
        </div>
    )
}

export default CompaniesTable