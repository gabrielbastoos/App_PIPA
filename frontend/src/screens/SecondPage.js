import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from '../api'
import InteractiveCard, {Header, Content} from 'react-native-interactive-card';

export default class CustomTransition extends React.Component{
	constructor() {
		super();
		this.state={
			results: null
		}
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
						<View style={styles.content1}>
							<Text style={styles.text}>ttttt</Text>
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
						<View style={styles.content2}>
							<Text style={styles.text}>57%</Text>
						</View>
						<View style={styles.content3}>
							<Text style={styles.text}>teste</Text>
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
	cardHeader: {width:"100%", backgroundColor: "#68E9FF",padding: 30,marginBottom: 10, borderRadius: 5},
	text: {fontSize: 40, opacity: 0.6,textAlign: 'center',fontWeight: 'bold'},
	content1: {width: "85%", height: "90%", padding: 50, backgroundColor: "#54B8AC"},
	content2: {width: "85%", padding: 50, backgroundColor: "#54B8AC"},
	content3: {width: "85%", padding: 50, backgroundColor: "#C0C0C0"},

});