// components/PurchaseStepsCard.tsx
import { PurchaseStepsCardProps } from "@/constant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const PurchaseStepsCard: React.FC<PurchaseStepsCardProps> = ({
    iconName,
    title,
    subtitle,
    steps,
}) => {
    return (
        <View className="px-14 gap-7 mt-6 py-8 rounded-md bg-white">
            {/* Header */}
            <View className="flex-row items-center gap-4">
                <Ionicons
                    name={iconName}
                    size={24}
                    color="white"
                    className="bg-green-500 p-2 rounded-lg"
                />
                <View>
                    <Text className="text-xl font-semibold">{title}</Text>
                    {subtitle && (
                        <Text className="text-green-600 font-medium">{subtitle}</Text>
                    )}
                </View>
            </View>

            {/* Steps */}
            {steps.map((step) => (
                <View key={step.id} className="flex-row items-start gap-2">
                    <View className="bg-green-300 h-6 w-6 rounded-full justify-center items-center">
                        <Text className="text-green-600">{step.id}</Text>
                    </View>

                    <View className="flex-1">
                        <Text className="text-xl font-semibold">{step.title}</Text>
                        <Text>{step.description}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default PurchaseStepsCard;
