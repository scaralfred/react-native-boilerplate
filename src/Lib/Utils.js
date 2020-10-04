import _ from 'lodash';
import {Platform, Dimensions} from 'react-native';
// Constants
const {width, height} = Dimensions.get('window');
const os = Platform.OS;
const osVersion = parseInt(Platform.Version, 10);

export function isIphoneX() {
  return (
    height >= 812
    && os === 'ios'
    && osVersion >= 11
  );
}

export function isIos() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}


export const onLayout = (e) => {
  const layout ={
    width: e.nativeEvent.layout.width,
    height: e.nativeEvent.layout.height,
    x: e.nativeEvent.layout.x,
    y: e.nativeEvent.layout.y
  }
  return layout
}


// Sort array alphabetically by property  //
export const dynamicSort = (property) => {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}

// Get Dimension By Percentage //
export const Hp = (percentage) => height * percentage;
export const Wp = (percentage) => width * percentage;
export const Pp = (percentage) => (height/height) * percentage;

