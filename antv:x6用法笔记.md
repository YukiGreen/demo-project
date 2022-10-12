# AntV/X6详细使用全攻略

## 初始化画布

```js
const graph = new Graph({
  ...// option
})
```

关于画布Graph的相关操作：

[画布平移、缩放、居中、导出（svg、png）、销毁画布](https://x6.antv.vision/zh/docs/tutorial/basic/graph)

[画布Graph配置、方法](https://x6.antv.vision/zh/docs/api/graph/graph)

初始化画布的参数范例：
范例一：

```js
const graph = new Graph({
  container: document.getElementById('graph-container'), // 画布的容器。
  grid: true, // 背景，默认不绘制背景。
  mousewheel: { // 鼠标滚轮缩放，默认禁用。
    enabled: true,
    zoomAtMousePosition: true,
    modifiers: 'ctrl',
    minScale: 0.5,
    maxScale: 3,
  },
  connecting: { // 连线选项
    router: {
      name: 'manhattan',
      args: {
        padding: 1,
      },
    },
    connector: {
      name: 'rounded',
      args: {
        radius: 8,
      },
    },
    anchor: 'center',
    connectionPoint: 'anchor',
    allowBlank: false,
    snap: {
      radius: 20,
    },
    createEdge() {
      return new Shape.Edge({
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 2,
            targetMarker: {
              name: 'block',
              width: 12,
              height: 8,
            },
          },
        },
        zIndex: 0,
      })
    },
    validateConnection({ targetMagnet }) {
      return !!targetMagnet
    },
  },
  highlighting: { // 高亮选项
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#5F95FF',
          stroke: '#5F95FF',
        },
      },
    },
  },
  resizing: true, // 缩放节点，默认禁用。
  rotating: true, // 旋转节点，默认禁用。
  selecting: { // 点选/框选，默认禁用。
    enabled: true,
    rubberband: true,
    showNodeSelectionBox: true,
  },
  snapline: true, // 对齐线，默认禁用。
  keyboard: true, // 键盘快捷键，默认禁用
  clipboard: true, // 剪切板，默认禁用
})
```
范例二：

```js
this.graph = new Graph({
      container: paper, // 画布容器
      autoResize: true, // 是否监听容器大小改变，并自动更新画布大小。
      panning: { // 画布是否可以拖动
        enabled: true,
      },
      selecting: { // 点选/框选，默认禁用
        enabled: true, // 是否可选
        multiple: true, // 是否启用点击多选
        rubberband: false, // 否启用框选
        rubberEdge: true, // 没有这个属性,框选边
        movable: true, // 选中的节点是否可移动
        showNodeSelectionBox: false, // 是否显示节点的选择框
      },
      scaling: { // 没有
        min: 0.2,
        max: 2,
      },
      mousewheel: { // 鼠标滚轮缩放，默认禁用
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      scroller: true, // 滚动画布，默认禁用
      grid: {
        size: 10, // 渲染网格背景
        visible: true, // 渲染网格背景
      },
      snapline: true, // 对齐线
      minimap: { // 小地图，默认禁用
        enabled: true,
        container: minimap,
        scalable: false,
        width: 200,
        height: 120,
      },
      interacting: { // 定制节点和边的交互行为
        // 定制节点和边的交互行为
        edgeLabelMovable: false, // 边的标签是否可以被移动
        nodeMovable: !!editable, // 节点是否可以被移动
        magnetConnectable: !!editable,
        edgeMovable: true, // 边是否可以被移动。
        arrowheadMovable: true, // 最后这两个属性不生效
      },
      connecting: { // 连线选项
        allowMulti: false, // 是否允许在相同的起始节点和终止之间创建多条边
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowEdge: false, // 是否允许边链接到另一个边
        allowNode: true, // 是否允许边链接到节点（非节点上的链接桩）
        allowPort: false, // 是否允许边链接到链接桩
        highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点
        connector: 'smooth',
        createEdge() {
          // 连接的过程中创建新的边
          return self.graph.createEdge({ shape: X6_EDGE_NAME });
        },
        validateConnection(data) {
          const { sourceCell, targetCell } = data;
          if (sourceCell && targetCell && sourceCell.isNode() && targetCell.isNode()) {
            const edgeData = {
              sourceId: Number(sourceCell.id),
              targetId: Number(targetCell.id),
            };
            if (!self.edgeIsValid(edgeData)) {
              return false;
            }
          }

          return true;
        },
      },
      highlighting: {
        nodeAvailable: {
          name: 'className',
          args: {
            className: 'available',
          },
        },
        magnetAvailable: {
          name: 'className',
          args: {
            className: 'available',
          },
        },
        magnetAdsorbed: {
          name: 'className',
          args: {
            className: 'adsorbed',
          },
        },
      },
    });
```



### 配置参数详解

#### grid

```js
// 写法一
grid: true, // 背景，默认不绘制背景。
  
// 写法二
grid: {
	size: 10, // 渲染网格背景
	visible: true, // 渲染网格背景
},
```



## 侧边栏的UI组件控件

先初始化

```
// #region 初始化 stencil
const stencil = new Addon.Stencil({
  title: '流程图',
  target: graph,
  stencilGraphWidth: 200,
  stencilGraphHeight: 180,
  collapsable: true,
  groups: [
    {
      title: '基础流程图',
      name: 'group1',
    },
    {
      title: '系统设计图',
      name: 'group2',
      graphHeight: 250,
      layoutOptions: {
        rowHeight: 70,
      },
    },
  ],
  layoutOptions: {
    columns: 2,
    columnWidth: 80,
    rowHeight: 55,
  },
})
document.getElementById('stencil').appendChild(stencil.container)
```

再定义图形

```
const r1 = graph.createNode({
  shape: 'custom-rect',
  label: '开始',
  attrs: {
    body: {
      rx: 20,
      ry: 26,
    },
  },
})
const r2 = graph.createNode({
  shape: 'custom-rect',
  label: '过程',
})
const r3 = graph.createNode({
  shape: 'custom-rect',
  attrs: {
    body: {
      rx: 6,
      ry: 6,
    },
  },
  label: '可选过程',
})
const r4 = graph.createNode({
  shape: 'custom-polygon',
  attrs: {
    body: {
      refPoints: '0,10 10,0 20,10 10,20',
    },
  },
  label: '决策',
})
const r5 = graph.createNode({
  shape: 'custom-polygon',
  attrs: {
    body: {
      refPoints: '10,0 40,0 30,20 0,20',
    },
  },
  label: '数据',
})
const r6 = graph.createNode({
  shape: 'custom-circle',
  label: '连接',
})
stencil.load([r1, r2, r3, r4, r5, r6], 'group1')


// 定义有图片的图形
const imageShapes = [
  {
    label: 'Client',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
  },
  {
    label: 'Http',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
  },
  {
    label: 'Api',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
  },
  {
    label: 'Sql',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
  },
  {
    label: 'Clound',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
  },
  {
    label: 'Mq',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
  },
]
const imageNodes = imageShapes.map((item) =>
  graph.createNode({
    shape: 'custom-image',
    label: item.label,
    attrs: {
      image: {
        'xlink:href': item.image,
      },
    },
  }),
)
stencil.load(imageNodes, 'group2')
```

上面范例见https://x6.antv.vision/zh/examples/showcase/practices#flowchart

[拖拽、侧边栏使用说明](https://x6.antv.vision/en/docs/tutorial/basic/dnd)

## 定义快捷键

```
// #region 快捷键与事件
// copy cut paste
graph.bindKey(['meta+c', 'ctrl+c'], () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.copy(cells)
  }
  return false
})
graph.bindKey(['meta+x', 'ctrl+x'], () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.cut(cells)
  }
  return false
})
graph.bindKey(['meta+v', 'ctrl+v'], () => {
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste({ offset: 32 })
    graph.cleanSelection()
    graph.select(cells)
  }
  return false
})

//undo redo
graph.bindKey(['meta+z', 'ctrl+z'], () => {
  if (graph.history.canUndo()) {
    graph.history.undo()
  }
  return false
})
graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
  if (graph.history.canRedo()) {
    graph.history.redo()
  }
  return false
})

// select all
graph.bindKey(['meta+a', 'ctrl+a'], () => {
  const nodes = graph.getNodes()
  if (nodes) {
    graph.select(nodes)
  }
})

//delete
graph.bindKey('backspace', () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.removeCells(cells)
  }
})

// zoom
graph.bindKey(['ctrl+1', 'meta+1'], () => {
  const zoom = graph.zoom()
  if (zoom < 1.5) {
    graph.zoom(0.1)
  }
})
graph.bindKey(['ctrl+2', 'meta+2'], () => {
  const zoom = graph.zoom()
  if (zoom > 0.5) {
    graph.zoom(-0.1)
  }
})
```

范例：https://x6.antv.vision/zh/examples/showcase/practices#flowchart

## 定义链接桩

```
// #region 初始化图形
const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
}
```



## 初始化节点：

```
Graph.registerNode(
  'custom-rect',
  {
    inherit: 'rect',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true,
)

Graph.registerNode(
  'custom-polygon',
  {
    inherit: 'polygon',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: {
      ...ports,
      items: [
        {
          group: 'top',
        },
        {
          group: 'bottom',
        },
      ],
    },
  },
  true,
)

Graph.registerNode(
  'custom-circle',
  {
    inherit: 'circle',
    width: 45,
    height: 45,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true,
)

Graph.registerNode(
  'custom-image',
  {
    inherit: 'rect',
    width: 52,
    height: 52,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#5F95FF',
        fill: '#5F95FF',
      },
      image: {
        width: 26,
        height: 26,
        refX: 13,
        refY: 16,
      },
      label: {
        refX: 3,
        refY: 2,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: { ...ports },
  },
  true,
)
```

## 创建节点

```js
const r1 = graph.createNode({
  shape: 'custom-rect',
  label: '开始',
  attrs: {
    body: {
      rx: 20,
      ry: 26,
    },
  },
})
const r2 = graph.createNode({
  shape: 'custom-rect',
  label: '过程',
})
const r3 = graph.createNode({
  shape: 'custom-rect',
  attrs: {
    body: {
      rx: 6,
      ry: 6,
    },
  },
  label: '可选过程',
})
const r4 = graph.createNode({
  shape: 'custom-polygon',
  attrs: {
    body: {
      refPoints: '0,10 10,0 20,10 10,20',
    },
  },
  label: '决策',
})
const r5 = graph.createNode({
  shape: 'custom-polygon',
  attrs: {
    body: {
      refPoints: '10,0 40,0 30,20 0,20',
    },
  },
  label: '数据',
})
const r6 = graph.createNode({
  shape: 'custom-circle',
  label: '连接',
})
stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

const imageShapes = [
  {
    label: 'Client',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
  },
  {
    label: 'Http',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
  },
  {
    label: 'Api',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
  },
  {
    label: 'Sql',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
  },
  {
    label: 'Clound',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
  },
  {
    label: 'Mq',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
  },
]
const imageNodes = imageShapes.map((item) =>
  graph.createNode({
    shape: 'custom-image',
    label: item.label,
    attrs: {
      image: {
        'xlink:href': item.image,
      },
    },
  }),
)
stencil.load(imageNodes, 'group2')
```

## 使用SVG自定义节点

```js
import { Graph } from '@antv/x6'

Graph.registerNode(
  'custom-node',
  {
    width: 200,
    height: 60,
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: 'rgba(95,149,255,0.05)',
        refWidth: 1,
        refHeight: 1,
      },
      image: {
        'xlink:href':
          'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        width: 16,
        height: 16,
        x: 12,
        y: 12,
      },
      title: {
        text: 'Node',
        refX: 40,
        refY: 14,
        fill: 'rgba(0,0,0,0.85)',
        fontSize: 12,
        'text-anchor': 'start',
      },
      text: {
        text: 'this is content text',
        refX: 40,
        refY: 38,
        fontSize: 12,
        fill: 'rgba(0,0,0,0.6)',
        'text-anchor': 'start',
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'image',
      },
      {
        tagName: 'text',
        selector: 'title',
      },
      {
        tagName: 'text',
        selector: 'text',
      },
    ],
  },
  true,
)

const graph = new Graph({
  container: document.getElementById('container')!,
  grid: true,
})

graph.addNode({
  x: 200,
  y: 160,
  shape: 'custom-node',
})
```

![image-20220924111450375](/Users/gardenia/Library/Application Support/typora-user-images/image-20220924111450375.png)

## 节点上加按钮

或者悬浮上去再显示按钮

```js
import { Graph, Cell, Color } from '@antv/x6'

const graph = new Graph({
  container: document.getElementById('container'),
  grid: true,
})

const source = graph.addNode({
  x: 180,
  y: 60,
  width: 100,
  height: 40,
  attrs: {
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9',
      strokeWidth: 1,
    },
  },
  tools: [
    {
      name: 'button',
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              r: 14,
              stroke: '#fe854f',
              strokeWidth: 2,
              fill: 'white',
              cursor: 'pointer',
            },
          },
          {
            tagName: 'text',
            textContent: 'Btn',
            selector: 'icon',
            attrs: {
              fill: '#fe854f',
              fontSize: 10,
              textAnchor: 'middle',
              pointerEvents: 'none',
              y: '0.3em',
            },
          },
        ],
        x: '100%',
        y: '100%',
        offset: { x: -20, y: -20 },
        onClick({ cell }: { cell: Cell }) {
          const fill = Color.randomHex()
          cell.attr({
            body: {
              fill,
            },
            label: {
              fill: Color.invert(fill, true),
            },
          })
        },
      },
    },
  ],
})

const target = graph.addNode({
  x: 320,
  y: 250,
  width: 100,
  height: 40,
  attrs: {
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9',
      strokeWidth: 1,
    },
  },
})

graph.addEdge({
  source,
  target,
  attrs: {
    line: {
      stroke: '#a0a0a0',
      strokeWidth: 1,
      targetMarker: {
        name: 'classic',
        size: 7,
      },
    },
  },
})

graph.on('node:mouseenter', ({ node }) => {
  if (node === target) {
    node.addTools({
      name: 'button',
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              r: 14,
              stroke: '#fe854f',
              strokeWidth: 2,
              fill: 'white',
              cursor: 'pointer',
            },
          },
          {
            tagName: 'text',
            textContent: 'Btn',
            selector: 'icon',
            attrs: {
              fill: '#fe854f',
              fontSize: 10,
              textAnchor: 'middle',
              pointerEvents: 'none',
              y: '0.3em',
            },
          },
        ],
        x: 0,
        y: 0,
        offset: { x: 20, y: 20 },
        onClick({ cell }: { cell: Cell }) {
          cell.attr({
            body: {
              stroke: Color.randomHex(),
              strokeDasharray: '5, 1',
              strokeDashoffset:
                (cell.attr<number>('line/strokeDashoffset') | 0) + 20,
            },
          })
        },
      },
    })
  }
})

graph.on('node:mouseleave', ({ cell }) => {
  if (cell === target) {
    cell.removeTools()
  }
})
```

![image-20220924112317468](/Users/gardenia/Library/Application Support/typora-user-images/image-20220924112317468.png)

## 人工智能建模图

```js
import React from 'react'
import { Graph, Node, Path, Cell } from '@antv/x6'
import insertCss from 'insert-css'
import '@antv/x6-react-shape'

interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}

const image = {
  logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
  success:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
  failed:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
  running:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
}

export class AlgoNode extends React.Component<{ node?: Node }> {
  shouldComponentUpdate() {
    const { node } = this.props
    if (node) {
      if (node.hasChanged('data')) {
        return true
      }
    }
    return false
  }

  render() {
    const { node } = this.props
    const data = node?.getData() as NodeStatus
    const { label, status = 'default' } = data

    return (
      <div className={`node ${status}`}>
        <img src={image.logo} />
        <span className="label">{label}</span>
        <span className="status">
          {status === 'success' && <img src={image.success} />}
          {status === 'failed' && <img src={image.failed} />}
          {status === 'running' && <img src={image.running} />}
        </span>
      </div>
    )
  }
}

Graph.registerNode(
  'dag-node',
  {
    inherit: 'react-shape',
    width: 180,
    height: 36,
    component: <AlgoNode />,
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
  },
  true,
)

Graph.registerEdge(
  'dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true,
)

Graph.registerConnector(
  'algo-connector',
  (s, e) => {
    const offset = 4
    const deltaY = Math.abs(e.y - s.y)
    const control = Math.floor((deltaY / 3) * 2)

    const v1 = { x: s.x, y: s.y + offset + control }
    const v2 = { x: e.x, y: e.y - offset - control }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
    )
  },
  true,
)

const nodeStatusList = [
  [
    {
      id: '1',
      status: 'running',
    },
    {
      id: '2',
      status: 'default',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'running',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'running',
    },
    {
      id: '4',
      status: 'running',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'success',
    },
    {
      id: '4',
      status: 'failed',
    },
  ],
]

const graph: Graph = new Graph({
  container: document.getElementById('container')!,
  panning: {
    enabled: true,
    eventTypes: ['leftMouseDown', 'mouseWheel'],
  },
  mousewheel: {
    enabled: true,
    modifiers: 'ctrl',
    factor: 1.1,
    maxScale: 1.5,
    minScale: 0.5,
  },
  highlighting: {
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#fff',
          stroke: '#31d0c6',
          strokeWidth: 4,
        },
      },
    },
  },
  connecting: {
    snap: true,
    allowBlank: false,
    allowLoop: false,
    highlight: true,
    connector: 'algo-connector',
    connectionPoint: 'anchor',
    anchor: 'center',
    validateMagnet({ magnet }) {
      return magnet.getAttribute('port-group') !== 'top'
    },
    createEdge() {
      return graph.createEdge({
        shape: 'dag-edge',
        attrs: {
          line: {
            strokeDasharray: '5 5',
          },
        },
        zIndex: -1,
      })
    },
  },
  selecting: {
    enabled: true,
    multiple: true,
    rubberEdge: true,
    rubberNode: true,
    modifiers: 'shift',
    rubberband: true,
  },
})

graph.on('edge:connected', ({ edge }) => {
  edge.attr({
    line: {
      strokeDasharray: '',
    },
  })
})

graph.on('node:change:data', ({ node }) => {
  const edges = graph.getIncomingEdges(node)
  const { status } = node.getData() as NodeStatus
  edges?.forEach((edge) => {
    if (status === 'running') {
      edge.attr('line/strokeDasharray', 5)
      edge.attr('line/style/animation', 'running-line 30s infinite linear')
    } else {
      edge.attr('line/strokeDasharray', '')
      edge.attr('line/style/animation', '')
    }
  })
})

// 初始化节点/边
const init = (data: Cell.Metadata[]) => {
  const cells: Cell[] = []
  data.forEach((item) => {
    if (item.shape === 'dag-node') {
      cells.push(graph.createNode(item))
    } else {
      cells.push(graph.createEdge(item))
    }
  })
  graph.resetCells(cells)
}

// 显示节点状态
const showNodeStatus = async (statusList: NodeStatus[][]) => {
  const status = statusList.shift()
  status?.forEach((item) => {
    const { id, status } = item
    const node = graph.getCellById(id)
    const data = node.getData() as NodeStatus
    node.setData({
      ...data,
      status: status,
    })
  })
  setTimeout(() => {
    showNodeStatus(statusList)
  }, 3000)
}

fetch('../data/dag.json')
  .then((response) => response.json())
  .then((data) => {
    init(data)
    showNodeStatus(nodeStatusList)
    graph.centerContent()
  })

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
.node {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5F95FF;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
}
.node img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 8px;
}
.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: 104px;
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}
.node .status {
  flex-shrink: 0;
}
.node.success {
  border-left: 4px solid #52c41a;
}
.node.failed {
  border-left: 4px solid #ff4d4f;
}
.node.running .status img {
  animation: spin 1s linear infinite;
}
.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}
.x6-edge:hover path:nth-child(2){
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2){
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
@keyframes spin {
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
}
`)
```



## 关于布局

https://x6.antv.vision/zh/docs/tutorial/advanced/layout#dagre

https://g6.antv.vision/zh/docs/api/graphLayout/dagre/

## 渲染HTML按钮

```js
import { Graph } from '@antv/x6'
import insertCss from '../../edge/demo/node_modules/insert-css'

const graph = new Graph({
  container: document.getElementById('container'),
  grid: true,
})

graph.addNode({
  x: 280,
  y: 120,
  width: 120,
  height: 45,
  shape: 'html',
  html() {
    const wrap = document.createElement('div')
    wrap.innerHTML = `
      <a href="#" class="my-btn">
        Submit
      </a>`
    return wrap
  },
})

// 我们用 insert-css 协助demo演示
// 实际项目中只要将下面样式添加到样式文件中
// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .my-btn{
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .3s;
    margin-top: 40px;
    letter-spacing: 3px
  }

  .my-btn:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
  }
`)
```







