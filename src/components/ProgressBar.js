import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ total, current, color, trackColor }) => {
  const progress = (current / total) * 100;
  
  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: trackColor || '#E0E0E0' }]}>
        <View 
          style={[
            styles.progress, 
            { 
              width: `${progress}%`,
              backgroundColor: color || '#2196F3',
            }
          ]} 
        />
      </View>
      <Text style={styles.text}>{current}/{total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProgressBar;
