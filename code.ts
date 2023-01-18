figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = (pluginMessage) => {

  const postComponentSet = figma.root.findOne(
    (node) => node.type == "COMPONENT_SET" && node.name == "post"
  ) as ComponentSetNode;

  let selectedVariant;

  console.log(pluginMessage.imageVariant);

  if (pluginMessage.darkModeState === true) {
    switch (pluginMessage.imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=single, Dark mode=true"
        ) as ComponentNode;
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=carousel, Dark mode=true"
        ) as ComponentNode;
        break;
      default:
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=none, Dark mode=true"
        ) as ComponentNode;
        break;
    }
  } else {
    switch (pluginMessage.imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=single, Dark mode=false"
        ) as ComponentNode;
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=carousel, Dark mode=false"
        ) as ComponentNode;
        break;
      default:
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
  }

  selectedVariant.createInstance();
  figma.closePlugin();
};
