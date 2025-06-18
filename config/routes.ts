export const ROUTES = {
	HOME: '/',
	ABOUT: '/about',
	ACCOUNT: '/account',
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		RESET_PASSWORD: '/auth/reset-password',
		FOGOT_PASSWORD: '/auth/forgot-password'
	},
	CART: '/cart',
	FAVORITES: '/favorites',
	ORDER: (id: string) => `/product/${id}`,
	PRODUCTS: '/products',
	PRODUCT: (slug: string) => `/product/${slug}`
}