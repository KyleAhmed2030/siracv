import { StyleSheet } from 'react-native';

/**
 * Global styles that can be reused throughout the app
 */
const globalStyles = {
  // Layout
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  
  // Margins
  margin: {
    margin: 16,
  },
  marginSmall: {
    margin: 8,
  },
  marginLarge: {
    margin: 24,
  },
  marginTop: {
    marginTop: 16,
  },
  marginBottom: {
    marginBottom: 16,
  },
  marginLeft: {
    marginLeft: 16,
  },
  marginRight: {
    marginRight: 16,
  },
  marginVertical: {
    marginVertical: 16,
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  
  // Paddings
  padding: {
    padding: 16,
  },
  paddingSmall: {
    padding: 8,
  },
  paddingLarge: {
    padding: 24,
  },
  paddingTop: {
    paddingTop: 16,
  },
  paddingBottom: {
    paddingBottom: 16,
  },
  paddingLeft: {
    paddingLeft: 16,
  },
  paddingRight: {
    paddingRight: 16,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  
  // Typography
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: 14,
  },
  captionText: {
    fontSize: 12,
  },
  italicText: {
    fontStyle: 'italic',
  },
  boldText: {
    fontWeight: 'bold',
  },
  center_text: {
    textAlign: 'center',
  },
  
  // Cards
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  cardElevated: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Input fields
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  
  // Buttons
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonOutline: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Utility
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roundedFull: {
    borderRadius: 9999,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  flexGrow: {
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  
  // Lists
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
  },
};

// Convert object to StyleSheet
const styles = StyleSheet.create(globalStyles);

export default styles;
