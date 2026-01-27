declare module '@react-native/assets-registry/registry' {
  export function getAssetByID(id: string): any;
  export type PackagerAsset = any;
}

declare module 'react-native/Libraries/Image/AssetSourceResolver' {
  const x: any;
  export default x;
}

declare module 'react-native/Libraries/Image/resolveAssetSource' {
  const x: any;
  export default x;
}
