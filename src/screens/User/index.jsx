import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import api from '../../services/api'

import { 
  Container, 
  Header, 
  Avatar, 
  Name, 
  Bio, 
  Stars, 
  Starred, 
  OwnerAvatar, 
  Info, 
  Title, 
  Author } from './styles'

export function User(props) {
  console.log(props.route.params)
  const [stars, setStars] = useState([])

  useEffect(() => {
    async function getUser() {
      const user = props.route.params.user

      const response = await api.get(`users/${user.login}/starred`)

      setStars(response.data)
    }
    getUser()

  }, [])

  const user = props.route.params.user

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars 
      data={stars}
      keyExtractor={star => String(star.id)}
      renderItem={({ item }) => (
        <Starred>
          <OwnerAvatar source={{ uri: item.owner.avatar_url}}/>
          <Info>
            <Title>{item.name}</Title>
            <Author>{item.owner.login}</Author>
          </Info>
        </Starred>
      )}
      />
    </Container>
  )
}