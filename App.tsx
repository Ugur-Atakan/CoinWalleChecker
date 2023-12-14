import { StyleSheet, View } from 'react-native';
import WalletCheckPage from './screens/CheckWallet';
export default function App() {
  
  return (
    <View style={styles.container}>
     <WalletCheckPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
