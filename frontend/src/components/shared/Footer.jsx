import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Github, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 50%, #24243e 100%)' }}>

            {/* Top gradient border */}
            <div className="h-px w-full"
                style={{ background: 'linear-gradient(90deg, transparent, #6A38C2 30%, #9b6dff 70%, transparent)' }} />

            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'radial-gradient(circle, #6A38C2, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 translate-x-1/2 translate-y-1/2"
                style={{ background: 'radial-gradient(circle, #9b6dff, transparent)' }} />

            <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #6A38C2, #9b6dff)' }}>
                                <Briefcase size={18} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-extrabold">
                                <span className="text-white">Hire</span>
                                <span style={{ color: '#F83002' }}>Easy</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                            India's fastest-growing job portal connecting talented professionals
                            with top companies. Your dream job is just one click away.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Mail size={14} className="text-[#9b6dff]" />
                                <span>support@hireeasy.in</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone size={14} className="text-[#9b6dff]" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin size={14} className="text-[#9b6dff]" />
                                <span>Pune, Maharashtra, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                            <span className="w-4 h-0.5 rounded" style={{ background: '#6A38C2' }} />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'Browse Jobs', to: '/jobs' },
                                { label: 'Explore Categories', to: '/browse' },
                                { label: 'My Profile', to: '/profile' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to}
                                        className="text-sm text-gray-400 hover:text-[#9b6dff] transition-colors flex items-center gap-1 group">
                                        <ArrowRight size={12}
                                            className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Recruiters */}
                    <div>
                        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                            <span className="w-4 h-0.5 rounded" style={{ background: '#F83002' }} />
                            For Recruiters
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Post a Job', to: '/admin/jobs/create' },
                                { label: 'Manage Companies', to: '/admin/companies' },
                                { label: 'View Applicants', to: '/admin/jobs' },
                                { label: 'Get Started', to: '/signup' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to}
                                        className="text-sm text-gray-400 hover:text-[#F83002] transition-colors flex items-center gap-1 group">
                                        <ArrowRight size={12}
                                            className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {currentYear} <span className="text-gray-400 font-medium">HireEasy</span>. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[
                            { Icon: Twitter, href: 'https://twitter.com', color: '#1DA1F2', label: 'Twitter' },
                            { Icon: Linkedin, href: 'https://linkedin.com', color: '#0A66C2', label: 'LinkedIn' },
                            { Icon: Facebook, href: 'https://facebook.com', color: '#1877F2', label: 'Facebook' },
                            { Icon: Github, href: 'https://github.com', color: '#ffffff', label: 'GitHub' },
                        ].map(({ Icon, href, color, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                                    hover:border-white/30 hover:scale-110 transition-all duration-200 group">
                                <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;