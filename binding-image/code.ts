figma.showUI(__html__);
figma.ui.onmessage = async (select) => {
    const selectedFrameNodes: Array<SceneNode> = figma.currentPage.selection.filter(node => node.type === 'FRAME');
    const selectedImgNodes: Array<SceneNode> = figma.currentPage.selection.filter((node: any) => node.fills[0].type === 'IMAGE');
    if (selectedFrameNodes.length > 0 && selectedImgNodes.length > 0) {
        selectedFrameNodes.forEach((node: FrameNode) => {
            let FrameEDM = node.clone();
            FrameEDM.x = FrameEDM.x + FrameEDM.width + 10;
            FrameEDM.children.forEach((ch: any) => {
                selectedImgNodes.forEach((imgNode: any) => {
                    if (imgNode.name == ch.name) {
                        let fills = imgNode.fills.map(fill => {
                            if (fill.type == 'IMAGE') {
                                let f = JSON.parse(JSON.stringify(fill));
                                f.scaleMode = select.toUpperCase();
                                return f;
                            }
                            return fill;
                        });
                        ch.fills = fills;
                    }
                });
            })
            figma.currentPage.appendChild(FrameEDM);
        })
    } else {
        figma.notify("Select image and FRAME this plugin.");
    }
}


