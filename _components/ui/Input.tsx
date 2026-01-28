import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

// Humne yahan 'TextInputProps' extend kiya hai taake multiline wagera chalein
interface Props extends TextInputProps {
  label: string;
}

const Input = ({ label, ...props }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          props.multiline && { height: 100, textAlignVertical: "top" }, // Multiline ke liye extra style
        ]}
        placeholderTextColor="#9CA3AF"
        {...props} // Saari baqi props yahan pass ho jayengi
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});

export default Input;
