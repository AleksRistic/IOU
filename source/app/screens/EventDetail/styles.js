import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  imgBanner: {
    width: '100%',
    height: 250,
    position: 'absolute',
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  blockView: {
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  linePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  line: {
    width: '100%',
    height: 1,
    borderWidth: 0.5,
    borderColor: BaseColor.grayColor,
    marginTop: 15,
    marginBottom: 15,
  },
  topLine: {
    width: '100%',
    height: 1,
    borderWidth: 0.5,
    borderColor: BaseColor.grayColor,
    marginBottom: 15,
  },
  iconRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  PayButton: {
    height: 40,
  },
  ProfileDet: {
    paddingBottom: 5,
  },
});
