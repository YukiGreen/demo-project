<!-- Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. -->
<template>
  <div class="rk-debug flex-v">
    <DebugToolBar />
    <LogLAL />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DebugToolBar from '../components/debug/tool-bar.vue';
  import LogLAL from '../components/debug/log-lal.vue';

  @Component({
    components: { DebugToolBar, LogLAL },
  })
  export default class Debug extends Vue {}
</script>

<style lang="scss" scoped>
  .rk-debug {
    flex-grow: 1;
    height: 100%;
    min-height: 0;
  }
</style>
