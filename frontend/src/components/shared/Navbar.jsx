import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, ChevronDown, Briefcase } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Logout failed')
        }
    }

    const isActive = (path) => location.pathname === path

    return (
        <header className="sticky top-0 z-50 transition-all duration-300"
            style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(106,56,194,0.1)',
                boxShadow: '0 4px 24px rgba(106,56,194,0.06)',
            }}
        >
            <nav className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">

                {/* ── Logo ── */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                        <Briefcase size={16} className="text-white" />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight">
                        Hire<span style={{ color: '#F83002' }}>Easy</span>
                    </h1>
                </Link>

                {/* ── Nav Links ── */}
                <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {user?.role === 'recruiter' ? (
                        <>
                            <NavLink to="/admin/companies" active={isActive('/admin/companies')}>Companies</NavLink>
                            <NavLink to="/admin/jobs" active={isActive('/admin/jobs')}>Jobs</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" active={isActive('/')}>Home</NavLink>
                            <NavLink to="/jobs" active={isActive('/jobs')}>Jobs</NavLink>
                            <NavLink to="/browse" active={isActive('/browse')}>Browse</NavLink>
                        </>
                    )}
                </ul>

                {/* ── Auth Section ── */}
                {!user ? (
                    <div className="flex items-center gap-2">
                        <Link to="/login">
                            <Button variant="ghost" size="sm"
                                className="text-gray-600 hover:text-[#6A38C2] hover:bg-[#6A38C2]/8 font-medium transition-all">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm" className="btn-glow text-white font-semibold px-5"
                                style={{ background: 'linear-gradient(135deg, #6A38C2 0%, #5b2fb0 100%)' }}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200
                                hover:border-[#6A38C2]/40 hover:bg-[#6A38C2]/5 transition-all duration-200 group">
                                <Avatar className="h-8 w-8 ring-2 ring-[#6A38C2]/20 group-hover:ring-[#6A38C2]/50 transition-all">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                    <AvatarFallback className="text-xs font-bold text-white"
                                        style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                        {user?.fullname?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[100px] truncate">
                                    {user?.fullname?.split(' ')[0]}
                                </span>
                                <ChevronDown size={14} className="text-gray-400 group-hover:text-[#6A38C2] transition-colors" />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-72 p-0 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden" align="end">
                            {/* Profile Header */}
                            <div className="p-4"
                                style={{ background: 'linear-gradient(135deg, #6A38C2 0%, #9b6dff 100%)' }}>
                                <div className="flex gap-3 items-center">
                                    <Avatar className="h-12 w-12 ring-2 ring-white/50">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback className="text-sm font-bold bg-white/20 text-white">
                                            {user?.fullname?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-white">{user?.fullname}</p>
                                        <p className="text-xs text-white/70 mt-0.5 line-clamp-1">{user?.profile?.bio || user?.email}</p>
                                        <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 text-white capitalize">
                                            {user?.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-2">
                                {user?.role === 'student' && (
                                    <Link to="/profile"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#6A38C2]/8 transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-[#6A38C2]/10 flex items-center justify-center
                                            group-hover:bg-[#6A38C2]/20 transition-colors">
                                            <User2 size={15} className="text-[#6A38C2]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">My Profile</p>
                                            <p className="text-xs text-gray-400">View & edit your profile</p>
                                        </div>
                                    </Link>
                                )}

                                <div className="mx-3 my-1 border-t border-gray-100" />

                                <button onClick={logoutHandler}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center
                                        group-hover:bg-red-100 transition-colors">
                                        <LogOut size={15} className="text-red-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-red-600">Logout</p>
                                        <p className="text-xs text-gray-400">Sign out of your account</p>
                                    </div>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </nav>
        </header>
    )
}

/* ── NavLink Helper ── */
const NavLink = ({ to, active, children }) => (
    <li className="relative">
        <Link to={to}
            className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 block',
                active
                    ? 'text-[#6A38C2] bg-[#6A38C2]/10'
                    : 'text-gray-600 hover:text-[#6A38C2] hover:bg-[#6A38C2]/6'
            )}>
            {children}
            {active && (
                <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: '#6A38C2' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
            )}
        </Link>
    </li>
)

export default Navbar
