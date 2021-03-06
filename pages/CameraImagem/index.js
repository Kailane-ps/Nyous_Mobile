import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';

const CameraImagem = () => {
    const [hasPermission, setHasPermission] = useState(null);

    // Direção da camera 
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imagemUri, setImagemUri] = useState(null);
  
    // Permicao para camera
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const tirarFoto = async () => {
        if(camera){
            let foto = await camera.takePictureAsync();
            alert('foto capturada');
            setImagemUri(foto.uri);
            console.log(foto);
        }
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera 
        style={{ flex: 1 }} 
        type={type}
        ref = {ref => {
            camera = ref;
        }}
        >

          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>

        {imagemUri && <Image source={{uri : imagemUri}} style={{height : 300}}/>}
        <Button title="Tirar Foto" onPress={() => tirarFoto()} />
      </View>
    );
}

export default CameraImagem;
