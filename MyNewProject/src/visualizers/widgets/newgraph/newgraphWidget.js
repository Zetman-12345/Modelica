/*globals define, WebGMEGlobal*/

/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Wed Dec 04 2019 20:29:17 GMT-0600 (GMT-06:00).
 */

define(['plotlyjs',
        'blob/BlobClient',
        'css!./styles/newgraphWidget.css']
    , function (Plotly,BlobClient) {
    'use strict';



    var WIDGET_CLASS = 'newgraph';






    function newgraphWidget(logger, container) {
        this._logger = logger.fork('Widget');

        this._el = container;

        this._bc = new BlobClient({logger:this._logger});


        this.nodes = {};
        this._initialize();

        this._logger.debug('ctor finished');
    };


    // global variable, selected attribute
    var selected_attribute;



    // div element for ploty graph
    var myDiv = document.createElement("myDiv");

    // update the value for x
    var x_axis = [];

    // update the value for y
    var y_axis = [];


    myDiv.style.cssText = 'position:relative;top: 10px;left: 120px;font-size: 40px;text-align: center';



    // the attribute variable
    var attribute_list = ["a","b","c","d","e","f"];

    var selectList = document.createElement("select");
    selectList.id = "mySelect";


    selectList.style.cssText = 'position:relative;top: 10px;left: 120px;font-size: 40px;text-align: center';

    // The button used to submit a properity to generate a graph
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Generate a xy graph";
    button.style.cssText = 'position:relative;top: 10px;left: 150px;font-size: 40px;text-align: center';
    button.onclick = function () {
        // get the Attribute from selector
        var selected_index = selectList.selectedIndex;
        selected_attribute = selectList.options[selected_index].text;

        // Pass the date to the graph array

        // plot the graph
        Plotly.plot( myDiv, [{
            x: x_axis,
            y: y_axis }], {
            margin: { t: 0 } } );


    };





    newgraphWidget.prototype._initialize = function () {
        var width = this._el.width(),
            height = this._el.height(),
            self = this;

        // set widget class
        this._el.addClass(WIDGET_CLASS);



        // Create a dummy header
        this._el.append('<h3>Draw a Graph:</h3>');

        // Generate the dropdown list elements
        for (var i = 0; i < attribute_list.length; i++) {
            var option = document.createElement("option");
            option.value = attribute_list[i];
            option.text = attribute_list[i];
            selectList.add(option);
        }

        this._el.append(selectList);
        this._el.append(button);


        // Registering to events can be done with jQuery (as normal)
        this._el.on('dblclick', function (event) {
            event.stopPropagation();
            event.preventDefault();
            self.onBackgroundDblClick();
        });
    };



    // Collecting date method
    newgraphWidget.prototype.collectData = function () {

    }

    newgraphWidget.prototype.onWidgetContainerResize = function (width, height) {
        this._logger.debug('Widget is resizing...');
    };

    // Adding/Removing/Updating items
    newgraphWidget.prototype.addNode = function (desc) {
        if (desc) {
            // Add node to a table of nodes
            var node = document.createElement('div'),
                label = 'children';

            if (desc.childrenIds.length === 1) {
                label = 'child';
            }

            this.nodes[desc.id] = desc;
            node.innerHTML = 'Adding node "' + desc.name + '" (click to view). It has ' +
                desc.childrenIds.length + ' ' + label + '.';

            // this._el.append(node);
            node.onclick = this.onNodeClick.bind(this, desc.id);
        }
    };

    newgraphWidget.prototype.removeNode = function (gmeId) {
        var desc = this.nodes[gmeId];
        this._el.append('<div>Removing node "' + desc.name + '"</div>');
        delete this.nodes[gmeId];
    };

    newgraphWidget.prototype.updateNode = function (desc) {
        if (desc) {
            this._logger.debug('Updating node:', desc);
            this._el.append('<div>Updating node "' + desc.name + '"</div>');
        }
    };

    /* * * * * * * * Visualizer event handlers * * * * * * * */

    newgraphWidget.prototype.onNodeClick = function (/*id*/) {
        // This currently changes the active node to the given id and
        // this is overridden in the controller.
    };


    newgraphWidget.prototype.onBackgroundDblClick = function () {
        //this._el.append('<div>Background was double-clicked!!</div>');
        this._el.append(myDiv);

    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    newgraphWidget.prototype.destroy = function () {
    };

    newgraphWidget.prototype.onActivate = function () {
        this._logger.debug('newgraphWidget has been activated');
    };

    newgraphWidget.prototype.onDeactivate = function () {
        this._logger.debug('newgraphWidget has been deactivated');
    };

    return newgraphWidget;
});
