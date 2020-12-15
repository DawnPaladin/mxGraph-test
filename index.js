// from https://stackoverflow.com/a/57829704
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM();
const fs = require('fs');

global.window = dom.window;
global.document = window.document;
global.XMLSerializer = window.XMLSerializer;
global.navigator = window.navigator;

const mxgraph = require("mxgraph")({
    mxImageBasePath: "./src/images",
    mxBasePath: "./src"
});


const {mxGraph, mxCodec, mxUtils} = mxgraph;

function makeHelloWorld() {
  // Extracted from https://github.com/jgraph/mxgraph/blob/master/javascript/examples/helloworld.html
  const graph = new mxGraph();

  // Gets the default parent for inserting new cells. This
  // is normally the first child of the root (ie. layer 0).
  var parent = graph.getDefaultParent();

  // Adds cells to the model in a single step
  graph.getModel().beginUpdate();
  try {
    var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
    var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
    var e1 = graph.insertEdge(parent, null, '', v1, v2);
  } finally {
    // Updates the display
    graph.getModel().endUpdate();
  }
  return graph;
}

const helloWorldGraph = makeHelloWorld();

function graphToXML(graph) {
    var encoder = new mxCodec();
    var result = encoder.encode(graph.getModel());
    return mxUtils.getXml(result);
}

const xml = graphToXML(helloWorldGraph);

fs.writeFileSync('./graph.xml', xml);
