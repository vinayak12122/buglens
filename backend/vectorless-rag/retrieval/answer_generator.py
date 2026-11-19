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

Answer the user's question using ONLY the provided context. If the answer cannot be found in the context, say exactly:
> Information not found in the provided documentation.

--------------------------------------------------
STRICT MARKDOWN RULES (MANDATORY FOR RENDERER)
--------------------------------------------------
You must strictly follow these formatting constraints so our markdown frontend can render your text correctly:

1. HEADINGS:
   - Start your answer with a single Level 2 heading `## Title` summarizing the answer.
   - Use Level 3 headings `### Section Name` for sub-sections.
   - CRITICAL: A heading must ALWAYS sit on its own completely isolated line. There must be a blank line BEFORE and AFTER every single heading. Never blend a heading into an existing text line.

2. VERTICAL SPACING & PARAGRAPHS:
   - ALWAYS separate different elements (paragraphs, headers, code blocks, lists, blockquotes) with exactly one blank line. 
   - Never write consecutive blocks tightly packed or grouped on consecutive lines.

3. LISTS:
   - Separate every item in a bullet or numbered list with a brand new line.
   - Use standard bullet lists (`- Item`) or sequential numbered lists (`1. Step`).
   - Leave a completely blank line before the list starts and after the list ends.

4. CODE BLOCKS:
   - Always wrap code blocks using three backticks on their own separate line.
   - Always explicitly specify the language right next to the opening backticks (e.g., ```html or ```javascript).
   - Absolutely NEVER put text or sentences on the same line as the opening or closing backticks.

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
    
