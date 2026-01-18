import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FAQ {
  id: string;
  type: "header" | "faq";
  question: string;
  answer?: string;
}

const FAQs = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const faqs: FAQ[] = [
    { id: "h1", type: "header", question: "Account & Registration" },

    {
      id: "1",
      type: "faq",
      question: "How do I create an account?",
      answer:
        "Download the FarmInput app, enter your phone number, receive OTP, verify and complete your profile.",
    },
    {
      id: "2",
      type: "faq",
      question: "I didn't receive my OTP code. What should I do?",
      answer:
        "Check network, request a new OTP, or contact support if you still don’t receive it.",
    },
    {
      id: "3",
      type: "faq",
      question: "Can I use the app without registering?",
      answer:
        "No. Registration is required to securely save and track your farm inputs and spending.",
    },
    {
      id: "4",
      type: "faq",
      question: "How do I change my phone number?",
      answer:
        "Go to Profile settings, select Change Phone Number, and verify the new number via OTP.",
    },
    {
      id: "5",
      type: "faq",
      question: "Can I delete my account?",
      answer:
        "Yes. Go to Settings > Delete Account. Your data will be removed per our privacy policy.",
    },

    { id: "h2", type: "header", question: "Logging Inputs" },

    {
      id: "6",
      type: "faq",
      question: "What types of farm inputs can I log?",
      answer:
        "You can log seeds, fertilizers, pesticides, equipment, labor, and any other farm input.",
    },
    {
      id: "7",
      type: "faq",
      question: "Can I edit or delete a logged input?",
      answer:
        "Yes. Go to My Spending, select the input, and choose Edit or Delete.",
    },
    {
      id: "8",
      type: "faq",
      question: "How do I track inputs bought from multiple suppliers?",
      answer:
        "Add each purchase under its supplier in the log. You can view totals by supplier in spending reports.",
    },
    {
      id: "9",
      type: "faq",
      question: "Can I add inputs purchased before downloading the app?",
      answer:
        "Yes. Add past purchases manually by selecting the date and entering the details.",
    },

    { id: "h3", type: "header", question: "Pricing & Spending" },

    {
      id: "10",
      type: "faq",
      question: "How accurate are the regional price comparisons?",
      answer:
        "They are based on anonymized aggregated user data and supplier listings to reflect real market trends.",
    },
    {
      id: "11",
      type: "faq",
      question: "Why are prices different from what I see locally?",
      answer:
        "Prices vary by region, supplier, season, and availability. Use comparisons to find the best option.",
    },
    {
      id: "12",
      type: "faq",
      question: "How can I set a budget for farm inputs?",
      answer:
        "Use My Spending to set monthly budgets and track your spending against it.",
    },
    {
      id: "13",
      type: "faq",
      question: "Can I export my spending data?",
      answer:
        "Yes. Go to My Spending and export reports for record keeping and analysis.",
    },

    { id: "h4", type: "header", question: "Buying Groups" },

    {
      id: "14",
      type: "faq",
      question: "What are buying groups and how do they work?",
      answer:
        "Groups pool orders to buy in bulk and access discounts from suppliers.",
    },
    {
      id: "15",
      type: "faq",
      question: "How much can I save through buying groups?",
      answer:
        "Savings depend on group size and supplier discounts, but can be significant for bulk orders.",
    },
    {
      id: "16",
      type: "faq",
      question: "Are buying groups safe?",
      answer:
        "Yes. Groups operate through verified members and secure communication in-app.",
    },
    {
      id: "17",
      type: "faq",
      question: "How do I join a buying group?",
      answer: "Go to Buying Groups, browse, select a group, and tap Join.",
    },
    {
      id: "18",
      type: "faq",
      question: "Can I create my own buying group?",
      answer:
        "Yes. Tap Create Group, add details, set requirements, and invite members.",
    },
    {
      id: "19",
      type: "faq",
      question: "What happens if minimum order is not met?",
      answer:
        "The group may cancel or reschedule the order. You will be notified in-app.",
    },

    { id: "h5", type: "header", question: "Suppliers" },

    {
      id: "20",
      type: "faq",
      question: "How are suppliers verified?",
      answer:
        "Suppliers are verified through documentation and user ratings before appearing in the directory.",
    },
    {
      id: "21",
      type: "faq",
      question: "Can I add a new supplier to the directory?",
      answer:
        "Yes. Add supplier details during logging or through Supplier Directory.",
    },
    {
      id: "22",
      type: "faq",
      question: "How do I rate a supplier?",
      answer:
        "Go to Supplier Profile and submit a rating and review after purchase.",
    },

    { id: "h6", type: "header", question: "Technical Issues" },

    {
      id: "23",
      type: "faq",
      question: "The app is running slowly. What should I do?",
      answer:
        "Clear cache, update the app, or restart your phone. Contact support if it continues.",
    },
    {
      id: "24",
      type: "faq",
      question: "My data is not syncing. How do I fix this?",
      answer:
        "Check your internet connection, then refresh the app. If still unsynced, contact support.",
    },
    {
      id: "25",
      type: "faq",
      question: "I forgot my login details. How do I recover my account?",
      answer:
        "Use Forgot Password on the login screen or contact support for help.",
    },
    {
      id: "26",
      type: "faq",
      question: "Which phones support the FarmInput app?",
      answer:
        "FarmInput supports most Android and iOS devices running recent OS versions.",
    },

    { id: "h7", type: "header", question: "Privacy & Security" },

    {
      id: "27",
      type: "faq",
      question: "Is my data safe?",
      answer:
        "Yes. We use encryption, secure storage, and strict access controls to protect your data.",
    },
    {
      id: "28",
      type: "faq",
      question: "Who can see my purchase data?",
      answer:
        "Only you and authorized app services. Group members can only see shared group info.",
    },
    {
      id: "29",
      type: "faq",
      question: "Can I use the app offline?",
      answer:
        "You can log data offline, but syncing and comparisons require internet access.",
    },

    { id: "h8", type: "header", question: "Still have questions?" },
    {
      id: "30",
      type: "faq",
      question: "Contact support for personalized assistance.",
      answer:
        "Reach us via the Support page in the app or email support@farminput.com",
    },
  ];

  const filteredFAQs = useMemo(() => {
    if (!search.trim()) return faqs;

    const query = search.toLowerCase();

    return faqs.filter((item) => {
      if (item.type === "header") {
        return item.question.toLowerCase().includes(query);
      }
      return (
        item.question.toLowerCase().includes(query) ||
        (item.answer ?? "").toLowerCase().includes(query)
      );
    });
  }, [search]);

  const renderFAQ = ({ item }: { item: FAQ }) => {
    if (item.type === "header") {
      return (
        <View style={styles.headerCard}>
          <Text style={styles.headerText}>{item.question}</Text>
        </View>
      );
    }

    return (
      <Pressable
        style={styles.faqCard}
        onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{item.question}</Text>
          <Ionicons
            name={expandedId === item.id ? "chevron-up" : "chevron-down"}
            size={20}
            color="#22c55e"
          />
        </View>

        {expandedId === item.id && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </Pressable>
        <Text style={styles.headerTitle}>FAQs</Text>
      </View>

      <View style={styles.introCard}>
        <Ionicons name="help-circle" size={32} color="#f59e0b" />
        <Text style={styles.introTitle}>Frequently Asked Questions</Text>
        <Text style={styles.introText}>
          Find answers to common questions about FarmInput
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#6b7280" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search FAQs"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredFAQs}
        renderItem={renderFAQ}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    color: "#1f2937",
  },
  introCard: {
    marginHorizontal: 12,
    marginVertical: 12,
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  introTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 12,
    marginBottom: 4,
  },
  introText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    color: "#1f2937",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  headerCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
  },
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    marginRight: 12,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  answer: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 20,
  },
});

export default FAQs;
