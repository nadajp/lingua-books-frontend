import Meta from './meta'
import Header from './header'
import Footer from './common/footer'

export default function AppLayout({ children }) {
    return (
      <div className="min-h-screen flex flex-col">
        <Meta />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }
  