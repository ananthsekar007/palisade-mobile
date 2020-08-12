import {
    showErrorMessage,
    showSuccessMessage
} from "./NotificationUtilities";


export const normalizeResponseErrors = res => {
    if (res.ok) {
        return res.json().then((json) => {
            if (json.status == "SUCCESS") {
                if (json.message) {
                    showSuccessMessage(json.message)
                }
                return json;
            } else if (json.status == "FAILURE") {
                if (json.message) {
                    showErrorMessage(json.message)
                }
            }
            else {
                return Promise.reject(json);
            }
        })
    } else {
        if (
            res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')
        ) {
            return res.json().then(err => Promise.reject(err));
        }
        return Promise.reject({
            code: '500',
            status: res.status,
            message: res.message
        });
    }
};
export const fetchErrorHandler = err => {
    if (err.message) {
        showErrorMessage(err.message)
    }
}
