import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import Header from './Header'

export default {
  component: Header,
  title: 'Global/Components/Header',
}

export function HeaderDefault() {
  return (
    <StoryContainer>
      <Header />
    </StoryContainer>
  )
}
