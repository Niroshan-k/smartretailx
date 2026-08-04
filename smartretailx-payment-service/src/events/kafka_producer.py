import json
from src.core.config import settings
from src.core.logging import logger
from smartretailx_common.events import PaymentProcessedEvent

def publish_payment_event(event: PaymentProcessedEvent):
    try:
        from kafka import KafkaProducer
        producer = KafkaProducer(
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        producer.send('payments-topic', event.model_dump())
        producer.flush()
        logger.info(f"Published PaymentProcessed event for Order {event.order_id} to Kafka")
    except Exception as e:
        logger.warning(f"Kafka unavailable for event publish: {e}")
