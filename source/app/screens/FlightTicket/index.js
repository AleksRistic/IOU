import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  FlightPlan,
  Tag,
  Button,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

export default function FlightTicket({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Will determine if a button appears or the code.
  const [paymentStatus, setPaymentStatus] = useState('P');
  const [paymentPaid, setPaymentPaid] = useState('Expense Not Paid');
  const [paymentButtonString, setPaymentButtonString] =
    useState('Sent Payment');

  console.log('**********@@@@@@@@@@@**********');
  console.log(route.params);
  const {data, hostName, eventList} = route.params;

  useEffect(() => {
    //Check if the owner is checking the bill so they can accept the payment

    // Owner is not the hostname, it should be the name of whose account it is. Will be taken from redux when signed in
    const owner = data.recipient_name;
    const recipient = data.recipient_name;

    if (owner === recipient) {
      setIsOwner(true);
    }

    //call API to see what the payment status is

    if (paymentStatus === 'N') {
      if (owner === recipient) {
        setPaymentButtonString('Awaiting Payment');
        setIsDisabled(true);
      }
      return;
    }

    if (paymentStatus === 'P') {
      if (owner === recipient) {
        setPaymentButtonString('Approve Payment Received');
      } else {
        setPaymentButtonString('Pending Approval');
        setIsDisabled(true);
      }
      setPaymentPaid('Pending');
    } else {
      setPaymentStatus('Y');
      setPaymentPaid('Expense Paid');
    }
  }, []);

  const handleSentPaymentClick = () => {
    if (paymentStatus === 'N') {
      setPaymentButtonString('Pending Approval');
      setPaymentPaid('Pending');
      setIsDisabled(true);
    }
    if (paymentStatus === 'P' && isOwner) {
      setPaymentStatus('Y');
      setPaymentPaid('Expense Paid');
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('tickets')}
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
            <View style={styles.classContent}>
              <Tag outline round>
                {paymentPaid}
              </Tag>
            </View>
            <FlightPlan
              round={true}
              fromCode="LEX"
              toCode="BUS"
              from="Aleksandar Ristic"
              to={data.recipient_name}
            />
            <View style={styles.line} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  Recipient
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {data.recipient_name}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('date')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {moment(new Date()).format('LL')}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  Event
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {eventList.event_name}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  Amount
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {`$${data.total_user_expense}`}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  Expense Description
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {data.description}
                </Text>
              </View>
            </View>
            <View style={styles.line} />
            {paymentStatus === 'Y' ? (
              <View>
                <View style={[styles.code, {backgroundColor: colors.text}]}>
                  <Text header whiteColor style={{color: colors.card}}>
                    CLMVBG
                  </Text>
                </View>
                <Text
                  caption1
                  light
                  style={{textAlign: 'center', marginTop: 15}}>
                  0944 0923 1238 9801
                </Text>
              </View>
            ) : (
              <View>
                <Button
                  name={'paymentButton'}
                  disabled={isDisabled}
                  onPress={() => handleSentPaymentClick()}>
                  {paymentButtonString}
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
