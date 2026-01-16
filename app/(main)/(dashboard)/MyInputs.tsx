import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserInput {
    id: string;
    category: string;
    quantity: number;
    unit: string;
    cost: number;
    date: string;
}

const MyInputs = () => {
    const [userInputs] = useState<UserInput[]>([
        {
            id: '1',
            category: 'Seeds',
            quantity: 5,
            unit: 'kg',
            cost: 2500,
            date: '2 hours ago',
        },
        {
            id: '2',
            category: 'Fertilizer',
            quantity: 10,
            unit: 'bags',
            cost: 3500,
            date: '1 day ago',
        },
        {
            id: '3',
            category: 'Pesticide',
            quantity: 2,
            unit: 'liters',
            cost: 1500,
            date: '3 days ago',
        },
        {
            id: '4',
            category: 'Labor',
            quantity: 8,
            unit: 'hours',
            cost: 4000,
            date: '1 week ago',
        },
    ]);

    const renderInput = ({ item }: { item: UserInput }) => (
        <View style={styles.inputCard}>
            <View style={styles.inputContent}>
                <Text style={styles.inputCategory}>{item.category}</Text>
                <Text style={styles.inputDetails}>
                    {item.quantity} {item.unit} • ₦{item.cost.toLocaleString()}
                </Text>
                <Text style={styles.inputDate}>{item.date}</Text>
            </View>
            <Pressable onPress={() => router.push('/(main)/(newInput)/NewInput' as any)}>
                <Ionicons name="pencil" size={20} color="#22c55e" />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#22c55e" />
                </Pressable>
                <Text style={styles.headerTitle}>My Inputs</Text>
                <Pressable onPress={() => router.push('/(main)/(newInput)/NewInput' as any)}>
                    <Ionicons name="add-circle" size={24} color="#22c55e" />
                </Pressable>
            </View>

            {userInputs.length > 0 ? (
                <FlatList
                    data={userInputs}
                    renderItem={renderInput}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    scrollEnabled={true}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="leaf-outline" size={64} color="#d1d5db" />
                    <Text style={styles.emptyText}>No inputs recorded yet</Text>
                    <Text style={styles.emptySubtext}>Start recording your farm inputs</Text>
                    <Pressable
                        style={styles.addButton}
                        onPress={() => router.push('/(main)/(newInput)/NewInput' as any)}
                    >
                        <Ionicons name="add-circle" size={20} color="white" />
                        <Text style={styles.addButtonText}>Record Input</Text>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
        textAlign: 'center',
    },
    listContent: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        paddingBottom: 20,
    },
    inputCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    inputContent: {
        flex: 1,
    },
    inputCategory: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    inputDetails: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 4,
    },
    inputDate: {
        fontSize: 12,
        color: '#9ca3af',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 8,
        marginBottom: 24,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#22c55e',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default MyInputs;
