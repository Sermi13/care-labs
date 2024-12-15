// src/components/DashboardCard.tsx
import React from 'react'

interface DashboardCardProps {
    icon: React.ReactNode // O ícone que será exibido no card
    title: string // Título do card
    value: string // Valor a ser exibido no card
    bgColor: string // Cor de fundo do card
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, bgColor }) => {
    return (
        <div className="col-12 mb-4">
            <div className={`card shadow-sm p-4 ${bgColor} text-white text-center rounded-lg tw-flex tw-flex-row tw-justify-between tw-items-center`}>
                <div className="mb-3">{icon}</div>
                <div>
                    <h5 className="mt-3">{title}</h5>
                    <p className="h5">{value}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard
