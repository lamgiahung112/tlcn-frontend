import { useState } from "react"
import ReactMarkdown from "react-markdown"

const markdownStyles = `
  .markdown-body h1 {
    font-size: 2.5em;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
  }
  .markdown-body h2 {
    font-size: 2em;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
  }
  .markdown-body h3 {
    font-size: 1.5em;
  }
  .markdown-body h4 {
    font-size: 1.25em;
  }
  .markdown-body h5 {
    font-size: 1em;
  }
  .markdown-body h6 {
    font-size: 0.875em;
    color: #6a737d;
  }
`

function PostPage() {
	const [content, setContent] = useState("")

	return (
		<div className="container mx-auto p-4">
			<style>{markdownStyles}</style>
			<h1 className="text-3xl font-bold mb-6">Edit Post</h1>
			<div className="flex gap-x-4">
				<div className="w-1/2">
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Write your post in markdown format"
						className="w-full h-screen p-2 border rounded"
					/>
				</div>
				<div className="w-1/2 border rounded p-4 markdown-body">
					<ReactMarkdown>{content}</ReactMarkdown>
				</div>
			</div>
		</div>
	)
}

export default PostPage
