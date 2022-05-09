// import CamToFigma from '~/app/assets/animations/camera-to-figma.json'
// import Camra from '~/app/assets/animations/camera.json'
// import Figma from '~/app/assets/animations/figma.json'
// import File from '~/app/assets/animations/file.json'
// import Sb from '~/app/assets/animations/sb.json'
import Clone from '~/app/assets/animations/clone.json'
import FileToTool from '~/app/assets/animations/file-to-tool.json'
import SbToCamera from '~/app/assets/animations/sb-to-camera.json'
import ToolToSb from '~/app/assets/animations/tool-to-sb.json'
import Tool from '~/app/assets/animations/tool.json'
import { STEPS } from '~/app/pages/Main/Main.types'

export const mapStepToAnimation = {
  [STEPS.CAPTURE]: SbToCamera,
  [STEPS.CLONE]: Clone,
  [STEPS.COMPARE]: ToolToSb,
  [STEPS.INSTALL]: FileToTool,
  [STEPS.RENDER]: Tool,
}
