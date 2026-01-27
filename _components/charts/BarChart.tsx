import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function SmallBar({ labels, values, width = 280, height = 160 }: { labels: string[]; values: number[]; width?: number; height?: number }) {
  return (
    <View>
      <BarChart
        data={{ labels, datasets: [{ data: values }] }}
        width={width}
        height={height}
        chartConfig={{ backgroundGradientFrom: '#fff', backgroundGradientTo: '#fff', color: () => '#2E9CCA' }}
        fromZero
        showValuesOnTopOfBars
        yAxisLabel=""
        yAxisSuffix=""
      />
    </View>
  );
}



