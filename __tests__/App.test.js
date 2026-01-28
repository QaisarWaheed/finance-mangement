import { render } from "@testing-library/react-native";
import App from "../app/_layout";

test("App renders correctly", () => {
  const { getByText } = render(<App />);
  expect(getByText("Welcome")).toBeTruthy();
});
