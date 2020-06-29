import Nano, { Img } from '../../lib/index.js'
import { wait, mockIntersectionObserver } from '../helpers.js'
import { nodeToString } from '../../lib/helpers.js'

const spy = jest.spyOn(global.console, 'error')

mockIntersectionObserver()

test('should render without errors', async (done) => {
  const App = () => {
    return (
      <div>
        <Img
          ref={(el: HTMLElement) => {
            setTimeout(() => {
              el.dispatchEvent(new Event('load'))
            })
          }}
          src="https://via.placeholder.com/250"
          placeholder="https://via.placeholder.com/150"
        />
      </div>
    )
  }

  const res = Nano.render(<App />)

  await wait(50)
  expect(nodeToString(res)).toBe('<div><img src="https://via.placeholder.com/150"></div>')

  await wait(200)
  expect(nodeToString(res)).toBe('<div><img src="https://via.placeholder.com/250"></div>')
  expect(spy).not.toHaveBeenCalled()
  done()
})