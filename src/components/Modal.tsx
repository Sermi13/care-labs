import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import QrCode from '../../public/sample-qr-code.png'
interface ModalProps {
    selectedDate?: Date
    onSave: (appointment: { patientName: string; email: string; cpf: string; phoneNumber: string; birthDate: string; address: string; value: number }) => void
    onClose: () => void
    appointment?: {
        patientName: string
        email: string
        cpf: string
        phoneNumber: string
        birthDate: string
        address: string
        value: number
    } | null
}

const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '')
    if (cpf.length !== 11) return false
    if (/^(\d)\1+$/.test(cpf)) return false
    let sum = 0
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i)
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (parseInt(cpf.charAt(9)) !== remainder) return false
    sum = 0
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (parseInt(cpf.charAt(10)) !== remainder) return false
    return true
}

const Modal: React.FC<ModalProps> = ({ selectedDate, onSave, onClose, appointment }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        birthDate: '',
        address: '',
        value: 0
    })
    const [errors, setErrors] = useState({
        patientName: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        birthDate: '',
        address: '',
        value: ''
    })
    const [currentStep, setCurrentStep] = useState(1) // 1 for appointment form, 2 for payment
    const generateRandomCode = (length: number = 10): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    const paymentCode = generateRandomCode(16)

    useEffect(() => {
        if (appointment) {
            setFormData({
                patientName: appointment.patientName || '',
                email: appointment.email || '',
                cpf: appointment.cpf || '',
                phoneNumber: appointment.phoneNumber || '',
                birthDate: appointment.birthDate || '',
                address: appointment.address || '',
                value: appointment.value || 0
            })
        }
    }, [appointment])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const newErrors: any = {}

        if (!formData.patientName) newErrors.patientName = 'O nome do paciente é obrigatório'
        if (!formData.email) newErrors.email = 'O email é obrigatório'
        if (!formData.cpf) newErrors.cpf = 'O CPF é obrigatório'
        if (!formData.phoneNumber) newErrors.phoneNumber = 'O número de telefone é obrigatório'
        if (!formData.birthDate) newErrors.birthDate = 'A data de nascimento é obrigatória'
        if (!formData.address) newErrors.address = 'O endereço é obrigatório'
        if (!formData.value) newErrors.value = 'O valor é obrigatório'

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'O email informado não é válido'
        }

        if (formData.cpf && !isValidCPF(formData.cpf)) {
            newErrors.cpf = 'O CPF informado não é válido'
        }

        if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'O número de telefone informado não é válido'
        }

        const age = new Date().getFullYear() - new Date(formData.birthDate).getFullYear()
        if (formData.birthDate && age < 18) {
            newErrors.birthDate = 'O paciente precisa ter 18 anos ou mais'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        setCurrentStep(2) // Vai para a etapa de pagamento
    }

    const handlePaymentSubmit = () => {
        // Aqui você pode integrar com a API ou gerar o código Pix real
        alert('Pagamento concluído')
        onSave(formData)
    }

    return (
        <div className="tw-fixed tw-inset-0 tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center tw-z-50">
            <div className="tw-bg-white tw-rounded-lg tw-w-full tw-max-w-md tw-shadow-lg tw-p-6">
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4">
                    {appointment ? 'Editar Agendamento' : 'Novo Agendamento'} - {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : ''}
                </h2>
                {currentStep === 1 ? (
                    <form onSubmit={handleSubmit}>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Paciente</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            />
                            {errors.patientName && <p className="tw-text-red-500 tw-text-sm">{errors.patientName}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            />
                            {errors.email && <p className="tw-text-red-500 tw-text-sm">{errors.email}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">CPF</label>
                            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="tw-w-full tw-p-2 tw-border tw-rounded-md" />
                            {errors.cpf && <p className="tw-text-red-500 tw-text-sm">{errors.cpf}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Número de Telefone</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            />
                            {errors.phoneNumber && <p className="tw-text-red-500 tw-text-sm">{errors.phoneNumber}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Data de Nascimento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            />
                            {errors.birthDate && <p className="tw-text-red-500 tw-text-sm">{errors.birthDate}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Endereço</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            />
                            {errors.address && <p className="tw-text-red-500 tw-text-sm">{errors.address}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Valor</label>
                            <input
                                type="number"
                                name="value"
                                value={formData.value}
                                onChange={handleChange}
                                className="tw-w-full tw-p-2 tw-border tw-rounded-md"
                            />
                            {errors.value && <p className="tw-text-red-500 tw-text-sm">{errors.value}</p>}
                        </div>
                        <div className="tw-mb-4">
                            <button type="submit" className="tw-bg-blue-500 tw-text-white tw-p-2 tw-w-full tw-rounded-md">
                                {appointment ? 'Salvar Alterações' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <h3 className="tw-text-lg tw-font-semibold">Pagamento</h3>
                        <div className="tw-mb-4">
                            <Image src={QrCode} alt="QR Code Pix" className="tw-w-full tw-h-auto tw-mb-4" />
                            <div className="tw-flex tw-items-center">
                                <input type="text" value={paymentCode} readOnly className="tw-w-full tw-p-2 tw-border tw-rounded-md tw-bg-gray-100" />
                                <button className="tw-bg-green-500 tw-text-white tw-p-2 tw-rounded-md tw-ml-2">Copiar</button>
                            </div>
                        </div>
                        <div className="tw-mb-4">
                            <button onClick={handlePaymentSubmit} className="tw-bg-blue-500 tw-text-white tw-p-2 tw-w-full tw-rounded-md">
                                Concluir Pagamento
                            </button>
                        </div>
                    </div>
                )}
                <button onClick={onClose} className="tw-bg-neutral-300 tw-text-neutral-600 tw-mt-4 tw-p-2 tw-w-full tw-rounded-md">
                    Fechar
                </button>
            </div>
        </div>
    )
}

export default Modal
