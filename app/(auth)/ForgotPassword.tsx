import { forgotPassword } from '@/constant/api';
import styles from '@/constant/styles';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../../assets/images/icon.png';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            alert('Please enter your email.');
            return;
        }

        setLoading(true);
        try {
            const data = await forgotPassword(email);

            if (data.success) {
                setSent(true);
                alert('Password reset link sent to your email!');
            } else {
                alert(data.message || 'Failed to send reset link. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleBackToLogin = () => {
        router.push('/(auth)/Login');
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.accountContainer}>
                <View style={styles.titleView}>
                    <Image style={styles.logo} source={icon} />
                    <Text style={styles.title}>FarmInput</Text>
                </View>
                <View style={styles.accountView}>
                    <Text style={styles.accountTitle}>Reset Password</Text>
                    <Text style={styles.accountText}>Enter your email to receive a reset link</Text>
                </View>
            </View>

            {!sent ? (
                <>
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

                    <Pressable style={styles.button} onPress={handleForgotPassword}>
                        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
                    </Pressable>
                </>
            ) : (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.accountText}>Check your email for the password reset link.</Text>
                </View>
            )}

            <Text style={styles.linkText}>
                Remember your password?
                <Text style={styles.link} onPress={handleBackToLogin}>Sign In</Text>
            </Text>

        </SafeAreaView>
    )
}

export default ForgotPassword
