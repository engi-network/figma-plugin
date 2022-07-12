// import CamToFigma from '~/app/assets/animations/camera-to-figma.json'
// import Clone from '~/app/assets/animations/clone.json'
import Camera from '~/app/assets/animations/camera.json'
import FigmaUpload from '~/app/assets/animations/figma-upload.json'
import Figma from '~/app/assets/animations/figma.json'
// import FileToTool from '~/app/assets/animations/file-to-tool.json'
import File from '~/app/assets/animations/file.json'
// import SbToCamera from '~/app/assets/animations/sb-to-camera.json'
import Sb from '~/app/assets/animations/sb.json'
// import ToolToSb from '~/app/assets/animations/tool-to-sb.json'
import Tool from '~/app/assets/animations/tool.json'
import { STEPS } from '~/app/pages/Main/Main.types'

export const mapStepToAnimation = {
  [STEPS.INIT]: FigmaUpload,
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: File,
  [STEPS.CHECKED_OUT_CODE]: Tool,
  [STEPS.INSTALLED_PACKAGES]: Tool,
  [STEPS.CAPTURED_SCREENSHOTS]: Sb,
  [STEPS.VISUAL_COMPARE]: Camera,
  [STEPS.NUMERIC_COMPARE]: Figma,
  [STEPS.UPLOADED_SCREENSHOTS]: Figma,
}
