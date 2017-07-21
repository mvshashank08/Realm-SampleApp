import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  
  View
} from 'react-native';
import { Container, Text, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Tab, Tabs, List, ListItem } from 'native-base';
import { ListView } from 'realm/react-native';


export default class ReadClass extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var realm = this.props.realm;
		var persons = realm.objects('Person');

		console.log(persons);
		this.state = {
			dataSource: ds.cloneWithRows(persons),
		};
		realm.addListener('change', () => {
			this.setState({dataSource: ds.cloneWithRows(realm.objects('Person'))})
		});
	}
	render() {
		return (
			<Container>				
				<Content>

					<ListView 
						dataSource={this.state.dataSource}
						renderRow={	(person) =>
							<ListItem>
									
									<Left>
										<Text>{person.name}</Text>
										<Text note>{person.quote}</Text>
									</Left>
									<Body />
									<Right />
								</ListItem>
						}
					/>
				</Content>
			</Container>
		);

	}
}
