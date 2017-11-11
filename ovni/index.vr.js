import React from 'react';
import AnimatedMath from 'react-native-animated-math';

import {Easing} from 'react-native';

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  Animated,
} from 'react-vr';


const AnimatedModel = Animated.createAnimatedComponent(Model);

const places = [
  {
    title: 'Paisaje',
    image: 'paisaje.jpg',
  },
  {
    title: 'Marte',
    image: 'mars.jpg',
  }, {
    title: 'Estudio',
    image: 'studio.jpg',
  },
];

export default class demo extends React.Component {
  state = {
    rotation: new Animated.Value(0),
    verticalAngle: new Animated.Value(0),
    angle: new Animated.Value(0),
  };

  startRotation = () => {
    this.state.rotation.setValue(0);
    Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 10000,
        easing: Easing.linear,
      }
    ).start(this.startRotation);
  };

  ovniUpDownAngle = () => {
    this.state.verticalAngle.setValue(0);
    Animated.timing(
      this.state.verticalAngle,
      {
        toValue: 2*Math.PI,
        duration: 2000,
        easing: Easing.linear,
      }
    ).start(this.ovniUpDownAngle);

  };

  moveOvniAngle = () => {
    this.state.angle.setValue(0);
    Animated.timing(
      this.state.angle,
      {
        toValue: 2*Math.PI,
        duration: 20000,
        easing: Easing.linear,
      }
    ).start(this.moveOvniAngle);
  };

  componentDidMount() {
    this.startRotation();
    this.ovniUpDownAngle();
    this.moveOvniAngle();
  }

  render() {
    let radius = 30;
    let verticalRadius = 2;
    return (
      <View>
        <Pano source={asset(places[1].image)}/>
        <AmbientLight intensity={0.9}/>
        <AnimatedModel
          lit={true}
          source={{
            obj: asset('ovni/probeufo.obj'),
            mtl: asset('ovni/probeufo.mtl'),
          }}

          style={{
            transform: [
              {translate: [
                Animated.multiply(AnimatedMath.sinus(this.state.angle), radius),
                Animated.multiply(AnimatedMath.sinus(this.state.verticalAngle), verticalRadius),
                Animated.multiply(AnimatedMath.cosinus(this.state.angle), -radius),
                ]},
              {scale: 0.9},
              {rotateY: this.state.rotation},
            ]
          }}
        />
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 2.2,
              transform: [
                {translate: [-40, 4.5, 0]},
                {rotateY: 90}
              ]
            }}>
            Hola mundo
          </Text>
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('demo', () => demo);
