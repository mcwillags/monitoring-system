import Toast from 'react-native-root-toast';

export const createToastError = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    backgroundColor: 'red',
    opacity: 1,
    position: -65,
  });
};

export const createToastSuccess = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    backgroundColor: 'green',
    opacity: 1,
    position: -65,
  });
};