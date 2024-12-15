import React, { useEffect } from 'react'

type ToastProps = {
    message: string
    duration?: number // Duração do toast (em ms), padrão 3000ms
    onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration) // Fecha o toast após a duração

        return () => clearTimeout(timer) // Limpa o timer ao desmontar
    }, [duration, onClose])

    return (
        <div className="tw-fixed tw-bottom-4 tw-right-4 tw-bg-gray-800 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-shadow-lg tw-z-50 tw-flex tw-items-center tw-space-x-2">
            <span>{message}</span>
            <button onClick={onClose} className="tw-text-gray-400 hover:tw-text-gray-200 tw-text-xl">
                &times;
            </button>
        </div>
    )
}

export default Toast
