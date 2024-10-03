'use client'

import { Container, Spacer } from "@nextui-org/react"
import ClientHeader from "./ClientHeader"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container md css={{ p: 0 }}>
      <ClientHeader />
      <Container sm css={{ p: 0 }}>
        {children}
      </Container>
      <Spacer y={3} />
    </Container>
  )
}