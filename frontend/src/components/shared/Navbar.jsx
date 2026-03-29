import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Briefcase } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import clsx from 'clsx'

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

    const navLinkClass = (path) =>
        clsx(
            'transition-all hover:text-[#6A38C2]',
            location.pathname === path
                ? 'text-[#6A38C2] font-semibold'
                : 'text-gray-600'
        )

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b">
            <nav className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1">
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        Hire<span className="text-[#F83002]">Easy</span>
                    </h1>
                </Link>

                {/* Nav Links */}
                <ul className="hidden md:flex items-center gap-8 text-sm">
                    {user?.role === 'recruiter' ? (
                        <>
                            <li>
                                <Link
                                    to="/admin/companies"
                                    className={navLinkClass(
                                        '/admin/companies'
                                    )}
                                >
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/jobs"
                                    className={navLinkClass('/admin/jobs')}
                                >
                                    Jobs
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/"
                                    className={navLinkClass('/')}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/jobs"
                                    className={navLinkClass('/jobs')}
                                >
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/browse"
                                    className={navLinkClass('/browse')}
                                >
                                    Browse
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Auth Section */}
                {!user ? (
                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] shadow-md">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-[#6A38C2] transition">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto}
                                />
                                <AvatarFallback>
                                    {user?.fullname?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="w-72 p-4 rounded-xl shadow-lg">
                            {/* Profile Info */}
                            <div className="flex gap-3 items-center">
                                <Avatar>
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                    />
                                </Avatar>
                                <div>
                                    <p className="font-semibold">
                                        {user?.fullname}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                        {user?.profile?.bio}
                                    </p>
                                </div>
                            </div>

                            <div className="my-3 border-t" />

                            {/* Actions */}
                            <div className="flex flex-col gap-2 text-sm">
                                {user?.role === 'student' && (
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 transition"
                                    >
                                        <User2 size={16} />
                                        View Profile
                                    </Link>
                                )}

                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-red-50 text-red-600 transition"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </nav>
        </header>
    )
}

export default Navbar
