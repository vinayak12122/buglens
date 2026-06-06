from __future__ import annotations

from typing import List

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from .leaf_retriever import RetrievedDocument

class AnswerGenerator:
    def __init__(self,llm,max_context:int=15000):
        self.llm = llm
        self.max_context = max_context
        self.prompt = ChatPromptTemplate.from_template(
"""
You are the BugLens documentation assistant.

Answer the user's question ONLY using the provided context.

STRICT RESPONSE FORMAT (MANDATORY):
- Always use clean Markdown.
- Start with a clear heading (## Title).
- Use bullet points for steps.
- NEVER write long paragraphs without structure.

CODE RULES (VERY IMPORTANT):
- ALWAYS wrap code in triple backticks.
- ALWAYS specify language (e.g., ```html, ```js).
- NEVER break URLs.
- NEVER insert spaces inside URLs.
- NEVER output partial or inline code.

If you include code, you MUST output it as a fenced code block.
Never write "html <script ...>" — always use triple backticks.

GOOD EXAMPLE:

## Configure BugLens

Add the SDK script:

```html
<script src="https://buglens-two.vercel.app/sdk/sdk.js" data-api-key="YOUR_API_KEY"></script>

Question:
{question}

Context:
{context}

Answer:
"""
        )

        self.chain = (
            self.prompt | self.llm | StrOutputParser()
        )

    async def generate(self,question:str,documents:List[RetrievedDocument]):
        context = self._build_context(documents)

        async for chunk in self.chain.astream(
            {
                "question": question,
                "context": context,
            }
        ):
            yield chunk
    
    def _build_context(self,documents:List[RetrievedDocument]) -> str:
        chunks = []
        total_chars = 0

        for doc in documents:
            content = doc.content.strip()
            section = (
                f"\n\n"
                f"DOCUMENT: {doc.node_id}\n"
                f"{content}\n"
            )

            section_length = len(section)

            if(total_chars + section_length > self.max_context):
                break
            chunks.append(section)
            total_chars += section_length

        return "\n".join(chunks)
    
