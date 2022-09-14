export const EntityType = [
  { key: 'Service', label: 'Service' },
  { key: 'All', label: 'All' },
  { key: 'Endpoint', label: 'Service Endpoint' },
  { key: 'ServiceInstance', label: 'Service Instance' },
  { key: 'ServiceRelation', label: 'Service Relation' },
  { key: 'ServiceInstanceRelation', label: 'Service Instance Relation' },
  { key: 'EndpointRelation', label: 'Endpoint Relation' },
];
export const BrowserEntityType = [
  { key: 'Service', label: 'Service' },
  { key: 'All', label: 'All' },
  { key: 'Endpoint', label: 'Page Path' },
  { key: 'ServiceInstance', label: 'Service Version' },
];

export const IndependentType = [
  { key: true, label: 'Self selectors' },
  { key: false, label: 'Common selectors' },
];

export enum MetricsType {
  UNKNOWN = 'UNKNOWN',
  REGULAR_VALUE = 'REGULAR_VALUE',
  LABELED_VALUE = 'LABELED_VALUE',
  HEATMAP = 'HEATMAP',
  SAMPLED_RECORD = 'SAMPLED_RECORD',
}

export const QueryMetricTypes: { [key: string]: Array<{ label: string; value: string }> } = {
  REGULAR_VALUE: [
    { label: 'read the single value in the duration', value: 'readMetricsValue' },
    { label: 'read all values in the duration', value: 'readMetricsValues' },
    { label: 'get sorted top N values', value: 'sortMetrics' },
  ],
  LABELED_VALUE: [{ label: 'read all values of labels in the duration', value: 'readLabeledMetricsValues' }],
  HEATMAP: [{ label: 'read heatmap values in the duration', value: 'readHeatMap' }],
  SAMPLED_RECORD: [{ label: 'get sorted topN values', value: 'readSampledRecords' }],
};

export const MetricChartType: { [key: string]: string } = {
  readMetricsValue: 'ChartNum',
  readMetricsValues: 'ChartLine',
  sortMetrics: 'ChartSlow',
  readLabeledMetricsValues: 'ChartLine',
  readHeatMap: 'ChartHeatmap',
  readSampledRecords: 'ChartSlow',
};

export const CalculationType = [
  { label: 'Plus', value: '+' },
  { label: 'Minus', value: '-' },
  { label: 'Multiplication', value: '*' },
  { label: 'Division', value: '/' },
  { label: 'Convert Unix Timestamp(milliseconds)', value: 'milliseconds' },
  { label: 'Convert Unix Timestamp(seconds)', value: 'seconds' },
];

export const ChartTypeOptions = [
  { value: 'ChartLine', label: 'Line Chart' },
  { value: 'ChartArea', label: 'Area Chart' },
  { value: 'ChartBar', label: 'Bar Chart' },
  { value: 'ChartTable', label: 'Table Of Latest Values' },
];

export const ReadValueChartType = [
  { value: 'ChartNum', label: 'Digital Card' },
  { value: 'ChartSlow', label: 'Slow Chart' },
];

export const MaxItemNum = 10;

export enum MetricsName {
  SERVICE_RESP_TIME = 'service_resp_time',
  SERVICE_SLA = 'service_sla',
  SERVICE_CPM = 'service_cpm',
  SERVICE_PERCENTILE = 'service_percentile',
  SERVICE_APDEX = 'service_apdex',
}
