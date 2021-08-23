import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    flex: 1,
  },
  contentActionBottom: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
});
