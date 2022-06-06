import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import ErrorPage from './ErrorPage'

export default {
  component: ErrorPage,
  title: 'Pages/ErrorPage',
}

export function ErrorPageStory() {
  return (
    <StoryContainer className="flex-col">
      <ErrorPage />
    </StoryContainer>
  )
}
