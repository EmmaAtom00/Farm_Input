import InputForm from "@/components/common/InputForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const EditInput = () => {
  const { id, category, quantity, unit, cost, date, notes } =
    useLocalSearchParams<{
      id: string;
      category: string;
      quantity: string;
      unit: string;
      cost: string;
      date: string;
      notes?: string;
    }>();

  return (
    <InputForm
      initialData={{
        id,
        category,
        quantity: Number(quantity),
        unit,
        cost: Number(cost),
        date,
        notes,
      }}
    />
  );
};

export default EditInput;
