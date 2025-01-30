export const uploadFile = (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch('/api/file', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}