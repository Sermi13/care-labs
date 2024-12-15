// layouts/DefaultLayout.tsx
import React, { ReactNode } from 'react'
import Sidebar from '../components/Sidebar' // Assuming Sidebar is in the same folder
import Navbar from '../components/Navbar' // Importando a Navbar
import { useSelector } from 'react-redux'

interface DefaultLayoutProps {
    children: ReactNode
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, isSidebarOpen, toggleSidebar }) => {
    const username = useSelector((state: any) => state.user.name)
    return (
        <div className="tw-flex tw-h-screen">
            {/* Sidebar com altura full */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="tw-flex-1 tw-flex tw-flex-col">
                {/* Navbar */}
                <Navbar />

                {/* Área de conteúdo principal com rolagem se necessário */}
                <div className="tw-flex-1 tw-overflow-auto sm:tw-p-6">{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
