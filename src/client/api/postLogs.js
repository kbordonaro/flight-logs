export default (data, onSuccess, onError) => {
  fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    // Process the response
    if(response.status == 204) {
      // The log records were uploaded successufully, invoke the
      // success callback.

      onSuccess();
    } else {
      // A non-success error code was returned, invoke the error callback.
      console.error('Invalid Response:', response);

      onError(
        'Error occured processing the log file (' + response.status + ')'
      );
    }
  })
  .catch(error => {
    // An error occured, invoke the error callback.
    console.error('Error:', error);

    onError('Could not connect to the server');
  }); 
}