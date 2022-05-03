import renderer from 'react-test-renderer'

import ContainerWithTitle from './ContainerWithTitle'

describe('ContainerWithTitle', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(
        <ContainerWithTitle width={300} title="Title">
          <div>children</div>
        </ContainerWithTitle>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
