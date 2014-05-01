// Generated by LiveScript 1.2.0
(function(){
  var width, height, fill, link, node, mousemove, mousedown, tick, restart, force, svg, fnodes, flinks, cursor;
  width = 960;
  height = 500;
  fill = d3.scale.category20();
  link = {};
  node = {};
  mousemove = function(){
    return cursor.attr('transform', 'translate(' + d3.mouse(this) + ')');
  };
  mousedown = function(){
    var point, node, n;
    point = d3.mouse(this);
    node = {
      x: point[0],
      y: point[1]
    };
    n = fnodes.push(node);
    fnodes.forEach(function(target){
      var x, y;
      x = target.x - node.x;
      y = target.y - node.y;
      if (Math.sqrt(x * x + y * y) < 30) {
        return flinks.push({
          source: node,
          target: target
        });
      }
    });
    return restart();
  };
  tick = function(){
    link.attr('x1', function(d){
      return d.source.x;
    }).attr('y1', function(d){
      return d.source.y;
    }).attr('x2', function(d){
      return d.target.x;
    }).attr('y2', function(d){
      return d.target.y;
    });
    return node.attr('cx', function(d){
      return d.x;
    }).attr('cy', function(d){
      return d.y;
    });
  };
  restart = function(){
    link = link.data(flinks);
    link.enter().insert('line', '.node').attr('class', 'link');
    node = node.data(fnodes);
    node.enter().insert('circle', '.cursor').attr('class', 'node').attr('r', 5).call(force.drag);
    return force.start();
  };
  force = d3.layout.force().size([width, height]).nodes([{}]).linkDistance(30).charge(-60).on('tick', tick);
  svg = d3.select('body').append('svg').attr('width', width).attr('height', height).on('mousemove', mousemove).on('mousedown', mousedown);
  svg.append('rect').attr('width', width).attr('height', height);
  fnodes = force.nodes();
  node = svg.selectAll('nodes').data(fnodes);
  flinks = force.links();
  link = svg.selectAll('links').data(flinks);
  cursor = svg.append('circle').attr('r', 30).attr('transform', 'translate(-100,-100)').attr('class', 'cursor');
  restart();
}).call(this);
