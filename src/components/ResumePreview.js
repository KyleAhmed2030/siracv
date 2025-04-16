import React, { forwardRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';
import Template5 from '../templates/Template5';

const ResumePreview = forwardRef(({ data }, ref) => {
  // Select the appropriate template based on the template ID
  const renderTemplate = () => {
    switch (data.template) {
      case 'template1':
        return <Template1 data={data} />;
      case 'template2':
        return <Template2 data={data} />;
      case 'template3':
        return <Template3 data={data} />;
      case 'template4':
        return <Template4 data={data} />;
      case 'template5':
        return <Template5 data={data} />;
      default:
        return <Template1 data={data} />;
    }
  };

  return (
    <View style={styles.container} ref={ref} collapsable={false}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderTemplate()}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
});

export default ResumePreview;
