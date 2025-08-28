import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas do aplicativo
import TelaInicial from './components/TelaInicial';
import TelaLogin from './components/TelaLogin';
import TelaCatalogo from './components/TelaCatalogo';
import TelaDetalhes from './components/TelaDetalhes';
import ListaDeDesejos from './components/ListaDeDesejos'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#800000"
      />

      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen
          name="Inicial"
          component={TelaInicial}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Catalogo"
          component={TelaCatalogo}
          options={{
            title: 'Catálogo de Camisetas',
            headerStyle: { backgroundColor: '#800000' },
            headerTintColor: '#F5F5DC',
          }}
        />

        <Stack.Screen
          name="Detalhes"
          component={TelaDetalhes}
          options={{
            title: 'Detalhes do Produto',
            headerStyle: { backgroundColor: '#800000' },
            headerTintColor: '#F5F5DC',
          }}
        />

        <Stack.Screen
          name="ListaDeDesejos"
          component={ListaDeDesejos}
          options={{
            title: 'Minha Lista de Desejos',
            headerStyle: { backgroundColor: '#800000' },
            headerTintColor: '#F5F5DC',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
