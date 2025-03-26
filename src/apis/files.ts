export const uploadFile = (data: { file: File }): Promise<FileResponse> =>
  apiRequest({
    url: 'files/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
