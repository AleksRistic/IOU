import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  FlightPlan,
  Text,
  FlightItem,
  Button,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {
  getEventDetails,
  getUserExpenses,
  getUserFullName,
  getInvitedUsers,
} from '../../services/getData';
import moment from 'moment';
import {dateDiffInDays} from '@utils';

export default function FlightSummary({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      const userExpenses = await getUserExpenses(1, 0);
      setExpenses(userExpenses);
    };
    getExpenses();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Payment Processing'}
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
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={styles.contain}>
            <FlightPlan
              round={true}
              fromCode="LEX"
              toCode="ALL"
              from="Aleksandar"
              to="Members"
            />
            <View style={styles.line} />
            {/* <Text title3 style={{paddingVertical: 10}}>
              {t('thur')}, 15 Aug 2019
            </Text> */}

            {expenses.map((data, index) => (
              <>
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
                  totalHour={dateDiffInDays(new Date(), new Date(data.due_on))}
                  brand={data.recipient_name}
                  image={Images.profile1}
                  type={data.description}
                  price={`$${data.total_user_expense}`}
                  route="non_stop"
                  onPress={() =>
                    navigation.navigate('FlightTicket', {
                      data,
                      hostName: 'hostName',
                      eventList: [],
                    })
                  }
                />
                <View style={styles.line} />
              </>
            ))}
          </View>
        </ScrollView>
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold>
              {t('total_price')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold style={{marginTop: 5}}>
              {t('all_charged_included')}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('PreviewBooking')}>
            <Icon name="apple-pay" size={30} />
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
