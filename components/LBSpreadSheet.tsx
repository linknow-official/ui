import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { LBText } from 'unicpeak-ui/primitives/LBText'
import { LBView } from 'unicpeak-ui/primitives/LBView'
import React, { useRef } from 'react'
import { ScrollView, View } from 'react-native'
import {
	Row,
	Table
} from 'react-native-table-component'

export type LBSpreadSheetColumn = {
    title: string;
    width?: number
} & {
    title: string;
    flex?: number;
}

type LBSpreadSheetProps = {
    headers: LBSpreadSheetColumn[];
    data: React.ReactNode[][];
    fixedColumnEndIndex?: number
}

export function LBSpreadSheet ({ headers, data, fixedColumnEndIndex }: LBSpreadSheetProps) {
	const { color, spacing } = useLBTheme()

	const leftRef = useRef<ScrollView>(null)
	const rightRef = useRef<ScrollView>(null)
	const headerHeight = spacing(10)

	const tableHeads = headers.map(header =>
		<LBView
			center
			style={{
				height: headerHeight,
				borderBottomColor: color('tableBorder')
			}}
		>
			<LBText variant='table-head'>
				{header.title}
			</LBText>
		</LBView>
	)

	const tableData = data
	const tableWidths = headers.map(header => header.width).filter(e => e) as (number[] | undefined)
	const flexes = headers.map(header => header.flex).filter(e => e) as (number[] | undefined)

	const leftColumnWidth = headers.filter((h, index) => index <= (fixedColumnEndIndex || 0)).reduce(((p, v) => p + (v?.width || 0)), 0)
	const leftColumnFlex = headers.filter((h, index) => index <= (fixedColumnEndIndex || 0)).reduce(((p, v) => p + (v?.flex || 0)), 0)

	const table = <ScrollView
		style={{ marginLeft: -1 }}
		scrollEnabled={false}
	>
		<LBView>
			<Table borderStyle={{ borderWidth: 1, borderColor: color('tableBorder') }}>
				<Row
					data={tableHeads}
					widthArr={tableWidths}
					flexArr={flexes}
					style={{
						minHeight: spacing(10)
					}}
				/>
			</Table>
			<ScrollView
				ref={rightRef}
				style={{ marginTop: -1 }}
				scrollEventThrottle={16}
				bounces={false}
				onScroll={(e) => {
					const { y } = e.nativeEvent.contentOffset
					leftRef.current?.scrollTo({ y, animated: false })
				}}
			>
				<Table borderStyle={{ borderWidth: 1, borderColor: color('tableBorder') }}>
					{tableData.map((rowData, index) => (
						<Row
							key={index}
							data={rowData}
							widthArr={tableWidths}
							flexArr={flexes}
							style={{
								minHeight: spacing(10)
							}}
						/>
					))}
				</Table>
			</ScrollView>
		</LBView>
	</ScrollView>

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				backgroundColor: '#eee'

			}}
		>
			{/* Left Column */}
			{
				data.length > 0 &&
                <LBView
                	style={{
                		width: leftColumnWidth,
                		flex: leftColumnFlex,
                		backgroundColor: color('tableCellBackground'),
                		borderRightWidth: 1,
                		borderRightColor: color('tableBorder'),
                		shadowColor: '#000',
                		shadowOffset: {
                			width: 1,
                			height: 0
                		},
                		shadowOpacity: 0.125,
                		shadowRadius: 4,
                		elevation: 4,
                		zIndex: 2

                	}}
                >
                	{/* Left Container : scroll synced */}
                	{table}

                </LBView>
			}
			{/* Right Column */}
			<LBView
				style={{
					flex: 1,
					backgroundColor: 'white'
				}}
			>
				<LBView
					scrollView
					scrollEnabled
					direction='horizontal'
					horizontal={true}
					bounces={false}
					style={{ marginLeft: -1 }}
				>
					<LBView style={{
						marginLeft: -leftColumnWidth
					}}>
						{table}
					</LBView>
				</LBView>
			</LBView>
		</View>
	)
}
