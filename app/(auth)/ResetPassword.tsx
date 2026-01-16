import { resetPassword, saveAuthToken } from '@/constant/api';
import styles from '@/constant/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../../assets/images/icon.png';

const ResetPassword = () => {

    const { token } = useLocalSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!token) {
            alert('Invalid reset link. Please request a new password reset.');
            return;
        }

        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        try {
            const data = await resetPassword(token as string, email, password);

            if (data.success) {
                alert('Password reset successful!');
                if (data.token) {
                    await saveAuthToken(data.token);
                }
                router.replace('/(auth)/Login');
            } else {
                alert(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please check your connection and try again.');
            console.error('Reset password error:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleBackToLogin = () => {
        router.push('/(auth)/Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
                <View style={styles.accountContainer}>
                    <View style={styles.titleView}>
                        <Image style={styles.logo} source={icon} />
                        <Text style={styles.title}>FarmInput</Text>
                    </View>
                    <View style={styles.accountView}>
                        <Text style={styles.accountTitle}>Create New Password</Text>
                        <Text style={styles.accountText}>Enter your new password below</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Email*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your email'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        editable={!loading}
                    />
                </View>

                <View>
                    <Text style={styles.inputTitle}>New Password*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter new password (min 6 characters)'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        editable={!loading}
                    />
                </View>

                <View>
                    <Text style={styles.inputTitle}>Confirm Password*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Confirm new password'
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        editable={!loading}
                    />
                </View>

                <Pressable
                    style={styles.button}
                    onPress={handleResetPassword}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
                </Pressable>

                <Text style={styles.linkText}>
                    Back to
                    <Text style={styles.link} onPress={handleBackToLogin}> Sign In</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResetPassword
