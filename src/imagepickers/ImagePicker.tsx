import React from 'react';
import ModalContentContainer from './ModalContentContainer';
import PhotoMenuText from './PhotoMenuText';
import Imago from './Imago';
import PhotoMenuTextContainer from './PhotoMenuTextContainer';
import Camera from './Camera';
import {Alert, Linking, PermissionsAndroid, Platform, Text} from 'react-native';
import ImagePicker, { Image } from "react-native-image-crop-picker";

export default function ImagePickerx({
  toggleModal,
  callback,
}: {
  toggleModal?: () => void;
  callback: (payload: Image) => void;
}) {
  console.log('opening picker')
  const askPermissionStorage = async () => {
    try {
    let permissionGranted = false;
    const androidVersion = parseInt(Platform.Version as string, 10); // Get the Android version as an integer

    if (androidVersion >= 33) {
      // Request permissions for Android 13 and above (API level 33+)
      const requestedPermissions = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];

      const results = await PermissionsAndroid.requestMultiple(requestedPermissions);
      permissionGranted = Object.values(results).some(result => result === PermissionsAndroid.RESULTS.GRANTED);
    } else if (androidVersion <= 32) {
      // Request permissions for Android 11 to 13 (API level 30-32)
      const requestedPermissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];

      const results = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log(results);

      permissionGranted = results === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      openSettingsAlert(); // Open settings alert if the Android version is unsupported
    }

    if (permissionGranted) {
      return true; // Return true if permissions are granted
    } else {
      openSettingsAlert(); // Open settings alert if permissions are denied
      return false; // Return false if permissions are denied
    }
  } catch (err) {
    console.warn(err); // Log any errors
    return false; // Return false in case of error
  }
  };
  const askPermissionCamera = async () => {
    let permission = false;
    if (Platform.OS === 'ios') {
      permission = true;
    } else if (Platform.OS === 'android') {
      const OsVer = Platform.Version;
      const camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (OsVer < 33) {
        const write = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (write === 'granted') {
          permission = true;
        }
      } else {
        if (camera === 'granted') {
          permission = true;
        }
      }
    }
    return permission;
  };
  const startCamera = async () => {
    console.log('starting camera')
    const permission = await askPermissionStorage();
    if (!permission) {
      console.log('no permission')
      return;
    }
    const result = await ImagePicker.openCamera({
      mediaType: 'photo',
    });
    if (result) {
      callback(result);
      toggleModal?.();
    }
  };
  const startFilePicker = async () => {
    console.log('starting filepicker')
    const permission = await askPermissionStorage();
    if (!permission) {
      return;
    }
    const result = await ImagePicker.openPicker({
      mediaType: 'photo',
      selectionLimit: 1,
      maxWidth: 400,
    });
    console.log(result)
    if (result) {
      callback(result);
      toggleModal?.();
    }
  };
  const openSettingsAlert = () => {
    Alert.alert('Required permission.', 'Storage permission required to download the data', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'), // Log when Cancel is pressed
        style: 'cancel',
      },
      {
        text: 'Go To Settings',
        onPress: () => openAppSettings() // Open app settings when "Go To Settings" is pressed
      },
    ]);
  };

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:'); // Open iOS app settings
    } else {
      Linking.openSettings(); // Open Android app settings
    }
  };

  return (
    <ModalContentContainer vertical orientation={'center'}>
      <PhotoMenuTextContainer orientation={'center'} onPress={startCamera}>
        <Camera size={48} />
        <PhotoMenuText>Foto maken</PhotoMenuText>
      </PhotoMenuTextContainer>
      <PhotoMenuTextContainer onPress={startFilePicker} orientation={'center'}>
        <Imago size={48} />
        <PhotoMenuText>Foto kiezen</PhotoMenuText>
      </PhotoMenuTextContainer>
    </ModalContentContainer>
  );
}
