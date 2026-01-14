import { API_CONFIG, checkOnboardingStatus } from '@/constant/api';
import styles from '@/constant/styles';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../../assets/images/icon.png';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSignin = async () => {
    // if (!email || !password) {
    //   alert('Please fill in all fields.');
    //   return;
    // }

    setLoading(true);
    try {
      // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.login}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });

      // const data = await response.json();
      if (true) {
        alert('Signin successful!');

        // Check if user has completed onboarding
        let hasCompletedOnboarding = await checkOnboardingStatus();
        hasCompletedOnboarding = false

        if (hasCompletedOnboarding) {
          // Go to dashboard
          router.replace('/(main)/dashboard');
        } else {
          // Go to onboarding
          router.replace('/(main)/(onboarding)/TrackYourInput');
        }
      } else {
        // alert(data.message || 'Signin failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSignup = () => {
    router.push('/Signup');
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.accountContainer}>
        <View style={styles.titleView}>
          <Image style={styles.logo} source={icon} />
          <Text style={styles.title}>FarmInput</Text>
        </View>
        <View style={styles.accountView}>
          <Text style={styles.accountTitle}>Welcome Back</Text>
          <Text style={styles.accountText}>Sign in to manage your farm inputs</Text>
        </View>
      </View>

      <View>
        <Text style={styles.inputTitle}>SIGN IN</Text>
      </View>

      <View>
        <Text style={styles.inputTitle}>Email*</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your email'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View>
        <Text style={styles.inputTitle}>Password*</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your password'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>{loading ? 'Letting you in...' : 'Sign In'}</Text>
      </Pressable>

      <Text style={styles.linkText}>
        Don't have an account?
        <Text style={styles.link} onPress={handleSignup}>Sign Up</Text>
      </Text>

    </SafeAreaView>
  )
}

export default Login