import Snackbar from 'react-native-snackbar';

export const showSuccessMessage = (message) => {
    Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
    });
}

export const showErrorMessage = (message) => {
    Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
    });
}
