import React, { useState } from 'react'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import DefaultLayout from '~/layouts/DefaultLayout'

interface Appointment {
    id: number
    time: string
    patientName: string
    doctorName: string
    cpf: string
    date: string
    email: string
    phoneNumber: string
    birthDate: string
    address: string
    value: number
}

const AppointmentsListPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            id: 1,
            time: '08:00',
            patientName: 'João Silva',
            doctorName: 'Dr. Carlos Souza',
            cpf: '08574984019',
            date: '2024-12-15',
            email: 'joao@example.com',
            phoneNumber: '11987654321',
            birthDate: '1985-06-15',
            address: 'Rua A, 123',
            value: 200
        },
        {
            id: 2,
            time: '10:00',
            patientName: 'Maria Oliveira',
            doctorName: 'Dr. Fernanda Lima',
            cpf: '03433214085',
            date: '2024-12-15',
            email: 'maria@example.com',
            phoneNumber: '11987654322',
            birthDate: '1990-11-20',
            address: 'Rua B, 456',
            value: 250
        }
    ])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleSaveAppointment = (updatedData: {
        patientName: string
        email: string
        cpf: string
        phoneNumber: string
        birthDate: string
        address: string
        value: number
    }) => {
        if (!selectedAppointment) return

        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === selectedAppointment.id ? { ...appointment, ...updatedData } : appointment
        )

        setAppointments(updatedAppointments)
        setToastMessage('Agendamento editado com sucesso!')
        setIsModalOpen(false)
    }

    const handleDeleteAppointment = (id: number) => {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== id)
        setAppointments(updatedAppointments)
        setToastMessage('Agendamento cancelado com sucesso!')
    }

    return (
        <DefaultLayout isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((prev) => !prev)}>
            <div className="container-fluid p-4">
                <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Todos os Agendamentos</h4>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Nome do Paciente</th>
                            <th>Nome do Médico</th>
                            <th>CPF do Paciente</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.time}</td>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.cpf}</td>
                                <td>{new Date(appointment.date).toLocaleDateString('pt-BR')}</td>
                                <td>R${appointment.value.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedAppointment(appointment)
                                            setIsModalOpen(true)
                                        }}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteAppointment(appointment.id)} className="btn btn-danger btn-sm ml-2">
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal de Edição de Agendamento */}
                {isModalOpen && selectedAppointment && (
                    <Modal appointment={selectedAppointment} onSave={handleSaveAppointment} onClose={() => setIsModalOpen(false)} />
                )}

                {/* Toast de Feedback */}
                {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
            </div>
        </DefaultLayout>
    )
}

export default AppointmentsListPage
