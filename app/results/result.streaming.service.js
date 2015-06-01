'use strict';

(function() {

  function StreamingResultService(appConfig) {
    return {
      init: function(url) {
        // you can store your key pair in a json file instead, more details in documentation
        streamdataio.Pk = appConfig.streamdataioAppToken;
        streamdataio.pk = appConfig.streamdataioPrivateKey;

        var headers = ['X-Parse-Application-ID: ' + appConfig.parseAppId, 'X-Parse-REST-API-Key:' + appConfig.parseRestApiId];
        // create the Streamdata source
        var streamdata = streamdataio.createEventSource(url, headers);

        streamdata.streamdataConfig.PROTOCOL = 'http://';
        streamdata.streamdataConfig.HOST = 'proxy.streamdata.io';
        streamdata.streamdataConfig.PORT = '9080';

        return streamdata;
      }
    }
  }

  angular
    .module('pollApp')
    .factory('StreamingResultService', ['appConfig', StreamingResultService]);

}());