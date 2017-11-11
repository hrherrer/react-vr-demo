import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Cylinder,
  Plane,
  AmbientLight,
  PointLight,
  Animated,
  Model,
} from 'react-vr';

const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class WelcomeToVR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotation: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.rotate();
  }

  rotate = () => {
    this.state.rotation.setValue(0);
    Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 12000,
      }
    ).start(this.rotate);
  };

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <AmbientLight intensity={0.5} castShadow={true}/>
        <PointLight
          castShadow={true}
          style={{
            color: 'white', transform: [{translate: [0, 0, 0]}]
          }}
        />
        {/*<Plane
          receiveShadow={true}
          dimWidth={10}
          dimHeight={10}
          lit={true}
          castShadow={true}
          style={{
            color: '#777879',
            transform: [
              {translate: [0, -1, -2]},
              {rotateX: -90},
            ],
          }}
        />*/}
        <AnimatedModel
          castShadow={true}
          lit={true}
          source={{obj: asset('futuristic.obj'), mtl: asset('futuristic.mtl')}}
          style={{
            color: 'red',
            transform: [
              {translate: [0, -1, -30 ]},
              {scale: 0.9},
              {rotateY: this.state.rotation}
            ]
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
