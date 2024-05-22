/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SelfAssessment from './pages/Home'
import LibraryScreen from './pages/Library'
import SettingsScreen from './pages/Settings'

const Tab = createBottomTabNavigator();
const TabList = [
  {
    bottomNavigation: true,
    name: 'Home',
    component: SelfAssessment,
    image: 'https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg',
    imageFocused: 'https://t3.ftcdn.net/jpg/02/95/26/46/360_F_295264675_clwKZxogAhxLS9sD163Tgkz1WMHsq1RJ.jpg'
  },
  {
    bottomNavigation: true,
    name: 'Library',
    component: LibraryScreen,
    image: 'https://static.thenounproject.com/png/2258479-200.png',
    imageFocused: 'https://static.thenounproject.com/png/1134090-200.png'
  },
  {
    bottomNavigation: false,
    name: 'Settings',
    component: SettingsScreen,
    image: 'https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png',
    imageFocused: 'https://static-00.iconduck.com/assets.00/settings-icon-1964x2048-8nigtrtt.png'
  },
  {
    bottomNavigation: true,
    name: 'Profile',
    component: SettingsScreen,
    image: 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png',
    imageFocused: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'
  }
]
export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.renderTabImage = this.renderTabImage.bind(this);
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          {TabList.map(tab => {
            return tab.bottomNavigation ? <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              title: tab.name,
              tabBarIcon: ({ focused, size }) =>
                this.renderTabImage(tab, focused, size)
            }}
            /> : null
          })}
        </Tab.Navigator>
      </NavigationContainer>
    );
}

renderTabImage(tab:any, focused:boolean, size:number) {
   return (<Image source={{uri: focused ? tab.imageFocused : tab.image}} style={{ width: size, height: size }}/>);
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
