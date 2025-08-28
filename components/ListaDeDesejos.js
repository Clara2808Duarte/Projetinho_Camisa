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

// Importa imagens para mapear
import CamisetaSP from '../assets/CamisetaSPfrente.png';
import CamisetaCorinthians from '../assets/CamisetaCorinthiansfrente.png';
import CamisetaFlamengo from '../assets/CamisetaFlamengofrente.png';
import CamisetaPalmeiras from '../assets/CamisetaPalmeirasfrente.png';
import CamisetaBotafogo from '../assets/CamisetaBotafogofrente.png';
import CamisetaChelsea from '../assets/CamisetaChelseafrente.png';
import CamisetaRM from '../assets/CamisetaRMfrente.png';
import CamisetaPSG from '../assets/CamisetaPSGfrente.png';
import CamisetaMC from '../assets/CamisetaMCfrente.png';
import CamisetaLiverpool from '../assets/CamisetaLiverpoolfrente.png';

const camisetas = {
  1: CamisetaPalmeiras,
  2: CamisetaFlamengo,
  3: CamisetaSP,
  4: CamisetaCorinthians,
  5: CamisetaBotafogo,
  6: CamisetaChelsea,
  7: CamisetaRM,
  8: CamisetaLiverpool,
  9: CamisetaPSG,
  10: CamisetaMC,
};

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
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detalhes', { produto: item })
              }>
              <Image source={imagens[item.id]} style={estilos.imagem} />
              <Text style={estilos.nome}>{item.nome}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.botaoExcluir}
              onPress={() => removerItem(item.id)}>
              <Text style={{ color: '#fff' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum item na sua lista 😢</Text>}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  imagem: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  nome: {
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  botaoExcluir: {
    backgroundColor: '#800000',
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },
});
