var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
figma.ui.onmessage = (select) => __awaiter(this, void 0, void 0, function* () {
    const selectedFrameNodes = figma.currentPage.selection.filter(node => node.type === 'FRAME');
    const selectedImgNodes = figma.currentPage.selection.filter((node) => node.fills[0].type === 'IMAGE');
    if (selectedFrameNodes.length > 0 && selectedImgNodes.length > 0) {
        selectedFrameNodes.forEach((node) => {
            let FrameEDM = node.clone();
            FrameEDM.x = FrameEDM.x + FrameEDM.width + 10;
            FrameEDM.children.forEach((ch) => {
                selectedImgNodes.forEach((imgNode) => {
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
            });
            figma.currentPage.appendChild(FrameEDM);
        });
    }
    else {
        figma.notify("Select image and FRAME this plugin.");
    }
});
