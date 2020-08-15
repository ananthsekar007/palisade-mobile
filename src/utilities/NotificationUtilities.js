import React from 'react';
import { Snackbar } from "react-native-snackbar-reddit";
export const showSuccessMessage = (message) => {
    Snackbar.success({
        content: message,
        duration: 1
      });
};

export const showErrorMessage = (message) => {
    Snackbar.error({
        content: message,
        duration: 1
      });
};

