/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { SvgProps } from 'react-native-svg'

import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak/hooks/useThemeColor'
import { ViewStyle } from 'react-native'

// TODO: unknown store
import { LBView } from 'unicpeak/primitives/LBView'
const AppStore = require('../assets/icons/app-store.svg')
const UnknownStore = require('../assets/icons/app-store.svg')
const Adjust = require('../assets/icons/adjust.svg')
const Appsflyer = require('../assets/icons/appsflyer.svg')
const Calendar = require('../assets/icons/calendar.svg')
const ChevronLeft = require('../assets/icons/chevron-left.svg')
const ChevronsDownUp = require('../assets/icons/chevrons-down-up.svg')
const ClipboardX = require('../assets/icons/clipboard-x.svg')
const Copy = require('../assets/icons/copy.svg')
const CornerUpLeftWhite = require('../assets/icons/corner-up-left-white.svg')
const CornerUpLeft = require('../assets/icons/corner-up-left.svg')
const Edit2 = require('../assets/icons/edit-2.svg')
const Edit3 = require('../assets/icons/edit-3.svg')
const Edit = require('../assets/icons/edit.svg')
const GlassWater = require('../assets/icons/glass-water.svg')
const MailCheck = require('../assets/icons/mail-check.svg')
const MailMinus = require('../assets/icons/mail-minus.svg')
const Mail = require('../assets/icons/mail.svg')
const Mails = require('../assets/icons/mails.svg')
const PersonStanding = require('../assets/icons/person-standing.svg')
const PlayStore = require('../assets/icons/play-store.svg')
const PlusCircle = require('../assets/icons/plus-circle.svg')
const PlusSquare = require('../assets/icons/plus-square.svg')
const Plus = require('../assets/icons/plus.svg')
const Puzzle = require('../assets/icons/puzzle.svg')
const QRCode = require('../assets/icons/qr-code.svg')
const Quote = require('../assets/icons/quote.svg')
const RadioReceiver = require('../assets/icons/radio-receiver.svg')
const RefreshCCW = require('../assets/icons/refresh-ccw.svg')
const RefreshCW = require('../assets/icons/refresh-cw.svg')
const Refrigator = require('../assets/icons/refrigerator.svg')
const Regex = require('../assets/icons/regex.svg')
const Send = require('../assets/icons/send.svg')
const ShieldCheck = require('../assets/icons/shield-check.svg')
const Timer = require('../assets/icons/timer.svg')
const ZapOff = require('../assets/icons/zap-off.svg')
const Zap = require('../assets/icons/zap.svg')
const Currency = require('../assets/icons/currency.svg')
const User = require('../assets/icons/user.svg')
const NavigationOff = require('../assets/icons/navigation-off.svg')

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
