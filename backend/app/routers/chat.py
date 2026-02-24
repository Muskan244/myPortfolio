import logging

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

logger = logging.getLogger(__name__)

from app.database import get_session
from app.models import ChatMessage
from app.schemas import ChatRequest, ChatResponse, ChatHistoryResponse, MessageOut
from app.services.openrouter import get_ai_response

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, session: AsyncSession = Depends(get_session)):
    # Save user message
    user_msg = ChatMessage(
        session_id=request.session_id,
        role="user",
        content=request.message,
    )
    session.add(user_msg)
    await session.commit()

    # Fetch conversation history for context
    stmt = (
        select(ChatMessage)
        .where(ChatMessage.session_id == request.session_id)
        .order_by(ChatMessage.created_at)
    )
    result = await session.execute(stmt)
    history = [{"role": msg.role, "content": msg.content} for msg in result.scalars().all()]

    # Get AI response
    try:
        reply = await get_ai_response(request.message, history[:-1])
    except Exception as e:
        logger.error(f"OpenRouter API error: {e}")
        reply = (
            "I'm having trouble connecting right now. "
            "Feel free to reach out to Muskan directly at raghav12muskan@gmail.com."
        )

    # Save assistant message
    assistant_msg = ChatMessage(
        session_id=request.session_id,
        role="assistant",
        content=reply,
    )
    session.add(assistant_msg)
    await session.commit()

    return ChatResponse(reply=reply, session_id=request.session_id)


@router.get("/chat/history/{session_id}", response_model=ChatHistoryResponse)
async def get_history(session_id: str, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at)
    )
    result = await session.execute(stmt)
    messages = [
        MessageOut(role=msg.role, content=msg.content, created_at=msg.created_at)
        for msg in result.scalars().all()
    ]
    return ChatHistoryResponse(messages=messages)


@router.get("/health")
async def health():
    return {"status": "ok"}
