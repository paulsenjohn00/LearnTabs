import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Svg, { Circle, G, Path, Text, TextPath, Defs, Line } from "react-native-svg";

function HomeScreen() {
  const handleSpacePress = (space) => {
    console.log(`You pressed the ${space} space!`);
  };

  return (
    <View style={styles.container}>
      <Dartboard onSpacePress={handleSpacePress} />
    </View>
  );
}

function Dartboard({ onSpacePress }) {
  const ringCategories = ['Friends','Faith','Finance','Fulfillment','Fitness','Food','Fun','Family']
  const initialOuterRing = Array(8).fill('white');
  const initialMidRing = Array(8).fill('white');
  const initialCenterRing = Array(8).fill('white');
  const [outerRing, setOuterRing] = useState(initialOuterRing);
  const [midRing, setMidRing] = useState(initialOuterRing);
  const [centerRing, setCenterRing] = useState(initialOuterRing);

  const handlePress = (index: number, ringOuterRing: any) => {
    const deselectRing = (ring: any) => {
      return ring.map((color: string, i: number) => {
        if (i === index) {
          return color !== 'white' ? 'white' : color;
        }
        return color
      })
    }

      if (ringOuterRing === outerRing) {
        const highlightRing = ringOuterRing.map((color:string, i:number) => {
          if (i === index) {
            return 'green'
          }
          return color;
        });
        setOuterRing(highlightRing);
        setMidRing(deselectRing(midRing));
        setCenterRing(deselectRing(centerRing));

      } else if (ringOuterRing === midRing) {
        const highlightRing = ringOuterRing.map((color:string, i:number) => {
          if (i === index) {
            return 'yellow'
          }
          return color;
        });
        setMidRing(highlightRing);
        setOuterRing(deselectRing(outerRing));
        setCenterRing(deselectRing(centerRing));

      } else if (ringOuterRing === centerRing) {
        const highlightRing = ringOuterRing.map((color:string, i:number) => {
          if (i === index) {
            return 'red'
          }
          return color;
        });
        setCenterRing(highlightRing);
        setOuterRing(deselectRing(outerRing));
        setMidRing(deselectRing(midRing));

      } else console.log('Error has occurred.')

    onSpacePress(index + 1);
  };

  const angle = 360 / initialOuterRing.length;

  const createCircle = ({ radius, ringNum, colorList = null }: { radius: number, ringNum: any, colorList: any}) => {
    return ringNum.map((_: number, index: number) => {
      const startAngle = index * angle;
      const endAngle = (index + 1) * angle;

      const x1 = 50 + radius * Math.cos((Math.PI / 180) * startAngle);
      const y1 = 50 + radius * Math.sin((Math.PI / 180) * startAngle);
      const x2 = 50 + radius * Math.cos((Math.PI / 180) * endAngle);
      const y2 = 50 + radius * Math.sin((Math.PI / 180) * endAngle);

      const d = `M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

      const textX = 50 + (radius) * Math.cos((Math.PI / 180) * (startAngle + angle / 2));
      const textY = 50 + (radius) * Math.sin((Math.PI / 180) * (startAngle + angle / 2));

      return (
        <G key={index}>
          <TouchableWithoutFeedback onPress={() => handlePress(index, colorList)}>
            <Path
              d={d}
              fill={colorList !== ringCategories ? colorList[index] : 'blue'}
              stroke="black"
              strokeWidth="0.5"
              id={'outerRingPath'}
            />
          </TouchableWithoutFeedback>
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Svg height="360" width="360" viewBox="-8 0 116 100">
        <Circle cx="50" cy="50" r="56" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 56, ringNum: ringCategories, colorList: ringCategories })}
        <Circle cx="50" cy="50" r="50" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 50, ringNum: initialOuterRing, colorList: outerRing })}
        <Circle cx="50" cy="50" r="35" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 35, ringNum: initialMidRing, colorList: midRing })}
        <Circle cx="50" cy="50" r="20" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 20, ringNum: initialCenterRing, colorList: centerRing })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});

export default HomeScreen;
