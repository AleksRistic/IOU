import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, View, Animated} from 'react-native';
import {BaseStyle, useTheme, Images} from '@config';
import {UserData} from '@data';
import {Header, SafeAreaView, Icon, EventItem, FilterSort} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import * as Utils from '@utils';
import {EventListData} from '@data';
import {
  getEvents,
  getInvitedUsers,
  getUserFullName,
} from '../../services/getData';

export default function Event({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );

  console.log({hostNames});
  const eventImages = [Images.trip1, Images.trip2, Images.trip3];

  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState('block');
  const [eventList, setEventList] = useState([]);
  const [hostNames, setHostNames] = useState([]);

  useEffect(() => {
    async function getEventData() {
      const data = await getEvents(1);

      let hostArray = [];
      for (let event of data) {
        const host = await getHostNames(event.host);
        console.log('#@$#@(%&$@#(%&#$(%&#$%#$$#%($#&%($#');
        console.log(host);
        hostArray.push(host);
      }
      console.log({hostArray});
      setHostNames(hostArray);
      setEventList(data);
    }

    async function getHostNames(hostID) {
      const data = await getUserFullName(hostID);
      return data;
    }

    getEventData();
  }, []);

  /**
   * call when on change Sort
   */
  const onChangeSort = () => {};

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate('EventFilter');
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    Utils.enableExperimental();
    switch (modeView) {
      case 'block':
        setModeView('grid');
        break;
      case 'grid':
        setModeView('list');
        break;
      case 'list':
        setModeView('block');
        break;
      default:
        setModeView('block');
        break;
    }
  };

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    switch (modeView) {
      case 'block':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              showsVerticalScrollIndicator={false}
              data={eventList}
              key={'block'}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <EventItem
                  block
                  eventList
                  hostNames={hostNames[index]}
                  image={eventImages[index]}
                  title={item.event_name}
                  // subtitle={item.name}
                  location={item.event_address}
                  tracking={''}
                  rate={''}
                  status={''}
                  price={item.total_expense}
                  priceSale={item.total_expense}
                  eventType={'party'}
                  time={item.event_date}
                  user={UserData}
                  numTicket={400}
                  liked={true}
                  onPress={() =>
                    navigation.navigate('EventDetail', {
                      eventList: eventList[index],
                    })
                  }
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      case 'grid':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={eventList}
              key={'gird'}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <EventItem
                  grid
                  eventList
                  image={Images.event1}
                  title={item.event_name}
                  // subtitle={item.name}
                  location={item.event_address}
                  tracking={''}
                  rate={''}
                  status={''}
                  price={item.total_expense}
                  priceSale={''}
                  eventType={'party'}
                  time={item.event_date}
                  user={UserData}
                  numTicket={'400'}
                  liked={true}
                  style={{marginLeft: 15, marginBottom: 20}}
                  onPress={() =>
                    navigation.navigate('EventDetail', {
                      eventList: eventList[0],
                    })
                  }
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{translateY: navbarTranslate}],
                },
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case 'list':
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
            }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              showsVerticalScrollIndicator={false}
              data={eventList}
              key={'list'}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <EventItem
                  list
                  eventList
                  image={Images.event1}
                  title={item.event_name}
                  // subtitle={item.name}
                  location={item.event_address}
                  tracking={''}
                  rate={''}
                  status={''}
                  price={item.total_expense}
                  priceSale={''}
                  eventType={'party'}
                  time={item.event_date}
                  user={UserData}
                  numTicket={'400'}
                  liked={true}
                  style={{
                    marginBottom: 20,
                  }}
                  onPress={() =>
                    navigation.navigate('EventDetail', {
                      eventList: eventList[0],
                    })
                  }
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{translateY: navbarTranslate}],
                },
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              showsVerticalScrollIndicator={false}
              data={eventList}
              key={'block'}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <EventItem
                  block
                  eventList
                  image={Images.event1}
                  title={item.event_name}
                  // subtitle={item.name}
                  location={item.event_address}
                  tracking={''}
                  rate={''}
                  status={''}
                  price={item.total_expense}
                  priceSale={''}
                  eventType={'party'}
                  time={item.event_date}
                  user={UserData}
                  numTicket={'400'}
                  liked={true}
                  onPress={() =>
                    navigation.navigate('EventDetail', {
                      eventList: eventList[0],
                    })
                  }
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('event')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('SearchHistory');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {renderList()}
      </SafeAreaView>
    </View>
  );
}
