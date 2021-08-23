import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {loginAuth} from '../../services/getData';

export default function SignIn({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({id: true, password: true});

  /**
   * call when action login
   *
   */
  const onLogin = async () => {
    if (id == '' || password == '') {
      setSuccess({
        ...success,
        id: false,
        password: false,
      });
    } else {
      setLoading(true);
      const loginStatus = await loginAuth(id, password);
      console.log({loginStatus});
      if (loginStatus[0].user_id !== 0) {
        console.log(loginStatus[0].user_id);
        dispatch(
          AuthActions.authentication(true, response => {
            setLoading(false);
            navigation.navigate('Home');
          }),
        );
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* <Header
        title={t('sign_in')}
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
      /> */}
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setId(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  id: true,
                });
              }}
              placeholder={t('input_id')}
              success={success.id}
              value={id}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={t('input_password')}
              secureTextEntry={true}
              success={success.password}
              value={password}
            />
            <Button
              style={{marginTop: 20}}
              full
              loading={loading}
              onPress={() => {
                onLogin();
              }}>
              {t('sign_in')}
            </Button>
            <View style={styles.contentActionBottom}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text body1 grayColor style={{alignItem: 'left'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text body1 grayColor style={{alignItem: 'right'}}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
