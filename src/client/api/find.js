import buildUrl from 'build-url';

export default (
  endpoint,
  params,
  onSuccess,
  onError
) => {
  const url = buildUrl('/api/find/' + endpoint, {
    queryParams: params
  });

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(response => {
    // Process the response
    if(response.status == 200) {
      // The log records were uploaded successufully, invoke the
      // success callback.

      response.json().then((value) => {
        onSuccess(value);
      });
    } else {
      // A non-success error code was returned, invoke the error callback.
      console.error('Invalid Response:', response);

      onError(
        'Error looking up the generations (' + response.status + ')'
      );
    }
  })
  .catch(error => {
    // An error occured, invoke the error callback.
    console.error('Error:', error);

    onError('Could not connect to the server');
  }); 
}