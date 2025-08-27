// Importa hooks e componentes básicos do React Native
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

// Componente principal da tela de detalhes
export default function TelaDetalhes({ route }) {
  // Recebe o produto enviado via navegação
  const { produto } = route.params;

  // --- Arrays de cores e tamanhos disponíveis ---
  const coresDisponiveis = ['Branco', 'Preto', 'Azul', 'Vermelho']; // Cores para exibir na tela
  const tamanhosDisponiveis = ['P', 'M', 'G', 'GG']; // Tamanhos disponíveis

  // --- Estados do frete ---
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP digitado
  const [metodoEntrega, setMetodoEntrega] = useState('Econômica'); // Estado para método de entrega selecionado
  const [erroCep, setErroCep] = useState(''); // Estado para mensagem de erro de CEP

  // --- Estado da quantidade ---
  const [quantidade, setQuantidade] = useState(1); // Quantidade inicial do produto

  // --- Preço do produto ---
  const precoNumber = Number(produto.preco) || 139.99; // Converte preço para número ou usa 120 como padrão

  // --- Funções utilitárias ---
  const somenteDigitos = (texto) => texto.replace(/\D/g, ''); // Remove tudo que não for número

  const validarCep = (valor) => {
    // Função para validar se o CEP tem 8 dígitos
    const limpo = somenteDigitos(valor); // Remove caracteres não numéricos
    if (limpo.length !== 8) {
      // Se não tiver 8 dígitos
      setErroCep('CEP inválido. Deve ter 8 dígitos.'); // Define mensagem de erro
      return false; // Retorna false
    }
    setErroCep(''); // Limpa mensagem de erro
    return true; // Retorna true
  };

  // Função para calcular frete baseado no CEP e método de entrega
  const calcularFrete = () => {
    let base = metodoEntrega === 'Econômica' ? 12.9 : 29.9; // Valor base do frete
    const cepLimpo = somenteDigitos(cep); // Limpa o CEP

    if (cepLimpo.length === 8) {
      // Se o CEP estiver completo
      const primeiro = cepLimpo[0]; // Primeiro dígito
      const ultimo = cepLimpo[7]; // Último dígito
      if (['0', '1', '2'].includes(primeiro)) base += 5; // Acrescenta valor dependendo do CEP
      if (Number(ultimo) % 2 === 0) base -= 2; // Desconto se último dígito for par
    }
    return Math.max(base, 0); // Retorna valor mínimo 0
  };

  // Função para calcular total: preço * quantidade + frete
  const calcularTotal = () => {
    const frete = calcularFrete(); // Chama função de frete
    return (precoNumber * quantidade + frete).toFixed(2); // Retorna total com 2 casas decimais
  };

  // Componente para os botões de seleção de entrega
  const BotaoEntrega = ({ valor, rotulo }) => {
    const ativo = metodoEntrega === valor; // Verifica se botão está ativo
    return (
      <TouchableOpacity
        onPress={() => setMetodoEntrega(valor)} // Ao clicar, altera método
        style={[estilos.botaoEntrega, ativo && estilos.botaoEntregaAtivo]} // Aplica estilo ativo se necessário
      >
        <Text
          style={[estilos.textoEntrega, ativo && estilos.textoEntregaAtivo]}>
          {rotulo} {/* Texto do botão */}
        </Text>
      </TouchableOpacity>
    );
  };

  // Função para confirmar compra
  const confirmarCompra = () => {
    if (!validarCep(cep)) {
      // Se CEP inválido
      Alert.alert('Erro', 'Digite um CEP válido antes de continuar.'); // Mostra alerta
      return;
    }
    const frete = calcularFrete(); // Calcula frete
    Alert.alert(
      'Pedido confirmado!',
      `Produto: ${produto.nome}\nPreço unitário: R$ ${precoNumber.toFixed(
        2
      )}\nQuantidade: ${quantidade}\nFrete: R$ ${frete.toFixed(
        2
      )}\nTotal: R$ ${calcularTotal()}\nMétodo: ${metodoEntrega}` // Mostra detalhes
    );
  };

  // --- JSX da tela ---
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }} // Ocupa toda tela
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta comportamento para teclado
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }} // Permite rolagem total
        keyboardShouldPersistTaps="handled" // Permite clicar fora sem fechar teclado
        style={estilos.container} // Aplica estilo container
      >
        {/* Imagem do produto */}
        <Image source={produto.imagem} style={estilos.imagem} />
        <Text style={estilos.nome}>{produto.nome}</Text> {/* Nome do produto */}
        <Text style={estilos.preco}>R$ {precoNumber.toFixed(2)}</Text>{' '}
        {/* Preço do produto */}
        <Text style={estilos.descricao}>
          Camiseta oficial do time {produto.nome}. Confeccionada em material de
          alta qualidade, ideal para torcedores apaixonados.
        </Text>
        {/* Controle de quantidade */}
        <Text style={estilos.tituloSecao}>Quantidade</Text>
        <View style={estilos.linhaQuantidade}>
          {/* Botão diminuir */}
          <TouchableOpacity
            style={estilos.botaoQtd}
            onPress={() => setQuantidade((q) => Math.max(1, q - 1))} // Reduz quantidade, mínimo 1
          >
            <Text style={estilos.textoQtd}>-</Text>
          </TouchableOpacity>
          <Text style={estilos.numeroQtd}>{quantidade}</Text>{' '}
          {/* Mostra quantidade */}
          {/* Botão aumentar */}
          <TouchableOpacity
            style={estilos.botaoQtd}
            onPress={() => setQuantidade((q) => q + 1)} // Aumenta quantidade
          >
            <Text style={estilos.textoQtd}>+</Text>
          </TouchableOpacity>
        </View>
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
          placeholder="Digite um CEP" // Placeholder
          placeholderTextColor="#999" // Cor do placeholder
          value={cep} // Valor do estado
          onChangeText={(t) => setCep(t)} // Atualiza estado ao digitar
          onBlur={() => validarCep(cep)} // Valida ao perder foco
          style={[estilos.input, erroCep && estilos.inputErro]} // Aplica estilo de erro
          keyboardType="numeric" // Teclado numérico
          maxLength={9} // Máximo de caracteres
        />
        {erroCep ? <Text style={estilos.textoErro}>{erroCep}</Text> : null}{' '}
        {/* Mensagem de erro */}
        {/* Seleção de método de entrega */}
        <View style={{ marginTop: 10 }}>
          <Text style={estilos.subtitulo}>Método de entrega</Text>
          <View style={estilos.linhaEntrega}>
            <BotaoEntrega valor="Econômica" rotulo="Econômica" />
            <BotaoEntrega valor="Expressa" rotulo="Expressa" />
          </View>
          <Text style={estilos.textoFrete}>
            Frete estimado:{' '}
            <Text style={estilos.negrito}>R$ {calcularFrete().toFixed(2)}</Text>
          </Text>
        </View>
        {/* Valor total */}
        <Text style={estilos.textoTotal}>
          Total: <Text style={estilos.negrito}>R$ {calcularTotal()}</Text>
        </Text>
        {/* Botão de confirmar compra */}
        <TouchableOpacity
          style={estilos.botaoConfirmar}
          onPress={confirmarCompra}>
          <Text style={estilos.textoBotaoConfirmar}>Confirmar Compra</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- Estilos ---
const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Container principal

  imagem: {
    width: '100%',
    height: 250,
    resizeMode: 'contain', // Mantém proporção da imagem
    borderRadius: 10,
    marginBottom: 20,
  },
  nome: { fontSize: 24, fontWeight: '700', color: '#800020', marginBottom: 6 }, // Nome do produto
  preco: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 10 }, // Preço
  descricao: { fontSize: 14, color: '#333', marginBottom: 20 }, // Descrição

  tituloSecao: {
    fontSize: 16,
    fontWeight: '700',
    color: '#800020',
    marginBottom: 10,
  }, // Títulos de seção
  subtitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  }, // Subtítulos

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }, // Linha de tags
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5E5E5',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  textoTag: { color: '#800020', fontWeight: '600' }, // Texto das tags

  linhaQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  }, // Linha da quantidade
  botaoQtd: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDECEC',
  }, // Botões +/-
  textoQtd: { fontSize: 20, fontWeight: '700', color: '#800020' },
  numeroQtd: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    color: '#333',
  }, // Número da quantidade

  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 6,
    color: '#333',
  }, // Input CEP
  inputErro: { borderColor: '#e74c3c', backgroundColor: '#fffef6' }, // Input com erro
  textoErro: { color: '#e74c3c', fontSize: 12 }, // Texto de erro

  linhaEntrega: { flexDirection: 'row', gap: 10, marginTop: 4 }, // Linha dos botões de entrega
  botaoEntrega: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  botaoEntregaAtivo: { borderColor: '#800020', backgroundColor: '#FDECEC' }, // Botão ativo
  textoEntrega: { color: '#333', fontWeight: '600' },
  textoEntregaAtivo: { color: '#800020' },

  textoFrete: { marginTop: 8, fontSize: 14, color: '#333' },
  textoTotal: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  negrito: { fontWeight: '800' },

  botaoConfirmar: {
    marginVertical: 15,
    padding: 14,
    backgroundColor: '#800020',
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoConfirmar: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
