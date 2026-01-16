import { getInputsList } from '@/constant/api';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserInput {
    id: string;
    category: string;
    quantity: number;
    unit: string;
    cost: number;
    date: string;
    notes?: string;
}

const MyInputs = () => {
    const [userInputs, setUserInputs] = useState<UserInput[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInputs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getInputsList();
            if (response.success && response.inputs) {
                const formattedInputs = response.inputs.map((input: any) => ({
                    id: input.id || input._id,
                    category: input.category,
                    quantity: input.quantity,
                    unit: input.unit,
                    cost: input.unit_price || input.cost,
                    date: formatDate(input.purchase_date || input.date),
                    notes: input.notes,
                }));
                setUserInputs(formattedInputs);
            } else {
                setUserInputs([]);
            }
        } catch (err) {
            console.error('Error fetching inputs:', err);
            setError('Failed to load inputs');
            setUserInputs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchInputs();
        }, [fetchInputs])
    );

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 60) return `${diffMins} minutes ago`;
            if (diffHours < 24) return `${diffHours} hours ago`;
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
            return date.toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    const renderInput = ({ item }: { item: UserInput }) => (
        <View style={styles.inputCard}>
            <View style={styles.inputContent}>
                <Text style={styles.inputCategory}>{item.category}</Text>
                <Text style={styles.inputDetails}>
                    {item.quantity} {item.unit} • ₦{item.cost.toLocaleString()}
                </Text>
                {item.notes && <Text style={styles.inputNotes}>{item.notes}</Text>}
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

            {loading ? (
                <View style={styles.loadingState}>
                    <Text style={styles.loadingText}>Loading inputs...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorState}>
                    <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
                    <Text style={styles.errorText}>{error}</Text>
                    <Pressable
                        style={styles.retryButton}
                        onPress={fetchInputs}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </Pressable>
                </View>
            ) : userInputs.length > 0 ? (
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
    inputNotes: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 4,
        fontStyle: 'italic',
    },
    inputDate: {
        fontSize: 12,
        color: '#9ca3af',
    },
    loadingState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#6b7280',
    },
    errorState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        marginTop: 12,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#ef4444',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
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
