import CamToFigma from '~/app/assets/animations/camera-to-figma.json'
// import Sb from '~/app/assets/animations/sb.json'
// import Clone from '~/app/assets/animations/clone.json'
// import Camara from '~/app/assets/animations/camera.json'
import Figma from '~/app/assets/animations/figma.json'
import FileToTool from '~/app/assets/animations/file-to-tool.json'
import File from '~/app/assets/animations/file.json'
import SbToCamera from '~/app/assets/animations/sb-to-camera.json'
import ToolToSb from '~/app/assets/animations/tool-to-sb.json'
// import Tool from '~/app/assets/animations/tool.json'
import { STEPS } from '~/app/pages/Main/Main.types'

export const mapStepToAnimation = {
  [STEPS.INIT]: File,
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: File,
  [STEPS.CHECKED_OUT_CODE]: FileToTool,
  [STEPS.INSTALLED_PACKAGES]: ToolToSb,
  [STEPS.CAPTURED_SCREENSHOTS]: SbToCamera,
  [STEPS.VISUAL_COMPARE]: CamToFigma,
  [STEPS.NUMERIC_COMPARE]: Figma,
  [STEPS.UPLOADED_SCREENSHOTS]: Figma,
}
