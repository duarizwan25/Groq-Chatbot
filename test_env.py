import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"Loading: {dotenv_path}")
load_dotenv(dotenv_path)

print("API KEY:", os.getenv("GROQ_API_KEY"))
