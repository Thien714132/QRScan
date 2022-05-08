import {Dimensions} from 'react-native';
import Config from 'react-native-config';

export const API = "http://192.168.1.12:3000";

const Constants = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('screen').height,
};

export default Constants;
