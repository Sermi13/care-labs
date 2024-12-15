import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import AppointmentCalendarPage from './pages/AppointmentCalendarPage'
import AppointmentsListPage from './pages/AppointmentsListPage'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<ProtectedRoute element={HomePage} />} />
                <Route path={ROUTES.APPOINTMENTS_CALENDAR_ROUTE} element={<ProtectedRoute element={AppointmentCalendarPage} />} />
                <Route path={ROUTES.APPOINTMENTS_LIST_ROUTE} element={<ProtectedRoute element={AppointmentsListPage} />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
