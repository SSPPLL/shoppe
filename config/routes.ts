export const ROUTES = {
	HOME: '/',
	ABOUT: '/about',
	ACCOUNT: '/account',
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		RESET_PASSWORD: '/auth/reset-password',
		FOGOT_PASSWORD: '/auth/forgot-password',
		LOGOUT: '/auth/logout'
	},
	CART: '/cart',
	CONTACTS: '/contacts',
	DELIVERY_AND_RETURN: '/delivery-and-return',
	FAVORITES: '/favorites',
	ORDER: (id: string) => `/order/${id}`,
	PRODUCTS: '/products',
	PRODUCT: (sku: string) => `/products/sku/${sku}`,
	TERMS_OF_PURCHASE: '/terms-of-purchase'
}