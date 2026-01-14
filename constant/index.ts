import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface HeaderProps {
  title?: string;
  onSignUp?: () => void;
}

export interface CardProps {
  title: string;
  description: string;
}

export type RootStackParamList = {
  HomeScreen: undefined;
  HowItWorksScreen: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface StepProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
}

export interface FeatureProps {
  title: string;
  description: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
}

export interface PurchaseStepsCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  steps: Step[];
}