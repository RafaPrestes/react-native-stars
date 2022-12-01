import React, { useState } from 'react'
import { Keyboard, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../services/api'

import {
  Container,
  Form,
  Input,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButtonText,
} from './styles';

export function Main() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState('')
  const [loading, setLoading] = useState(false);

  // Funções
  async function handleAddUser() {
    setLoading(true)

    const response = await api.get(`users/${newUser}`)

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    }

    setUsers([...users, data])
    setNewUser('')
    setLoading(false)

    Keyboard.dismiss();
  }

  function handleNavigate(user) {
    navigation.navigate('user', {user})
  }

  // Styles
  const styles = StyleSheet.create({
    button: {
      marginTop: 10,
      alignSelf: 'stretch',
      borderRadius: 4,
      backgroundColor: '#7159c1',
      justifyContent: 'center',
      alignItems: 'center',
      height: 36,
    },

    buttonAdd: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#7159c1',
      borderRadius: 4,
      marginLeft: 10,
      paddingRight: 12,
      paddingLeft: 12,
      paddingTop: 0,
      paddingBottom: 0,
    }
  });

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />

        <TouchableOpacity style={styles.buttonAdd} loading={loading} onPress={handleAddUser}>
          {loading ? <ActivityIndicator color="#fff" /> : <Icon name='add' size={20} color="#fff" />}
        </TouchableOpacity>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <TouchableOpacity style={styles.button} title='Ver Perfil' onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </TouchableOpacity>
          </User>
        )}
      />
    </Container>
  )
}

