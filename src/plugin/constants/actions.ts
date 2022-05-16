export const PREFIX = 'same_story'

// selection and preview actions
export const SAME_STORY_SELECTION_CHANGE = `${PREFIX}_SELECTION_CHANGE`
export const SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI = `${PREFIX}_send_clear_error_from_plugin_to_ui`
export const SAME_STORY_RECEIVE_PREPARE_SELECTION_FROM_UI_TO_PLUGIN = `${PREFIX}_receive_prepare_selection_from_ui_to_plugin`
export const SAME_STORY_RECEIVE_CHECK_STORY_FROM_UI_TO_PLUGIN = `${PREFIX}_receive_check_story_from_ui_to_plugin`
export const SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI = `${PREFIX}_send_error_from_plugin_to_ui`
export const SAME_STORY_SEND_PREPARATION_FROM_PLUGIN_TO_UI = `${PREFIX}_send_preparation_from_plugin_to_ui`
export const SAME_STORY_SEND_ENCODED_FRAME_FROM_PLUGIN_TO_UI = `${PREFIX}_send_encoded_frame_from_plugin_to_ui`
export const SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI = `${PREFIX}_send_selection_from_plugin_to_ui`
export const SAME_STORY_CHECK_INITIAL_SELECTION = `${PREFIX}_check_inital_selection`

// form sync with localstorage
export const SAME_STORY_FORM_UPDATE = `${PREFIX}_form_update`

// history sync with localstorage
export const SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN = `${PREFIX}_history_create_from_ui_to_plugin`
export const SAME_STORY_HISTORY_UPDATE = `${PREFIX}_history_update`
export const SAME_STORY_HISTORY_REMOVE = `${PREFIX}_history_remove`
export const SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI = `${PREFIX}_history_list_plugin_to_ui`

// open and close
export const SAME_STORY_APP_OPEN = `${PREFIX}_app_open`
export const SAME_STORY_APP_CLOSE = `${PREFIX}_app_close`
