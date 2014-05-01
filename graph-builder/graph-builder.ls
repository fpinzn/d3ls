width = 960
height = 500
fill = d3.scale.category20!
link = {}
node = {}
mousemove = -> cursor.attr 'transform', 'translate(' + d3.mouse(this) + ')'

mousedown = ->
  point = d3.mouse this
  node = x: point.0, y: point.1
  n = fnodes.push node
  fnodes.forEach (target) ->
    x = target.x - node.x
    y = target.y - node.y
    if (Math.sqrt x * x + y * y) < 30
      flinks.push( source: node, target: target)
  restart!

tick = ->
  link.attr 'x1', (d) -> d.source.x
    .attr 'y1', (d) -> d.source.y
    .attr 'x2', (d) -> d.target.x
    .attr 'y2', (d) -> d.target.y

  node.attr 'cx', (d) -> d.x
    .attr 'cy', (d) -> d.y

restart = ->
  link := link.data(flinks)
  link.enter!.insert 'line', '.node'
    .attr 'class', 'link'

  node := node.data(fnodes)
  node.enter!.insert 'circle', '.cursor'
    .attr 'class', 'node'
    .attr 'r', 5
    .call force.drag


  force.start!

force = d3.layout.force!.size [width, height]
  .nodes [{}]
  .linkDistance 30
  .charge -60 .on 'tick', tick

svg = d3.select 'body'
  .append 'svg'
  .attr 'width', width
  .attr 'height', height
  .on 'mousemove', mousemove
  .on 'mousedown', mousedown

svg.append 'rect'
  .attr 'width', width
  .attr 'height', height

fnodes = force.nodes!
node = svg.selectAll 'nodes' .data fnodes
flinks = force.links!
link = svg.selectAll 'links' .data flinks

cursor = svg.append 'circle'
  .attr 'r', 30
  .attr 'transform', 'translate(-100,-100)'
  .attr 'class', 'cursor'



restart!
