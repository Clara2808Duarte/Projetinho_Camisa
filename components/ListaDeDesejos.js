import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaDeDesejos({ navigation }) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  const carregarLista = async () => {
    const listaSalva = await AsyncStorage.getItem('listaDesejos');
    if (listaSalva) setLista(JSON.parse(listaSalva));
  };

  const removerItem = async (id) => {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
    await AsyncStorage.setItem('listaDesejos', JSON.stringify(novaLista));
    Alert.alert('Removido!', 'O item foi excluído da lista.');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Minha Lista de Desejos </Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Image source={item.imagem} style={estilos.imagem} />
            <Text style={estilos.nome}>{item.nome}</Text>
            <TouchableOpacity
              style={estilos.botaoExcluir}
              onPress={() => removerItem(item.id)}>
              <Text style={{ color: '#fff' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum item na sua lista </Text>}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#800000',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagem: { width: 60, height: 60, resizeMode: 'contain' },
  nome: { flex: 1, marginLeft: 10, fontWeight: '600' },
  botaoExcluir: { backgroundColor: 'red', padding: 8, borderRadius: 6 },
});
