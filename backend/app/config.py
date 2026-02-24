from pathlib import Path

from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    openrouter_api_key: str = ""
    ai_model: str = "meta-llama/llama-3.3-70b-instruct:free"
    site_url: str = "http://localhost:5173"
    site_name: str = "Muskan Raghav Portfolio"
    database_url: str = f"sqlite+aiosqlite:///{BASE_DIR / 'chat.db'}"

    class Config:
        env_file = str(BASE_DIR / ".env")


settings = Settings()
