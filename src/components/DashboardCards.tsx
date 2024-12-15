// src/components/DashboardCards.tsx
import React from 'react'
import { FaMoneyBillAlt, FaCalendarDay, FaCheckCircle } from 'react-icons/fa'
import DashboardCard from './DashboardCard' // Importando o novo componente de card

const DashboardCards: React.FC = () => {
    return (
        <div className="row">
            <DashboardCard icon={<FaMoneyBillAlt size={40} />} title="Faturamento do Dia" value="R$ 1.200,00" bgColor="bg-info" />
            <DashboardCard icon={<FaCalendarDay size={40} />} title="Consultas do Dia" value="5 Consultas" bgColor="bg-primary" />
            <DashboardCard icon={<FaCheckCircle size={40} />} title="Consultas Realizadas" value="3 Consultas" bgColor="bg-success" />
        </div>
    )
}

export default DashboardCards
