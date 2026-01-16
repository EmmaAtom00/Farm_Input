import { getInputCategories, logInput } from '@/constant/api';
import styles from '@/constant/styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewInput = () => {
  const [inputType, setInputType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const units = ['kg', 'liters', 'bags', 'units', 'hours'];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("fetching categories")
      const data = await getInputCategories();
      console.log(data.categories)
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async () => {
    if (!inputType || !quantity || !unit || !cost) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await logInput(
        inputType,
        parseFloat(quantity),
        unit,
        parseFloat(cost),
        date,
        notes
      );

      if (response.success) {
        alert('Farm input recorded successfully!');
        router.back();
      } else {
        alert(response.message || 'Failed to record input. Please try again.');
      }
    } catch (error) {
      alert('Failed to record input. Please try again.');
      console.error('Log input error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 10 }}>Record Input</Text>
        </View>

        <View>
          <Text style={styles.inputTitle}>Input Type*</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {categories.length > 0 ? (
              categories.map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setInputType(type)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: inputType === type ? '#22c55e' : '#e5e7eb',
                    backgroundColor: inputType === type ? '#f0fdf4' : '#fff',
                  }}
                >
                  <Text
                    style={{
                      color: inputType === type ? '#22c55e' : '#6b7280',
                      fontWeight: '500',
                    }}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Text style={{ color: '#9ca3af' }}>Loading categories...</Text>
            )}
          </View>
        </View>

        <View>
          <Text style={styles.inputTitle}>Quantity*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            keyboardType="decimal-pad"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Unit*</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {units.map((u) => (
              <Pressable
                key={u}
                onPress={() => setUnit(u)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: unit === u ? '#22c55e' : '#e5e7eb',
                  backgroundColor: unit === u ? '#f0fdf4' : '#fff',
                }}
              >
                <Text
                  style={{
                    color: unit === u ? '#22c55e' : '#6b7280',
                    fontWeight: '500',
                  }}
                >
                  {u}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.inputTitle}>Cost*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter cost"
            keyboardType="decimal-pad"
            value={cost}
            onChangeText={setCost}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Notes</Text>
          <TextInput
            style={[styles.input, { minHeight: 100, textAlignVertical: 'top' }]}
            placeholder="Add any additional notes"
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Recording...' : 'Record Input'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewInput;