import Footer from './'
import { render } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Footer', () => {
    it('Should render without crashing', async () => {
        render(
            <ThemeProvider>
                <Footer />
            </ThemeProvider>
        )
    })
})