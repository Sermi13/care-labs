import React from 'react'
import { FaTimes } from 'react-icons/fa'

// Interface para o tipo de lembrete
interface Reminder {
    id: number
    title: string
    description: string
    date: string
}

// Definindo as propriedades esperadas pelo componente
interface ReminderListProps {
    reminders: Reminder[]
    onDelete: (id: number) => void
}

const ReminderList: React.FC<ReminderListProps> = ({ reminders, onDelete }) => {
    return (
        <div>
            <ul className="list-group">
                {reminders.map((reminder) => (
                    <li key={reminder.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{reminder.title}</strong>
                            <p>{reminder.description}</p>
                            <small>{reminder.date}</small>
                        </div>
                        <button className="btn btn-link" onClick={() => onDelete(reminder.id)}>
                            <FaTimes color="red" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReminderList
