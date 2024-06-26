import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";

interface SliceModel {
  id: number,
  name: string,
  ring: number,
  startAngle: number,
  endAngle: number
}
interface Props {
}
interface State {
}
export class Home extends React.Component<Props, State> {


  render() {


    return (
      <View style={styles.container}>
        <Wheel />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});
/**
 * Support class: Wheel
 */
interface WheelProps {
}
interface WheelState {
  slices: SliceModel[],
}
export class Wheel extends React.Component<WheelProps, WheelState> {
  constructor(props: WheelProps) {
    super(props);

    this.state = {
      slices: []
    }

    this.onRingChange = this.onRingChange.bind(this);
  }
  componentDidMount = async () => {
    let slices = [
      { id: 0, name: 'Friends', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 1, name: 'Faith', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 2, name: 'Finance', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 3,name: 'Fulfillment', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 4,name: 'Fitness', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 5,name: 'Food', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 6,name: 'Fun', ring: 0, startAngle: 0, endAngle: 0 },
      { id: 7,name: 'Family', ring: 0, startAngle: 0, endAngle: 0 },
    ]
    const angle = 360 / slices.length

    for (let i=0; i<slices.length; i++) {
      slices[i].startAngle = i * angle;
      slices[i].endAngle = (i + 1) * angle;
    }
    this.setState({slices})
  }

  onRingChange(id:number, value:number) {
    let {slices} = this.state;
    slices[id].ring = value;
    this.setState({slices})
  }

  render() {
    const {slices} = this.state;
    const vSlices = slices.map((slice) =>
      <>
        <TextRing slice={slice} radius={57}/>
        <ColorRing slice={slice} radius={48} level={3} onRingChange={this.onRingChange}/>
        <ColorRing slice={slice} radius={34} level={2} onRingChange={this.onRingChange}/>
        <ColorRing slice={slice} radius={20} level={1} onRingChange={this.onRingChange}/>
      </>
    )
    return <Svg height="360" width="360" viewBox="-8 0 116 100">
      {/*<Circle cx="50" cy="50" r="57" fill="white" stroke="black" strokeWidth="0.5" />*/}
      {/*<Circle cx="50" cy="50" r="48" fill="white" stroke="black" strokeWidth="0.5" />*/}
      {/*<Circle cx="50" cy="50" r="34" fill="white" stroke="black" strokeWidth="0.5" />*/}
      {/*<Circle cx="50" cy="50" r="20" fill="white" stroke="black" strokeWidth="0.5" />*/}
      {vSlices}
    </Svg>

  }
}

/**
 * Support class: text ring
 */
interface TextRingProps {
  slice: SliceModel,
  radius: number
}
const TextRing = (props: TextRingProps) => {
    const {slice, radius} = props;
    const angle = slice.endAngle - slice.startAngle + 1

    const x1 = 50 + radius * Math.cos((Math.PI / 180) * slice.startAngle);
    const y1 = 50 + radius * Math.sin((Math.PI / 180) * slice.startAngle);
    const x2 = 50 + radius * Math.cos((Math.PI / 180) * slice.endAngle);
    const y2 = 50 + radius * Math.sin((Math.PI / 180) * slice.endAngle);

    const d = `M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

    const textX = 50 + (radius + 5) * Math.cos((Math.PI / 180) * (slice.startAngle + angle / 2));
    const textY = 50 + (radius + 5) * Math.sin((Math.PI / 180) * (slice.startAngle + angle / 2));

    return (
        <G key={slice.id + radius}>
          <TouchableWithoutFeedback>
            <Path
              d={d}
              fill='#3D67B1'
              stroke="black"
              strokeWidth="0.3"
            />
          </TouchableWithoutFeedback>
          {/*TODO: fix text issue when you change the number of categories*/}
          <SvgText
            x={textX}
            y={textY + 10}
            fill="white"
            fontSize="4"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${slice.endAngle + angle + 22}, ${textX}, ${textY})`}
          >
            {slice.name}
          </SvgText>
        </G>
  )
}

/**
 * Support class: color ring
 */
interface ColorRingProps {
  slice: SliceModel,
  radius: number,
  level: number,
  onRingChange: (id:number, value:number) => void
}
const ColorRing = (props:ColorRingProps) => {
    const { radius, slice, onRingChange, level} = props;

    const x1 = 50 + radius * Math.cos((Math.PI / 180) * slice.startAngle);
    const y1 = 50 + radius * Math.sin((Math.PI / 180) * slice.startAngle);
    const x2 = 50 + radius * Math.cos((Math.PI / 180) * slice.endAngle);
    const y2 = 50 + radius * Math.sin((Math.PI / 180) * slice.endAngle);

    const d = `M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

    const colors = [
      'white', '#DF3636', '#F3A61E', '#549B4C'
    ]

    const color = slice.ring >= level ? colors[slice.ring] : 'white'

    return (
      <G key={slice.id + radius}>
        <TouchableWithoutFeedback onPress={() => onRingChange(slice.id, level)}>
          <Path
            d={d}
            fill={color}
            stroke="black"
            strokeWidth="0.3"
          />
        </TouchableWithoutFeedback>
      </G>
    )
}

export default Home;
