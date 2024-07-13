import { BinaryTreeNode } from './BinaryTreeNode.js'
export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 25,
    nodeHeightSpacing: 100,
    fontSize: 10
}
export function getRequiredHeightAndWidth(root) {
    const heightOfTree = root.getHeight();
    const maxLeafNodes = Math.pow(2, heightOfTree);

    const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
    const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;

    return { requiredCanvasWidth, requiredCanvasHeight };
}
export function drawNode(value, canvasElement, x, y) {
    const context = canvasElement.getContext('2d'); //it is a tool to draw

    //Draw Circle
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'lightsalmon';
    context.fill();

    // Draw Circle Border 
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = 'brown';
    context.stroke();

    //Write Values
    context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
    context.fillStyle = 'brown';
    context.textAlign = 'center';
    context.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdge(canvasElement, xCoordinates, yCoordinates) {
    const { xStart, xEnd } = xCoordinates;
    const { yStart, yEnd } = yCoordinates;

    const xHalf = (xStart + xEnd) / 2; //xCenter
    const yHalf = (yStart + yEnd) / 2; //yCenter

    const start = { x: xStart, y: yStart };
    const controlPoint1 = { x: xHalf, y: yHalf };
    const controlPoint2 = { x: xEnd, y: yHalf };
    const end = { x: xEnd, y: yEnd };

    //Draw Curve
    const context = canvasElement.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'brown';
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, end.x, end.y);
    // context.lineTo(end.x, end.y);
    context.stroke();
}

export function treeConstructor(input) {
    input = parseInput(input);
    // console.log(input);

    const queue = [];
    let idx = 0;
    const root = new BinaryTreeNode(input[idx]);
    idx++;

    queue.push(root);
    while (queue.length > 0 && idx < input.length) {
        const node = queue.shift();

        //Left Child
        if (idx < input.length) {
            if (input[idx] != null) {
                const leftNode = new BinaryTreeNode(input[idx]);
                node.setLeft(leftNode);
                queue.push(leftNode);
            }
            idx++;
        }

        //Right Child
        if (idx < input.length) {
            if (input[idx] != null) {
                const rightNode = new BinaryTreeNode(input[idx]);
                node.setRight(rightNode);
                queue.push(rightNode);
            }
            idx++;
        }
    }

    return root;
}

function parseInput(input) {
    let parsedInput = '';

    for (let i = 0; i < input.length; i++) {
        const ch = input.charAt(i);
        // console.log(ch);
        if (ch !== ' ') parsedInput += ch;
    }
    // console.log(parsedInput);
    //it will return array
    return parsedInput.split(',')
        .map(element => {
            if (element === 'null') return null;
            else return element;
        })
}