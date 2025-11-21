import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const styles = (size: number, color?: string) => ({
  fill: color || '#0da5df',
  width: size || 24,
  height: size || 24,
});
const Imago = ({size, color}: {size: number; color?: string}) => (
  <Svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style={styles(size, color)}>
    <Path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </Svg>
);

export default Imago;
