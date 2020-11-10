import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      singlelist: {
        "name": "", "username": "", "email": "", "phone": "", "website": "",
        "address": {
          "street": "", "suite": "", "city": "", "zipcode": "",
          "geo": { "lat": "", "lng": "" }
        },
        "company": { "name": "", "catchPhrase": "", "bs": "" }
      }
      ,
      list: [],
    };
  }

  componentDidMount = async () => {
    const apiString = 'https://jsonplaceholder.typicode.com/users';
    let response = await fetch(apiString);
    this.setState({ list: await response.json() })
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  getitem = async (item) => {
    await this.setState({ singlelist: item })
    this.toggleModal();
  }

  render() {
    return (
      <View style={styles.main}>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
        >
          <View style={{ flex: 1, justifyContent: 'center', }}>
            <View style={{ flex: 1 }} />

            <View style={styles.modalStyle}>
              <View style={styles.fullItem}>
                <Text>Name</Text><Text>{this.state.singlelist.name}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Username</Text><Text>{this.state.singlelist.username}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Email</Text><Text>{this.state.singlelist.email}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Phone</Text><Text>{this.state.singlelist.phone}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Website</Text><Text>{this.state.singlelist.website}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Address</Text>
                <Text></Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Street-Suite</Text><Text>{this.state.singlelist.address.street + ', ' + this.state.singlelist.address.suite}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>City-Zipcode</Text><Text>{this.state.singlelist.address.city + ', ' + this.state.singlelist.address.zipcode}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Geo</Text><Text>{'lat: ' + this.state.singlelist.address.geo.lat + 'lng: ' + this.state.singlelist.address.geo.lng}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Company</Text>
                <Text></Text>
              </View>
              <View style={styles.fullItem}>
                <Text>name</Text><Text>{this.state.singlelist.company.name}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>Catch Phrase</Text><Text>{this.state.singlelist.company.catchPhrase}</Text>
              </View>
              <View style={styles.fullItem}>
                <Text>bs</Text><Text>{this.state.singlelist.company.bs}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }} />
          </View>
        </Modal>
      
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 23 }}>Click an Item to View full details</Text>
        </View>
        <View style={{ flex: 9 }}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={this.state.list}
            renderItem={({ item }) =>
              (
                <TouchableOpacity onPress={() => this.getitem(item)} style={styles.listItem} >
                  <Text style={{ fontSize: 23, color: '#fff' }}>{item.name}</Text>
                </TouchableOpacity>
              )}
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '5%'
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '2%',
    backgroundColor: '#68a0cf',
    margin: '1%',
    borderRadius: 10
  },
  fullItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalStyle: {
    flex: 5,
    backgroundColor: 'white',
    paddingHorizontal: '3%'
  }
})