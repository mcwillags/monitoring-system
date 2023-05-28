import { StyleSheet, Text } from 'react-native';

export const generateAuthError = (touched: boolean, error: string | null) => {
  if (!touched || error === null) return null;

  return <Text style={styles.formError}>{error}</Text>;
};

const styles = StyleSheet.create({
  formError: {
    fontSize: 12,
    color: '#9d3e3e',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
