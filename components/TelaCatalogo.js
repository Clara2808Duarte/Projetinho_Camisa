import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// Importa os componentes do React Native:
// View: contêiner para organizar elementos
// Text: exibe textos
// FlatList: lista performática para exibir vários itens
// Image: exibe imagens
// TouchableOpacity: botão clicável com efeito de opacidade
// StyleSheet: cria estilos para os componentes

// Import das imagens locais das camisetas
import CamisetaSP from "../assets/CamisetaSPfrente.png";
import CamisetaCorinthians from "../assets/CamisetaCorinthiansfrente.png";
import CamisetaFlamengo from "../assets/CamisetaFlamengofrente.png";
import CamisetaPalmeiras from "../assets/CamisetaPalmeirasfrente.png";
import CamisetaBotafogo from "../assets/CamisetaBotafogofrente.png";
import CamisetaChelsea from "../assets/CamisetaChelseafrente.png";
import CamisetaRM from "../assets/CamisetaRMfrente.png";
import CamisetaPSG from "../assets/CamisetaPSGfrente.png";
import CamisetaMC from "../assets/CamisetaMCfrente.png";
import CamisetaLiverpool from "../assets/CamisetaLiverpoolfrente.png";

// Lista de camisetas com id, nome e imagem
const camisetas = [
  { id: "1", nome: "Palmeiras 2025", imagem: CamisetaPalmeiras },
  { id: "2", nome: "Flamengo 2025", imagem: CamisetaFlamengo },
  { id: "3", nome: "São Paulo 2025", imagem: CamisetaSP },
  { id: "4", nome: "Corinthians 2025", imagem: CamisetaCorinthians },
  { id: "5", nome: "Botafogo 2025", imagem: CamisetaBotafogo },
  { id: "6", nome: "Chelsea 2025", imagem: CamisetaChelsea },
  { id: "7", nome: "Real Madrid 2025", imagem: CamisetaRM },
  { id: "8", nome: "Liverpool 2025", imagem: CamisetaLiverpool },
  { id: "9", nome: "Paris Saint-Germain 2025", imagem: CamisetaPSG },
  { id: "10", nome: "Manchester United 2025", imagem: CamisetaMC },
];

export default function TelaCatalogo({ navigation }) {
  // Componente principal da tela de catálogo
  // navigation: usado para navegar para outras telas
  return (
    <View style={estilos.container}>
      {/* FlatList: lista performática de itens */}
      <FlatList
        data={camisetas} // dados da lista
        keyExtractor={(item) => item.id} // chave única para cada item
        numColumns={2} // 2 colunas
        columnWrapperStyle={{ justifyContent: "space-between" }} // espaçamento entre colunas
        renderItem={({ item }) => (
          // Cada item da lista é um botão clicável
          <TouchableOpacity
            style={estilos.item} // estilo do card
            onPress={() => navigation.navigate("Detalhes", { produto: item })}
            // ao clicar, navega para a tela de detalhes, passando o produto
          >
            {/* Imagem do produto */}
            <Image source={item.imagem} style={estilos.imagem} />
            {/* Nome do produto */}
            <Text style={estilos.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Estilos da tela
const estilos = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela
    padding: 12, // espaço interno
    backgroundColor: "#fff", // fundo branco
  },
  item: {
    flex: 1, // ocupa espaço disponível
    margin: 6, // espaço entre os cards
    alignItems: "center", // centraliza horizontalmente os elementos
    backgroundColor: "#fff", // fundo branco do card
    borderRadius: 10, // cantos arredondados
    padding: 10, // espaço interno
    borderWidth: 2, // espessura da borda
    borderColor: "#800000", // cor bordô da borda
  },
  imagem: {
    width: 120, // largura da imagem
    height: 120, // altura da imagem
    resizeMode: "contain", // ajusta a imagem sem cortar
  },
  nome: {
    marginTop: 8, // espaço acima do texto
    fontWeight: "700", // texto em negrito
    color: "#800000", // cor bordô do texto
    textAlign: "center", // centraliza o texto
  },
});
