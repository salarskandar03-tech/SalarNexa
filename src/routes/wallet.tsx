import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wallet')({
  component: WalletPage,
})

function WalletPage() {
  return <div>Wallet Page</div>
}