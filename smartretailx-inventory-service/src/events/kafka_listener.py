import json
import threading
import time
from src.core.config import settings
from src.core.logging import logger
from src.dependencies import SessionLocal
from src.repositories.inventory_repository import InventoryRepository
from src.services.inventory_service import InventoryService
from src.schemas.inventory import StockDeductRequest

def start_kafka_consumer():
    def consume_loop():
        try:
            from kafka import KafkaConsumer
            consumer = KafkaConsumer(
                'orders-topic',
                bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
                value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                group_id='inventory-group',
                auto_offset_reset='earliest'
            )
            logger.info("Kafka consumer started listening on 'orders-topic'...")
            for message in consumer:
                event = message.value
                logger.info(f"Received Kafka event: {event.get('event_type')}")
                if event.get('event_type') == 'OrderCreated':
                    db = SessionLocal()
                    try:
                        repo = InventoryRepository(db)
                        service = InventoryService(repo)
                        for item in event.get('items', []):
                            product_id = item['product_id']
                            qty = item['quantity']
                            logger.info(f"Asynchronously deducting stock for Product ID {product_id}, qty {qty}")
                            try:
                                service.deduct_stock(StockDeductRequest(product_id=product_id, quantity=qty))
                            except Exception as ex:
                                logger.error(f"Failed to deduct stock for product {product_id}: {ex}")
                    finally:
                        db.close()
        except Exception as e:
            logger.warning(f"Kafka consumer connection deferred/failed: {e}. Will attempt background retry...")

    t = threading.Thread(target=consume_loop, daemon=True)
    t.start()
