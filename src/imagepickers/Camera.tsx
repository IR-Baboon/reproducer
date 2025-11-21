import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const styles = (size: number, color?: string) => ({
  fill: color || '#0da5df',
  stroke: color || '#0da5df',
  width: size || 24,
  height: size || 24,
});
const Camera = ({size, color}: {size: number; color?: string}) => (
  <Svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={styles(size, color)}>
    <Path
      fill="#0da5df"
      d="M50 33.9c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19c0-10.4-8.5-19-19-19zm0 34c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15zm33-38L68 30l-6.3-9.2c-.4-.5-1-.8-1.6-.8H39.9c-.6 0-1.2.3-1.6.8L32 30H17c-4.4 0-8 3.5-8 7.9V72c0 4.4 3.6 8 8 8h66c4.4 0 8-3.6 8-8V37c0-4.4-3.6-7.1-8-7.1zM87 72c0 2.2-1.8 4-4 4H17c-2.2 0-4-1.8-4-4V37.9c0-2.2 1.8-3.9 4-3.9h16c.6 0 1.2-.3 1.6-.8l6.3-9.2h18.2l6.3 9.2c.4.5 1 .8 1.6.8l16-.1c2.2 0 4 .9 4 3.1v35z"
    />
  </Svg>
);

export default Camera;
