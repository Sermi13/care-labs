import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'

// Define props for the component
interface ProtectedRouteProps {
    element: React.FC // The element to render if authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    // Access the logged state from Redux
    const logged = useSelector((state: any) => state.user.logged)

    // Redirect to the login page if not logged in
    if (!logged) {
        return <Navigate to={ROUTES.LOGIN_ROUTE} replace />
    }

    // Render the passed element if logged in
    return React.createElement(element)
}

export default ProtectedRoute
