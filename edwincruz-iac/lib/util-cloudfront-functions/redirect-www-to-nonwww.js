function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var host = request.headers.host.value;

  if (host.startsWith('www')) {
    var uri = request.uri;
    var qs = request.querystring;
    var redirectDomain = host.substring(4);
    return {
      statusCode: 301,
      statusDescription: 'OK',
      headers: {
        "location": {
          "value": (qs !== undefined && qs.length > 0) ? `https://${redirectDomain}${uri}?${qs}` : `https://${redirectDomain}${uri}`
        }
      }
    };
  }
  return request;
}
