import { useState } from 'react'; 
import {
  View, // Agrupar outros componentes
  Text, // Exibie texto
  TextInput, // Receber entrada de texto do usuário
  TouchableOpacity, // Criar botões 
  Alert, // API para exibir alertas no app
  StyleSheet, 
  KeyboardAvoidingView, // Componente que ajusta a tela quando o teclado aparece
  Platform, // API para detectar sistema operacional (iOS ou Android)
} from 'react-native'; 

export default function TelaLogin({ navigation }) { 
  const [usuario, setUsuario] = useState(''); // Estado para armazenar o valor digitado no campo usuário
  const [senha, setSenha] = useState(''); // Estado para armazenar o valor digitado no campo senha
  const [erroUsuario, setErroUsuario] = useState(''); // Estado para armazenar mensagem de erro do usuário

  const validarLogin = () => { // ao clicar no botão "Entrar"
    if (!usuario.trim()) { // Verifica se o usuário não digitou nada (trim remove espaços)
      setErroUsuario('O usuário é obrigatório.'); // mensagem de erro para usuário vazio
      return; 
    } else {
      setErroUsuario(''); // Limpa a mensagem de erro se o usuário estiver preenchido
    }

    // Verificação de login fixo
    if (usuario === 'aluno' && senha === '123') { // Verifica se usuário e senha estão corretos
      Alert.alert('Sucesso!', 'Login realizado com sucesso.'); // Mostra alerta de sucesso
      navigation.navigate('Catalogo'); // Navega para a tela "Catalogo"
    } else {
      Alert.alert(':( Erro', 'Usuário ou senha incorretos.'); // Mostra alerta caso usuário ou senha estejam errados
    }
  };

  return ( // Retorna os elementos que serão renderizados na tela
    <KeyboardAvoidingView
      style={estilos.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Ajusta o comportamento do teclado no iOS
    >
      <View style={estilos.card}> 
        <Text style={estilos.titulo}> Time de Craques</Text> {/* Título da tela */}

        <View style={estilos.bloco}> 
          <Text style={estilos.rotulo}>Usuário</Text> {/* Rótulo do campo */}
          <TextInput
            placeholder="Digite seu usuário" 
            value={usuario}
            onChangeText={setUsuario} // Atualiza estado ao digitar
            style={[estilos.input, erroUsuario ? estilos.inputErro : null]} // Aplica estilo e altera borda se houver erro
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
            onChangeText={setSenha} // Atualiza estado 
            style={estilos.input} 
            placeholderTextColor="#aaa" // Cor do placeholder
            secureTextEntry // Oculta os caracteres digitados por ser senha
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
