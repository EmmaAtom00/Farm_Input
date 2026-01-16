import { getPricingProducts } from '@/constant/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PriceComparison {
  id: string;
  product: string;
  supplier: string;
  price: number;
  quantity: string;
  rating: number;
  delivery: string;
  inStock: boolean;
}

const ComparePrices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prices, setPrices] = useState<PriceComparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const data = await getPricingProducts();
      if (data.success && data.products) {
        const transformedPrices = data.products.map((product: any) => ({
          id: product.id,
          product: product.name,
          supplier: product.supplier,
          price: product.price,
          quantity: product.quantity,
          rating: product.rating || 4.0,
          delivery: product.delivery_time || '2-3 days',
          inStock: product.in_stock !== false,
        }));
        setPrices(transformedPrices);
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPrices = prices.filter((item) =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPrice = ({ item }: { item: PriceComparison }) => (
    <Pressable style={styles.priceCard}>
      <View style={styles.priceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{item.product}</Text>
          <Text style={styles.supplierName}>{item.supplier}</Text>
        </View>
        {!item.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.priceDetails}>
        <View style={{ flex: 1 }}>
          <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.deliveryInfo}>
        <Ionicons name="time" size={14} color="#6b7280" />
        <Text style={styles.deliveryText}>{item.delivery}</Text>
      </View>

      <Pressable
        style={[styles.buyButton, !item.inStock && styles.buyButtonDisabled]}
        disabled={!item.inStock}
      >
        <Text style={styles.buyButtonText}>
          {item.inStock ? 'View Offer' : 'Unavailable'}
        </Text>
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
          <Text style={styles.headerTitle}>Compare Prices</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading prices...</Text>
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
        <Text style={styles.headerTitle}>Compare Prices</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products or suppliers"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>

      {filteredPrices.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>Try searching for a different product</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPrices}
          renderItem={renderPrice}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: 80 }]}
          scrollEnabled={true}
        />
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#1f2937',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  supplierName: {
    fontSize: 12,
    color: '#6b7280',
  },
  outOfStockBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  outOfStockText: {
    fontSize: 11,
    color: '#dc2626',
    fontWeight: '600',
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 12,
    color: '#6b7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  deliveryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  buyButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default ComparePrices;