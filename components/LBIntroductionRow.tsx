import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { LBButton, LBButtonProps } from 'unicpeak-ui/primitives/LBButton'
import { LBIcon } from 'unicpeak-ui/primitives/LBIcon'
import { LBText } from 'unicpeak-ui/primitives/LBText'
import { LBView } from 'unicpeak-ui/primitives/LBView'
import { Image } from 'react-native'

export type LBIntroductionRowProps = {
    onSeePress?: () => void;
    onSeePressProps?: Partial<LBButtonProps>;
    name: string;
    description?: string;
    icon?: string;
    attributes?: LBIntroductionRowAttribute[];
}

export type LBIntroductionRowAttribute = {
    title: string;
}

export function LBIntroductionRow ({
	name,
	description,
	icon,
	onSeePress,
	onSeePressProps,
	attributes
}: Readonly<LBIntroductionRowProps>) {
	const { spacing, color } = useLBTheme()

	return <LBView>
		<LBView
			direction='horizontal'
			style={{
				justifyContent: 'space-between',
				alignItems: 'flex-start'
			}}>
			<LBView direction='horizontal' center style={{ flex: 4 }}>
				{onSeePress && icon &&
                    <LBView style={{ height: 50, width: 60 }}>
                    	<Image
                    		source={{ uri: icon }}
                    		style={{
                    			width: 50,
                    			height: 50,
                    			overflow: 'hidden',
                    			borderRadius: spacing(1.6)
                    		}}
                    		resizeMode="cover"
                    	/>
                    </LBView>
				}
				{!icon &&
                <LBView style={{
                	height: 50,
                	width: 60
                }}>
                	<LBView center style={{
                		height: 50,
                		width: 50,
                		borderRadius: spacing(1.6),
                		backgroundColor: color('background')
                	}}>
                		<LBIcon icon='person-standing' size='medium' fill={color('white')} />
                	</LBView>
                </LBView>
				}
				<LBView style={{
			    flex: 1,
					justifyContent: 'flex-start'
				}}>
					<LBText variant='h4' color='white'>{name}</LBText>
					{(description || '').trim() !== '' && <LBText variant='subtle' numberOfLines={1}>{description}</LBText>}
				</LBView>
				{!onSeePress && icon &&
                    <LBView style={{ height: 50, width: 60 }}>
                    	<Image
                    		source={{ uri: icon }}
                    		style={{
                    			width: 50,
                    			height: 50,
                    			overflow: 'hidden',
                    			borderRadius: spacing(1.6)
                    		}}
                    		resizeMode="cover"
                    	/>
                    </LBView>
				}
			</LBView>
			{
				!!onSeePress && <LBView center style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
					<LBButton variant='subtle' style={{ paddingHorizontal: spacing(4), paddingVertical: spacing(2) }} onPress={onSeePress} {...onSeePressProps}>See</LBButton>
				</LBView>
			}
		</LBView>
		{
			!!attributes && attributes?.length > 0 &&
            <LBView
            	style={{
            		marginTop: spacing(2.5),
            		backgroundColor: 'transparent'
            	}}
            	scrollView
            	direction='horizontal'
            	renderItemKey={(index) => `introduction_row_attribute_${name}_${index}`}
            	renderItemStyle={{
            		style: {
            			marginRight: spacing(2)
            		}
            	}}
            >
            	{attributes?.map(({ title }) => <LBView style={{
            		backgroundColor: color('slate.400'),
            		borderRadius: spacing(1.5),
            		paddingHorizontal: spacing(2),
            		paddingVertical: spacing(.5)
            	}}>
            		<LBText variant='subtle' fontWeight='semi-bold' style={{ }} color={color('slate.50')}>{title}</LBText>
            	</LBView>)
            	}
            </LBView>
		}
	</LBView>
}
