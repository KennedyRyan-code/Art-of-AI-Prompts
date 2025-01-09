import Link from "next/link";


const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world!
         Let your imagination run wild with any AI-powered prompt you can think of. 
      </p>

      {/* a form to submit a prompt to the createPrompt  */}
      <form className="w-full mt-10 max-w-2xl flex flex-col gap-7 " onSubmit={handleSubmit}>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Your AI Prompt
          </span>

          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value})}
            placeholder="Write your prompt here..."
            required 
          
          />

        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Tag
            <span className="text-gray-400"> (i.e #idea, #products, #webdevelopment)</span>
          </span>

          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value})}
            placeholder="Add a tag..."
            required 
          
          />
        </label>
        <div className="flext-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-200 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 mx-4 text-sm bg-blue-800 rounded-full text-white font-satoshi font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>

        </div>
      </form>
    </section>
  )
}

export default Form