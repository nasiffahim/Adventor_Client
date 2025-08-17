import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaSuitcaseRolling, FaUserCog, FaUserPlus, FaClipboardList, FaUser, FaBookOpen, FaRegCalendarCheck } from 'react-icons/fa';
import useUserRole from '../../hooks/useUserRole';
import { MdLibraryBooks, MdOutlineAutoStories, MdPostAdd, MdTravelExplore } from 'react-icons/md';

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-gradient-to-br from-base-100 to-base-200">

                {/* Enhanced Navbar */}
                <div className="navbar bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-primary-focus transition-colors duration-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-xl font-bold">Dashboard</div>
                </div>

                {/* Page content with enhanced background */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full w-80 bg-gradient-to-b from-slate-100  to-slate-50 shadow-2xl border-r border-slate-500">
                    
                    {/* Logo Section */}
                    <div className="p-6 bg-gradient-to-r from-primary to-secondary">
                        <Link to="/" className="block text-center">
                            <span className="text-3xl font-extrabold font-anton bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 bg-clip-text text-transparent h-full">
                                Adventor.
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <ul className="menu p-4 space-y-2">
                        
                        {/* User Section */}
                        <div className="mb-4">
                            <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wider py-4 px-4">
                                Personal
                            </div>
                            <li>
                                <NavLink 
                                    to="/dashboard/my-profile"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-primary text-primary-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <FaUser className="text-lg" />
                                    <span className="font-medium">Profile</span>
                                </NavLink>
                            </li>



                            
                        </div>

                        
                        {/* Tourist Section */}

                        {!roleLoading && role === 'tourist' && 
                        <>
                        <li>
                                <NavLink 
                                    to="/dashboard/my-bookings"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-primary text-primary-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <FaRegCalendarCheck className="text-lg" />
                                    <span className="font-medium">My Bookings</span>
                                </NavLink>
                            </li>

                            <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wider py-4 px-4">
                                My Content
                            </div>

                            <li>
                                <NavLink 
                                    to="/dashboard/add-stories"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-secondary text-secondary-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <MdPostAdd className="text-lg" />
                                    <span className="font-medium">Add Stories</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/my-stories"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-secondary text-secondary-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <MdOutlineAutoStories className="text-lg" />
                                    <span className="font-medium">Manage Stories</span>
                                </NavLink>
                            </li>
                            
                            <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wider py-4 px-4">
                                Activity
                            </div>
                            <li>
                                <NavLink 
                                    to="/dashboard/become-tour-guide"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-success text-success-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <FaUserPlus className="text-lg" />
                                    <span className="font-medium">Join as Tour Guide</span>
                                </NavLink>
                            </li>
                        </>
                        }


                        {/* Tour Guide Section */}
                        {!roleLoading && role === 'tour-guide' &&
                        <>
                        <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wider py-4 px-4">
                                My Workflow
                            </div>
                        <li>
                                <NavLink 
                                    to="/dashboard/my-assigned-tour"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-accent text-accent-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <MdTravelExplore className="text-lg" />
                                    <span className="font-medium">My Assigned Tour</span>
                                </NavLink>
                            </li>
                            <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wider py-4 px-4">
                                My Content
                            </div>
                        <li>
                                <NavLink 
                                    to="/dashboard/add-stories"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-secondary text-secondary-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <MdPostAdd className="text-lg" />
                                    <span className="font-medium">Add Stories</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/my-stories"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-secondary text-secondary-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <MdOutlineAutoStories className="text-lg" />
                                    <span className="font-medium">Manage Stories</span>
                                </NavLink>
                            </li>

                        </>}


                        {/* Admin Section */}
                        {!roleLoading && role === 'admin' && 
                        <>
                        <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 px-4">
                                Administration
                            </div>
                        <li>
                                <NavLink 
                                    to="/dashboard/add-package"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-warning text-warning-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <FaSuitcaseRolling className="text-lg" />
                                    <span className="font-medium">Add Package</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/user-management"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-error text-error-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <FaUserCog className="text-lg" />
                                    <span className="font-medium">Manage Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/manage-candidates"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                                            isActive 
                                                ? 'bg-info text-info-content shadow-lg' 
                                                : 'hover:bg-base-300 hover:shadow-md'
                                        }`
                                    }
                                >
                                    <FaClipboardList className="text-lg" />
                                    <span className="font-medium">Manage Candidates</span>
                                </NavLink>
                            </li>
                        
                        
                        </>}
                        <div>
                            
                            
                            
                        </div>
                        {/* } */}
                    </ul>

                    {/* Footer Section */}
                    <div className="mt-auto p-4">
                        <div className="bg-base-300 rounded-xl p-4 text-center">
                            <div className="text-sm text-base-content/70">
                                Welcome to your dashboard
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;