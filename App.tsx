/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {Button, Image, Platform, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import CustomText from "./src/imagepickers/CustomText.ts";
import styled from "styled-components/native";
import mime from 'mime';
import ImagePickerx from "./src/imagepickers/ImagePicker.tsx";

const MediaIconContainer = styled.TouchableOpacity`
  padding: 5px;
  margin: 5px;
  border: 2px solid #ddd;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
function App() {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}
export const requestBlob = async (uri: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };

    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };

    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';

    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uri, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
};

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [image, setImage] = useState<any | undefined>(undefined);

  const onImageChange = (payload: any) => {
    resetMedia();
    setImage(payload);
  };
  const resetMedia = () => {
    setImage(undefined);
  };

  const onImageSelected = async () => {
    console.log('uploading image')

    let imageUrl: string | undefined;

    if (image && image.path) {
      // const uri = Platform.OS !== 'ios' ? image.uri?.replace('file://', '') : image.uri;

      //  using the FormData approach - upload succeeds, creates corrupt file though
      const formData = new FormData()
        formData.append('file', {
          type: mime.getType(image.path),
          uri: image.path,
          name: image.fileName,
        });
      const respons = await fetch('enter api url here', {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/formdata'
        },
        body:  formData,
      });

      // using fetch creating a blob - returns TypeError
      const response = await fetch(image.path)
      const blob1 = await response.blob()
      const respons2 = await fetch('enter api url here', {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/formdata'
        },
        body:  blob1,
      });

      // using XML Http Request creating a blob - return an error
      const blob2 = await requestBlob(image.path)
      const respons3 = await fetch('enter api url here', {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/formdata'
        },
        body:  blob2,
      });
    }

  };
  return (
    <View style={{...styles.container, marginTop: safeAreaInsets.top}}>
      <CustomText>upload function:</CustomText>

      <ImagePickerx callback={onImageChange} />
      <CustomText>Selected Image:</CustomText>
      {image && <Image src={image.path} style={{height: 150, width: 150}}/>}

      <Button title="Upload Image" onPress={() => onImageSelected()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor:'white',
    padding: 10
  },
  textinput: {
    borderWidth: 1,
    marginBottom: 5
  }
});

export default App;
