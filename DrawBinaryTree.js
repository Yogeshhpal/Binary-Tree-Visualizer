import { BinaryTreeNode } from './BinaryTreeNode.js'
import { getRequiredHeightAndWidth, DEFAULT_CONFIG, drawNode, connectEdge, treeConstructor } from './TreeUtils.js'

const canvas = document.querySelector('canvas');

function drawBinaryTree(root, canvasElement) {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    //initialize the canvas dimesions
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

    //calculation of required height and width to draw the tree structure
    const { requiredCanvasWidth,
        requiredCanvasHeight
    } = getRequiredHeightAndWidth(root);

    //Calculating Starting and Ending Point to draw a node
    const WindowWidthCenter = maxWidth / 2;
    const requiredCenter = requiredCanvasWidth / 2;

    const xStart = WindowWidthCenter - requiredCenter;
    const xEnd = WindowWidthCenter + requiredCenter;

    const horizontalConfig = { xStart, xEnd };

    //Draw
    recursivelyDrawNodes(root, canvasElement, 0.5, horizontalConfig);
}

//Algorithm:
// 1. Find root nodes coordinates 
// 2. Draw root circle 
// 3. Call recursively for left and right child 
// 5. Connect edges of root with left and right nodes
function recursivelyDrawNodes(root, canvasElement, currentLevel, horizontalConfig) {
    const { xStart, xEnd } = horizontalConfig;

    const xPos = (xStart + xEnd) / 2;
    const yPos = (currentLevel * DEFAULT_CONFIG.nodeHeightSpacing);

    //Node Draw
    drawNode(root.value, canvasElement, xPos, yPos);
    if (root.left != null) {
        const leftNodeHorizontalConfig = { xStart, xEnd: xPos };
        recursivelyDrawNodes(root.left, canvasElement, currentLevel + 1, leftNodeHorizontalConfig);
        //connect edges
        connectEdge(canvasElement,
            {
                xStart: xPos,
                xEnd: (xStart + xPos) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - (DEFAULT_CONFIG.radius)
            }
        )
    }
    if (root.right != null) {
        const rightNodeHorizontalConfig = { xStart: xPos, xEnd };
        recursivelyDrawNodes(root.right, canvasElement, currentLevel + 1, rightNodeHorizontalConfig);
        //Connect Edges
        connectEdge(canvasElement,
            {
                xStart: xPos,
                xEnd: (xPos + xEnd) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - (DEFAULT_CONFIG.radius)
            }
        )
    }
}


let prevValue = '';
function init(value) {
    prevValue = value;

    clearCanvas();

    const root = treeConstructor(value);
    // console.log(root);
    drawBinaryTree(root, canvas);

}

function clearCanvas() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}


const textarea = document.querySelector('textarea');
const applyBtn = document.querySelector('.applyBtn');
const clearBtn = document.querySelector('.clearBtn');

applyBtn.addEventListener('click', () => {
    if (textarea.value === '') return;
    init(textarea.value); //It will initialize our binary tree
})

clearBtn.addEventListener('click', () => {
    textarea.value = '';
    clearCanvas();
});

window.addEventListener('resize', () => init(prevValue));

