import { Animated, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

interface BluetoothScanProps {
  isActive: boolean;
}

export const BluetoothScan = ({ isActive }: BluetoothScanProps) => {
  if (!isActive) return <View style={styles.animationContainer} />;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        delay: 350,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const opacityInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const getSizeInterpolation = (size: number) => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', size * 10 + '%'],
    });
  };

  return (
    <View style={styles.animationContainer}>
      <Animated.View
        style={{
          ...styles.semiCircle,
          opacity: opacityInterpolation,
          height: getSizeInterpolation(2),
          width: getSizeInterpolation(2),
        }}
      />

      <Animated.View
        style={{
          ...styles.semiCircle,
          opacity: opacityInterpolation,
          height: getSizeInterpolation(4),
          width: getSizeInterpolation(4),
        }}
      />

      <Animated.View
        style={{
          ...styles.semiCircle,
          opacity: opacityInterpolation,
          height: getSizeInterpolation(6),
          width: getSizeInterpolation(6),
        }}
      />

      <View style={styles.bluetoothIconContainer}>
        <Feather name="bluetooth" size={20} color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bluetoothIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 100,
    backgroundColor: '#fff',
  },
  semiCircle: {
    borderColor: 'blue',
    width: 50,
    height: 35,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 200,
    position: 'absolute',
    zIndex: 0,
  },
});
