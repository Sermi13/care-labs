import React, { SyntheticEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import LoginLayout from '~/layouts/LoginLayout'
import { useDispatch } from 'react-redux'
import { ROUTES } from '~/resources/routes-constants'
import { useNavigate } from 'react-router-dom'
import { login, setName } from '~/store/actions/userActions'

const LoginPage = () => {
    const [nome, setNome] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()
        dispatch(setName(nome))
        dispatch(login())
        navigate(ROUTES.HOMEPAGE_ROUTE)
    }

    return (
        <LoginLayout title="Entrar">
            <Form onSubmit={handleSubmit}>
                {/* Campo de nome */}
                <Form.Group className="tw-mb-10" controlId="formEmail">
                    <Form.Label className="text-textMain">Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="rounded-md border-secondary focus:ring-2 focus:ring-primary"
                    />
                </Form.Group>

                {/* Botão de Login */}
                <div className="d-grid">
                    <Button type="submit" className="bg-primary border-primary text-white">
                        Entrar
                    </Button>
                </div>
            </Form>
        </LoginLayout>
    )
}

export default LoginPage
