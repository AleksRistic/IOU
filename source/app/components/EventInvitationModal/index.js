import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './styles';
// import {Icon, Text, Button, Image, ProfileAuthor} from '@components';
import PropTypes from 'prop-types';
import {BaseColor, BaseStyle, useTheme, Images} from '@config';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {UserData, ReviewData, TourData, PackageData} from '@data';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  ProfileDescription,
  ProfilePerformance,
  Tag,
  Text,
  Card,
  TourDay,
  TourItem,
  Button,
  PackageItem,
  RateDetail,
  CommentItem,
} from '@components';

export default function EventInvitationModal(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const backgroundColor = colors.background;
  const cardColor = colors.card;

  const [sortOption, setSortOption] = useState();
  const [openModal, setOpenModal] = useState();
  const [sortSelected, setSortSelected] = useState();
  const [invitedUsers, setInvitedUsers] = useState(props.invitedUsers);
  const [modalVisible, setModalVisible] = useState(props.open);

  const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   {key: 'Attending', title: 'Attending'},
  //   {key: 'Maybe', title: 'Maybe'},
  //   {key: 'Not Attending', title: 'Not Attending'},
  //   {key: 'All', title: 'All'},
  // ]);

  useEffect(() => {
    if (props.open === true) {
      setModalVisible(props.open);
    }
  }, [props.open]);

  const imageArray = [
    Images.profile1,
    Images.profile2,
    Images.profile3,
    Images.profile4,
  ];

  // Customize UI tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 130, alignItems: 'center'}}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // When tab is activated, set what's index value
  const handleIndexChange = index => setIndex(index);

  // const renderScene = SceneMap({
  //   Attending: All(invitedUsers),
  //   Maybe: All(invitedUsers),
  //   NotAttending: All(invitedUsers),
  //   All: All(invitedUsers),
  // });

  // // Render correct screen container when tab is activated
  // const renderScene = ({route, jumpTo}) => {
  //   // return (
  //   //   <ScrollView>
  //   //     <Text>HELLO</Text>
  //   //     <Text>HELLO</Text>
  //   //     <Text>HELLO</Text>
  //   //     <Text>HELLO</Text>
  //   //     <Text>HELLO</Text>
  //   //     <Text>HELLO</Text>
  //   //   </ScrollView>
  //   // );
  //   console.log(route.key);
  //   switch (route.key) {
  //     case 'Attending':
  //       console.log('&&&&&&&&&&*&*&*&*&*^&^^&^*^&^*^*^*&^*^&&&&&&&&&&&&&');
  //       return (
  //         <View>
  //           <Text>HESAFECSCE</Text>
  //         </View>
  //         // <Attending
  //         //   jumpTo={jumpTo}
  //         //   navigation={navigation}
  //         //   invitedUsers={invitedUsers}
  //         //   attendanceIcon={attendanceIcon}
  //         // />
  //       );
  //     case 'Maybe':
  //       console.log('#######################&&&&&&&&&&&&&&&&&&&&');
  //       return (
  //         <Maybe
  //           jumpTo={jumpTo}
  //           navigation={navigation}
  //           invitedUsers={invitedUsers}
  //           attendanceIcon={attendanceIcon}
  //         />
  //       );
  //     case 'NotAttending':
  //       console.log('&&&&&&&&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@@');
  //       return (
  //         <NotAttending
  //           jumpTo={jumpTo}
  //           navigation={navigation}
  //           invitedUsers={invitedUsers}
  //           attendanceIcon={attendanceIcon}
  //         />
  //       );
  //     case 'All':
  //       console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  //       return (
  //         <All
  //           jumpTo={jumpTo}
  //           navigation={navigation}
  //           invitedUsers={invitedUsers}
  //           attendanceIcon={attendanceIcon}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // const onOpenSort = () => {
  //   setModalVisible(true);
  // };

  const onApply = () => {
    const {onChangeSort} = props;
    const sorted = sortOption.filter(item => item.checked);
    if (sorted.length > 0) {
      setSortSelected(sorted[0]);
      setModalVisible(false);
      onChangeSort(sorted[0]);
    }
  };

  const iconModeView = modeView => {
    switch (modeView) {
      case 'block':
        return 'square';
      case 'grid':
        return 'th-large';
      case 'list':
        return 'th-list';
      default:
        return 'th-list';
    }
  };

  function attendanceIcon(attendanceStatus) {
    if (attendanceStatus === 'Attending') {
      return 'check-circle';
    } else if (attendanceStatus === 'Maybe') {
      return 'question-circle';
    } else if (attendanceStatus === 'Not Attending') {
      return 'times-circle';
    } else {
      return 'minus-circle';
    }
  }

  const {style, modeView, onFilter, onChangeView, labelCustom} = props;
  const customAction =
    modeView != '' ? (
      <TouchableOpacity onPress={onChangeView} style={styles.contentModeView}>
        <Icon
          name={iconModeView(modeView)}
          size={16}
          color={BaseColor.grayColor}
          solid
        />
      </TouchableOpacity>
    ) : (
      <Text headline grayColor numberOfLines={1} style={styles.contentModeView}>
        {labelCustom}
      </Text>
    );

  return (
    <View style={[styles.contain, {backgroundColor}, style]}>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          props.openToggle();
          setSortOption(props.sortOption);
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: cardColor}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <ScrollView scrollEnabled={true}>
            {/* <View style={{flex: 1}}>
              <TabView
                lazy
                navigationState={{index, routes}}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={handleIndexChange}
              />
            </View> */}
            {invitedUsers.map((user, index) => (
              <TouchableOpacity
                style={[
                  styles.contentActionModalBottom,
                  {borderBottomColor: colors.border},
                ]}
                key={user.user_id}
                //   onPress={() => onSelectFilter(user)}
              >
                <View style={styles.rowBanner}>
                  <View>
                    <Image
                      source={imageArray[index % 4]}
                      style={styles.thumb}
                    />
                    <View
                      style={[
                        styles.point,
                        {backgroundColor: colors.primaryLight},
                      ]}>
                      <Text overline whiteColor semibold>
                        <Icon
                          name={`${attendanceIcon(user.attendance_status)}`}
                        />
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'flex-start'}}>
                    <Text headline semibold whiteColor>
                      {user.user_name}
                    </Text>
                    <Text footnote whiteColor>
                      {'5 Mutual Friends | Seen'}
                    </Text>
                  </View>
                </View>
                <View style={styles.contentRight}>
                  <Text caption1 whiteColor numberOfLines={1}>
                    {user.attendance_status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button
            full
            style={{marginTop: 10, marginBottom: 20}}
            onPress={() => onApply()}>
            Attending
          </Button>
        </View>
      </Modal>
    </View>
  );
}
// function Attending({invitedUsers, attendanceIcon}) {
//   console.log(invitedUsers);
//   const {colors} = useTheme();
//   return invitedUsers.map(
//     (user, index) =>
//       invitedUsers.attendance_status === 'Attending' && (
//         <TouchableOpacity
//           style={[
//             styles.contentActionModalBottom,
//             {borderBottomColor: colors.border},
//           ]}
//           key={user.user_id}
//           //   onPress={() => onSelectFilter(user)}
//         >
//           <View style={styles.rowBanner}>
//             <View>
//               <Image source={Images.profile2} style={styles.thumb} />
//               <View
//                 style={[styles.point, {backgroundColor: colors.primaryLight}]}>
//                 <Text overline whiteColor semibold>
//                   <Icon name={`${attendanceIcon(user.attendance_status)}`} />
//                 </Text>
//               </View>
//             </View>
//             <View style={{alignItems: 'flex-start'}}>
//               <Text headline semibold whiteColor>
//                 {user.user_name}
//               </Text>
//               <Text footnote whiteColor>
//                 {'5 Mutual Friends | Seen'}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.contentRight}>
//             <Text caption1 whiteColor numberOfLines={1}>
//               {user.attendance_status}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ),
//   );
// }

// function Maybe({invitedUsers, attendanceIcon}) {
//   console.log(invitedUsers);
//   const {colors} = useTheme();
//   return invitedUsers.map(
//     (user, index) =>
//       invitedUsers.attendance_status === 'Maybe' && (
//         <TouchableOpacity
//           style={[
//             styles.contentActionModalBottom,
//             {borderBottomColor: colors.border},
//           ]}
//           key={user.user_id}
//           //   onPress={() => onSelectFilter(user)}
//         >
//           <View style={styles.rowBanner}>
//             <View>
//               <Image source={Images.profile2} style={styles.thumb} />
//               <View
//                 style={[styles.point, {backgroundColor: colors.primaryLight}]}>
//                 <Text overline whiteColor semibold>
//                   <Icon name={`${attendanceIcon(user.attendance_status)}`} />
//                 </Text>
//               </View>
//             </View>
//             <View style={{alignItems: 'flex-start'}}>
//               <Text headline semibold whiteColor>
//                 {user.user_name}
//               </Text>
//               <Text footnote whiteColor>
//                 {'5 Mutual Friends | Seen'}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.contentRight}>
//             <Text caption1 whiteColor numberOfLines={1}>
//               {user.attendance_status}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ),
//   );
// }

// function NotAttending({invitedUsers, attendanceIcon}) {
//   console.log(invitedUsers);
//   const {colors} = useTheme();
//   return invitedUsers.map(
//     (user, index) =>
//       invitedUsers.attendance_status === 'Not Attending' && (
//         <TouchableOpacity
//           style={[
//             styles.contentActionModalBottom,
//             {borderBottomColor: colors.border},
//           ]}
//           key={user.user_id}
//           //   onPress={() => onSelectFilter(user)}
//         >
//           <View style={styles.rowBanner}>
//             <View>
//               <Image source={Images.profile2} style={styles.thumb} />
//               <View
//                 style={[styles.point, {backgroundColor: colors.primaryLight}]}>
//                 <Text overline whiteColor semibold>
//                   <Icon name={`${attendanceIcon(user.attendance_status)}`} />
//                 </Text>
//               </View>
//             </View>
//             <View style={{alignItems: 'flex-start'}}>
//               <Text headline semibold whiteColor>
//                 {user.user_name}
//               </Text>
//               <Text footnote whiteColor>
//                 {'5 Mutual Friends | Seen'}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.contentRight}>
//             <Text caption1 whiteColor numberOfLines={1}>
//               {user.attendance_status}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ),
//   );
// }

// /**
//  * @description Show when tab Tour activated
//  * @class PreviewTab
//  * @extends {Component}
//  */
// function All({invitedUsers, attendanceIcon}) {
//   const {colors} = useTheme();
//   console.log(invitedUsers);
//   return invitedUsers.map((user, index) => (
//     <TouchableOpacity
//       style={[
//         styles.contentActionModalBottom,
//         {borderBottomColor: colors.border},
//       ]}
//       key={user.user_id}
//       //   onPress={() => onSelectFilter(user)}
//     >
//       <View style={styles.rowBanner}>
//         <View>
//           <Image source={Images.profile2} style={styles.thumb} />
//           <View style={[styles.point, {backgroundColor: colors.primaryLight}]}>
//             <Text overline whiteColor semibold>
//               <Icon name={`${attendanceIcon(user.attendance_status)}`} />
//             </Text>
//           </View>
//         </View>
//         <View style={{alignItems: 'flex-start'}}>
//           <Text headline semibold whiteColor>
//             {user.user_name}
//           </Text>
//           <Text footnote whiteColor>
//             {'5 Mutual Friends | Seen'}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.contentRight}>
//         <Text caption1 whiteColor numberOfLines={1}>
//           {user.attendance_status}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   ));
// }
