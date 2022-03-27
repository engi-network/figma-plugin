const PREFIX = 'same_story'
export const FIGMA_SELECTION_CHANGE = 'FIGMA_SELECTION_CHANGE'

export const ShowUIOptions = {
  title: 'Same story?',
  width: 728,
  height: 600,
}

export const FIGMA_MSG_TYPE_SAME_STORY_RECEIVE_PREPARE_SELECTION_FROM_UI_TO_PLUGIN = `${PREFIX}_receive_prepare_selection_from_ui_to_plugin`
// the message to check that the prepared selection if visually the same as its counter_part Storysnap
export const FIGMA_MSG_TYPE_SAME_STORY_RECEIVE_CHECK_STORY_FROM_UI_TO_PLUGIN = `${PREFIX}_receive_check_story_from_ui_to_plugin`
// the message type for sending error messages to the plugin UI
export const FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI = `${PREFIX}_send_error_from_plugin_to_ui`
export const FIGMA_MSG_TYPE_SAME_STORY_SEND_PREPARATION_FROM_PLUGIN_TO_UI = `${PREFIX}_send_preparation_from_plugin_to_ui`
export const FIGMA_MSG_TYPE_SAME_STORY_SEND_ENCODED_FRAME_FROM_PLUGIN_TO_UI = `${PREFIX}_send_encoded_frame_from_plugin_to_ui`
export const FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI = `${PREFIX}_send_selection_from_plugin_to_ui`
export const FIGMA_MSG_TYPE_SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI = `${PREFIX}_send_clear_error_from_plugin_to_ui`

export const DEFAULT_REPO = 'engi_network/engi_ui'
export const SAME_STORY_FORM_UPDATE = `${PREFIX}_form_update`

export enum LOCAL_STORAGE_KEY {
  HEIGHT = 'ss_height',
  NAME = 'ss_name',
  REPOSITORY = 'ss_repository',
  WIDTH = 'ss_width',
}
