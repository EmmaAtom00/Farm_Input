import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "order" | "group" | "price" | "system";
  timestamp: string;
  read: boolean;
  icon: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Order Confirmed",
      message: "Your fertilizer order has been confirmed and will be delivered soon.",
      type: "order",
      timestamp: "2 hours ago",
      read: false,
      icon: "checkmark-circle",
    },
    {
      id: "2",
      title: "Price Alert",
      message: "Seeds price dropped by 15% at your favorite supplier.",
      type: "price",
      timestamp: "5 hours ago",
      read: false,
      icon: "pricetag",
    },
    {
      id: "3",
      title: "Group Purchase Ready",
      message: "Your buying group has reached minimum order. Ready to checkout!",
      type: "group",
      timestamp: "1 day ago",
      read: true,
      icon: "people",
    },
    {
      id: "4",
      title: "Delivery Update",
      message: "Your order is out for delivery. Expected arrival: Today",
      type: "order",
      timestamp: "1 day ago",
      read: true,
      icon: "cube",
    },
    {
      id: "5",
      title: "System Maintenance",
      message: "Scheduled maintenance on Sunday 2-4 AM. Services may be unavailable.",
      type: "system",
      timestamp: "2 days ago",
      read: true,
      icon: "settings",
    },
  ]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
        return "#22c55e";
      case "price":
        return "#f59e0b";
      case "group":
        return "#3b82f6";
      case "system":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <View
      style={[
        styles.notificationCard,
        !item.read && styles.notificationCardUnread,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getNotificationColor(item.type) + "20" },
        ]}
      >
        <Ionicons
          name={item.icon as any}
          size={24}
          color={getNotificationColor(item.type)}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Ionicons name="close" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Text style={styles.emptySubtext}>
            You'll see updates about your orders and activities here
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
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
    flex: 1,
    color: "#1f2937",
  },
  badge: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  notificationCardUnread: {
    backgroundColor: "#f0fdf4",
    borderColor: "#dcfce7",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: "#9ca3af",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
});

export default Notification;
