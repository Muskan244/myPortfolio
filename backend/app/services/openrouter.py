import asyncio
import logging

import httpx

from app.config import settings
from app.data.resume_context import RESUME_CONTEXT

logger = logging.getLogger(__name__)

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

FALLBACK_MODELS = [
    "google/gemma-3-4b-it:free",
    "qwen/qwen3-4b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
]

NO_SYSTEM_ROLE = {"google/gemma-3-4b-it:free"}


def build_messages(model: str, user_message: str, history: list[dict]) -> list[dict]:
    recent = history[-10:]

    if model in NO_SYSTEM_ROLE:
        context_msg = {
            "role": "user",
            "content": f"[INSTRUCTIONS]\n{RESUME_CONTEXT}\n[/INSTRUCTIONS]\nAcknowledge briefly.",
        }
        ack_msg = {
            "role": "assistant",
            "content": "Understood. I'll answer questions about Muskan Raghav based on the provided resume data.",
        }
        return [context_msg, ack_msg, *recent, {"role": "user", "content": user_message}]

    return [
        {"role": "system", "content": RESUME_CONTEXT},
        *recent,
        {"role": "user", "content": user_message},
    ]


async def _call_model(client: httpx.AsyncClient, model: str, messages: list[dict]) -> str | None:
    for attempt in range(2):
        try:
            response = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {settings.openrouter_api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": settings.site_url,
                    "X-Title": settings.site_name,
                },
                json={
                    "model": model,
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7,
                },
            )

            if response.status_code == 429 and attempt == 0:
                wait = int(response.headers.get("retry-after", "3"))
                logger.info(f"Rate limited on {model}, retrying in {wait}s")
                await asyncio.sleep(wait)
                continue

            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]

        except Exception as e:
            logger.warning(f"Model {model} attempt {attempt + 1} failed: {e}")
            if attempt == 0 and "429" in str(e):
                await asyncio.sleep(3)
                continue
            return None

    return None


async def get_ai_response(
    user_message: str,
    conversation_history: list[dict],
) -> str:
    models_to_try = [settings.ai_model] + [
        m for m in FALLBACK_MODELS if m != settings.ai_model
    ]

    async with httpx.AsyncClient(timeout=30.0) as client:
        for model in models_to_try:
            messages = build_messages(model, user_message, conversation_history)
            reply = await _call_model(client, model, messages)
            if reply:
                logger.info(f"Success with model: {model}")
                return reply

    raise RuntimeError("All models failed")
