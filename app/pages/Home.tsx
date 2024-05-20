import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity, Text, Alert } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";

function HomeScreen() {
  const handleSpacePress = ({ space }: { space: any }) => {
    // console.log(`You pressed the ${space} space!`);
  };

  return (
    <View style={styles.container}>
      <Dartboard onSpacePress={handleSpacePress} />
    </View>
  );
}

function Dartboard({ onSpacePress }: {onSpacePress: any}) {
  const ringCategories = ['FINANCE', 'FULFILLMENT', 'FITNESS', 'FOOD', 'FUN', 'FAMILY', 'FRIENDS', 'FAITH'];
  const initialColors = Array(ringCategories.length).fill('white');
  const [outerRing, setOuterRing] = useState(initialColors);
  const [midRing, setMidRing] = useState(initialColors);
  const [centerRing, setCenterRing] = useState(initialColors);

  const onSubmit = () => {
    let blanks: number[] = [];
    let message = "It looks like you have left the following areas blank: "
    let sendAlert = false

    centerRing.map((color:string, index:number) => {
      if (color === 'white') {
        sendAlert = true;
        blanks.push(index)
      }
    });

    if (sendAlert) {
      blanks.map((blank) => {
        message += ringCategories[blank] + ', '
      })
      //gets rid of the comma and space after the last category in the alert
      message = message.slice(0, -2);
      return Alert.alert(
        'Submit?',
        message,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Submit with blanks', onPress: () => {
              setOuterRing(initialColors);
              setMidRing(initialColors);
              setCenterRing(initialColors);
            }},
        ]
      );
    }
    setOuterRing(initialColors);
    setMidRing(initialColors);
    setCenterRing(initialColors);
  }

  const handlePress = (index: number, ringOuterRing: any) => {
    const highlightRing = (ring: any, highlightColor: string) => {
      return ring.map((color: string, i: number) => {
        if (i === index) {
          return highlightColor
        }
        return color;
      });
    };

    if (ringOuterRing === outerRing) {
      setOuterRing(highlightRing(outerRing, '#549B4C'));
      setMidRing(highlightRing(midRing, '#549B4C'));
      setCenterRing(highlightRing(centerRing, '#549B4C'));

    } else if (ringOuterRing === midRing) {
      setOuterRing(highlightRing(outerRing, 'white'));
      setMidRing(highlightRing(midRing, '#F3A61E'));
      setCenterRing(highlightRing(centerRing, '#F3A61E'));

    } else if (ringOuterRing === centerRing) {
      setOuterRing(highlightRing(outerRing, 'white'));
      setMidRing(highlightRing(midRing, 'white'));
      setCenterRing(highlightRing(centerRing, '#DF3636'));

    } else console.log('Error has occurred.');

    onSpacePress(index + 1);
  };

  const angle = 360 / initialColors.length;

  const createCircle = ({ radius, ringNum}: {radius:number, ringNum:any}) => {
    return ringNum.map((label:string, index:number) => {
      const startAngle = index * angle;
      const endAngle = (index + 1) * angle;

      const x1 = 50 + radius * Math.cos((Math.PI / 180) * startAngle);
      const y1 = 50 + radius * Math.sin((Math.PI / 180) * startAngle);
      const x2 = 50 + radius * Math.cos((Math.PI / 180) * endAngle);
      const y2 = 50 + radius * Math.sin((Math.PI / 180) * endAngle);

      const d = `M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

      const textX = 50 + (radius + 5) * Math.cos((Math.PI / 180) * (startAngle + angle / 2));
      const textY = 50 + (radius + 5) * Math.sin((Math.PI / 180) * (startAngle + angle / 2));

      return (
        <G key={index}>
          <TouchableWithoutFeedback onPress={() => handlePress(index, ringNum)}>
            <Path
              d={d}
              fill={ringNum !== ringCategories ? ringNum[index] : '#3D67B1'}
              stroke="black"
              strokeWidth="0.5"
            />
          </TouchableWithoutFeedback>
          {ringNum === ringCategories && (
            <SvgText
              x={textX}
              y={textY + 10}
              fill="white"
              fontSize="4"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
              transform={`rotate(${endAngle + angle + 22}, ${textX}, ${textY})`}
            >
              {label}
            </SvgText>
          )}
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Svg height="360" width="360" viewBox="-8 0 116 100">
        <Circle cx="50" cy="50" r="57" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 57, ringNum: ringCategories })}
        <Circle cx="50" cy="50" r="48" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 48, ringNum: outerRing })}
        <Circle cx="50" cy="50" r="34" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 34, ringNum: midRing })}
        <Circle cx="50" cy="50" r="20" fill="white" stroke="black" strokeWidth="0.5" />
        {createCircle({ radius: 20, ringNum: centerRing })}
      </Svg>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {setOuterRing(initialColors); setCenterRing(initialColors); setMidRing(initialColors)}}>
          <Text style={styles.submitButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  submitButton: {
    margin: 10,
    backgroundColor:'#0A84FF', // apple blue
    padding: 8,
    borderRadius: 10,
    width: 100
  },
  submitButtonText: {
    color:'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  cancelButton: {
    margin: 10,
    backgroundColor:'#A2AAAD', // apple grey
    padding: 8,
    borderRadius: 10,
    width: 100
  }
});

export default HomeScreen;
