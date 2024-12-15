import React, { useState } from 'react'

type CalendarProps = {
    selectedDate?: Date | null
    onDateChange?: (date: Date) => void
    highlightedDates?: Date[] // Datas a serem destacadas
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate: propSelectedDate, onDateChange, highlightedDates = [] }) => {
    const [localSelectedDate, setLocalSelectedDate] = useState<Date | null>(propSelectedDate || new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())

    // Função para gerar os dias do mês
    const generateCalendar = (month: Date) => {
        const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
        const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay()

        const days: number[] = []

        // Preenche os dias vazios antes do primeiro dia do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(0) // Representa um espaço vazio
        }

        // Preenche os dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i)
        }

        return days
    }

    // Função para mudar o mês
    const changeMonth = (direction: 'prev' | 'next') => {
        const newMonth = new Date(currentMonth)
        if (direction === 'prev') {
            newMonth.setMonth(currentMonth.getMonth() - 1)
        } else {
            newMonth.setMonth(currentMonth.getMonth() + 1)
        }
        setCurrentMonth(newMonth)
    }

    // Função para selecionar a data
    const handleDateClick = (day: number) => {
        if (day === 0) return // Ignora os espaços vazios
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

        // Atualiza localmente e chama o callback externo, se fornecido
        setLocalSelectedDate(newDate)
        if (onDateChange) onDateChange(newDate)
    }

    // Verifica se uma data está destacada
    const isHighlighted = (day: number) => {
        return highlightedDates.some(
            (date) => date.getDate() === day && date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()
        )
    }

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

    const days = generateCalendar(currentMonth)

    return (
        <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-md tw-w-full">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <button onClick={() => changeMonth('prev')} className="tw-bg-gray-200 tw-p-2 tw-rounded-lg tw-shadow-sm tw-hover:bg-gray-300">
                    {'<'}
                </button>
                <span className="tw-text-lg tw-font-semibold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => changeMonth('next')} className="tw-bg-gray-200 tw-p-2 tw-rounded-lg tw-shadow-sm tw-hover:bg-gray-300">
                    {'>'}
                </button>
            </div>

            <div className="tw-grid tw-grid-cols-7 tw-gap-2 tw-text-center">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="tw-font-semibold">
                        {day}
                    </div>
                ))}

                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`tw-p-2 tw-cursor-pointer tw-rounded-lg ${
                            day === 0
                                ? 'tw-text-transparent'
                                : day === localSelectedDate?.getDate() &&
                                    currentMonth.getMonth() === localSelectedDate?.getMonth() &&
                                    currentMonth.getFullYear() === localSelectedDate?.getFullYear()
                                  ? 'tw-bg-blue-500 tw-text-white'
                                  : isHighlighted(day)
                                    ? 'tw-bg-yellow-100 tw-text-yellow-700'
                                    : 'tw-hover:bg-gray-100'
                        }`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day === 0 ? '' : day}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar
