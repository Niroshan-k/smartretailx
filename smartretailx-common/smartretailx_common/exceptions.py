# custom HTTP exceptions

class SmartRetailXException(Exception):
    def __init__(self, message: str, status_code: int = 500, error_code: str = "INTERNAL_SERVER_ERROR"):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        super().__init__(message)

class NotFoundException(SmartRetailXException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, status_code=404, error_code="NOT_FOUND")

class UnauthorizedException(SmartRetailXException):
    def __init__(self, message: str = "Authentication credentials missing or invalid"):
        super().__init__(message, status_code=401, error_code="UNAUTHORIZED")

class ForbiddenException(SmartRetailXException):
    def __init__(self, message: str = "Permission denied"):
        super().__init__(message, status_code=403, error_code="FORBIDDEN")

class BadRequestException(SmartRetailXException):
    def __init__(self, message: str = "Invalid input data"):
        super().__init__(message, status_code=400, error_code="BAD_REQUEST")

class ConflictException(SmartRetailXException):
    def __init__(self, message: str = "Resource already exists"):
        super().__init__(message, status_code=409, error_code="CONFLICT")
