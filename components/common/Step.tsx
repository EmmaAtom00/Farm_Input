import { StepProps } from "@/constant";
import { Text, View } from "react-native";

const Step = ({ icon, title, description }: StepProps) => {
    return (
        <View className="flex-row mb-4">
            <Text className="text-xl mr-3">{icon}</Text>
            <View className="flex-1">
                <Text className="font-semibold text-emerald-700">{title}</Text>
                <Text className="text-sm text-gray-700 mt-1">{description}</Text>
            </View>
        </View>
    );
}

export default Step
