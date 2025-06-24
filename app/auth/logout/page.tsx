import { ROUTES } from '@/config/routes'
import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

export default function LogoutPage(): ReactElement {
	redirect(ROUTES.HOME);
}