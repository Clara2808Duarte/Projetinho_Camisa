import { StatusBar } from 'react-native'; // Importa a barra de status do dispositivo
import { NavigationContainer } from '@react-navigation/native'; // Contêiner para navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Cria a pilha de navegação

// Importa as telas do aplicativo
import TelaInicial from './components/TelaInicial';
import TelaLogin from './components/TelaLogin';
import TelaCatalogo from './components/TelaCatalogo';
import TelaDetalhes from './components/TelaDetalhes';

// Cria o stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Container de navegação principal
    <NavigationContainer>
      {/* Configuração da barra de status do dispositivo */}
      <StatusBar 
        barStyle="light-content" // Texto claro
        backgroundColor="#800000" // Bordô escuro
      />

      {/* Pilha de telas */}
      <Stack.Navigator initialRouteName="Inicial">
        {/* Tela inicial / capa */}
        <Stack.Screen
          name="Inicial" // Nome da rota
          component={TelaInicial} // Componente que será renderizado
          options={{ headerShown: false }} // Oculta o cabeçalho da tela
        />

        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{ headerShown: false }} // Oculta cabeçalho também
        />

        {/* Tela do Catálogo */}
        <Stack.Screen
          name="Catalogo"
          component={TelaCatalogo}
          options={{
            title: 'Catálogo de Camisetas', // Título da barra
            headerStyle: { backgroundColor: '#800000' }, // Cor de fundo da barra
            headerTintColor: '#F5F5DC', // Cor do texto e ícones da barra
          }}
        />

        {/* Tela de Detalhes do produto */}
        <Stack.Screen
          name="Detalhes"
          component={TelaDetalhes}
          options={{
            title: 'Detalhes do Produto', // Título da barra
            headerStyle: { backgroundColor: '#800000' }, // Fundo bordô
            headerTintColor: '#F5F5DC', // Texto e ícones em tom bege claro
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
