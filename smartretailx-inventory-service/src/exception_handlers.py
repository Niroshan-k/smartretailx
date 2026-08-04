from fastapi import Request
from fastapi.responses import JSONResponse
from smartretailx_common.exceptions import SmartRetailXException
from smartretailx_common.schemas import ErrorResponse

async def smartretailx_exception_handler(request: Request, exc: SmartRetailXException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            success=False,
            message=exc.message,
            error_code=exc.error_code
        ).model_dump()
    )
