import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,

	View
} from 'react-native';
import { Container, Text, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Tab, Tabs, List, ListItem } from 'native-base';
import { ListView } from 'realm/react-native';
const Realm = require('realm');

export default class MigrateScreen extends Component {
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		//create new database
		this.realm = new Realm({
			schema: [{name: 'Person2', properties: {firstName: 'string', lastName: 'string'}}],
			schemaVersion: 0
		});
		this.clearData(this.realm);
		this.createData(this.realm);

		var persons = this.realm.objects('Person2');

		console.log(Realm.schemaVersion(Realm.defaultPath));

		this.state = {
			dataSource: ds.cloneWithRows(persons),
		};


		this.buttonHandler = this.buttonHandler.bind(this);
	}
	createData(realm){
		//enter sample data
		realm.write(() => {
			realm.create('Person2', {firstName: 'Tony', lastName: 'Stark'});
			realm.create('Person2', {firstName: 'Steve', lastName: 'Rogers'});
			realm.create('Person2', {firstName: 'Pepper', lastName: 'Pots'});
			realm.create('Person2', {firstName: 'James', lastName: 'Rhodes'});
		});
	}
	clearData(realm){
		realm.write(() => {
			realm.delete(realm.objects('Person2'));
		});
	}
	buttonHandler(){
		this.realm = new Realm({
			schema: [{name: 'Person2', properties:{name: 'string'}}],
			schemaVersion: 1,
			migration: function(oldRealm, newRealm){
				if(oldRealm.schemaVersion < 1){
					var oldObjects = oldRealm.objects('Person2');
					var newObjects = newRealm.objects('Person2');

					for (var i = 0; i < oldObjects.length; ++i) {
					    newObjects[i].name = oldObjects[i].firstName + oldObjects[i].lastName;
					}
				}
			}
		});
	}
	render() {
		return (
			<Container>
				<Header>
					<Left />
					<Body>
						<Title>Migration</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={	(person) =>
							<ListItem>

									<Left>
										<Text>{person.firstName || person.name}</Text>
										<Text note>{person.lastName}</Text>
									</Left>
									<Body />
									<Right />
								</ListItem>
						}
					/>
				</Content>
				<Button block onPress={this.buttonHandler}>
					<Text>Migrate</Text>
				</Button>
			</Container>
		);

	}
}
