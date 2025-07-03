import { ROUTES } from '@/config/routes'
import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

export default function AuthPage(): ReactElement {
	redirect(ROUTES.AUTH.LOGIN);
}