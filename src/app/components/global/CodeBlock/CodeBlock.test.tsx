import renderer from 'react-test-renderer'

import CodeBlock from './CodeBlock'

const codeString = `const TestCompenent = () => {
  return <div>Test</div>
}
`

describe('CodeBlock', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(<CodeBlock codeString={codeString} className={'w-36 h-20'} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
