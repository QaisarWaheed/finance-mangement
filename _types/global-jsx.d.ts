declare namespace JSX {
  type Element = any;
  interface IntrinsicElements {
    View: any;
    Text: any;
    Image: any;
    TextInput: any;
    Pressable: any;
    Switch: any;
    ActivityIndicator: any;
    FlatList: any;
    ScrollView: any;
    Button: any;
    [elemName: string]: any;
  }
}
