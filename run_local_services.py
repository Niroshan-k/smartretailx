import subprocess
import sys
import time
import os

services = [
    ("User Management Service", "smartretailx-user-service", 8001),
    ("Product Catalogue Service", "smartretailx-catalog-service", 8002),
    ("Inventory Management Service", "smartretailx-inventory-service", 8003),
    ("Payment Processing Service", "smartretailx-payment-service", 8004),
    ("Order Processing Service", "smartretailx-order-service", 8005),
]

def main():
    processes = []
    print("==================================================")
    print("  SmartRetailX Local Microservices Platform")
    print("==================================================")
    
    python_exe = sys.executable

    try:
        for name, folder, port in services:
            print(f"[*] Starting {name} on http://localhost:{port}...")
            p = subprocess.Popen(
                [python_exe, "-m", "uvicorn", "src.main:app", "--host", "127.0.0.1", "--port", str(port)],
                cwd=folder
            )
            processes.append((name, p))
            time.sleep(1.5)

        print("\n[+] ALL 5 MICROSERVICES ARE ONLINE!")
        print("--------------------------------------------------")
        print("  User Service Docs:      http://localhost:8001/docs")
        print("  Catalog Service Docs:   http://localhost:8002/docs")
        print("  Inventory Service Docs: http://localhost:8003/docs")
        print("  Payment Service Docs:   http://localhost:8004/docs")
        print("  Order Service Docs:     http://localhost:8005/docs")
        print("--------------------------------------------------")
        print("Press Ctrl+C at any time to stop all services.\n")

        for name, p in processes:
            p.wait()

    except KeyboardInterrupt:
        print("\n[*] Gracefully stopping microservices...")
        for name, p in processes:
            p.terminate()
        print("[+] All services stopped.")

if __name__ == "__main__":
    main()
