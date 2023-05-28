import { StyleSheet, View } from 'react-native';

export const HorizontalLine = () => {
  return <View style={styles.horizontalLine} />;
};

const styles = StyleSheet.create({
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#504f4f',
    marginVertical: 20,
    opacity: 0.7,
  },
});
