// components/Navbar.tsx
import React, { useState } from 'react'
import logo from '../../public/carelabs-logo.png'
import { Button, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logoff } from '~/store/actions/userActions'
import { FaBars, FaTimes } from 'react-icons/fa'
import { ROUTES } from '~/resources/routes-constants'

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogOut = () => {
        dispatch(logoff())
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev)
    }

    return (
        <nav className="tw-bg-white tw-shadow-md tw-px-6 tw-py-4 tw-flex tw-items-center tw-justify-between">
            {/* Left: Logo */}
            <div className="tw-flex tw-items-center">
                <Image src={logo} className="tw-h-12" />
            </div>

            {/* Right: Desktop and Mobile Menu */}
            <div className="tw-flex tw-items-center">
                {/* Desktop Menu */}
                <div className="tw-hidden sm:tw-flex tw-items-center tw-space-x-8">
                    <Button onClick={handleLogOut} className="tw-text-lg tw-mx-2 tw-py-2">
                        Sair
                    </Button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="tw-block sm:tw-hidden">
                    <button onClick={toggleMobileMenu} className="tw-text-2xl tw-text-gray-600">
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="tw-absolute tw-top-20 tw-right-4 tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-6 tw-py-4 tw-z-50 tw-w-56">
                    <ul className="tw-flex tw-flex-col tw-items-start tw-space-y-4">
                        <li>
                            <a href={ROUTES.HOMEPAGE_ROUTE} className="tw-text-gray-600 hover:tw-text-gray-800 tw-text-lg tw-font-medium">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href={ROUTES.APPOINTMENTS_CALENDAR_ROUTE} className="tw-text-gray-600 hover:tw-text-gray-800 tw-text-lg tw-font-medium">
                                Agenda
                            </a>
                        </li>
                        <li>
                            <a href={ROUTES.APPOINTMENTS_LIST_ROUTE} className="tw-text-gray-600 hover:tw-text-gray-800 tw-text-lg tw-font-medium">
                                Consultas
                            </a>
                        </li>
                        <li>
                            <Button onClick={handleLogOut} className="tw-text-lg">
                                Sair
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar
