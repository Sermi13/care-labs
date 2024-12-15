import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import logo from '../../public/carelabs-logo.png'
type ScreenProps = {
    title: string
    children: React.ReactNode
}

const LoginLayout = ({ title, children }: ScreenProps) => {
    return (
        <Container fluid className="min-vh-100 tw-flex tw-items-center tw-justify-center tw-bg-background">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="tw-mx-auto">
                    <div className="tw-bg-white tw-shadow-lg tw-rounded p-4">
                        {/* Título */}
                        <div className="tw-flex tw-justify-center">
                            <Image src={logo} className="tw-mb-4" width={200} />
                        </div>
                        <h3 className="tw-text-neutral-700 tw-text-2xl tw-text-center tw-mb-4">{title}</h3>

                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default LoginLayout
