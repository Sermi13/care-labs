import React from 'react'
import { FaCalendarAlt, FaUser, FaCog, FaBars, FaChartLine, FaSearch } from 'react-icons/fa'
import { ROUTES } from '~/resources/routes-constants'
import '~/styles/sidebar.css' // Adicione o arquivo CSS aqui

interface SidebarProps {
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'} bg-dark text-white tw-h-screen p-4 tw-hidden sm:tw-block`}>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className={`text-xl font-weight-bold ${isSidebarOpen ? 'sidebar-item-visible' : 'sidebar-item-hidden'}`}>Menu</h1>
                <button onClick={toggleSidebar} className="text-white">
                    <FaBars />
                </button>
            </div>
            <div className="mt-4 sidebar-content">
                <ul>
                    <li className="mb-4">
                        <a href={ROUTES.HOMEPAGE_ROUTE} className="d-flex align-items-center">
                            <FaChartLine className="text-2xl" />
                            <span className={`tw-ml-2 ${isSidebarOpen ? 'sidebar-item-visible' : 'sidebar-item-hidden'}`}>Dashboard</span>
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href={ROUTES.APPOINTMENTS_CALENDAR_ROUTE} className="d-flex align-items-center">
                            <FaCalendarAlt className="text-2xl" />
                            <span className={`tw-ml-2 ${isSidebarOpen ? 'sidebar-item-visible' : 'sidebar-item-hidden'}`}>Agenda</span>
                        </a>
                    </li>

                    <li className="mb-4">
                        <a href={ROUTES.APPOINTMENTS_LIST_ROUTE} className="d-flex align-items-center">
                            <FaSearch className="text-2xl" />
                            <span className={`tw-ml-2 ${isSidebarOpen ? 'sidebar-item-visible' : 'sidebar-item-hidden'}`}>Consultas</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
