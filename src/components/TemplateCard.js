import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;

const TemplateCard = ({ template, selected, onSelect, theme }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: theme.surface,
          borderColor: selected ? theme.primary : theme.border,
        }
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: template.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {selected && (
          <View style={[styles.selectedBadge, { backgroundColor: theme.primary }]}>
            <Feather name="check" size={16} color={theme.buttonText} />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]}>
          {template.name}
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {template.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    marginRight: 20,
  },
  imageContainer: {
    height: cardWidth * 0.8,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default TemplateCard;
