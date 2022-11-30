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
  Author
} from './styles'

export function User(props) {
  const [stars, setStars] = useState([])
  const user = props.route.params.user

  useEffect(() => {
    async function getUser() {
      const response = await api.get(`users/${user.login}/starred`)

      setStars(response.data)
    }
    getUser()

  }, [])

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
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
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