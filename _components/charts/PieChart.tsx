import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function SmallPie({ data, size = 150 }: { data: { name: string; amount: number; color: string }[]; size?: number }) {
  const chartData = data.map((d) => ({ name: d.name, population: d.amount, color: d.color, legendFontColor: '#7B8B92', legendFontSize: 12 }));
  return (
    <View>
      <PieChart data={chartData as any} width={size} height={size} accessor="population" paddingLeft="0" backgroundColor="transparent" chartConfig={{ color: () => '#fff' }} />
    </View>
  );
}



