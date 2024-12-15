import React from 'react'
import { FaEye } from 'react-icons/fa'
import { Appointment } from '~/types/appointment'

interface AppointmentListProps {
    appointments: Appointment[]
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
    return (
        <div>
            <ul className="list-group">
                {appointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className="list-group-item tw-flex tw-justify-between tw-items-center tw-py-4 tw-px-3 tw-border tw-rounded-lg tw-mb-2 tw-shadow-sm"
                    >
                        {/* Informações principais */}
                        <div>
                            <h5 className="tw-text-lg tw-font-medium tw-text-gray-700">{appointment.patientName}</h5>
                            <p className="tw-text-sm tw-text-gray-500">
                                Médico: {appointment.doctorName} | Horário: {appointment.time}
                            </p>
                        </div>

                        {/* Status e botão de ação */}
                        <div className="tw-flex tw-items-center tw-space-x-4">
                            {/* Status */}
                            <span
                                className={`tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-rounded-full ${
                                    appointment.status === 'Realizado' ? 'tw-bg-green-100 tw-text-green-700' : 'tw-bg-yellow-100 tw-text-yellow-700'
                                }`}
                            >
                                {appointment.status}
                            </span>
                            {/* Ícone para visualizar mais */}
                            <button className="tw-bg-blue-500 tw-text-white tw-p-2 tw-rounded-full hover:tw-bg-blue-600 tw-shadow-md" title="Ver mais detalhes">
                                <FaEye />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AppointmentList
