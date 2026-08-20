import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    """
    AWS Lambda Serverless Event Worker
    Processes incoming order notification events from Amazon SQS
    """
    logger.info("==========================================================")
    logger.info("   SMARTRETAILX SERVERLESS AWS LAMBDA EVENT WORKER        ")
    logger.info("==========================================================")
    
    for record in event.get('Records', []):
        body = record.get('body', '{}')
        logger.info(f"[LAMBDA EVENT CONSUMED] SQS Message Body: {body}")
        
    return {
        'statusCode': 200,
        'body': json.dumps({'status': 'SUCCESS', 'message': 'SQS event processed by AWS Lambda'})
    }
