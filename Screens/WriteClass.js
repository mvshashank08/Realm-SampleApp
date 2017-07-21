import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  
  View
} from 'react-native';
import { Container, Text, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Tab, Tabs, Form, Input, Item, Label } from 'native-base';
const Realm = require('realm');

export default class WriteClass extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name: '',
	  	quote: ''
	  };
	  this.buttonHandler = this.buttonHandler.bind(this);
	  
	}
	buttonHandler(){

		console.log(this.state.name+" "+this.state.quote);
		this.props.realm.write(() => {
			this.props.realm.create('Person', {name: this.state.name, quote: this.state.quote});
			console.log(this.props.realm.objects('Person').length);
		});
	}
	render() {
		
		
		return (
			<Container>
				<Content>
					
					<Form>
						<Item stackedLabel>
							<Label>Name</Label>
							<Input onChangeText={(text) => this.setState({name: text})}/>
						</Item>
						<Item stackedLabel last>
							<Label>Quote</Label>
							<Input onChangeText={(text) => this.setState({quote: text})}/>
						</Item>
						
						<Button block style={{marginTop: 15}} onPress={this.buttonHandler}>
							<Text>Save</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);

	}
}
