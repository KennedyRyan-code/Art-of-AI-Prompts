import "@styles/globals.css";


export const metadata = {
  title: "Art of AI Prompts",
  description: "Discover & Share AI Prompts",
};


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">

        </div>
        
        <main className="app">
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
