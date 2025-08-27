import { useState } from 'react'; 
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
} from 'react-native'; 

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaLogin({ navigation }) { 
  const [usuario, setUsuario] = useState('');
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [erroUsuario, setErroUsuario] = useState('');

  const validarLogin = async () => { 
    if (!usuario.trim()) {
      setErroUsuario('O usuário é obrigatório.');
      return; 
    } else {
      setErroUsuario('');
    }

    if (usuario === 'aluno' && senha === '123') {
      try {
        await AsyncStorage.setItem('usuarioLogado', apelido); 
        Alert.alert('Sucesso!', 'Login realizado com sucesso.');
        navigation.navigate('Catalogo');
      } catch (e) {
        console.error('Erro ao salvar usuário:', e);
      }
    } else {
      Alert.alert(':( Erro', 'Usuário ou senha incorretos.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={estilos.card}> 
        <Text style={estilos.titulo}>Time de Craques</Text>

        <View style={estilos.bloco}> 
          <Text style={estilos.rotulo}>Usuário</Text>
          <TextInput
            placeholder="Digite seu usuário" 
            value={usuario}
            onChangeText={setUsuario}
            style={[estilos.input, erroUsuario ? estilos.inputErro : null]}
            placeholderTextColor="#aaa" 
          />
          {erroUsuario ? (
            <Text style={estilos.textoErro}>{erroUsuario}</Text>
          ) : null}
        </View>

             <View style={estilos.bloco}> 
          <Text style={estilos.rotulo}>Apelido</Text>
          <TextInput
            placeholder="Digite como quer ser chamado" 
            value={apelido}
            onChangeText={setApelido}
            style={[estilos.input, erroUsuario ? estilos.inputErro : null]}
            placeholderTextColor="#aaa" 
          />
          {erroUsuario ? (
            <Text style={estilos.textoErro}>{erroUsuario}</Text>
          ) : null}
        </View>

        <View style={estilos.bloco}>
          <Text style={estilos.rotulo}>Senha</Text> 
          <TextInput
            placeholder="Digite sua senha" 
            value={senha} 
            onChangeText={setSenha} 
            style={estilos.input} 
            placeholderTextColor="#aaa" 
            secureTextEntry 
          />
        </View>

        <TouchableOpacity style={estilos.botao} onPress={validarLogin}> 
          <Text style={estilos.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({ 
  container: {
    flex: 1, // Ocupa toda a tela
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#800000', 
  },
  card: {
    width: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 16,
    padding: 25, 
    shadowColor: '#000', // Cor da sombra
    shadowOpacity: 0.15, // Opacidade da sombra
    shadowRadius: 8, // Raio da sombra
    elevation: 8, // Sombra no Android
  },
  titulo: {
    fontSize: 28, 
    fontWeight: '800', 
    color: '#800000', 
    textAlign: 'center', 
    marginBottom: 30, // Espaço abaixo do título
    letterSpacing: 1, // Espaçamento entre letras
  },
  bloco: { marginBottom: 18 }, 
  rotulo: {
    fontSize: 15, 
    fontWeight: '600', 
    color: '#45150d', // Cor do texto
    marginBottom: 8, // Espaço abaixo do rótulo
  },
  input: {
    color: 'white', 
    borderWidth: 1, 
    borderRadius: 10, // Cantos arredondados
    padding: 14, // Espaço interno
    backgroundColor: '#800000',
    fontSize: 15, 
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
  },
  inputErro: { borderColor: '#FF0000' }, // Borda vermelha se houver erro
  textoErro: { color: '#FF0000', marginTop: 6, fontSize: 13 }, // Estilo da mensagem de erro
  botao: {
    backgroundColor: '#800000', 
    paddingVertical: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10, 
    shadowColor: '#4B0082', // Cor da sombra
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 6, // Raio da sombra
  },
  textoBotao: {
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 17, 
    letterSpacing: 0.5, // Espaçamento entre letras
  },
});
