import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export const BubbleProgress = () => {
  const circlePositions = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const bouncingAnimation = (index: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(circlePositions[index], {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(circlePositions[index], {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    circlePositions.forEach((_, index) => {
      setTimeout(() => {
        bouncingAnimation(index);
      }, index * 200);
    });
  }, []);

  const bubbleItems = circlePositions.map((item, index) => (
    <Animated.View
      key={index}
      style={{
        ...styles.circle,
        opacity: item,
        transform: [
          {
            scale: item.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }),
          },
        ],
      }}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>{bubbleItems}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#000',
    marginHorizontal: 5, // Adjust horizontal spacing between circles
  },
});
