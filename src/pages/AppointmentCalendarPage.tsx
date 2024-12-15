import React, { useState } from 'react'
import Calendar from '../components/Calendar'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { FaUserMd, FaEllipsisV } from 'react-icons/fa'
import { IoCalendarClear } from 'react-icons/io5'
import DefaultLayout from '~/layouts/DefaultLayout'
import { Value } from 'sass'

interface Doctor {
    id: number
    name: string
}

interface Appointment {
    id: number
    time: string
    patientName: string
    doctorId: number
    date: string
    email: string
    cpf: string
    phoneNumber: string
    birthDate: string
    address: string
    value: number
}

const AppointmentsPage: React.FC = () => {
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
    const [transferDoctorId, setTransferDoctorId] = useState<number | null>(null)
    const [isOptionsOpen, setIsOptionsOpen] = useState<number | null>(null)

    const doctors: Doctor[] = [
        { id: 1, name: 'Dr. João Silva' },
        { id: 2, name: 'Dra. Ana Pereira' },
        { id: 3, name: 'Dr. Carlos Oliveira' }
    ]

    const generateTimeSlots = (startHour: number, endHour: number) => {
        const slots = []
        for (let h = startHour; h < endHour; h++) {
            slots.push(`${h}:00`)
            slots.push(`${h}:30`)
        }
        return slots
    }

    const timeSlots = generateTimeSlots(8, 18)

    const filteredAppointments = appointments.filter(
        (appointment) => appointment.doctorId === selectedDoctorId && appointment.date === selectedDate.toISOString().split('T')[0]
    )

    const handleSaveAppointment = (appointment: {
        patientName: string
        email: string
        cpf: string
        phoneNumber: string
        birthDate: string
        address: string
        value: number
    }) => {
        if (
            !appointment.patientName ||
            !appointment.email ||
            !appointment.cpf ||
            !appointment.phoneNumber ||
            !appointment.birthDate ||
            !appointment.address ||
            !appointment.value
        ) {
            setToastMessage('Por favor, preencha todos os campos obrigatórios!')
            return
        }

        const existingAppointment = appointments.find(
            (appointment) => appointment.time === selectedTime && appointment.date === selectedDate.toISOString().split('T')[0]
        )

        if (existingAppointment) {
            setToastMessage('Este horário já está ocupado.')
            return
        }

        setAppointments((prev) => [
            ...prev,
            {
                id: Date.now(),
                time: selectedTime!,
                patientName: appointment.patientName,
                doctorId: selectedDoctorId!,
                date: selectedDate.toISOString().split('T')[0],
                email: appointment.email,
                cpf: appointment.cpf,
                phoneNumber: appointment.phoneNumber,
                birthDate: appointment.birthDate,
                address: appointment.address,
                value: appointment.value
            }
        ])
        setToastMessage('Agendamento salvo com sucesso!')
        setIsModalOpen(false)
    }

    const handleTransferDoctor = () => {
        if (!selectedAppointment || !transferDoctorId) return
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === selectedAppointment.id ? { ...appointment, doctorId: transferDoctorId } : appointment
        )
        setAppointments(updatedAppointments)
        setToastMessage('Médico transferido com sucesso!')
        setIsTransferModalOpen(false)
        setTransferDoctorId(null)
    }

    const handleEditAppointment = (updatedData: {
        patientName: string
        email: string
        cpf: string
        phoneNumber: string
        birthDate: string
        address: string
    }) => {
        if (!selectedAppointment) return
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === selectedAppointment.id ? { ...appointment, ...updatedData } : appointment
        )
        setAppointments(updatedAppointments)
        setToastMessage('Agendamento editado com sucesso!')
        setIsModalOpen(false)
    }

    const handleDeleteAppointment = () => {
        if (!selectedAppointment) return
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== selectedAppointment.id)
        setAppointments(updatedAppointments)
        setToastMessage('Agendamento cancelado com sucesso!')
    }

    return (
        <DefaultLayout isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((prev) => !prev)}>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-12 col-lg-3 bg-white p-4 border-end">
                        <h4 className="tw-text-lg tw-font-semibold tw-mb-4 flex items-center gap-2">Médicos</h4>
                        <ul className="tw-space-y-2">
                            {doctors.map((doctor) => (
                                <li
                                    key={doctor.id}
                                    className={`tw-p-3 tw-rounded-md tw-shadow-sm tw-cursor-pointer ${selectedDoctorId === doctor.id ? 'tw-bg-blue-500 tw-text-white' : 'tw-bg-gray-200'}`}
                                    onClick={() => setSelectedDoctorId(doctor.id)}
                                >
                                    {doctor.name}
                                </li>
                            ))}
                        </ul>
                        <div className="tw-mt-6">
                            <Calendar selectedDate={selectedDate} onDateChange={(date) => setSelectedDate(date)} />
                        </div>
                    </div>

                    <div className="col-12 col-lg-9">
                        {selectedDoctorId ? (
                            <>
                                <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                                    <h4 className="tw-text-lg tw-font-semibold">
                                        Agendamentos do dia{' '}
                                        {selectedDate.toLocaleDateString('pt-BR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </h4>
                                </div>

                                <div className="tw-space-y-4">
                                    {timeSlots.map((slot) => {
                                        const isOccupied = appointments.some(
                                            (appointment) => appointment.time === slot && appointment.date === selectedDate.toISOString().split('T')[0]
                                        )
                                        const appointment = appointments.find(
                                            (appointment) => appointment.time === slot && appointment.date === selectedDate.toISOString().split('T')[0]
                                        )

                                        return (
                                            <div
                                                key={slot}
                                                className={`tw-flex tw-items-center tw-justify-between tw-p-4 tw-bg-white tw-rounded-md tw-shadow-sm ${isOccupied ? 'tw-bg-gray-300' : 'tw-bg-white'}`}
                                            >
                                                <div className="tw-flex tw-items-center tw-space-x-4">
                                                    <span className="tw-font-semibold tw-text-gray-700">{slot}</span>
                                                    {isOccupied ? (
                                                        <div>
                                                            <p className="tw-font-medium tw-text-gray-500">Consulta marcada</p>
                                                            <p className="tw-text-gray-700">Nome: {appointment?.patientName}</p>
                                                            <p className="tw-text-gray-700">CPF: {appointment?.cpf}</p>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedTime(slot)
                                                                setIsModalOpen(true)
                                                                setSelectedAppointment(null)
                                                            }}
                                                            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-sm"
                                                        >
                                                            Agendar
                                                        </button>
                                                    )}
                                                </div>

                                                {isOccupied && appointment && (
                                                    <div className="tw-relative">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedAppointment(appointment)
                                                                setIsOptionsOpen(isOptionsOpen === appointment.id ? null : appointment.id)
                                                            }}
                                                            className="tw-text-gray-600 tw-bg-transparent tw-border-none tw-cursor-pointer"
                                                        >
                                                            <FaEllipsisV />
                                                        </button>

                                                        {isOptionsOpen === appointment.id && (
                                                            <div className="tw-absolute tw-right-0 tw-top-full tw-bg-white tw-shadow-lg tw-rounded-md tw-p-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedAppointment(appointment)
                                                                        setIsModalOpen(true)
                                                                        setSelectedTime(slot)
                                                                    }}
                                                                    className="tw-text-neutral-600 tw-p-2 tw-block"
                                                                >
                                                                    Editar
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setIsTransferModalOpen(true)
                                                                        setTransferDoctorId(null)
                                                                        setIsOptionsOpen(null)
                                                                    }}
                                                                    className="tw-text-neutral-600 tw-p-2 tw-block"
                                                                >
                                                                    Transferir
                                                                </button>
                                                                <button onClick={handleDeleteAppointment} className="tw-text-neutral-600 tw-p-2 tw-block">
                                                                    Deletar
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                    {filteredAppointments.length === 0 && (
                                        <p className="tw-flex tw-items-center tw-text-gray-500 tw-gap-2">
                                            <IoCalendarClear /> Nenhum agendamento para esta data.
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="tw-text-gray-500 tw-text-center">Selecione um médico na coluna à esquerda.</p>
                        )}
                    </div>
                </div>

                {/* Modal de Agendamento */}
                {isModalOpen && selectedDoctorId && selectedTime && (
                    <Modal
                        selectedDate={selectedDate}
                        appointment={selectedAppointment}
                        onSave={(data) => {
                            if (selectedAppointment) {
                                handleEditAppointment(data)
                            } else {
                                handleSaveAppointment(data)
                            }
                        }}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}

                {/* Modal de Transferência de Médico */}
                {isTransferModalOpen && (
                    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
                        <div className="tw-bg-white tw-p-6 tw-rounded-md tw-shadow-lg tw-max-w-sm tw-w-full">
                            <h3 className="tw-font-semibold tw-text-lg tw-mb-4">Transferir Médico</h3>
                            <div className="tw-mb-4">
                                <label htmlFor="newDoctor" className="tw-block tw-text-gray-700 tw-mb-2">
                                    Selecione o novo médico:
                                </label>
                                <select
                                    id="newDoctor"
                                    className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                                    onChange={(e) => setTransferDoctorId(Number(e.target.value))}
                                >
                                    <option value="">Selecione</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleTransferDoctor} className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md">
                                Confirmar Transferência
                            </button>
                            <button onClick={() => setIsTransferModalOpen(false)} className="tw-bg-gray-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md">
                                Fechar
                            </button>
                        </div>
                    </div>
                )}

                {/* Toast de Feedback */}
                {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
            </div>
        </DefaultLayout>
    )
}

export default AppointmentsPage
