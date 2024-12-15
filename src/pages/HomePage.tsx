import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout' // Layout padrão
import Calendar from '../components/Calendar' // Calendário
import ReminderList from '../components/ReminderList' // Lista de lembretes
import AppointmentList from '../components/AppointmentList' // Lista de agendamentos
import DashboardCards from '../components/DashboardCards' // Novo componente de cards do dashboard
import ConsultationChart from '../components/ConsultationChart' // Componente do gráfico
import { Appointment } from '~/types/appointment'

const appointments: Appointment[] = [
    { id: 1, patientName: 'João Silva', doctorName: 'Dr. Mendes', time: '10:00 AM', status: 'Realizado' },
    { id: 2, patientName: 'Maria Oliveira', doctorName: 'Dra. Lopes', time: '11:30 AM', status: 'Realizado' },
    { id: 3, patientName: 'Carlos Pereira', doctorName: 'Dr. Souza', time: '02:00 PM', status: 'Pendente' }
]

const HomePage: React.FC = () => {
    const [reminders, setReminders] = useState([
        { id: 1, title: 'Agendamento cancelado', description: 'João Silva cancelou o seu agendamento para consulta de terça-feira.', date: '2024-12-14' },
        { id: 2, title: 'Pagamento realizado', description: 'Maria Souza efetuou o pagamento do agendamento de quinta-feira.', date: '2024-12-15' }
    ])

    // Função para excluir um lembrete
    const handleDelete = (id: number) => {
        setReminders(reminders.filter((reminder) => reminder.id !== id))
    }
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <DefaultLayout isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((prev) => !prev)}>
            <div className="container-fluid">
                <div className="row gy-4">
                    {/* Dashboard Section (Left: Graph, Right: Cards) */}
                    <div className="col-12 col-xl-8">
                        <div className="card shadow-sm p-4">
                            <h3 className="h5">Dashboard</h3>

                            <div className="row gy-4">
                                {/* Left: Graph */}
                                <div className="col-12 col-lg-8">
                                    <div className="bg-light border rounded p-4">
                                        <h5>Gráfico de Consultas</h5>
                                        <ConsultationChart />
                                    </div>
                                </div>

                                {/* Right: Cards */}
                                <div className="col-12 col-lg-4">
                                    <DashboardCards />
                                </div>
                            </div>
                        </div>

                        {/* Reminder List */}
                        <div className="card shadow-sm p-4 mt-4">
                            <h4 className="h6">Lembretes</h4>
                            <ReminderList reminders={reminders} onDelete={handleDelete} />
                        </div>
                    </div>

                    {/* Right Side Section (Calendar + Appointment List) */}
                    <div className="col-12 col-xl-4">
                        <div className="card shadow-sm p-4">
                            <Calendar />
                        </div>

                        <div className="card shadow-sm p-4 mt-4">
                            <h4 className="h6">Agendamentos</h4>
                            <AppointmentList appointments={appointments} />
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default HomePage
