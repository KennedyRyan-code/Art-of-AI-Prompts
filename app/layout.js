import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";



export const metadata = {
  title: "Art of AI Prompts",
  description: "Discover & Share AI Prompts",
};


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"/>
          </div>
          
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
