import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: 1,
    height: 14,
    backgroundColor: BaseColor.grayColor,
    marginLeft: 10,
  },
  contentModeView: {
    width: 30,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: 'center',
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
  contentActionModalBottom: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  ProfileDet: {
    paddingBottom: 5,
  },
  rowBanner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 5,
  },
  contentRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
  },
  point: {
    width: 12,
    height: 12,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 9,
    bottom: 0,
  },
});
