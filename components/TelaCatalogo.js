import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import ListaDeDesejos from './ListaDeDesejos';

const camisetas = [
  { id: '1', nome: 'Palmeiras 2025', imagem: CamisetaPalmeiras },
  { id: '2', nome: 'Flamengo 2025', imagem: CamisetaFlamengo },
  { id: '3', nome: 'São Paulo 2025', imagem: CamisetaSP },
  { id: '4', nome: 'Corinthians 2025', imagem: CamisetaCorinthians },
  { id: '5', nome: 'Botafogo 2025', imagem: CamisetaBotafogo },
  { id: '6', nome: 'Chelsea 2025', imagem: CamisetaChelsea },
  { id: '7', nome: 'Real Madrid 2025', imagem: CamisetaRM },
  { id: '8', nome: 'Liverpool 2025', imagem: CamisetaLiverpool },
  { id: '9', nome: 'Paris Saint-Germain 2025', imagem: CamisetaPSG },
  { id: '10', nome: 'Manchester United 2025', imagem: CamisetaMC },
];

export default function TelaCatalogo({ navigation }) {
  const [apelido, setApelido] = useState('');

  useEffect(() => {
    const carregarUsuario = async () => {
      const salvo = await AsyncStorage.getItem('usuarioLogado');
      if (salvo) setApelido(salvo);
    };
    carregarUsuario();
  }, []);

  return (
    <View style={estilos.container}>
      <Text style={estilos.saudacao}> Bem-vindo, {apelido} 👋!</Text>
      <TouchableOpacity
        style={estilos.lista}
        onPress={() => navigation.navigate('ListaDeDesejos')}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Lista de Desejos 😉
        </Text>
      </TouchableOpacity>

      <FlatList
        data={camisetas}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.item}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}>
            <Image source={item.imagem} style={estilos.imagem} />
            <Text style={estilos.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  saudacao: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#800000',
  },
  item: {
    flex: 1,
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#800000',
  },
  imagem: { width: 120, height: 120, resizeMode: 'contain' },
  nome: {
    marginTop: 8,
    fontWeight: '700',
    color: '#800000',
    textAlign: 'center',
  },
  lista:{
    backgroundColor: '#800000'

  }
});
