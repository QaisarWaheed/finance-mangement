import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;

interface Props {
  labels: string[];
  values: number[];
}

export default function SmallBar({ labels, values }: Props) {
  // Data ko Gifted Charts ke format mein convert karna
  const data = labels.map((label, index) => ({
    value: values[index],
    label: label,
    frontColor: "#2E9CCA", // Aapka primary blue color
    gradientColor: "#1a7ca3", // Deep blue for gradient
  }));

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 20, // Taki y-axis ke numbers na katain
        marginTop: 20,
      }}
    >
      <BarChart
        data={data}
        barWidth={22} // Bars ki width
        noOfSections={3} // Y-axis par kitne points honge
        barBorderRadius={6} // Bars ke corners round karne ke liye
        isAnimated // Smooth loading animation
        animationDuration={800}
        showGradient // Professional look ke liye
        // Clean Look Settings
        yAxisThickness={0} // Y-axis line hatane ke liye
        xAxisThickness={0} // X-axis line hatane ke liye
        hideRules // Background ki lines hatane ke liye
        // Typography (Text Style)
        yAxisTextStyle={{ color: "#94a3b8", fontSize: 10 }}
        xAxisLabelTextStyle={{ color: "#64748b", fontSize: 10 }}
        // Layout
        width={screenWidth - 100}
        height={180}
        initialSpacing={10}
        spacing={20} // Bars ke darmiyan gap
        yAxisLabelPrefix="$" // Currency symbol
      />
    </View>
  );
}
