export const ProfileSegment = {
  variable: '$segmentId: String',
  query: `
  getProfiledSegment: getProfiledSegment(segmentId: $segmentId) {
    spans {
      spanId
      parentSpanId
      serviceCode
      startTime
      endTime
      endpointName
      type
      peer
      component
      isError
      layer
      tags {
        key value
      }
      logs {
        time
        data {
          key
          value
        }
      }
    }
  }
  `,
};

export const CreateProfileTask = {
  variable: '$creationRequest: ProfileTaskCreationRequest',
  query: `
  createTask: createProfileTask(creationRequest: $creationRequest) {
    id
    errorReason
  }
  `,
};

export const GetProfileTaskList = {
  variable: '$endpointName: String, $serviceId: ID',
  query: `
  getProfileTaskList: getProfileTaskList(endpointName: $endpointName, serviceId: $serviceId) {
    serviceId
    endpointName
    startTime
    duration
    minDurationThreshold
    dumpPeriod
    maxSamplingCount
    id
    logs {
      id
      instanceId
      instanceName
      operationType
      operationTime
    }
  }
  `,
};
export const GetProfileTaskSegmentList = {
  variable: '$taskID: String',
  query: `
  getProfileTaskSegmentList: getProfileTaskSegmentList(taskID: $taskID) {
    segmentId
    endpointNames
    start
    duration
    traceIds
    isError
  }
  `,
};

export const GetProfileAnalyze = {
  variable: '$segmentId: String!, $timeRanges: [ProfileAnalyzeTimeRange!]!',
  query: `
  getProfileAnalyze: getProfileAnalyze(segmentId: $segmentId, timeRanges: $timeRanges) {
    tip
    trees {
      elements {
        id
        parentId
        codeSignature
        duration
        durationChildExcluded
        count
      }
    }
  }
  `,
};
export const GetProfileTaskLogs = {
  variable: '$taskID: String',
  query: `
  getProfileTaskLogs: getProfileTaskLogs(taskID: $taskID) {
    id
    instanceId
    instanceName
    operationTime
    operationType
  }
  `,
};
