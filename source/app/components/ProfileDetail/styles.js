import {BaseColor} from '@config';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {flexDirection: 'row'},
  contentLeft: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
  },
  contentRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  point: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 9,
    bottom: 0,
  },
});
