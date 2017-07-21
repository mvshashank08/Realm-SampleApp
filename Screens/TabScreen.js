import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Tab, Tabs } from 'native-base';

import WriteClass from './WriteClass';
import ReadClass from './ReadClass';

const Realm = require('realm');

export default class TabScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.realm = new Realm({
			schema: [{name: 'Person', properties: {name: 'string', quote: 'string'}}],
			path: 'anotherRealm.realm'
		});
	}
	render() {
		return (
			<Container>
				<Header hasTabs>
					<Left />
					<Body>
						<Title>Realm DB</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<Tabs>
						<Tab heading="Write">
							<WriteClass realm={this.realm}/>
						</Tab>
						<Tab heading="Read">
							<ReadClass realm={this.realm}/>
						</Tab>
					</Tabs>
				</Content>
			</Container>
		);

	}
}
