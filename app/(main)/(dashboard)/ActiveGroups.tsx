import { getGroups } from '@/constant/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BuyingGroup {
    id: string;
    name: string;
    description: string;
    members: number;
    status: 'active' | 'pending' | 'completed';
    discount: number;
    nextOrder: string;
}

const ActiveGroups = () => {
    const [groups, setGroups] = useState<BuyingGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveGroups();
    }, []);

    const fetchActiveGroups = async () => {
        try {
            const data = await getGroups();
            if (data.success && data.groups) {
                const activeGroups = data.groups
                    .filter((group: any) => group.status === 'active')
                    .map((group: any) => ({
                        id: group.id,
                        name: group.name,
                        description: group.description,
                        members: group.member_count || 0,
                        status: group.status || 'active',
                        discount: group.discount_percentage || 0,
                        nextOrder: group.next_order_date || 'TBD',
                    }));
                setGroups(activeGroups);
            }
        } catch (error) {
            console.error('Error fetching active groups:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderGroup = ({ item }: { item: BuyingGroup }) => (
        <Pressable style={styles.groupCard}>
            <View style={styles.groupHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.groupName}>{item.name}</Text>
                    <Text style={styles.groupDescription}>{item.description}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: '#22c55e20' }]}>
                    <Text style={[styles.statusText, { color: '#22c55e' }]}>Active</Text>
                </View>
            </View>

            <View style={styles.groupStats}>
                <View style={styles.statItem}>
                    <Ionicons name="people" size={16} color="#6b7280" />
                    <Text style={styles.statText}>{item.members} members</Text>
                </View>
                <View style={styles.statItem}>
                    <Ionicons name="pricetag" size={16} color="#22c55e" />
                    <Text style={[styles.statText, { color: '#22c55e', fontWeight: '600' }]}>
                        {item.discount}% off
                    </Text>
                </View>
                <View style={styles.statItem}>
                    <Ionicons name="calendar" size={16} color="#6b7280" />
                    <Text style={styles.statText}>{item.nextOrder}</Text>
                </View>
            </View>

            <Pressable style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
            </Pressable>
        </Pressable>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#22c55e" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Active Groups</Text>
                </View>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Loading groups...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#22c55e" />
                </Pressable>
                <Text style={styles.headerTitle}>Active Groups</Text>
            </View>

            {groups.length > 0 ? (
                <FlatList
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    scrollEnabled={true}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="people-outline" size={64} color="#d1d5db" />
                    <Text style={styles.emptyText}>No active groups</Text>
                    <Text style={styles.emptySubtext}>Join a buying group to get started</Text>
                    <Pressable
                        style={styles.joinButton}
                        onPress={() => router.push('/(main)/(buyingGroups)/BuyingGroups' as any)}
                    >
                        <Ionicons name="people" size={20} color="white" />
                        <Text style={styles.joinButtonText}>Browse Groups</Text>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 12,
        color: '#1f2937',
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        paddingBottom: 20,
    },
    groupCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    groupName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    groupDescription: {
        fontSize: 12,
        color: '#6b7280',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
    },
    groupStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 12,
        color: '#6b7280',
    },
    viewButton: {
        backgroundColor: '#22c55e',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
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
    joinButton: {
        flexDirection: 'row',
        backgroundColor: '#22c55e',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 8,
    },
    joinButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ActiveGroups;
