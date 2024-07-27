
import React from 'react'
import { SvgProps } from 'react-native-svg'

import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { ViewStyle } from 'react-native'

// TODO: unknown store
import UnknownStore from 'unicpeak-ui/assets/icons/clipboard-x.svg'

import { LBView } from 'unicpeak-ui/primitives/LBView'
import AppStore from 'unicpeak-ui/assets/icons/zap.svg'
import Adjust from 'unicpeak-ui/assets/icons/adjust.svg'
import Appsflyer from 'unicpeak-ui/assets/icons/appsflyer.svg'
import Calendar from 'unicpeak-ui/assets/icons/calendar.svg'
import ChevronLeft from 'unicpeak-ui/assets/icons/chevron-left.svg'
import ChevronsDownUp from 'unicpeak-ui/assets/icons/chevrons-down-up.svg'
import ClipboardX from 'unicpeak-ui/assets/icons/clipboard-x.svg'
import Copy from 'unicpeak-ui/assets/icons/copy.svg'
import CornerUpLeftWhite from 'unicpeak-ui/assets/icons/corner-up-left-white.svg'
import CornerUpLeft from 'unicpeak-ui/assets/icons/corner-up-left.svg'
import Edit2 from 'unicpeak-ui/assets/icons/edit-2.svg'
import Edit3 from 'unicpeak-ui/assets/icons/edit-3.svg'
import Edit from 'unicpeak-ui/assets/icons/edit.svg'
import GlassWater from 'unicpeak-ui/assets/icons/glass-water.svg'
import MailCheck from 'unicpeak-ui/assets/icons/mail-check.svg'
import MailMinus from 'unicpeak-ui/assets/icons/mail-minus.svg'
import Mail from 'unicpeak-ui/assets/icons/mail.svg'
import Mails from 'unicpeak-ui/assets/icons/mails.svg'
import PersonStanding from 'unicpeak-ui/assets/icons/person-standing.svg'
import PlayStore from 'unicpeak-ui/assets/icons/play-store.svg'
import PlusCircle from 'unicpeak-ui/assets/icons/plus-circle.svg'
import PlusSquare from 'unicpeak-ui/assets/icons/plus-square.svg'
import Plus from 'unicpeak-ui/assets/icons/plus.svg'
import Puzzle from 'unicpeak-ui/assets/icons/puzzle.svg'
import QRCode from 'unicpeak-ui/assets/icons/qr-code.svg'
import Quote from 'unicpeak-ui/assets/icons/quote.svg'
import RadioReceiver from 'unicpeak-ui/assets/icons/radio-receiver.svg'
import RefreshCCW from 'unicpeak-ui/assets/icons/refresh-ccw.svg'
import RefreshCW from 'unicpeak-ui/assets/icons/refresh-cw.svg'
import Refrigator from 'unicpeak-ui/assets/icons/refrigerator.svg'
import Regex from 'unicpeak-ui/assets/icons/regex.svg'
import Send from 'unicpeak-ui/assets/icons/send.svg'
import ShieldCheck from 'unicpeak-ui/assets/icons/shield-check.svg'
import Timer from 'unicpeak-ui/assets/icons/timer.svg'
import ZapOff from 'unicpeak-ui/assets/icons/zap-off.svg'
import Zap from 'unicpeak-ui/assets/icons/zap.svg'
import Currency from 'unicpeak-ui/assets/icons/currency.svg'
import User from 'unicpeak-ui/assets/icons/user.svg'
import NavigationOff from 'unicpeak-ui/assets/icons/navigation-off.svg'
import Apple from 'unicpeak-ui/assets/icons/apple.svg'
import Facebook from 'unicpeak-ui/assets/icons/facebook.svg'
import Instagram from 'unicpeak-ui/assets/icons/instagram.svg'
import Linkedin from 'unicpeak-ui/assets/icons/linkedin.svg'
import Reddit from 'unicpeak-ui/assets/icons/reddit.svg'
import Tiktok from 'unicpeak-ui/assets/icons/tiktok.svg'
import Youtube from 'unicpeak-ui/assets/icons/youtube.svg'
import Snapchat from 'unicpeak-ui/assets/icons/snapchat.svg'

export type Icon =
'apple' |
'facebook' |
'instagram' |
'linkedin' |
'reddit' |
'tiktok' |
'youtube' |
'snapchat' |
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


const sizeProperties = {
	'small': 16,
	'semi-medium': 24,
	'medium': 32,
	'semi-large': 48,
	'large': 64
}

export type IconProps = React.FC<SvgProps> & {
    height?: number;
    width?: number;
    fill?: ReturnType<typeof useThemeColor>;
    size?: keyof typeof sizeProperties;
    coverShape?: 'circle' | 'square' | 'flex';
    containerStyle?: Partial<ViewStyle>;
}

const iconPaths: Record<Icon, IconProps> = {
	'apple': Apple,
	'facebook': Facebook,
	'instagram': Instagram,
	'linkedin': Linkedin,
	'reddit': Reddit,
	'tiktok': Tiktok,
	'youtube': Youtube,
	'snapchat': Snapchat,
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
