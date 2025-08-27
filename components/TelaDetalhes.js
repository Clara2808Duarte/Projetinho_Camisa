import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function TelaDetalhes({ route }) {
  // Recebe o produto enviado pela navegação
  const { produto } = route.params;

  // Arrays de cores e tamanhos disponíveis
  const coresDisponiveis = ['Branco', 'Preto', 'Azul', 'Vermelho'];
  const tamanhosDisponiveis = ['P', 'M', 'G', 'GG'];

  // --- Estados do frete ---
  const [cep, setCep] = useState(''); // CEP digitado
  const [metodoEntrega, setMetodoEntrega] = useState('Econômica'); // Método selecionado
  const [erroCep, setErroCep] = useState(''); // Mensagem de erro do CEP

  // --- Funções utilitárias ---
  // Remove todos os caracteres que não sejam números
  const somenteDigitos = (texto) => texto.replace(/\D/g, '');

  // Valida se o CEP tem 8 dígitos
  const validarCep = (valor) => {
    const limpo = somenteDigitos(valor);
    if (limpo.length !== 8) {
      setErroCep('CEP inválido. Deve ter 8 dígitos.');
      return false;
    }
    setErroCep('');
    return true;
  };

  // Calcula o frete baseado no CEP e no método de entrega
  const calcularFrete = () => {
    let base = metodoEntrega === 'Econômica' ? 12.9 : 29.9;
    const cepLimpo = somenteDigitos(cep);

    if (cepLimpo.length === 8) {
      const primeiro = cepLimpo[0];
      const ultimo = cepLimpo[7];
      if (['0', '1', '2'].includes(primeiro)) base += 5; // acréscimo dependendo do CEP
      if (Number(ultimo) % 2 === 0) base -= 2; // desconto se último dígito par
    }
    return Math.max(base, 0).toFixed(2);
  };

  // Componente para os botões de método de entrega
  const BotaoEntrega = ({ valor, rotulo }) => {
    const ativo = metodoEntrega === valor; // Verifica se o botão está ativo
    return (
      <TouchableOpacity
        onPress={() => setMetodoEntrega(valor)}
        style={[estilos.botaoEntrega, ativo && estilos.botaoEntregaAtivo]}
      >
        <Text style={[estilos.textoEntrega, ativo && estilos.textoEntregaAtivo]}>
          {rotulo}
        </Text>
      </TouchableOpacity>
    );
  };

  // Função que confirma a compra
  const confirmarCompra = () => {
    if (!validarCep(cep)) {
      Alert.alert('Erro', 'Digite um CEP válido antes de continuar.');
      return;
    }
    Alert.alert(
      'Pedido confirmado!',
      `Produto: ${produto.nome}\nFrete: R$ ${calcularFrete()}\nMétodo: ${metodoEntrega}`
    );
  };

  return (
    // KeyboardAvoidingView ajusta o layout quando o teclado aparece
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ScrollView permite rolar a tela quando o teclado aparece */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // permite clicar nos botões sem fechar o teclado
        style={estilos.container}
      >
        {/* Imagem e informações do produto */}
        <Image source={produto.imagem} style={estilos.imagem} />
        <Text style={estilos.nome}>{produto.nome}</Text>
        <Text style={estilos.descricao}>
          Camiseta oficial do time {produto.nome}. Confeccionada em material de
          alta qualidade, ideal para torcedores apaixonados.
        </Text>

        {/* Cores disponíveis */}
        <Text style={estilos.tituloSecao}>Cores disponíveis</Text>
        <View style={estilos.tags}>
          {coresDisponiveis.map((cor) => (
            <View key={cor} style={estilos.tag}>
              <Text style={estilos.textoTag}>{cor}</Text>
            </View>
          ))}
        </View>

        {/* Tamanhos disponíveis */}
        <Text style={estilos.tituloSecao}>Tamanhos disponíveis</Text>
        <View style={estilos.tags}>
          {tamanhosDisponiveis.map((tamanho) => (
            <View key={tamanho} style={estilos.tag}>
              <Text style={estilos.textoTag}>{tamanho}</Text>
            </View>
          ))}
        </View>

        {/* Seção de frete */}
        <Text style={estilos.tituloSecao}>Calcular frete</Text>
        <TextInput
          placeholder="Digite um CEP" // Placeholder funcionando
          placeholderTextColor="#999"
          value={cep}
          onChangeText={(t) => setCep(t)}
          onBlur={() => validarCep(cep)}
          style={[estilos.input, erroCep && estilos.inputErro]}
          keyboardType="numeric"
          maxLength={9}
        />
        {erroCep ? <Text style={estilos.textoErro}>{erroCep}</Text> : null}

        {/* Seleção de método de entrega */}
        <View style={{ marginTop: 10 }}>
          <Text style={estilos.subtitulo}>Método de entrega</Text>
          <View style={estilos.linhaEntrega}>
            <BotaoEntrega valor="Econômica" rotulo="Econômica" />
            <BotaoEntrega valor="Expressa" rotulo="Expressa" />
          </View>
          <Text style={estilos.textoFrete}>
            Frete estimado: <Text style={estilos.negrito}>R$ {calcularFrete()}</Text>
          </Text>
        </View>

        {/* Botão de confirmar compra */}
        <TouchableOpacity style={estilos.botaoConfirmar} onPress={confirmarCompra}>
          <Text style={estilos.textoBotaoConfirmar}>Confirmar Compra</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- Estilos ---
const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Fundo branco

  imagem: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  nome: { fontSize: 24, fontWeight: '700', color: '#800020', marginBottom: 10 }, // Bordô
  descricao: { fontSize: 14, color: '#333', marginBottom: 20 },

  tituloSecao: {
    fontSize: 16,
    fontWeight: '700',
    color: '#800020', // Bordô
    marginBottom: 10,
  },
  subtitulo: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5E5E5', // tom claro de bordô
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  textoTag: { color: '#800020', fontWeight: '600' },

  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff', // fundo branco
    marginBottom: 6,
    color: '#333',
  },
  inputErro: { borderColor: '#e74c3c', backgroundColor: '#fffef6' }, // erro
  textoErro: { color: '#e74c3c', fontSize: 12 },

  linhaEntrega: { flexDirection: 'row', gap: 10, marginTop: 4 },
  botaoEntrega: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  botaoEntregaAtivo: { borderColor: '#800020', backgroundColor: '#FDECEC' }, // Bordô claro
  textoEntrega: { color: '#333', fontWeight: '600' },
  textoEntregaAtivo: { color: '#800020' },

  textoFrete: { marginTop: 8, fontSize: 14, color: '#333' },
  negrito: { fontWeight: '800' },

  botaoConfirmar: {
    marginVertical: 15, // botão mais para cima
    padding: 14,
    backgroundColor: '#800020', // Bordô
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoConfirmar: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
