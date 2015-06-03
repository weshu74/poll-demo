'use strict';

(function () {

  function StreamingResultService(appConfig, $q, OptionService) {
    function mapToVotes(votesResultSet, options) {

      var optionsMap = {};
      options.forEach(function (option) {
        optionsMap[option.objectId] = {label: option.Title, value: 0};
      });

      votesResultSet.results.forEach(function (vote) {
        optionsMap[vote.option_id].value++;
      });

      var votes = [];
      for (var option in optionsMap) {
        votes.push(optionsMap[option]);
      }

      return votes;
    }

    return {
      getPoll: function (questionId, onDataCallback, onPatchCallback) {
        var deferred = $q.defer();
        var param = {question_id: questionId};
        var jsonParam = angular.toJson(param);

        OptionService.get({'where': jsonParam}).$promise.then(function (options) {
          var url = 'https://api.parse.com/1/classes/Vote?where=' + encodeURIComponent('{\"question_id\": \"' + questionId + '\"}');

          // you can store your key pair in a json file instead, more details in documentation
          streamdataio.Pk = appConfig.streamdataioAppToken;
          streamdataio.pk = appConfig.streamdataioPrivateKey;

          var headers = ['X-Parse-Application-ID: ' + appConfig.parseAppId, 'X-Parse-REST-API-Key:' + appConfig.parseRestApiId];
          // create the streamdata.io source
          var streamdata = streamdataio.createEventSource(url, headers);

          streamdata.onData(function (data) {
            // add a callback when data is sent by streamdata.io: it's the first set of data sent (snapshot)
            streamdata.resultSet = data;
            var votes = mapToVotes(data, options);

            onDataCallback(votes);

          }).onPatch(function (patch) {
            // a callback when a patch is sent by streamdata.io: whenever the snapshot has changed, streamdata.io sent the diff
            jsonpatch.apply(streamdata.resultSet, patch);
            var votes = mapToVotes(streamdata.resultSet, options);

            onPatchCallback(votes);

          }).onError(function(error) {
            console.error(error);

          });


          deferred.resolve(streamdata);

        });

        return deferred.promise;
      }
    }
  }

  angular
    .module('pollApp')
    .factory('StreamingResultService', ['appConfig', '$q', 'OptionService', StreamingResultService]);

}());