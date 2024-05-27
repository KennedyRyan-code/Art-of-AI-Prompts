import Feeds from "@components/Feeds"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Art of AI Prompts is an open-source AI prompting tool for modern world to Get inspired by Discovering, Creating & Sharing Prompts.
        </p>

        <Feeds />
    </section>
  )
}

export default Home