import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Main } from '../screens/Main/index'
import { User } from '../screens/User/index';

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7159c1'
            },
            headerTintColor: '#fff'
        }}>
            <Screen
                name='main'
                component={Main}
                options={{title: 'Usuários'}}
            />

            <Screen
                name='user'
                component={User}
                options={{title: 'Repositórios Curtidos'}}
            />
        </Navigator>
    )
}