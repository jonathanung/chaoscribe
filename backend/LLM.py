import replicate

class Message:
    __slots__ = ("Role", "Content")

    def __init__(self, role: str, content: str) -> None:
        self.Role = role
        self.Content = content

    def __str__(self) -> str:
        if (self.Role == "user"):
            return f""
        
        return f""
 
class LLM: 
    def __init__(self):
        self.MessageQueue: list[dict]
        

