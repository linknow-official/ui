import React from 'react'
import { SvgProps } from 'react-native-svg'

import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak/hooks/useThemeColor'

// TODO: unknown store
import { LBView } from 'unicpeak/primitives/LBView'
import { ViewStyle } from 'react-native'
import Adjust from '../assets/icons/adjust.svg'
import { default as AppStore, default as UnknownStore } from '../assets/icons/app-store.svg'
import Appsflyer from '../assets/icons/appsflyer.svg'
import Calendar from '../assets/icons/calendar.svg'
import ChevronLeft from '../assets/icons/chevron-left.svg'
import ChevronsDownUp from '../assets/icons/chevrons-down-up.svg'
import ClipboardX from '../assets/icons/clipboard-x.svg'
import Copy from '../assets/icons/copy.svg'
import CornerUpLeftWhite from '../assets/icons/corner-up-left-white.svg'
import CornerUpLeft from '../assets/icons/corner-up-left.svg'
import Edit2 from '../assets/icons/edit-2.svg'
import Edit3 from '../assets/icons/edit-3.svg'
import Edit from '../assets/icons/edit.svg'
import GlassWater from '../assets/icons/glass-water.svg'
import MailCheck from '../assets/icons/mail-check.svg'
import MailMinus from '../assets/icons/mail-minus.svg'
import Mail from '../assets/icons/mail.svg'
import Mails from '../assets/icons/mails.svg'
import PersonStanding from '../assets/icons/person-standing.svg'
import PlayStore from '../assets/icons/play-store.svg'
import PlusCircle from '../assets/icons/plus-circle.svg'
import PlusSquare from '../assets/icons/plus-square.svg'
import Plus from '../assets/icons/plus.svg'
import Puzzle from '../assets/icons/puzzle.svg'
import QRCode from '../assets/icons/qr-code.svg'
import Quote from '../assets/icons/quote.svg'
import RadioReceiver from '../assets/icons/radio-receiver.svg'
import RefreshCCW from '../assets/icons/refresh-ccw.svg'
import RefreshCW from '../assets/icons/refresh-cw.svg'
import Refrigator from '../assets/icons/refrigerator.svg'
import Regex from '../assets/icons/regex.svg'
import Send from '../assets/icons/send.svg'
import ShieldCheck from '../assets/icons/shield-check.svg'
import Timer from '../assets/icons/timer.svg'
import ZapOff from '../assets/icons/zap-off.svg'
import Zap from '../assets/icons/zap.svg'
import Currency from '../assets/icons/currency.svg'
import User from '../assets/icons/user.svg'
import NavigationOff from '../assets/icons/navigation-off.svg'

export type Icon =
'navigation-off' |
'user' |
'currency' |
'person-standing' |
'zap' |
'zap-off' |
'edit' |
'edit-2' |
'edit-3' |
'shield-check' |
'appsflyer' |
'adjust' |
'chevron-left' |
'copy' |
'calendar' |
'send' |
'clipboard-x' |
'timer' |
'glass-water' |
'unknown-store' |
'app-store' |
'play-store' |
'chevrons-down-up' |
'corner-up-left-white' |
'corner-up-left' |
'mail' |
'mails' |
'mail-check' |
'mail-minus' |
'plus-square' |
'plus-circle' |
'plus' |
'quote' |
'qr-code' |
'puzzle' |
'radio-receiver'|
'regex' |
'refresh-ccw' |
'refresh-cw' |
'refrigerator';

export type IconProps = React.FC<SvgProps> & {
    height?: number;
    width?: number;
    fill?: ReturnType<typeof useThemeColor>;
    size?: 'small' | 'medium' | 'large';
    coverShape?: 'circle' | 'square' | 'flex';
    containerStyle?: Partial<ViewStyle>;
}

const iconPaths: Record<Icon, IconProps> = {
	'navigation-off': NavigationOff,
	'user': User,
	'currency': Currency,
	'person-standing': PersonStanding,
	'zap': Zap,
	'zap-off': ZapOff,
	'edit': Edit,
	'edit-2': Edit2,
	'edit-3': Edit3,
	'shield-check': ShieldCheck,
	'appsflyer': Appsflyer,
	'adjust': Adjust,
	'chevron-left': ChevronLeft,
	'copy': Copy,
	'calendar': Calendar,
	'send': Send,
	'clipboard-x': ClipboardX,
	'timer': Timer,
	'unknown-store': UnknownStore,
	'glass-water': GlassWater,
	'app-store': AppStore,
	'play-store': PlayStore,
	'chevrons-down-up': ChevronsDownUp,
	'corner-up-left-white': CornerUpLeftWhite,
	'corner-up-left': CornerUpLeft,
	'mail': Mail,
	'mails': Mails,
	'mail-check': MailCheck,
	'mail-minus': MailMinus,
	'plus-square': PlusCircle,
	'plus-circle': PlusSquare,
	'plus': Plus,
	'quote': Quote,
	'qr-code': QRCode,
	puzzle: Puzzle,
	'radio-receiver': RadioReceiver,
	regex: Regex,
	'refresh-ccw': RefreshCCW,
	'refresh-cw': RefreshCW,
	refrigerator: Refrigator
}

const sizeProperties = {
	'small': 16,
	'medium': 32,
	'large': 64
}

export function useIcon (icon: Icon, props?: Partial<IconProps>) {
	const { color, spacing } = useLBTheme()

	const IconSource = iconPaths[icon]

	const width = props?.width ?? sizeProperties[props?.size || 'small']
	const height = props?.height ?? sizeProperties[props?.size || 'small']
	const fill = props?.fill || color('icon')
	const coverShape = props?.coverShape

	if (coverShape){
		return <LBView style={[
			coverShape === 'circle' ? {
				borderRadius: spacing(25),
				backgroundColor: color('gray.100'),
				padding: spacing(4)
				 } :
				coverShape === 'square' ? {
					borderRadius: spacing(2), backgroundColor: color('gray.100'),
					padding: spacing(4)
				} :
					coverShape === 'flex' ? {
						borderRadius: spacing(2), backgroundColor: color('gray.100'),
						padding: spacing(4),
						flex: 1
					} :
						{},
			props?.containerStyle
		]}>
			<IconSource {...props} width={width} height={height} fill={fill} />
		</LBView>
	}

	return <IconSource {...props} width={width} height={height} fill={fill} />
}
