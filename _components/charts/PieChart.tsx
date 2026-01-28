import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface PieData {
  name: string;
  amount: number;
  color: string;
}

export default function ProfessionalPie({ data }: { data: PieData[] }) {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  const pieData = data.map((item) => ({
    value: item.amount,
    color: item.color,
    label: item.name,
    text: `${Math.round((item.amount / totalAmount) * 100)}%`,
    // Text ko thora center karne ke liye individual shifts (optional)
    textShiftX: -2,
    textShiftY: 0,
  }));

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      <PieChart
        donut
        isAnimated
        animationDuration={1000}
        showText
        textColor="#fff"
        // Text size thora chota kiya hai taake fit aaye
        textSize={11}
        fontWeight="bold"
        // Radius adjustments
        radius={105} // Outer boundary
        innerRadius={60} // Isay 75 se 60 kiya hai taake ring "thick" ho jaye
        data={pieData}
        innerCircleColor={"#fff"}
        // Center label styling
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: 22, fontWeight: "bold", color: "#111827" }}
              >
                ${totalAmount}
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280", marginTop: -2 }}>
                Spent
              </Text>
            </View>
          );
        }}
      />

      {/* Modern Legend Design */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 30,
          paddingHorizontal: 20,
        }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 4, // Square rounded look
                backgroundColor: item.color,
                marginRight: 6,
              }}
            />
            <Text style={{ fontSize: 13, color: "#4B5563", fontWeight: "500" }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
