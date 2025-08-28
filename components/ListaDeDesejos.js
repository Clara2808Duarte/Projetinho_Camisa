// Importa hooks e componentes do React Native
import { useEffect, useState } from 'react';
import {
  View, // Componente contêiner
  Text, // Componente de texto
  FlatList, // Lista eficiente para exibir múltiplos itens
  Image, // Componente para mostrar imagens
  TouchableOpacity, // Botão clicável
  StyleSheet, // Para criar estilos
  Alert, // Para mostrar alertas na tela
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'; 
// AsyncStorage permite salvar e ler dados localmente no dispositivo

// Componente principal da tela ListaDeDesejos
export default function ListaDeDesejos({ navigation }) {
  // Estado para armazenar a lista de desejos
  const [lista, setLista] = useState([]);

  // useEffect executa uma função quando o componente é montado
  useEffect(() => {
    carregarLista(); // Carrega a lista de desejos do AsyncStorage
  }, []);

  // Função para carregar a lista do AsyncStorage
  const carregarLista = async () => {
    const listaSalva = await AsyncStorage.getItem('listaDesejos'); 
    // Recupera a lista salva
    if (listaSalva) {
      const listaConvertida = JSON.parse(listaSalva); 
      // Converte de string JSON para objeto
      setLista(listaConvertida); 
      // Atualiza o estado com a lista carregada
      Alert.alert(
        'Sucesso',
        'Seus itens foram carregados na lista de desejos!'
      ); // Mostra alerta de sucesso
    }
  };

  // Função para remover um item da lista
  const removerItem = async (id) => {
    // Filtra a lista removendo o item com o id correspondente
    const novaLista = lista.filter((item) => item.produto.id !== id);
    setLista(novaLista); 
    // Atualiza o estado
    await AsyncStorage.setItem('listaDesejos', JSON.stringify(novaLista));
    // Atualiza o AsyncStorage com a nova lista
    Alert.alert('Removido!', 'O item foi excluído da lista.'); 
    // Mostra alerta de remoção
  };

  // JSX do componente
  return (
    <View style={estilos.container}>
      {/* Título da tela */}
      <Text style={estilos.titulo}>Minha Lista de Desejos </Text>

      {/* FlatList para exibir a lista de desejos */}
      <FlatList
        data={lista} // Dados da lista
        keyExtractor={(item) => item.produto.id} // Chave única para cada item
        numColumns={2} // Exibe em 2 colunas
        columnWrapperStyle={{ justifyContent: 'space-between' }} 
        // Espaçamento entre colunas
        renderItem={({ item }) => (
          // Componente para cada item da lista
          <View style={estilos.item}>
            {/* Imagem do produto */}
            <Image source={item.produto.imagem} style={estilos.imagem} />
            {/* Nome do produto */}
            <Text style={estilos.nome}>{item.produto.nome}</Text>
            {/* Botão para remover item */}
            <TouchableOpacity
              style={estilos.botaoExcluir}
              onPress={() => removerItem(item.produto.id)}>
              <Text style={{ color: '#fff' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        // Texto exibido quando a lista está vazia
        ListEmptyComponent={<Text>Nenhum item na sua lista 😢</Text>}
      />
    </View>
  );
}

// Estilos da tela
const estilos = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#F5F5DC' }, // Container principal
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#800000',
  },
  item: {
    flex: 1, // Ocupa espaço proporcional
    alignItems: 'center', // Alinha itens ao centro
    justifyContent: 'space-between', // Espaço entre elementos
    borderWidth: 3, // Borda do item
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff', // Fundo branco
  },
  imagem: {
    width: 120, // Largura da imagem
    height: 120, // Altura da imagem
    resizeMode: 'contain', // Ajusta a imagem sem cortar
  },
  nome: {
    marginTop: 8, // Espaço acima do nome
    fontWeight: '600',
    textAlign: 'center', // Centraliza o texto
  },
  botaoExcluir: {
    backgroundColor: '#800000', // Cor de fundo
    padding: 8,
    borderRadius: 6,
    marginTop: 5, // Espaço acima do botão
  },
});
