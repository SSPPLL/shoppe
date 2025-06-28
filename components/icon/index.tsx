import { FC } from 'react';
import CartIconSvg from './svg/cart.svg';
import HeartIconSvg from './svg/heart.svg';
import LogoutIconSvg from './svg/logout.svg';
import UserIconSvg from './svg/user.svg';
import MagnifierIconSvg from './svg/magnifier.svg';
import EyeIconSvg from './svg/eye.svg';
import { IconProps } from './types';

export const CartIcon: FC<IconProps> = (props) => {
	return <CartIconSvg {...props} />
}

export const HeartIcon: FC<IconProps> = (props) => {
	return <HeartIconSvg {...props} />
}

export const LogoutIcon: FC<IconProps> = (props) => {
	return <LogoutIconSvg {...props} />
}

export const UserIcon: FC<IconProps> = (props) => {
	return <UserIconSvg {...props} />
}

export const MagnifierIcon: FC<IconProps> = (props) => {
	return <MagnifierIconSvg {...props} />
}

export const EyeIcon: FC<IconProps> = (props) => {
	return <EyeIconSvg {...props} />
}