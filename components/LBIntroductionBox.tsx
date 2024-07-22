import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { LBView } from 'unicpeak-ui/primitives/LBView'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import { LBIntroductionRow, LBIntroductionRowAttribute } from './LBIntroductionRow'

type LBIntroductionBoxProps = {
	onCardPress?: () => void;
	onSeePress?: () => void;
    name: string;
    description?: string;
    icon: string;
    cover: string;
    full?: boolean;
    attributes?: LBIntroductionRowAttribute[];
};

export const LBIntroductionBox: React.FC<LBIntroductionBoxProps> = ({
	onCardPress,
	onSeePress,
	name,
	description,
	icon,
	cover,
	full,
	attributes
}) => {
	const { spacing, color } = useLBTheme()

	if (full){
		return (
			<TouchableHighlight onPress={onCardPress} style={{
				position: 'relative',
				width: '100%',
				height: 393,
				borderRadius: spacing(2),
				overflow: 'hidden'
			}}>
				<LBView style={{
					position: 'relative',
					flex: 1
				}}>
					<Image
						source={{ uri: cover }}
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute'
						}}
						resizeMode="cover"
					/>
					<LinearGradient
						colors={[ '#000A1355', '#000A1355' ]}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
							top: 0
						}}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					/>

					<LBView style={{
						position: 'absolute',
						alignSelf: 'center',
						width: '100%',
						padding: spacing(4),
						bottom: 0
					}}>
						<LinearGradient
							colors={[ color('black'), color('black') ]}
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								bottom: 0,
								top: 0,
								opacity: 0.75
							}}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
						/>
						<LBIntroductionRow
							name={name}
							description={description}
							icon={icon}
							onSeePress={onSeePress}
							attributes={attributes}
						/>
					</LBView>
				</LBView>
			</TouchableHighlight>
		)
	}

	return (
		<TouchableHighlight onPress={onCardPress} style={{
			position: 'relative',
			width: '100%',
			height: 157,
			borderRadius: spacing(2),
			overflow: 'hidden'
		}}>
			<LBView style={{
				position: 'relative',
				flex: 1
			}}>
				<Image
					source={{ uri: cover }}
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute'
					}}
					resizeMode="cover"
				/>
				<LinearGradient
					colors={[ '#000A1355', '#000A1355' ]}
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						top: 0
					}}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>

				<LBView style={{
					position: 'absolute',
					alignSelf: 'center',
					width: '100%',
					padding: spacing(4),
					bottom: 0
				}}>
					<LinearGradient
						colors={[ color('black'), color('black') ]}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
							top: 0,
							opacity: 0.75
						}}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					/>
					<LBIntroductionRow
						name={name}
						description={description}
						icon={icon}
						onSeePress={onSeePress}
						attributes={attributes}
					/>
				</LBView>
			</LBView>
		</TouchableHighlight>
	)
}
