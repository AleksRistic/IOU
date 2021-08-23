import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileGroup,
  Tag,
  Image,
  Button,
  EventCard,
  ProfileDetail,
  FlightItem,
  FlightPlan,
  EventInvitationModal,
} from '@components';
import {
  getEventDetails,
  getUserExpenses,
  getUserFullName,
  getInvitedUsers,
} from '../../services/getData';
import {useTranslation} from 'react-i18next';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Utils from '@utils';
import {dateDiffInDays} from '@utils';
import styles from './styles';
import moment from 'moment';

export default function EventDetail({route, navigation}) {
  const deltaY = new Animated.Value(0);
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const {eventList} = route.params;

  const [hostName, setHostName] = useState();
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [totalExpense, setTotalExpense] = useState();
  const [invitedUsers, setInvitedUsers] = useState('');

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [region] = useState({
    latitude: 1.352083,
    longitude: 103.819839,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });
  const [facilities] = useState([
    {id: '1', icon: 'wifi', name: 'Free Wifi', checked: true},
    {id: '2', icon: 'bath', name: 'Shower'},
    {id: '3', icon: 'paw', name: 'Pet Allowed'},
    {id: '4', icon: 'bus', name: 'Shuttle Bus'},
    {id: '5', icon: 'cart-plus', name: 'Supper Market'},
    {id: '6', icon: 'clock', name: 'Open 24/7'},
  ]);
  const [relate] = useState([
    {
      id: '0',
      image: Images.event4,
      title: 'BBC Music Introducing',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
    {
      id: '1',
      image: Images.event5,
      title: 'Bearded Theory Spring Gathering',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
  ]);

  function openModal() {
    if (!open) {
      setOpen(true);
    }
  }

  function openToggle() {
    setOpen(false);
  }

  useEffect(() => {
    async function getHostName() {
      const result = await getUserFullName(eventList.host);
      setHostName(result);
    }

    async function getExpenses() {
      const result = await getUserExpenses(1, eventList.event_id);
      setExpenses(result);

      let total = 0;
      for (let expense of result) {
        total += expense.total_user_expense;
      }
      setTotalExpense(total);
    }

    async function getDetails() {
      const result = await getEventDetails(eventList.event_id);
      setStartTime(result[0].start_time);
      setEndTime(result[0].end_time);
      setDescription(result[0].description);
    }

    async function getEventUsers() {
      const result = await getInvitedUsers(eventList.event_id);
      setInvitedUsers(result);
    }

    getHostName();
    getExpenses();
    getDetails();
    getEventUsers();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}>
        <Image source={Images.trip1} style={{flex: 1}} />
        <Animated.View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            width: '100%',
            bottom: 15,
            opacity: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [1, 0, 0],
            }),
          }}>
          <View style={styles.rowBanner}>
            <Image source={Images.profile2} style={styles.userIcon} />
            <View style={{alignItems: 'flex-start'}}>
              <Text headline semibold whiteColor>
                {hostName}
              </Text>
              <Text footnote whiteColor>
                {`Host | ${invitedUsers.length} Member(s)`}
              </Text>
            </View>
          </View>
          <Tag rateSmall>Party</Tag>
        </Animated.View>
      </Animated.View>
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.whiteColor}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('PreviewImage');
        }}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View style={{height: 255 - heightHeader}} />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <Text title1 semibold numberOfLines={1} style={{marginTop: 10}}>
              {eventList.event_name}
            </Text>
            <View style={styles.line} />
            {invitedUsers !== '' && (
              <ProfileGroup
                name={
                  invitedUsers.length > 3
                    ? `${invitedUsers[0].user_name.split(' ')[0]}, ${
                        invitedUsers[1].user_name.split(' ')[0]
                      }, ${invitedUsers[2].user_name.split(' ')[0]}`
                    : `${invitedUsers[0].user_name}`
                }
                detail={
                  invitedUsers.length > 3
                    ? `and ${invitedUsers.length - 3} others are attending`
                    : `and ${invitedUsers.length - 1} others are attending`
                }
                users={[
                  {image: Images.profile1},
                  {image: Images.profile3},
                  {image: Images.profile4},
                ]}
                onPress={() => openModal()}
              />
            )}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text body2 semibold style={{marginTop: 0}}>
                Date/Time
              </Text>
              <Text body2 grayColor style={{marginTop: 5, marginBottom: 10}}>
                {/* Mon Sep 29, 2021 */}
                {moment(eventList.event_date).format('LL')}
              </Text>
              {/* <Text body2 headline semibold>
                Time
              </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text body2>Start Time</Text>
                  <Text body2 accentColor semibold>
                    {/* {eventDetails.start_time} */}
                    {moment(startTime).format('LT')}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text body2>End Time</Text>
                  <Text body2 accentColor semibold>
                    {/* {eventList.end_time} */}
                    {moment(endTime).format('LT')}
                  </Text>
                </View>
              </View>
            </View>
            <Text body2 semibold>
              {t('address')}
            </Text>
            <Text body2 grayColor style={{marginVertical: 10}}>
              {eventList.event_address}
            </Text>
            <View
              style={{
                height: 180,
              }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChange={() => {}}>
                <Marker
                  coordinate={{
                    latitude: 1.352083,
                    longitude: 103.819839,
                  }}
                />
              </MapView>
            </View>
            <Text body2 semibold style={{marginTop: 20, marginBottom: 10}}>
              {t('description')}
            </Text>
            <Text body2 grayColor lineHeight={20}>
              {/* {eventDetails.description} */}
              {description}
            </Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text caption1 accentColor>
                {t('see_details')}
              </Text>
            </View>
            <View style={styles.linePrice}>
              <Text title3 semibold>
                Expenses
              </Text>
              <View style={styles.iconRight}>
                <Icon name={'apple-pay'} size={40} />
              </View>
            </View>
            <View style={styles.topLine} />
            {expenses.map((data, index) => (
              <SafeAreaView
                style={BaseStyle.safeAreaView}
                edges={['right', 'left', 'bottom']}>
                <ScrollView>
                  <View style={styles.contain}>
                    <FlightItem
                      from={{
                        name: 'United State',
                        value: 'Created On',
                        image: Images.profile1,
                        hour: moment(data.created_on).format('LL'),
                      }}
                      to={{
                        name: 'Singapore',
                        value: 'Due',
                        image: Images.profile2,
                        hour: moment(data.due_on).format('LL'),
                      }}
                      totalHour={dateDiffInDays(
                        new Date(),
                        new Date(data.due_on),
                      )}
                      brand={data.recipient_name}
                      image={Images.profile1}
                      type={data.description}
                      price={`$${data.total_user_expense}`}
                      route="non_stop"
                      onPress={() =>
                        navigation.navigate('FlightTicket', {
                          data,
                          hostName,
                          eventList,
                        })
                      }
                    />
                  </View>
                </ScrollView>
                <View style={styles.line} />
              </SafeAreaView>
            ))}
            <View style={styles.ProfileDet}>
              <ProfileDetail
                image={Images.profile1}
                textFirst={hostName}
                point={'9.5'}
                textSecond={'Event Host'}
                textThird={'@AleksRistic'}
                style={{paddingHorizontal: 20}}
                onPress={() => navigation.navigate('Profile1')}
              />
            </View>
            <Text
              title3
              semibold
              style={{
                paddingTop: 10,
              }}>
              {t('facilities')}
            </Text>

            <View style={[styles.wrapContent, {borderColor: colors.border}]}>
              {facilities.map(item => {
                return (
                  <Tag
                    icon={
                      <Icon
                        name={item.icon}
                        size={12}
                        color={colors.accent}
                        solid
                        style={{marginRight: 5}}
                      />
                    }
                    chip
                    key={item.id}
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                    }}>
                    {item.name}
                  </Tag>
                );
              })}
            </View>
          </View>
          <Text
            title3
            semibold
            style={{
              marginLeft: 20,
              marginBottom: 20,
            }}>
            {t('you_may_also_like')}
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingLeft: 5,
              paddingRight: 20,
              marginBottom: 20,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={relate}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <EventCard
                image={item.image}
                title={item.title}
                time={item.time}
                location={item.location}
                onPress={() => navigation.navigate('PreviewBooking')}
                style={{marginLeft: 15}}
              />
            )}
          />
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold grayColor>
              Price CAD
            </Text>
            <Text title3 primaryColor semibold>
              {`$${totalExpense}`}
            </Text>
            <Text caption1 semibold grayColor style={{marginTop: 5}}>
              All Expenses Included
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('FlightSummary')}>
            <Icon name="apple-pay" size={40}>
              {/* <Text style={{fontSize: 20}}> Total</Text> */}
            </Icon>
            {/* </View> */}
          </Button>
        </View>
      </SafeAreaView>
      {invitedUsers !== '' && (
        <EventInvitationModal
          invitedUsers={invitedUsers}
          open={open}
          openToggle={openToggle}
          navigation={navigation}
        />
      )}
    </View>
  );
}
