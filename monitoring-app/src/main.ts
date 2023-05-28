import App from './App';
import { registerRootComponent } from 'expo';
import {LogBox} from "react-native";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

registerRootComponent(App);