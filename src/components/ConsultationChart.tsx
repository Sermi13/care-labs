// src/components/ConsultationChart.tsx
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Dados fictícios para o gráfico
const data = [
    { name: 'Segunda', consultas: 4 },
    { name: 'Terça', consultas: 7 },
    { name: 'Quarta', consultas: 3 },
    { name: 'Quinta', consultas: 8 },
    { name: 'Sexta', consultas: 6 },
    { name: 'Sábado', consultas: 9 },
    { name: 'Domingo', consultas: 5 }
]

const ConsultationChart: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={330}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="consultas" fill="#8884d8" radius={[8, 8, 0, 0]} animationDuration={1000} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ConsultationChart
