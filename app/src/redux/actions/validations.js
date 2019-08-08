export function toggleDocuments(module, doc) {
    return {
        type: 'SET_MODULE_ACTIVE',
        module, doc
    }
}


export function publicKey() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_PUBLIC_KEY', publicKey: null });
        } catch (exception) {
            dispatch({ type: 'ERROR_PUBLIC_KEY', error: exception.message });
        }

    }
};
