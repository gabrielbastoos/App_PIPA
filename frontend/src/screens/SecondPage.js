import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import InteractiveCard, {Header, Content} from 'react-native-interactive-card';

export default class CustomTransition extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View style={styles.container}>
				<InteractiveCard overlayOpacity={1}>
					<Header>
						<View style={styles.cardHeader}>
							<Text style={styles.text}>Caixa d'água 1</Text>
						</View>
					</Header>
					<Content enterFrom={"right"}>
						<View style={styles.content}>
							<Text style={styles.text}>100%</Text>
						</View>
					</Content>
				</InteractiveCard>
				<InteractiveCard overlayOpacity={1}>
					<Header>
						<View style={styles.cardHeader}>
							<Text style={styles.text}>Caixa d'água 2</Text>
						</View>
					</Header>
					<Content enterFrom={"right"}>
						<View style={styles.content}>
							<Text style={styles.text}>57%</Text>
						</View>
					</Content>
				</InteractiveCard>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#87CEFA',
		justifyContent: 'center',
		padding: 10
	},
	cardHeader: {backgroundColor: "#68E9FF",padding: 30,marginBottom: 10, borderRadius: 5},
	text: {fontSize: 40, opacity: 0.6,textAlign: 'center',fontWeight: 'bold'},
	content: {width: "90%", padding: 50, backgroundColor: "#54B8AC"},
});