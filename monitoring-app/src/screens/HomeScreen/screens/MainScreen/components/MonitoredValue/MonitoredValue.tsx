import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { defaultFontStyle } from '@utils';


interface MonitoredValueProps {
  value: number;
  title: string;
  unit?: string;
  formatter?: Formatter;
  icon?: ReactNode;
}

type Formatter = (value: number) => string;

export const MonitoredValue = ({ value, title, icon, unit, formatter }: MonitoredValueProps) => {
  const iconItem = icon ? <View style={styles.iconContainer}>{icon}</View> : null;
  const unitItem = unit ? <Text>{unit}</Text> : null;
  const displayValue = formatter ? formatter(value) : value;

  return (
    <View style={styles.container}>
      {iconItem}
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{displayValue}</Text>
          {unitItem}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#DFE5EA',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 20,
  },
  itemText: {
    // color: "#fff",
    ...defaultFontStyle,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    marginRight: 5,
    fontSize: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
