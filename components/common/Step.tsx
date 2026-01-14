import { StepProps } from "@/constant";
import React from "react";
import { Text, View } from "react-native";

const Step = ({ icon, title, description }: StepProps) => {
    return (
        <View className="flex-row mb-4">
            <View className="text-xl mr-3 w-6 h-6 justify-center items-center">
                {typeof icon === 'string' ? (
                    <Text className="text-xl">{icon}</Text>
                ) : (
                    icon
                )}
            </View>
            <View className="flex-1">
                <Text className="font-semibold text-emerald-700">{title}</Text>
                <Text className="text-sm text-gray-700 mt-1">{description}</Text>
            </View>
        </View>
    );
}

export default Step
