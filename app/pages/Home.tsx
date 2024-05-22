import React from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

interface SliceModel {
  id: number,
  name: string,
  value: number,
  startAngle: number,
  endAngle: number
}
interface Props {
}
interface State {
  slices: SliceModel[],
  editCategoryPopup: boolean,
  selectedCategory: SliceModel
}
export class SelfAssessment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      slices: [],
      editCategoryPopup: false,
      selectedCategory: { id: 0, name: 'Friends', value: 0, startAngle: 0, endAngle: 0 }
    }

    this.onRingChange = this.onRingChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onUpdateCategory = this.onUpdateCategory.bind(this);
  }
  componentDidMount = async () => {
    let slices = [
      { id: 0, name: 'Friends', value: 0, startAngle: 0, endAngle: 0 },
      { id: 1, name: 'Faith', value: 0, startAngle: 0, endAngle: 0 },
      { id: 2, name: 'Finance', value: 0, startAngle: 0, endAngle: 0 },
      { id: 3,name: 'Fulfillment', value: 0, startAngle: 0, endAngle: 0 },
      { id: 4,name: 'Fitness', value: 0, startAngle: 0, endAngle: 0 },
      { id: 5,name: 'Food', value: 0, startAngle: 0, endAngle: 0 },
      { id: 6,name: 'Fun', value: 0, startAngle: 0, endAngle: 0 },
      { id: 7,name: 'Family', value: 0, startAngle: 0, endAngle: 0 },
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
    slices[id].value = value;
    this.setState({slices})
  }
  onCategorySelect(id:number) {
    let { slices } = this.state;
    this.setState({ editCategoryPopup: true, selectedCategory:slices[id] })
  }
  onCloseModal() {
    this.setState({editCategoryPopup:false})
  }
  onUpdateCategory(name:string) {
    let { slices, selectedCategory } = this.state;
    slices[selectedCategory.id].name = name;
    this.setState({slices, editCategoryPopup:false})
  }
  onSubmit() {
    let {slices} = this.state;
    for (let i = 0; i < slices.length; i++) {
      slices[i].value = 0;
    }
    this.setState({slices})
  }
  render() {
    return (
      <View style={styles.container}>
        { this.state.editCategoryPopup && <CategoryPopup slice={this.state.selectedCategory} onCloseModal={this.onCloseModal} onUpdateCategory={this.onUpdateCategory}/>}
        <Wheel slices={this.state.slices} onRingChange={this.onRingChange} onCategorySelect={this.onCategorySelect}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={this.onSubmit}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
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
  buttonText: {
    color:'white',
    textAlign: 'center',
    fontSize: 16
  },
  submitButton: {
    margin: 10,
    backgroundColor:'#0A84FF', // apple blue
    padding: 8,
    borderRadius: 10,
    width: 100
  }
});

/**
 * Support class: Wheel
 */
interface WheelProps {
  slices: SliceModel[],
  onRingChange: (id:number, value:number) => void,
  onCategorySelect: (id:number) => void
}
const Wheel = (props:WheelProps) => {
  const {slices, onRingChange, onCategorySelect} = props;
  const vSlices = slices.map((slice) =>
    <>
      <TextRing slice={slice} radius={57} onCategorySelect={onCategorySelect}/>
      <ColorRing slice={slice} radius={48} level={3} onRingChange={onRingChange}/>
      <ColorRing slice={slice} radius={34} level={2} onRingChange={onRingChange}/>
      <ColorRing slice={slice} radius={20} level={1} onRingChange={onRingChange}/>
    </>
  )
    return <Svg height="360" width="360" viewBox="-8 0 116 100">
      {vSlices}
    </Svg>
}

/**
 * Support class: text ring
 */
interface TextRingProps {
  slice: SliceModel,
  radius: number,
  onCategorySelect: (id:number) => void
}
const TextRing = (props: TextRingProps) => {
  const { slice, radius, onCategorySelect } = props, angle = slice.endAngle - slice.startAngle + 1,
    x1 = 50 + radius * Math.cos((Math.PI / 180) * slice.startAngle),
    y1 = 50 + radius * Math.sin((Math.PI / 180) * slice.startAngle),
    x2 = 50 + radius * Math.cos((Math.PI / 180) * slice.endAngle),
    y2 = 50 + radius * Math.sin((Math.PI / 180) * slice.endAngle),
    d = `M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`,
    textX = 50 + (radius + 5) * Math.cos((Math.PI / 180) * (slice.startAngle + angle / 2)),
    textY = 50 + (radius + 5) * Math.sin((Math.PI / 180) * (slice.startAngle + angle / 2));

  return (
        <G key={slice.id + radius}>
          <TouchableWithoutFeedback onPress={() => onCategorySelect(slice.id)}>
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
    const { radius, slice, onRingChange, level} = props,
      x1 = 50 + radius * Math.cos((Math.PI / 180) * slice.startAngle),
      y1 = 50 + radius * Math.sin((Math.PI / 180) * slice.startAngle),
      x2 = 50 + radius * Math.cos((Math.PI / 180) * slice.endAngle),
      y2 = 50 + radius * Math.sin((Math.PI / 180) * slice.endAngle),
      d = `M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

    const colors = [
      'white', '#DF3636', '#F3A61E', '#549B4C'
    ]

    const color = slice.value >= level ? colors[slice.value] : 'white'

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

/**
* support class: categoryPopup
 */
interface CategoryPopupProps {
  slice:SliceModel,
  onCloseModal: () => void,
  onUpdateCategory: (name:string) => void
}
const CategoryPopup = (props:CategoryPopupProps) => {
  const { slice, onCloseModal, onUpdateCategory } = props;
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      width: '80%',
      height: '30%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 20
    },
    input: {
      marginTop: 15,
      paddingLeft: 5,
      height: 40,
      borderColor: 'blue',
      borderWidth: 1,
      width: 200
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10
    },
    buttonText: {
      color:'white',
      textAlign: 'center',
      fontSize: 16
    },
    submitButton: {
      margin: 10,
      backgroundColor:'#0A84FF', // apple blue
      padding: 8,
      borderRadius: 10,
      width: 100
    },
    cancelButton: {
      margin: 10,
      backgroundColor:'#A2AAAD', // apple grey
      padding: 8,
      borderRadius: 10,
      width: 100
    }
  })
  const [textValue, onChangeText] = React.useState(slice.name)

  return (
    <Modal transparent={true}>
      <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Editing {slice.name} Category</Text>
        <TextInput
          editable
          onChangeText={text => onChangeText(text)}
          value={textValue}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCloseModal}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={() => onUpdateCategory(textValue)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
  )
}
export default SelfAssessment;
