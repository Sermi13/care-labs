export type Appointment = {
    id: number
    patientName: string
    doctorName: string
    time: string
    status: 'Realizado' | 'Pendente'
}
